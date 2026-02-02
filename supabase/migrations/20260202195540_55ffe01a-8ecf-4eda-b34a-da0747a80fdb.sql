-- Deny all UPDATE access to email_subscribers from the client
CREATE POLICY "No public update access to subscribers"
ON public.email_subscribers
FOR UPDATE
USING (false);

-- Deny all DELETE access to email_subscribers from the client
CREATE POLICY "No public delete access to subscribers"
ON public.email_subscribers
FOR DELETE
USING (false);