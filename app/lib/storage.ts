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
    minPrice?: string, 
    recommendedPrice?: string, 
    premiumPrice?: string 
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
      .insert({email: insertUser.email, password: insertUser.password, subscription_tier: insertUser.subscriptionTier, suggestions_remaining: insertUser.suggestionsRemaining, created_at: insertUser.createdAt})
      .select()
      .single();
    
    if (error) {
      console.log( insertUser)
      throw error};
    return data as User;
  }
  
  async updateSubscriptionTier(userId: number, tier: string, suggestionsCount: number): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({ 
        subscriptionTier: tier,
        suggestionsRemaining: suggestionsCount
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
    const remaining = Math.max(0, (user.suggestionsRemaining || 0) - 1);
    
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
    minPrice?: string, 
    recommendedPrice?: string, 
    premiumPrice?: string 
  }): Promise<PriceSuggestion> {
    // Add current timestamp
    const suggestionWithTimestamp = {
      ...suggestion,
      createdAt: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('price_suggestions')
      .insert(suggestionWithTimestamp)
      .select()
      .single();
    
    if (error) throw error;
    return data as PriceSuggestion;
  }
}

// Create a storage instance
export const storage = new SupabaseStorage();