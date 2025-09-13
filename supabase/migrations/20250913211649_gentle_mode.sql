/*
  # RSS Cleanup Function

  1. Functions
    - `cleanup_old_rss_items` - Removes old RSS items while keeping the most recent ones per source
  
  2. Purpose
    - Prevents database from growing indefinitely
    - Keeps the most recent items for each RSS source
    - Maintains good performance by limiting table size
*/

-- Function to cleanup old RSS items per source
CREATE OR REPLACE FUNCTION cleanup_old_rss_items(
  source_uuid uuid,
  keep_count integer DEFAULT 1000
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete old items, keeping only the most recent 'keep_count' items
  DELETE FROM rss_items 
  WHERE source_id = source_uuid
    AND id NOT IN (
      SELECT id 
      FROM rss_items 
      WHERE source_id = source_uuid
      ORDER BY published_at DESC 
      LIMIT keep_count
    );
END;
$$;