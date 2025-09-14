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

    // Get user from JWT
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (userError || !user) {
      throw new Error('Invalid user token')
    }

    // Parse request body
    const { priceId, successUrl, cancelUrl } = await req.json()

    if (!priceId) {
      throw new Error('Price ID is required')
    }

    // Verify the price exists in our database
    const { data: plan, error: planError } = await supabaseClient
      .from('subscription_plans')
      .select('*')
      .eq('id', priceId)
      .eq('active', true)
      .single()

    if (planError || !plan) {
      throw new Error('Invalid plan selected')
    }

    // Initialize Stripe
    const stripe = (await import('npm:stripe@14')).default(Deno.env.get('STRIPE_SECRET_KEY')!)
    
    // Create or get Stripe customer
    let customer
    const { data: existingSubscription } = await supabaseClient
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single()

    if (existingSubscription?.stripe_customer_id) {
      customer = await stripe.customers.retrieve(existingSubscription.stripe_customer_id)
    } else {
      customer = await stripe.customers.create({
        email: user.email,
        name: user.user_metadata?.name || user.email?.split('@')[0],
        metadata: {
          user_id: user.id,
          supabase_user: 'true'
        }
      })
    }

    // Prepare metadata for Optery integration
    const planMetadata = plan.metadata as any || {}
    const sessionMetadata = {
      user_id: user.id,
      plan_id: priceId,
      optery_plan_uuid: planMetadata.optery_plan_uuid,
      seats: planMetadata.seats || 1,
      tier: planMetadata.tier,
      group_tag_prefix: planMetadata.group_tag_prefix || null
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${req.headers.get('origin')}/dashboard?checkout=success`,
      cancel_url: cancelUrl || `${req.headers.get('origin')}/onboarding?checkout=cancelled`,
      metadata: sessionMetadata,
      subscription_data: {
        metadata: sessionMetadata,
        trial_period_days: 0 // No trial for now
      },
      automatic_tax: {
        enabled: true,
      },
      customer_update: {
        address: 'auto',
        name: 'auto',
      },
      invoice_creation: {
        enabled: true,
      }
    })

    console.log(`Created checkout session ${session.id} for user ${user.id} with plan ${plan.name}`)

    return new Response(JSON.stringify({ 
      sessionId: session.id,
      url: session.url,
      planName: plan.name,
      planPrice: plan.price
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Stripe checkout error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to create checkout session',
      message: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})