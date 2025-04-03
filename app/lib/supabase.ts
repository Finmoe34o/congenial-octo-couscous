import { createClient } from '@supabase/supabase-js';

// Check for required environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_ANON_KEY must be set for Supabase client",
  );
}

// Create Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Define types for database tables
export type User = {
  id: number;
  email: string;
  password: string;
  subscriptionTier: string;
  suggestionsRemaining: number;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  createdAt: string;
}

export type InsertUser = Omit<User, 'id'>;

export type PriceSuggestion = {
  id: number;
  userId: number;
  skillType: string;
  experienceLevel: string;
  projectScope: string;
  location?: string;
  targetMarket?: string;
  minPrice: string;
  recommendedPrice: string;
  premiumPrice: string;
  createdAt: string;
}

export type InsertPriceSuggestion = Omit<PriceSuggestion, 'id' | 'minPrice' | 'recommendedPrice' | 'premiumPrice' | 'createdAt'>;