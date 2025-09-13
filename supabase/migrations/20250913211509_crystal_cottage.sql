/*
  # RSS Feed Management System

  1. New Tables
    - `rss_sources`
      - `id` (uuid, primary key)
      - `name` (text) - Display name for the source
      - `feed_url` (text) - RSS feed URL
      - `source_handle` (text) - Twitter handle if applicable
      - `description` (text) - Source description
      - `is_active` (boolean) - Whether to fetch this feed
      - `last_fetched` (timestamptz) - Last successful fetch
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `rss_items`
      - `id` (uuid, primary key)
      - `source_id` (uuid, foreign key to rss_sources)
      - `title` (text) - Article title
      - `link` (text) - Article URL
      - `summary` (text) - Article summary/description
      - `published_at` (timestamptz) - When article was published
      - `guid` (text) - RSS GUID for deduplication
      - `content_hash` (text) - Hash for deduplication
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Allow public read access for rss_items
    - Restrict rss_sources modifications to authenticated users

  3. Indexes
    - Index on published_at for sorting
    - Index on content_hash for deduplication
    - Index on source_id for filtering
*/

CREATE TABLE IF NOT EXISTS rss_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  feed_url text UNIQUE NOT NULL,
  source_handle text,
  description text,
  is_active boolean DEFAULT true,
  last_fetched timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS rss_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid REFERENCES rss_sources(id) ON DELETE CASCADE,
  title text NOT NULL,
  link text NOT NULL,
  summary text,
  published_at timestamptz NOT NULL,
  guid text,
  content_hash text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE rss_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE rss_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rss_sources
CREATE POLICY "Allow public read access to active RSS sources"
  ON rss_sources
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage RSS sources"
  ON rss_sources
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for rss_items  
CREATE POLICY "Allow public read access to RSS items"
  ON rss_items
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage RSS items"
  ON rss_items
  FOR ALL
  TO authenticated
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_rss_items_published_at ON rss_items(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_rss_items_content_hash ON rss_items(content_hash);
CREATE INDEX IF NOT EXISTS idx_rss_items_source_id ON rss_items(source_id);
CREATE INDEX IF NOT EXISTS idx_rss_sources_active ON rss_sources(is_active) WHERE is_active = true;

-- Insert initial RSS sources
INSERT INTO rss_sources (name, feed_url, description, source_handle) VALUES
  ('DataBreaches.net', 'https://databreaches.net/feed/', 'Investigative reporting on data breaches and privacy incidents', '@DataBreachesNet'),
  ('UpGuard', 'https://www.upguard.com/breaches/rss.xml', 'Cybersecurity research and breach analysis', null),
  ('HaveIBeenPwned', 'https://feeds.feedburner.com/HaveIBeenPwnedLatestBreaches', 'Latest data breach discoveries and notifications', '@haveibeenpwned'),
  ('IT Pro', 'https://www.itpro.com/feeds/tag/data-breaches', 'Enterprise security news and data breach coverage', null),
  ('DataBreachToday', 'https://www.databreachtoday.in/rss-feeds', 'Breaking cybersecurity and data breach news', null),
  ('Thales Group', 'https://dis-blog.thalesgroup.com/tag/data-breach/feed/', 'Digital identity and security research insights', null),
  ('CurrentScams', 'https://currentscams.com/index.php/feed/', 'Scam alerts and fraud prevention information', null)
ON CONFLICT (feed_url) DO NOTHING;