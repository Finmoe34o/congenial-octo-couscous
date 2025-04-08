import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../lib/auth";
import { storage } from "../../lib/storage";
import { z } from "zod";

// Validate pricing suggestion request
const pricingSuggestionSchema = z.object({
  skill_type: z.string().min(1, { message: "Skill type is required" }),
  experience_level: z.string().min(1, { message: "Experience level is required" }),
  project_scope: z.string().min(1, { message: "Project scope is required" }),
  location: z.string().optional(),
  target_market: z.string().optional(),
});

// Base rate calculation by skill type (in USD per hour)
function getBaseRate(skill_type: string): number {
  const rates: Record<string, number> = {
    'web-development': 50,
    'mobile-development': 60,
    'ui-design': 45,
    'graphic-design': 40,
    'content-writing': 30,
    'video-editing': 35,
    'marketing': 50,
    'seo': 40,
    'data-analysis': 55,
    'project-management': 60,
    'virtual-assistant': 20,
    'accounting': 45,
    'legal': 75,
    'translation': 30,
    'voice-over': 40,
  };
  
  return rates[skill_type] || 40; // Default to $40/hr if skill type not found
}

// Experience level multiplier
function getExperienceMultiplier(experience_level: string): number {
  const multipliers: Record<string, number> = {
    'beginner': 0.7,     // 70% of base rate
    'intermediate': 1.0, // 100% of base rate
    'expert': 1.5,       // 150% of base rate
    'master': 2.0,       // 200% of base rate
  };
  
  return multipliers[experience_level] || 1.0;
}

// Project scope multiplier
function getScopeMultiplier(project_scope: string): number {
  const multipliers: Record<string, number> = {
    'small': 1.0,      // No adjustment for small projects
    'medium': 0.95,    // 5% discount for medium projects
    'large': 0.9,      // 10% discount for large projects
    'enterprise': 0.85, // 15% discount for enterprise projects
  };
  
  return multipliers[project_scope] || 1.0;
}

// Location factor adjustment
function getLocationFactor(location: string | undefined): number {
  if (!location) return 1.0;
  
  // Higher cost of living areas get higher rates
  const highCostLocations = [
    'united states', 'usa', 'us', 'canada', 'uk', 'united kingdom', 
    'australia', 'new zealand', 'switzerland', 'germany', 'france', 
    'japan', 'singapore', 'hong kong', 'dubai', 'norway', 'sweden', 
    'denmark', 'finland', 'iceland', 'netherlands'
  ];
  
  const mediumCostLocations = [
    'spain', 'italy', 'south korea', 'taiwan', 'israel', 
    'portugal', 'greece', 'czech republic', 'poland', 'hungary',
    'estonia', 'latvia', 'lithuania', 'slovakia', 'slovenia'
  ];
  
  const cleanLocation = location.toLowerCase().trim();
  
  if (highCostLocations.some(loc => cleanLocation.includes(loc))) {
    return 1.2; // 20% premium for high-cost locations
  }
  
  if (mediumCostLocations.some(loc => cleanLocation.includes(loc))) {
    return 1.0; // No adjustment for medium-cost locations
  }
  
  return 0.8; // 20% discount for other locations
}

export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    // Check if the user has remaining suggestions (except for business tier)
    if (user.subscription_tier !== 'business' && user.suggestions_remaining <= 0) {
      return NextResponse.json(
        { 
          error: "You've used all your pricing suggestions. Please upgrade your plan.",
          suggestions_remaining: 0
        },
        { status: 403 }
      );
    }
    
    // Parse and validate the request body
    const body = await request.json();
    const validationResult = pricingSuggestionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: validationResult.error.issues },
        { status: 400 }
      );
    }
    
    const { skill_type, experience_level, project_scope, location, target_market } = validationResult.data;
    
    // Calculate the rate
    const baseRate = getBaseRate(skill_type);
    const experienceMultiplier = getExperienceMultiplier(experience_level);
    const scopeMultiplier = getScopeMultiplier(project_scope);
    const locationFactor = getLocationFactor(location);
    
    // Calculate the recommended hourly rate
    const recommendedRate = baseRate * experienceMultiplier * scopeMultiplier * locationFactor;
    
    // Calculate min and premium rates
    const minRate = recommendedRate * 0.8;  // 80% of recommended rate
    const premiumRate = recommendedRate * 1.3; // 130% of recommended rate
    
    // Format rates with dollar sign and two decimal places
    const formatRate = (rate: number) => `$${rate.toFixed(2)}/hr`;
    const min_price = formatRate(minRate);
    const recommended_price = formatRate(recommendedRate);
    const premium_price = formatRate(premiumRate);
    // Create the suggestion in the database
    const suggestion = await storage.createPriceSuggestion({
      user_id: user.id,
      skill_type,
      experience_level,
      project_scope,
      location,
      target_market,
      min_price,
      recommended_price,
      premium_price

    });
    // Decrement the user's remaining suggestions (if not business tier)
    if (user.subscription_tier !== 'business') {
      await storage.decrementSuggestionsRemaining(user.id);
    }
    
    return NextResponse.json(suggestion);
  } catch (error) {
    console.error("Error generating pricing suggestion:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}