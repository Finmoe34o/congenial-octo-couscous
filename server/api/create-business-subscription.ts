import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../storage';
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  try {
    // Check for Stripe key
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: "Stripe is not configured" });
    }
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    // Authentication check
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    // Extract and verify token
    const token = authHeader.split(' ')[1];
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "Server configuration error" });
    }
    
    const payload = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
    
    // Get user data
    const user = await storage.getUser(payload.userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    
    if (!user.email) {
      return res.status(400).json({ error: "User has no email address" });
    }
    
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
      amount: 1999, // $19.99 in cents
      currency: "usd",
      customer: customerId,
      payment_method_types: ["card"],
      description: "Business Plan Subscription",
    });
    
    // Update user's subscription tier (with unlimited suggestions)
    await storage.updateSubscriptionTier(user.id, "business", 9999);
    
    res.json({ 
      clientSecret: paymentIntent.client_secret,
      subscriptionTier: "business",
      suggestionsRemaining: "Unlimited"
    });
  } catch (error) {
    console.error("Error in /api/create-business-subscription:", error);
    res.status(500).json({ error: "Failed to create subscription" });
  }
}