import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { DOMParser } from 'https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RssSource {
  id: string;
  name: string;
  feed_url: string;
  source_handle: string | null;
  description: string;
  is_active: boolean;
  last_fetched: string | null;
}

interface RssItem {
  title: string;
  link: string;
  summary?: string;
  published_at: string;
  guid?: string;
  content_hash: string;
  source_id: string;
}

function generateContentHash(title: string, link: string, sourceId: string): string {
  const content = `${title}|${link}|${sourceId}`;
  return btoa(content).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
}

function parseRSSDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return new Date().toISOString();
    }
    return date.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function extractTextContent(element: Element | null): string {
  if (!element) return '';
  return element.textContent?.trim() || '';
}

function parseFeed(xmlContent: string, source: RssSource): RssItem[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlContent, 'application/xml');
  
  if (!doc) return [];

  const items: RssItem[] = [];
  const itemElements = doc.querySelectorAll('item, entry');

  for (const item of itemElements) {
    const title = extractTextContent(item.querySelector('title'));
    const link = extractTextContent(item.querySelector('link')) || 
                 item.querySelector('link')?.getAttribute('href') || '';
    
    if (!title || !link) continue;

    const summary = extractTextContent(item.querySelector('description, summary, content'));
    const pubDate = extractTextContent(item.querySelector('pubDate, published, dc\\:date')) || 
                   extractTextContent(item.querySelector('date'));
    const guid = extractTextContent(item.querySelector('guid, id'));

    const contentHash = generateContentHash(title, link, source.id);
    const publishedAt = parseRSSDate(pubDate);

    items.push({
      title: title.substring(0, 500), // Limit title length
      link: link.substring(0, 2000), // Limit URL length
      summary: summary ? summary.substring(0, 1000) : undefined, // Limit summary length
      published_at: publishedAt,
      guid: guid || undefined,
      content_hash: contentHash,
      source_id: source.id,
    });
  }

  return items;
}

async function fetchRSSFeed(source: RssSource): Promise<RssItem[]> {
  try {
    console.log(`Fetching RSS feed: ${source.name} (${source.feed_url})`);
    
    const response = await fetch(source.feed_url, {
      headers: {
        'User-Agent': 'Remova RSS Fetcher 1.0',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
      timeout: 30000, // 30 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xmlContent = await response.text();
    return parseFeed(xmlContent, source);
  } catch (error) {
    console.error(`Failed to fetch RSS feed ${source.name}:`, error);
    return [];
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get active RSS sources
    const { data: sources, error: sourcesError } = await supabaseClient
      .from('rss_sources')
      .select('*')
      .eq('is_active', true);

    if (sourcesError) {
      throw new Error(`Failed to fetch RSS sources: ${sourcesError.message}`);
    }

    console.log(`Found ${sources?.length || 0} active RSS sources`);

    let totalItemsProcessed = 0;
    let totalItemsInserted = 0;

    // Process each source
    for (const source of sources || []) {
      try {
        const items = await fetchRSSFeed(source);
        totalItemsProcessed += items.length;

        if (items.length > 0) {
          // Insert items, ignoring duplicates based on content_hash
          const { data: insertedItems, error: insertError } = await supabaseClient
            .from('rss_items')
            .insert(items)
            .select('id');

          if (insertError) {
            console.error(`Failed to insert items for ${source.name}:`, insertError);
          } else {
            const insertedCount = insertedItems?.length || 0;
            totalItemsInserted += insertedCount;
            console.log(`Inserted ${insertedCount} new items for ${source.name}`);
          }
        }

        // Update last_fetched timestamp
        await supabaseClient
          .from('rss_sources')
          .update({ 
            last_fetched: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', source.id);

      } catch (error) {
        console.error(`Error processing source ${source.name}:`, error);
      }
    }

    // Clean up old items (keep last 1000 items per source)
    for (const source of sources || []) {
      const { error: cleanupError } = await supabaseClient
        .rpc('cleanup_old_rss_items', { 
          source_uuid: source.id, 
          keep_count: 1000 
        });

      if (cleanupError) {
        console.error(`Failed to cleanup old items for ${source.name}:`, cleanupError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Processed ${totalItemsProcessed} items, inserted ${totalItemsInserted} new items`,
        sources_processed: sources?.length || 0,
        items_processed: totalItemsProcessed,
        items_inserted: totalItemsInserted,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('RSS fetch error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});