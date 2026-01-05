-- Create a function to increment clicks atomically
CREATE OR REPLACE FUNCTION increment_clicks()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE boredom_stats 
  SET total_clicks = total_clicks + 1, updated_at = now()
  WHERE id = 'global';
END;
$$;