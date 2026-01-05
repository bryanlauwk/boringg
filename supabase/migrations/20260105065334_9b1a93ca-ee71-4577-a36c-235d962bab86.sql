-- Table to store global boredom stats
CREATE TABLE public.boredom_stats (
  id TEXT PRIMARY KEY DEFAULT 'global',
  total_clicks BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert the initial global stats row
INSERT INTO public.boredom_stats (id, total_clicks) VALUES ('global', 0);

-- Table to store pixel data on the grid
CREATE TABLE public.boredom_pixels (
  id SERIAL PRIMARY KEY,
  position INTEGER NOT NULL UNIQUE,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster pixel lookups
CREATE INDEX idx_boredom_pixels_position ON public.boredom_pixels(position);

-- Enable RLS on both tables
ALTER TABLE public.boredom_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boredom_pixels ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read stats (public data)
CREATE POLICY "Anyone can read boredom stats"
ON public.boredom_stats
FOR SELECT
USING (true);

-- Allow anyone to update stats (anonymous clicks allowed)
CREATE POLICY "Anyone can update boredom stats"
ON public.boredom_stats
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Allow anyone to read pixels (public data)
CREATE POLICY "Anyone can read pixels"
ON public.boredom_pixels
FOR SELECT
USING (true);

-- Allow anyone to insert/update pixels (anonymous clicks)
CREATE POLICY "Anyone can insert pixels"
ON public.boredom_pixels
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update pixels"
ON public.boredom_pixels
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Enable realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.boredom_stats;
ALTER PUBLICATION supabase_realtime ADD TABLE public.boredom_pixels;