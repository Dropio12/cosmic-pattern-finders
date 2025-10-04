-- Remove old security system
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all labels" ON public.labels;
DROP POLICY IF EXISTS "Admins can update label verification" ON public.labels;

DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role) CASCADE;
DROP TYPE IF EXISTS public.app_role CASCADE;

-- Add simple boolean columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN is_admin BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN is_researcher BOOLEAN NOT NULL DEFAULT FALSE;

-- Update the trigger function to handle new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, passport, points, is_researcher, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'passport', NEW.email),
    0,
    COALESCE((NEW.raw_user_meta_data->>'is_researcher')::boolean, false),
    false
  );
  
  RETURN NEW;
END;
$$;

-- Add policy for admins to view all labels
CREATE POLICY "Admins can view all labels"
  ON public.labels FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Add policy for admins to update label verification
CREATE POLICY "Admins can update any label"
  ON public.labels FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );