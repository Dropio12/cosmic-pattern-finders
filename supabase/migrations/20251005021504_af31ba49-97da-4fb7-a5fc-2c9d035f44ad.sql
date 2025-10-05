-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'researcher', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Migrate existing admin and researcher data to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'researcher'::app_role
FROM public.profiles
WHERE is_researcher = true
ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM public.profiles
WHERE is_admin = true
ON CONFLICT (user_id, role) DO NOTHING;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop old RLS policies on labels that use profiles.is_admin
DROP POLICY IF EXISTS "Admins can update any label" ON public.labels;
DROP POLICY IF EXISTS "Admins can view all labels" ON public.labels;

-- Create new RLS policies for labels using security definer function
CREATE POLICY "Admins can update any label"
ON public.labels
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all labels"
ON public.labels
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- CRITICAL: Restrict profiles SELECT policy to prevent data exposure
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Remove is_admin and is_researcher columns from profiles (they're now in user_roles)
ALTER TABLE public.profiles DROP COLUMN IF EXISTS is_admin;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS is_researcher;