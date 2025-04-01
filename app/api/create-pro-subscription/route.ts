import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { getCurrentUser } from "@/lib/auth";
import { NextRequest } from "next/server";
import Stripe from "stripe";

// Create Stripe instance if key is available
let stripe: Stripe | undefined;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });
}

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe payment processing is not configured" },
        { status: 500 }
      );
    }
    
    // Get current user
    const user = await getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    
    if (!user.email) {
      return NextResponse.json(
        { error: "User has no email address" },
        { status: 400 }
      );
    }
    
    // Set number of suggestions for Pro plan
    const PRO_SUGGESTION_COUNT = 30;
    
    // Create or get Stripe customer
    let customerId = user.stripeCustomerId;
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.username,
      });
      
      // Save customer ID to user
      await storage.updateStripeCustomerId(user.id, customer.id);
      customerId = customer.id;
    }
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 799, // $7.99 in cents
      currency: "usd",
      customer: customerId,
      payment_method_types: ["card"],
      description: "Pro Plan Subscription",
    });
    
    // Update user's subscription tier and suggestions count
    await storage.updateSubscriptionTier(user.id, "pro", PRO_SUGGESTION_COUNT);
    
    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      subscriptionTier: "pro",
      suggestionsRemaining: PRO_SUGGESTION_COUNT
    });
  } catch (error) {
    console.error("Error creating Pro subscription:", error);
    
    return NextResponse.json(
      { error: "Failed to create Pro subscription" },
      { status: 500 }
    );
  }
}