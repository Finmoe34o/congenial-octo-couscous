import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { createClient } from '@supabase/supabase-js';

// User type definition (copied from shared schema to avoid import issues)
interface SelectUser {
  id: number;
  username: string;
  email: string;
  subscriptionTier: string;
  suggestionsRemaining: number;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionStatus?: string;
}

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY');
}
// @ts-ignore - We're ignoring the apiVersion type checking as Stripe types may differ
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Webhook signing secret from Stripe dashboard
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function updateSubscriptionStatus(
  stripeSubscriptionId: string, 
  status: string
) {
  // Find the user with this subscription ID
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('stripeSubscriptionId', stripeSubscriptionId);

  if (error || !users || users.length === 0) {
    console.error('Error finding user with subscription:', error);
    return;
  }

  const user = users[0] as SelectUser;
  
  // Update the subscription status
  // This could include updating suggestionsRemaining or subscription tier
  // depending on the event
  if (status === 'active') {
    // Activated or renewed subscription
    let suggestionsCount = 30; // Default for Pro tier
    let subscriptionTier = 'pro'; // Default tier
    
    try {
      // Get the subscription to check the plan
      const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
      // Access price ID safely - Stripe types can change between versions
      const priceId = subscription.items.data[0]?.price?.id;
      
      // Check which plan this is (Pro or Business)
      if (process.env.STRIPE_BUSINESS_PRICE_ID === priceId) {
        // Business tier gets unlimited (-1)
        suggestionsCount = -1;
        subscriptionTier = 'business';
      }
    } catch (error) {
      console.error('Error retrieving subscription details:', error);
      // Proceed with default suggestion count if we couldn't determine the plan
    }
    
    await supabase
      .from('users')
      .update({ 
        subscriptionStatus: status,
        subscriptionTier: subscriptionTier,
        suggestionsRemaining: suggestionsCount
      })
      .eq('id', user.id);
  } else if (status === 'canceled' || status === 'unpaid') {
    // Downgrade to free tier
    await supabase
      .from('users')
      .update({ 
        subscriptionStatus: status,
        subscriptionTier: 'free',
        suggestionsRemaining: 5 // Free tier gets 5 suggestions
      })
      .eq('id', user.id);
  } else {
    // Just update the status for other states
    await supabase
      .from('users')
      .update({ subscriptionStatus: status })
      .eq('id', user.id);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Get the raw request body
    const rawBody = await buffer(req);
    const signature = req.headers['stripe-signature'] as string;

    let event;

    // Verify the webhook signature
    if (endpointSecret) {
      try {
        event = stripe.webhooks.constructEvent(
          rawBody,
          signature,
          endpointSecret
        );
      } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
    } else {
      // If no secret is configured, just parse the event (less secure)
      event = JSON.parse(rawBody.toString());
    }

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        await updateSubscriptionStatus(
          subscription.id,
          subscription.status
        );
        break;
      case 'invoice.payment_succeeded':
        // Handle successful payment
        const invoice = event.data.object;
        if (invoice.subscription) {
          await updateSubscriptionStatus(
            invoice.subscription,
            'active'
          );
        }
        break;
      case 'invoice.payment_failed':
        // Handle failed payment
        const failedInvoice = event.data.object;
        if (failedInvoice.subscription) {
          await updateSubscriptionStatus(
            failedInvoice.subscription,
            'past_due'
          );
        }
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error(`Webhook error: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
}