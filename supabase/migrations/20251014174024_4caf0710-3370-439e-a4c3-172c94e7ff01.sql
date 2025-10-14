-- Add user_id column to partners table for authentication tracking
ALTER TABLE public.partners ADD COLUMN user_id uuid REFERENCES auth.users(id);

-- Make user_id required for new entries
ALTER TABLE public.partners ALTER COLUMN user_id SET NOT NULL;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can apply to become a partner" ON public.partners;
DROP POLICY IF EXISTS "Partners can view their own data" ON public.partners;

-- Create secure policies requiring authentication
CREATE POLICY "Authenticated users can apply to become a partner"
ON public.partners
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Partners can view their own data"
ON public.partners
FOR SELECT
USING (auth.uid() = user_id);

-- Allow partners to update their own applications
CREATE POLICY "Partners can update their own data"
ON public.partners
FOR UPDATE
USING (auth.uid() = user_id);