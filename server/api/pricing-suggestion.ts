import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../storage';
import { insertPriceSuggestionSchema } from '@shared/schema';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  try {
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
    
    // Check if user has remaining suggestions
    if (user.subscriptionTier !== "business" && user.suggestionsRemaining <= 0) {
      return res.status(403).json({ 
        error: "You've used all your available pricing suggestions", 
        suggestionsRemaining: user.suggestionsRemaining || 0,
        subscriptionTier: user.subscriptionTier || "basic"
      });
    }
    
    // Validate input using Zod schema
    const validatedData = insertPriceSuggestionSchema.parse({
      ...req.body,
      userId: user.id
    });
    
    // Build a pricing suggestion
    const baseRate = getBaseRate(validatedData.skillType);
    const experienceMultiplier = getExperienceMultiplier(validatedData.experienceLevel);
    const scopeMultiplier = getScopeMultiplier(validatedData.projectScope);
    const locationFactor = getLocationFactor(validatedData.location || undefined);
    
    const recommendedHourlyRate = baseRate * experienceMultiplier * scopeMultiplier * locationFactor;
    
    // Create price ranges
    const minPrice = `$${Math.floor(recommendedHourlyRate * 0.8)}/hr`;
    const recommendedPrice = `$${Math.floor(recommendedHourlyRate)}/hr`;
    const premiumPrice = `$${Math.floor(recommendedHourlyRate * 1.25)}/hr`;
    
    // Store the suggestion in the database with all fields
    const suggestionData = {
      ...validatedData,
      userId: user.id,
      minPrice,
      recommendedPrice,
      premiumPrice
    };
    
    const priceSuggestion = await storage.createPriceSuggestion(suggestionData);
    
    // Decrement suggestions remaining for this user if not on business tier
    if (user.subscriptionTier !== "business") {
      await storage.decrementSuggestionsRemaining(user.id);
    }
    
    // Return the price suggestion
    res.status(201).json(priceSuggestion);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error in /api/pricing-suggestion:", error);
    res.status(500).json({ error: "Failed to create pricing suggestion" });
  }
}