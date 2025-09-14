import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse query parameters
    const url = new URL(req.url)
    const planType = url.searchParams.get('type') || 'individual' // individual, family, team

    // Build query based on plan type
    let query = supabaseClient
      .from('subscription_plans')
      .select('*')
      .eq('active', true)
      .order('price', { ascending: true })

    // Filter by plan type
    if (planType === 'individual') {
      query = query.in('metadata->>tier', ['personal', 'extended', 'ultimate'])
    } else if (planType === 'family') {
      query = query.in('metadata->>tier', ['family', 'family_plus'])
    } else if (planType === 'team') {
      query = query.eq('metadata->>tier', 'team')
    }

    const { data: plans, error } = await query

    if (error) {
      console.error('Database error:', error)
      throw error
    }

    // Transform plans for frontend
    const transformedPlans = plans?.map(plan => {
      const metadata = plan.metadata as any || {}
      return {
        id: plan.id,
        stripeProductId: plan.stripe_product_id,
        name: plan.name,
        description: plan.description,
        price: `$${(plan.price / 100).toFixed(0)}`,
        originalPrice: plan.price,
        period: `/${plan.interval}`,
        features: plan.features || [],
        stripePriceId: plan.id,
        popular: plan.name.includes('Family') && metadata.seats === 3, // Mark 3-member family as popular
        seats: metadata.seats || 1,
        tier: metadata.tier,
        savings: metadata.savings,
        metadata: metadata
      }
    }) || []

    return new Response(JSON.stringify(transformedPlans), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Error fetching plans:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch subscription plans',
      message: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})