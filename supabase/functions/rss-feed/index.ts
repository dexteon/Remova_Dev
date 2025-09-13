import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { parse } from 'https://deno.land/x/xml@2.1.1/mod.ts'

const RSS_FEEDS = [
  'https://feeds.feedburner.com/TheHackersNews',
  'https://threatpost.com/feed/',
  'https://krebsonsecurity.com/feed/',
  'https://www.darkreading.com/rss_simple.asp',
  'https://www.wired.com/feed/category/security/latest/rss',
]

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function fetchAndParseFeed(url: string) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'RemovaRSSFetcher/1.0' },
    })
    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.statusText}`)
      return []
    }
    const xml = await response.text()
    const document: any = parse(xml)
    
    const items = document.rss?.channel?.item || document.feed?.entry || []

    return (Array.isArray(items) ? items : [items]).map((item: any) => {
      const title = item.title?.['#text'] || item.title
      const link = item.link?.['@href'] || item.link?.['#text'] || item.link
      const pubDate = item.pubDate?.['#text'] || item.published?.['#text'] || item.updated?.['#text'] || new Date().toISOString()
      const summary = item.description?.['#text'] || item.summary?.['#text'] || ''
      const source = document.rss?.channel?.title?.['#text'] || document.feed?.title?.['#text'] || new URL(url).hostname

      return {
        id: link || title + pubDate,
        title,
        link,
        publishedAt: new Date(pubDate).toISOString(),
        summary: summary.replace(/<[^>]*>?/gm, '').substring(0, 200) + '...',
        source,
      }
    }).filter(item => item.title && item.link)
  } catch (error) {
    console.error(`Error processing feed ${url}:`, error)
    return []
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const allItemsPromises = RSS_FEEDS.map(fetchAndParseFeed)
    const allItemsArrays = await Promise.all(allItemsPromises)
    const combinedItems = allItemsArrays.flat()

    const sortedItems = combinedItems
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 20)

    return new Response(JSON.stringify(sortedItems), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})