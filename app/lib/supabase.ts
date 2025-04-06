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
  subscription_tier: string;
  suggestions_remaining: number;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  created_at: string;
}

export type InsertUser = Omit<User, 'id'>;

export type PriceSuggestion = {
  id: number;
  user_id: number;
  skill_type: string;
  experience_level: string;
  project_scope: string;
  location?: string;
  target_market?: string;
  min_price: string;
  recommended_price: string;
  premium_price: string;
  created_at: string;
}

export type InsertPriceSuggestion = Omit<PriceSuggestion, 'id' | 'min_price' | 'recommended_price' | 'premium_price' | 'created_at'>;