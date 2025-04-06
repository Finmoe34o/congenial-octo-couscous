import { supabase, User, InsertUser, PriceSuggestion, InsertPriceSuggestion } from './supabase';

// Enhanced interface with new methods for user management and pricing
export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateSubscriptionTier(userId: number, tier: string, suggestionsCount: number): Promise<User>;
  decrementSuggestionsRemaining(userId: number): Promise<User>;
  
  // Stripe related
  updateStripeCustomerId(userId: number, customerId: string): Promise<User>;
  updateUserStripeInfo(userId: number, stripeInfo: { stripeCustomerId: string, stripeSubscriptionId: string }): Promise<User>;
  
  // Price suggestions
  getPriceSuggestions(userId: number): Promise<PriceSuggestion[]>;
  createPriceSuggestion(suggestion: InsertPriceSuggestion & { 
    min_price?: string, 
    recommended_price?: string, 
    premium_price?: string 
  }): Promise<PriceSuggestion>;
}

// Supabase Storage Implementation
export class SupabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) return undefined;
    return data as User;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error || !data) return undefined;
    return data as User;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Add current timestamp if not provided
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('users')
      .insert({
        email: insertUser.email,
        password: insertUser.password,
        subscription_tier: insertUser.subscription_tier,
        suggestions_remaining: insertUser.suggestions_remaining,
        created_at: insertUser.created_at
      })      
      .select()
      .single();
    
    if (error) {
      throw error};
    return data as User;
  }
  
  async updateSubscriptionTier(userId: number, tier: string, suggestionsCount: number): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({ 
        subscription_tier: tier,
        suggestions_remaining: suggestionsCount
      })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data as User;
  }
  
  async decrementSuggestionsRemaining(userId: number): Promise<User> {
    // Get the current user
    const user = await this.getUser(userId);
    if (!user) throw new Error('User not found');
    
    // Calculate remaining suggestions (don't go below 0)
    const remaining = Math.max(0, (user.suggestions_remaining || 0) - 1);
    
    // Update the user
    const { data, error } = await supabase
      .from('users')
      .update({ suggestionsRemaining: remaining })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data as User;
  }
  
  async updateStripeCustomerId(userId: number, customerId: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({ stripeCustomerId: customerId })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data as User;
  }
  
  async updateUserStripeInfo(userId: number, stripeInfo: { stripeCustomerId: string, stripeSubscriptionId: string }): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({ 
        stripeCustomerId: stripeInfo.stripeCustomerId,
        stripeSubscriptionId: stripeInfo.stripeSubscriptionId
      })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data as User;
  }
  
  async getPriceSuggestions(userId: number): Promise<PriceSuggestion[]> {
    const { data, error } = await supabase
      .from('price_suggestions')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });
    
    if (error) throw error;
    return data as PriceSuggestion[];
  }
  
  async createPriceSuggestion(suggestion: InsertPriceSuggestion & { 
    min_price?: string, 
    recommended_price?: string, 
    premium_price?: string 
  }): Promise<PriceSuggestion> {
    // Add current timestamp
    const suggestionWithTimestamp = {
      ...suggestion,
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('price_suggestions')
      .insert({
        user_id: suggestionWithTimestamp.user_id,
        skill_type: suggestionWithTimestamp.skill_type,
        experience_level: suggestionWithTimestamp.experience_level,
        project_scope: suggestionWithTimestamp.project_scope,
        location: suggestionWithTimestamp.location,
        target_market: suggestionWithTimestamp.target_market,
        min_price: suggestionWithTimestamp.min_price,
        recommended_price: suggestionWithTimestamp.recommended_price,
        premium_price: suggestionWithTimestamp.premium_price,
        created_at: suggestionWithTimestamp.created_at
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as PriceSuggestion;
  }
}

// Create a storage instance
export const storage = new SupabaseStorage();