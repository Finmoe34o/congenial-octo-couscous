import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertPriceSuggestionSchema } from "@shared/schema";
import { z } from "zod";
import Stripe from "stripe";

// Create Stripe instance if key is available
let stripe: Stripe | undefined;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });
}

// Middleware to check if user is authenticated
function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "You need to be logged in to access this resource" });
}

// Middleware to check if user has enough suggestions remaining
async function ensureSuggestionsAvailable(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.suggestionsRemaining > 0) {
    return next();
  }
  
  // Check if user has unlimited suggestions based on their subscription
  if (req.user && (req.user.subscriptionTier === "business")) {
    return next();
  }
  
  res.status(403).json({ 
    error: "You've used all your available pricing suggestions", 
    suggestionsRemaining: req.user?.suggestionsRemaining || 0,
    subscriptionTier: req.user?.subscriptionTier || "basic"
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes (/api/register, /api/login, /api/logout, /api/user)
  setupAuth(app);
  
  // Price suggestion endpoint
  app.post(
    "/api/pricing-suggestion", 
    ensureAuthenticated,
    ensureSuggestionsAvailable,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // Validate input using Zod schema
        const validatedData = insertPriceSuggestionSchema.parse({
          ...req.body,
          userId: req.user?.id
        });
        
        // Build a pricing suggestion
        // This is where AI integration would happen in production
        // For now, we'll use a simple algorithm
        
        const baseRate = getBaseRate(validatedData.skillType);
        const experienceMultiplier = getExperienceMultiplier(validatedData.experienceLevel);
        const scopeMultiplier = getScopeMultiplier(validatedData.projectScope);
        const locationFactor = getLocationFactor(validatedData.location);
        
        const recommendedHourlyRate = baseRate * experienceMultiplier * scopeMultiplier * locationFactor;
        
        // Create price ranges
        const minPrice = `$${Math.floor(recommendedHourlyRate * 0.8)}/hr`;
        const recommendedPrice = `$${Math.floor(recommendedHourlyRate)}/hr`;
        const premiumPrice = `$${Math.floor(recommendedHourlyRate * 1.25)}/hr`;
        
        // Store the suggestion in the database
        const priceSuggestion = await storage.createPriceSuggestion({
          ...validatedData,
          minPrice,
          recommendedPrice,
          premiumPrice
        });
        
        // Decrement suggestions remaining for this user
        if (req.user && req.user.subscriptionTier !== "business") {
          await storage.decrementSuggestionsRemaining(req.user.id);
        }
        
        // Return the price suggestion
        res.status(201).json(priceSuggestion);
      } catch (error) {
        if (error instanceof z.ZodError) {
          res.status(400).json({ error: error.errors });
        } else {
          next(error);
        }
      }
    }
  );
  
  // Get user's previous price suggestions
  app.get(
    "/api/pricing-suggestions",
    ensureAuthenticated,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const suggestions = await storage.getPriceSuggestions(req.user?.id || 0);
        res.json(suggestions);
      } catch (error) {
        next(error);
      }
    }
  );
  
  // Stripe subscription management (if Stripe is configured)
  if (stripe) {
    // Create subscription endpoint (Pro plan)
    app.post(
      "/api/create-pro-subscription",
      ensureAuthenticated,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const user = req.user;
          if (!user) {
            return res.status(401).json({ error: "Not authenticated" });
          }
          
          if (!user.email) {
            return res.status(400).json({ error: "User has no email address" });
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
          
          res.json({ 
            clientSecret: paymentIntent.client_secret,
            subscriptionTier: "pro",
            suggestionsRemaining: PRO_SUGGESTION_COUNT
          });
        } catch (error) {
          next(error);
        }
      }
    );
    
    // Create subscription endpoint (Business plan)
    app.post(
      "/api/create-business-subscription",
      ensureAuthenticated,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const user = req.user;
          if (!user) {
            return res.status(401).json({ error: "Not authenticated" });
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
          next(error);
        }
      }
    );
  }

  const httpServer = createServer(app);
  return httpServer;
}

// Helper functions for pricing calculations
function getBaseRate(skillType: string): number {
  const rates: Record<string, number> = {
    "web-development": 50,
    "mobile-development": 60,
    "ui-design": 45,
    "graphic-design": 40,
    "content-writing": 30,
    "video-editing": 45,
    "marketing": 50,
    "seo": 40,
    "data-analysis": 55,
    "project-management": 65,
    "virtual-assistant": 25,
    "accounting": 45,
    "legal": 85,
    "translation": 35,
    "voice-over": 40,
  };
  
  return rates[skillType] || 40; // Default to $40/hr if skill type not found
}

function getExperienceMultiplier(experienceLevel: string): number {
  const multipliers: Record<string, number> = {
    "beginner": 0.7,
    "intermediate": 1.0,
    "expert": 1.5,
    "master": 2.0
  };
  
  return multipliers[experienceLevel] || 1.0;
}

function getScopeMultiplier(projectScope: string): number {
  const multipliers: Record<string, number> = {
    "small": 0.9,
    "medium": 1.0,
    "large": 1.1,
    "enterprise": 1.25
  };
  
  return multipliers[projectScope] || 1.0;
}

function getLocationFactor(location?: string): number {
  if (!location) return 1.0;
  
  const highCostLocations = [
    "united states", "us", "usa", "canada", "australia", "uk", 
    "united kingdom", "germany", "france", "japan", "singapore", 
    "switzerland", "sweden", "norway", "denmark", "finland"
  ];
  
  const mediumCostLocations = [
    "spain", "italy", "south korea", "new zealand", "israel", 
    "uae", "united arab emirates", "hong kong", "china"
  ];
  
  if (highCostLocations.includes(location.toLowerCase())) {
    return 1.2;
  } else if (mediumCostLocations.includes(location.toLowerCase())) {
    return 1.0;
  } else {
    return 0.8; // Lower cost regions
  }
}
