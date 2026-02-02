-- Deny all SELECT access to email_subscribers from the client
-- Subscriber data should only be viewable through the Lovable Cloud backend UI
CREATE POLICY "No public read access to subscribers"
ON public.email_subscribers
FOR SELECT
USING (false);