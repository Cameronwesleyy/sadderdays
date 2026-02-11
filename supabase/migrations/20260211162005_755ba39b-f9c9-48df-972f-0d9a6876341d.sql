
-- Site content table for editable text blocks
CREATE TABLE public.site_content (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Authenticated can update site content" ON public.site_content FOR UPDATE USING (true);
CREATE POLICY "Authenticated can insert site content" ON public.site_content FOR INSERT WITH CHECK (true);

-- Seed default content
INSERT INTO public.site_content (id, content) VALUES
  ('about_bio', 'Sadder Days combines influences from RnB, Jazz, and Classical music to create a unique metal experience that blends sensual grooves, elegant rhythms, and nocturnal soundscapes.'),
  ('about_bio_2', 'Members Grant and Cameron have been friends since elementary school, taking up their respective instruments in Summer 2020.'),
  ('about_bio_3', 'From the start, the band wanted their music to provide a path for Black culture to become synonymous with elegance, class, and sensuality.'),
  ('about_quote', 'THE BAND WILL NOT STOP UNTIL THE WORLD HAS HAD SADDER DAYS.'),
  ('about_quote_attribution', '— AND EVEN THEN, THEY''RE GOING TO KEEP GOING.'),
  ('about_rnm', 'Pulling from prominent influences in Black music, Sadder Days created their own genre—combining sounds from RnB, Jazz, Gospel, House, Hip-Hop, and Classical music, wrapped in a neat Metal package.'),
  ('about_location', 'HOUSTON, TX'),
  ('contact_info', ''),
  ('headline', ''),
  ('cameron_bio', 'Cameron is the guitarist and founder of Sadder Days. He started making music at 17, during quarantine, and taught himself how to play guitar. His style as a guitar player is distinct, sensual, melodic, and elegant, while still incorporating those bloodthirsty riffs that drive Sadder Days'' heavy side. Taking influences from Classical, RnB, Jazz, and even Visual Kei, Cameron always finds a way to make his guitar sing a sultry, vampiric song. He writes songs entirely in his head before touching an instrument. "You''re only limited by how big you can think."'),
  ('grant_bio', 'Grant, the rhythmic heartbeat and co-founder of Sadder Days, stumbled into his musical journey at 17. Initially he had no aspirations of becoming a musician. However, the moment he laid hands on the drum kit alongside Cameron, he "felt like a kid again", transporting him back to the pure joy of childhood. This unexpected passion led him to embrace the drums, infusing Sadder Days'' music with buttery grooves, explosive energy, and head-bumping beats. His evolving style—a blend of RnB, House, Jazz, and Hip-Hop influences—adds a danceable underbelly to the band''s sound.');

-- Tour dates table
CREATE TABLE public.tour_dates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date TEXT NOT NULL,
  city TEXT NOT NULL,
  venue TEXT NOT NULL,
  ticket_link TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'available',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.tour_dates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read tour dates" ON public.tour_dates FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage tour dates" ON public.tour_dates FOR ALL USING (true);

-- Seed existing tour dates
INSERT INTO public.tour_dates (date, city, venue, status, sort_order) VALUES
  ('MAR 15', 'NEW YORK', 'Terminal 5', 'available', 0),
  ('MAR 22', 'LOS ANGELES', 'The Wiltern', 'sold-out', 1),
  ('APR 05', 'LONDON', 'Brixton Academy', 'available', 2),
  ('APR 15', 'TOKYO', 'Shibuya O-East', 'available', 3),
  ('APR 22', 'BERLIN', 'Columbiahalle', 'low', 4),
  ('APR 25', 'PARIS', 'L''Olympia', 'sold-out', 5);

-- Music releases table
CREATE TABLE public.music_releases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Single',
  year TEXT NOT NULL,
  cover_url TEXT NOT NULL,
  spotify_url TEXT DEFAULT '',
  apple_url TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.music_releases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read releases" ON public.music_releases FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage releases" ON public.music_releases FOR ALL USING (true);

-- Admin settings (password, shopify connection, etc.)
CREATE TABLE public.admin_settings (
  id TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read admin settings" ON public.admin_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage admin settings" ON public.admin_settings FOR ALL USING (true);

-- Set default admin password
INSERT INTO public.admin_settings (id, value) VALUES
  ('admin_password', 'sadderdays2025'),
  ('shopify_store_url', ''),
  ('shopify_access_token', '');
