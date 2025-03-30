import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { storage } from '../server/storage';

// JWT verification helper
const verifyToken = (token: string): { userId: number } | null => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not set');
    }
    return jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
  } catch (error) {
    return null;
  }
};

// Pricing calculation functions
function getBaseRate(skillType: string): number {
  const rates: Record<string, number> = {
    'web-development': 40,
    'mobile-development': 45,
    'design': 35,
    'writing': 25,
    'marketing': 30,
    'video-editing': 35,
    'data-analysis': 45,
    'seo': 30,
    'consulting': 50,
    'other': 30,
  };
  return rates[skillType] || 30;
}

function getExperienceMultiplier(experienceLevel: string): number {
  const multipliers: Record<string, number> = {
    'beginner': 0.8,
    'intermediate': 1.0,
    'expert': 1.5,
    'veteran': 2.0,
  };
  return multipliers[experienceLevel] || 1.0;
}

function getScopeMultiplier(projectScope: string): number {
  const multipliers: Record<string, number> = {
    'small': 0.9,
    'medium': 1.0,
    'large': 1.2,
    'enterprise': 1.5,
  };
  return multipliers[projectScope] || 1.0;
}

function getLocationFactor(location?: string): number {
  if (!location) return 1.0;
  
  const highCostCountries = ['us', 'ca', 'au', 'gb', 'de', 'fr', 'jp', 'sg', 'ch', 'no', 'se', 'dk', 'fi', 'nl'];
  const mediumCostCountries = ['es', 'it', 'kr', 'nz', 'pt', 'ae', 'il', 'tw', 'hk'];
  
  const countryCode = location.toLowerCase();
  
  if (highCostCountries.includes(countryCode)) {
    return 1.4;
  } else if (mediumCostCountries.includes(countryCode)) {
    return 1.1;
  } else {
    return 0.9;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  
  try {
    // Get user data
    const user = await storage.getUser(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if user has suggestions remaining
    if (user.subscriptionTier !== 'business' && user.suggestionsRemaining <= 0) {
      return res.status(403).json({ 
        error: 'No suggestions remaining',
        subscriptionTier: user.subscriptionTier,
        suggestionsRemaining: 0
      });
    }
    
    // Extract pricing factors from request
    const { 
      skillType, 
      experienceLevel, 
      projectScope, 
      location, 
      targetMarket = 'general', 
      urgency = 'normal',
      specialization = 'none'
    } = req.body;
    
    // Calculate base rate
    const baseRate = getBaseRate(skillType);
    
    // Apply multipliers
    const experienceMultiplier = getExperienceMultiplier(experienceLevel);
    const scopeMultiplier = getScopeMultiplier(projectScope);
    const locationFactor = getLocationFactor(location);
    
    // Additional factors
    const urgencyFactor = urgency === 'high' ? 1.3 : 1.0;
    const specializationFactor = specialization === 'rare' ? 1.3 : 1.0;
    const targetMarketFactor = targetMarket === 'enterprise' ? 1.4 : 1.0;
    
    // Calculate final rates
    const baseCalculatedRate = baseRate * experienceMultiplier * scopeMultiplier * locationFactor;
    const minimumRate = baseCalculatedRate * 0.8 * urgencyFactor * specializationFactor * targetMarketFactor;
    const recommendedRate = baseCalculatedRate * 1.0 * urgencyFactor * specializationFactor * targetMarketFactor;
    const premiumRate = baseCalculatedRate * 1.3 * urgencyFactor * specializationFactor * targetMarketFactor;
    
    // Save suggestion to database
    const suggestion = await storage.createPriceSuggestion({
      userId: user.id,
      skillType,
      experienceLevel,
      projectScope,
      location,
      targetMarket,
      urgency,
      specialization,
      minimumRate,
      recommendedRate,
      premiumRate,
      createdAt: new Date()
    });
    
    // Decrement suggestions remaining if not on business tier
    if (user.subscriptionTier !== 'business') {
      await storage.decrementSuggestionsRemaining(user.id);
    }
    
    // Return suggestion
    return res.status(200).json({
      suggestion,
      subscriptionTier: user.subscriptionTier,
      suggestionsRemaining: user.subscriptionTier === 'business' ? 'unlimited' : Math.max(0, user.suggestionsRemaining - 1)
    });
  } catch (error) {
    console.error('Error generating pricing suggestion:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}