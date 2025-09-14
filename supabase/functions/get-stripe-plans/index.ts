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

    // Fetch active plans from database
    const { data: plans, error } = await supabaseClient
      .from('subscription_plans')
      .select('*')
      .eq('active', true)
      .order('price', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      throw error
    }

    // Transform plans for frontend
    const transformedPlans = plans?.map(plan => ({
      id: plan.id,
      name: plan.name,
      price: `$${(plan.price / 100).toFixed(0)}`,
      period: `/${plan.interval}`,
      description: plan.description,
      features: plan.features || [],
      stripePriceId: plan.id,
      stripeProductId: plan.stripe_product_id
    })) || []

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