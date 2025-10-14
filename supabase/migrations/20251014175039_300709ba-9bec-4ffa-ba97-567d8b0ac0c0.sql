-- 1. Create role enum for RBAC system
CREATE TYPE public.app_role AS ENUM ('user', 'admin', 'partner_reviewer', 'nutritionist');

-- 2. Create user_roles table for role-based access control
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. Add RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- 5. Update partners table policies to use RBAC
DROP POLICY IF EXISTS "Partners can view their own data" ON public.partners;

CREATE POLICY "Users view own, admins view all partners"
ON public.partners FOR SELECT
USING (
  auth.uid() = user_id 
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'partner_reviewer')
);

-- 6. Enforce pending status on partner applications
CREATE OR REPLACE FUNCTION public.enforce_pending_partner_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Always set status to pending for new applications
  NEW.status = 'pending';
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_pending_status_trigger
BEFORE INSERT ON public.partners
FOR EACH ROW
EXECUTE FUNCTION public.enforce_pending_partner_status();

-- 7. Restrict partner status updates to admins only
DROP POLICY IF EXISTS "Partners can update their own data" ON public.partners;

CREATE POLICY "Partners can update own data except status"
ON public.partners FOR UPDATE
USING (
  auth.uid() = user_id 
  AND status = (SELECT p.status FROM public.partners p WHERE p.id = partners.id)
)
WITH CHECK (
  auth.uid() = user_id 
  AND status = (SELECT p.status FROM public.partners p WHERE p.id = partners.id)
);

CREATE POLICY "Only admins can change partner status"
ON public.partners FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- 8. Create function to update updated_at on user_roles
CREATE TRIGGER update_user_roles_updated_at
BEFORE UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();