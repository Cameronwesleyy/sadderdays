
-- Create songs table for lyrics
CREATE TABLE public.songs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  lyrics TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- Anyone can read songs
CREATE POLICY "Anyone can read songs"
ON public.songs
FOR SELECT
USING (true);

-- Authenticated can manage songs
CREATE POLICY "Authenticated can manage songs"
ON public.songs
FOR ALL
USING (true);
