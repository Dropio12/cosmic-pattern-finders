-- Allow everyone (including anonymous users) to view verified zones
CREATE POLICY "Anyone can view verified labels"
ON public.labels
FOR SELECT
TO public
USING (verified = true);