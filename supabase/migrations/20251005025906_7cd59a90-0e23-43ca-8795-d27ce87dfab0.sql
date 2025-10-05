-- Allow admins to delete any label
CREATE POLICY "Admins can delete any label" 
ON public.labels 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));