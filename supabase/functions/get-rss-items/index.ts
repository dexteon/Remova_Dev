import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RssItemWithSource {
  id: string;
  title: string;
  link: string;
  summary?: string;
  published_at: string;
  source: {
    name: string;
    source_handle?: string;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const source = url.searchParams.get('source');

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    let query = supabaseClient
      .from('rss_items')
      .select(`
        id,
        title,
        link,
        summary,
        published_at,
        rss_sources!inner (
          name,
          source_handle
        )
      `)
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Filter by source if specified
    if (source) {
      query = query.eq('rss_sources.name', source);
    }

    const { data: items, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch RSS items: ${error.message}`);
    }

    // Transform the data to match expected format
    const formattedItems = (items || []).map(item => ({
      id: item.id,
      title: item.title,
      link: item.link,
      summary: item.summary || '',
      publishedAt: item.published_at,
      source: item.rss_sources.name,
      sourceHandle: item.rss_sources.source_handle,
    }));

    // Get total count for pagination
    const { count, error: countError } = await supabaseClient
      .from('rss_items')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Failed to get total count:', countError);
    }

    return new Response(
      JSON.stringify({
        items: formattedItems,
        pagination: {
          limit,
          offset,
          total: count || 0,
          hasMore: (offset + limit) < (count || 0),
        },
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Get RSS items error:', error);
    return new Response(
      JSON.stringify({
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