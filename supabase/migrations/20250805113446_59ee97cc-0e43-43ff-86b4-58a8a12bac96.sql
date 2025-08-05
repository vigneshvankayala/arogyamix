-- Create partner types enum
CREATE TYPE public.partner_type AS ENUM ('farmer', 'nutritionist', 'retailer');

-- Create partners table
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  partner_type partner_type NOT NULL,
  business_name TEXT,
  business_address TEXT,
  experience_years INTEGER,
  certifications TEXT[],
  specializations TEXT[],
  business_size TEXT,
  current_suppliers TEXT[],
  target_market TEXT,
  additional_info TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Create policy for partners to view their own data
CREATE POLICY "Partners can view their own data" 
ON public.partners 
FOR SELECT 
USING (true);

-- Create policy for anyone to insert (onboarding)
CREATE POLICY "Anyone can apply to become a partner" 
ON public.partners 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_partners_updated_at
BEFORE UPDATE ON public.partners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();