import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

// RSS feed URLs - embedded directly to avoid file system issues
const RSS_FEEDS = [
  "https://thehackernews.com/feeds/posts/default",
  "https://krebsonsecurity.com/feed/",
  "https://www.darkreading.com/rss_simple.asp", 
  "https://www.bleepingcomputer.com/feed/",
  "https://threatpost.com/feed/",
  "https://databreaches.net/feed/",
  "https://therecord.media/feed/",
  "https://www.wired.com/feed/category/security/latest/rss",
  "https://feeds.feedburner.com/HaveIBeenPwnedLatestBreaches"
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function cleanText(text: string): string {
  return text
    .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();
}

function extractTextBetweenTags(xml: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = xml.match(regex);
  return match ? cleanText(match[1]) : '';
}

async function fetchAndParseFeed(url: string) {
  try {
    console.log(`Fetching feed: ${url}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    const response = await fetch(url, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml, text/html, */*'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.error(`HTTP error for ${url}: ${response.status} ${response.statusText}`);
      return [];
    }
    
    const xml = await response.text();
    console.log(`Fetched ${xml.length} characters from ${url}`);
    
    if (xml.length < 100) {
      console.error(`Response too short for ${url}: ${xml.length} characters`);
      return [];
    }
    
    const items = [];
    
    // Extract feed title
    let feedTitle = new URL(url).hostname.replace('www.', '');
    const channelTitle = extractTextBetweenTags(xml, 'title');
    if (channelTitle && channelTitle.length > 0 && channelTitle.length < 100) {
      feedTitle = channelTitle;
    }
    
    // Match both RSS and Atom items
    const itemPattern = /<(?:item|entry)[^>]*>([\s\S]*?)<\/(?:item|entry)>/gi;
    const itemMatches = xml.matchAll(itemPattern);
    
    for (const match of itemMatches) {
      const itemXml = match[1];
      
      // Extract title
      const title = extractTextBetweenTags(itemXml, 'title');
      if (!title || title.length < 5) continue;
      
      // Extract link - try multiple formats
      let link = extractTextBetweenTags(itemXml, 'link');
      if (!link) {
        const linkMatch = itemXml.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i);
        if (linkMatch) link = linkMatch[1];
      }
      if (!link) continue;
      
      // Ensure absolute URL
      if (link.startsWith('/')) {
        const baseUrl = new URL(url);
        link = `${baseUrl.protocol}//${baseUrl.host}${link}`;
      } else if (!link.startsWith('http')) {
        link = new URL(link, url).href;
      }
      
      // Extract publication date
      let pubDate = extractTextBetweenTags(itemXml, 'pubDate') ||
                   extractTextBetweenTags(itemXml, 'published') ||
                   extractTextBetweenTags(itemXml, 'updated') ||
                   extractTextBetweenTags(itemXml, 'dc:date');
      
      if (!pubDate) {
        pubDate = new Date().toISOString();
      } else {
        try {
          pubDate = new Date(pubDate).toISOString();
        } catch (e) {
          pubDate = new Date().toISOString();
        }
      }
      
      // Extract description
      let description = extractTextBetweenTags(itemXml, 'description') ||
                       extractTextBetweenTags(itemXml, 'summary') ||
                       extractTextBetweenTags(itemXml, 'content');
      
      if (description.length > 250) {
        description = description.substring(0, 250) + '...';
      }
      
      items.push({
        id: `${feedTitle.replace(/\s+/g, '-').toLowerCase()}-${items.length}`,
        title: title.length > 150 ? title.substring(0, 150) + '...' : title,
        link: link,
        publishedAt: pubDate,
        summary: description || 'No description available.',
        source: feedTitle
      });
      
      // Limit items per feed
      if (items.length >= 10) break;
    }
    
    console.log(`Successfully parsed ${items.length} items from ${url}`);
    return items;
    
  } catch (error) {
    console.error(`Error processing feed ${url}:`, error.message);
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
    
    const allItems = [];
    
    // Process feeds in smaller batches to avoid timeout
    const batchSize = 2;
    for (let i = 0; i < RSS_FEEDS.length; i += batchSize) {
      const batch = RSS_FEEDS.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1}: ${batch.join(', ')}`);
      
      const batchPromises = batch.map(fetchAndParseFeed);
      const batchResults = await Promise.allSettled(batchPromises);
      
      for (const result of batchResults) {
        if (result.status === 'fulfilled') {
          allItems.push(...result.value);
        } else {
          console.error('Batch processing failed:', result.reason);
        }
      }
      
      // Small delay between batches
      if (i + batchSize < RSS_FEEDS.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    console.log(`Total items collected: ${allItems.length}`);
    
    // Sort and filter
    const sortedItems = allItems
      .filter(item => item.title && item.link && item.title.length > 10)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 30); // Limit to 30 most recent items

    console.log(`Returning ${sortedItems.length} sorted and filtered items`);

    return new Response(JSON.stringify(sortedItems), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=600' // Cache for 10 minutes
      },
      status: 200,
    });
    
  } catch (error) {
    console.error('RSS feed aggregation error:', error);
    
    // Return empty array instead of error to prevent frontend crashes
    return new Response(JSON.stringify([]), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  }
});