import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'stripe-signature, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const stripe = (await import('npm:stripe@14')).default(Deno.env.get('STRIPE_SECRET_KEY')!)
    const signature = req.headers.get('stripe-signature')
    const body = await req.text()

    if (!signature) {
      throw new Error('No Stripe signature found')
    }

    // Verify webhook signature
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    if (!webhookSecret) {
      throw new Error('Webhook secret not configured')
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log(`Processing webhook: ${event.type}`)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any
        const userId = session.metadata?.user_id
        const planId = session.metadata?.plan_id
        const opteryPlanUuid = session.metadata?.optery_plan_uuid
        const seats = parseInt(session.metadata?.seats || '1')

        if (!userId || !planId) {
          console.error('Missing user_id or plan_id in session metadata')
          break
        }

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

        // Create Optery members based on seats
        const opteryMembers = []
        const groupTag = seats > 1 ? `${session.metadata?.group_tag_prefix || 'group'}_${Date.now()}` : null

        try {
          // This would integrate with Optery API
          for (let i = 0; i < seats; i++) {
            // Placeholder for Optery API integration
            const memberUuid = `member_${userId}_${i}_${Date.now()}`
            opteryMembers.push(memberUuid)
            
            console.log(`Would create Optery member ${memberUuid} with plan ${opteryPlanUuid}`)
            // TODO: Actual Optery API call:
            // const opteryMember = await createOpteryMember({
            //   plan: opteryPlanUuid,
            //   group_tag: groupTag,
            //   postpone_scan: 0
            // })
          }
        } catch (opteryError) {
          console.error('Optery integration error:', opteryError)
          // Continue with subscription creation even if Optery fails
        }

        // Insert or update user subscription
        const subscriptionData = {
          user_id: userId,
          stripe_customer_id: session.customer,
          stripe_subscription_id: subscription.id,
          plan_id: planId,
          status: subscription.status,
          optery_member_uuid: opteryMembers[0] || null, // Primary member UUID
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
          updated_at: new Date().toISOString()
        }

        const { error: upsertError } = await supabaseClient
          .from('user_subscriptions')
          .upsert(subscriptionData, { 
            onConflict: 'stripe_subscription_id',
            ignoreDuplicates: false 
          })

        if (upsertError) {
          console.error('Error upserting subscription:', upsertError)
          throw upsertError
        }

        console.log(`Successfully processed checkout for user ${userId} with ${seats} seats`)
        
        // TODO: Send welcome email
        // TODO: Schedule initial scan
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as any
        
        // Update subscription status
        const { error: updateError } = await supabaseClient
          .from('user_subscriptions')
          .update({
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
            updated_at: new Date().toISOString()
          })
          .eq('stripe_subscription_id', subscription.id)

        if (updateError) {
          console.error('Error updating subscription:', updateError)
          throw updateError
        }

        console.log(`Successfully updated subscription ${subscription.id}`)
        
        // TODO: Update Optery subscription if plan changed
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any
        
        // Update subscription status to cancelled
        const { error: deleteError } = await supabaseClient
          .from('user_subscriptions')
          .update({
            status: 'cancelled',
            updated_at: new Date().toISOString()
          })
          .eq('stripe_subscription_id', subscription.id)

        if (deleteError) {
          console.error('Error updating cancelled subscription:', deleteError)
          throw deleteError
        }

        console.log(`Successfully cancelled subscription ${subscription.id}`)
        
        // TODO: Cancel Optery subscription
        // TODO: Schedule data deletion per retention policy
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as any
        console.log(`Payment succeeded for subscription ${invoice.subscription}`)
        // TODO: Send payment confirmation email
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as any
        console.log(`Payment failed for subscription ${invoice.subscription}`)
        // TODO: Send payment failure notification
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(JSON.stringify({ 
      error: 'Webhook processing failed',
      message: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})