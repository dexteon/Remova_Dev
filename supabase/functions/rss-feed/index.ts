import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

const RSS_FEEDS = [
  "https://thehackernews.com/feeds/posts/default",
  "https://krebsonsecurity.com/feed/",
  "https://www.darkreading.com/rss_simple.asp",
  "https://www.wired.com/feed/category/security/latest/rss",
  "https://databreaches.net/feed/",
  "https://www.bleepingcomputer.com/feed/",
  "https://therecord.media/feed/",
  "https://haveibeenpwned.com/rss/breaches"
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function extractTextFromElement(element: any): string {
  if (typeof element === 'string') return element;
  if (element?.['#text']) return element['#text'];
  if (element?.[0]?.['#text']) return element[0]['#text'];
  if (element?.[0]) return element[0];
  return element || '';
}

function extractLinkFromElement(element: any): string {
  if (typeof element === 'string') return element;
  if (element?.['@href']) return element['@href'];
  if (element?.['#text']) return element['#text'];
  if (element?.[0]?.['@href']) return element[0]['@href'];
  if (element?.[0]?.['#text']) return element[0]['#text'];
  if (element?.[0]) return element[0];
  return element || '';
}

async function fetchAndParseFeed(url: string) {
  try {
    console.log(`Fetching feed: ${url}`);
    
    const response = await fetch(url, {
      headers: { 
        'User-Agent': 'RemovaRSSFetcher/1.0',
        'Accept': 'application/rss+xml, application/xml, text/xml'
      },
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      return [];
    }
    
    const xml = await response.text();
    console.log(`Fetched ${xml.length} characters from ${url}`);
    
    // Simple XML parsing without external dependencies
    const items = [];
    
    // Extract channel/feed title
    let feedTitle = url.split('/')[2]; // fallback to domain
    const channelTitleMatch = xml.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (channelTitleMatch) {
      feedTitle = channelTitleMatch[1].trim();
    }
    
    // Find all items
    const itemMatches = xml.matchAll(/<item[^>]*>([\s\S]*?)<\/item>/gi);
    
    for (const match of itemMatches) {
      const itemXml = match[1];
      
      // Extract title
      const titleMatch = itemXml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() : '';
      
      // Extract link
      const linkMatch = itemXml.match(/<link[^>]*>([\s\S]*?)<\/link>/i) || 
                       itemXml.match(/<link[^>]*href=["']([^"']+)["'][^>]*>/i);
      const link = linkMatch ? linkMatch[1].trim() : '';
      
      // Extract publication date
      const pubDateMatch = itemXml.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i) ||
                          itemXml.match(/<published[^>]*>([\s\S]*?)<\/published>/i) ||
                          itemXml.match(/<dc:date[^>]*>([\s\S]*?)<\/dc:date>/i);
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString();
      
      // Extract description/summary
      const descMatch = itemXml.match(/<description[^>]*>([\s\S]*?)<\/description>/i) ||
                       itemXml.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i) ||
                       itemXml.match(/<content[^>]*>([\s\S]*?)<\/content>/i);
      let description = descMatch ? descMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') : '';
      
      // Clean HTML tags from description
      description = description.replace(/<[^>]*>/g, ' ')
                             .replace(/\s+/g, ' ')
                             .trim()
                             .substring(0, 200);
      
      if (title && link && title.length > 10) {
        items.push({
          id: `${url}-${items.length}`,
          title: title.substring(0, 150),
          link: link.startsWith('http') ? link : new URL(link, url).href,
          publishedAt: new Date(pubDate).toISOString(),
          summary: description + (description.length >= 200 ? '...' : ''),
          source: feedTitle
        });
      }
    }
    
    console.log(`Parsed ${items.length} items from ${url}`);
    return items;
    
  } catch (error) {
    console.error(`Error processing feed ${url}:`, error.message || error);
    return [];
  }
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Starting RSS feed aggregation...');
    
    // Fetch feeds with a reasonable concurrency limit
    const batchSize = 3;
    const allItems = [];
    
    for (let i = 0; i < RSS_FEEDS.length; i += batchSize) {
      const batch = RSS_FEEDS.slice(i, i + batchSize);
      const batchPromises = batch.map(fetchAndParseFeed);
      const batchResults = await Promise.allSettled(batchPromises);
      
      for (const result of batchResults) {
        if (result.status === 'fulfilled') {
          allItems.push(...result.value);
        }
      }
    }
    
    console.log(`Total items collected: ${allItems.length}`);
    
    // Sort by publication date and limit results
    const sortedItems = allItems
      .filter(item => item.title && item.link)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 50);

    console.log(`Returning ${sortedItems.length} sorted items`);

    return new Response(JSON.stringify(sortedItems), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      },
      status: 200,
    });
    
  } catch (error) {
    console.error('RSS feed aggregation error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch RSS feeds',
      message: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});