-- Add missing columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_researcher boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS is_admin boolean NOT NULL DEFAULT false;