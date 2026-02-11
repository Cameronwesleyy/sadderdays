
-- Create storage bucket for site images
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

-- Allow anyone to view images
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');

-- Allow anyone to upload (admin password protects the UI)
CREATE POLICY "Allow uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-images');

-- Allow anyone to update
CREATE POLICY "Allow updates" ON storage.objects FOR UPDATE USING (bucket_id = 'site-images');

-- Allow anyone to delete
CREATE POLICY "Allow deletes" ON storage.objects FOR DELETE USING (bucket_id = 'site-images');

-- Seed home page content
INSERT INTO public.site_content (id, content) VALUES
  ('home_hero_caption', 'CAMERON AND GRANT, NYC 2026'),
  ('home_section_title', 'I''VE HAD SADDER DAYS'),
  ('home_section_copy', 'LOREM IPSUM DOLOR SIT AMET CONSECTETUR ADIPISCING ELIT.'),
  ('home_shop_date', 'FEB 2026'),
  ('home_shop_copy', 'LOREM IPSUM DOLOR SIT AMET CONSECTETUR. ADIPISCING ELIT SED DO EIUSMOD TEMPOR.'),
  ('home_gallery_subtitle', 'NYC, 2024-2025'),
  ('home_hero_image', ''),
  ('home_portrait_left', ''),
  ('home_portrait_right', ''),
  ('home_shop_image_1', ''),
  ('home_shop_image_2', ''),
  ('home_shop_image_3', ''),
  ('home_napkin_image', ''),
  ('home_tour_image', '')
ON CONFLICT (id) DO NOTHING;
