-- Drop the existing restrictive SELECT policy
DROP POLICY IF EXISTS "Admins can view subscribers" ON public.email_subscribers;

-- Create a PERMISSIVE SELECT policy that only allows admins
CREATE POLICY "Admins can view subscribers"
ON public.email_subscribers
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));