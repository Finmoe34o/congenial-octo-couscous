import { eq } from 'drizzle-orm';
import { db } from './db';
import { users, priceSuggestions, type User, type InsertUser, type PriceSuggestion } from '../../shared/schema';

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateSubscriptionTier(userId: number, tier: string, suggestionsCount: number): Promise<User>;
  decrementSuggestionsRemaining(userId: number): Promise<User>;
  
  // Stripe related
  updateStripeCustomerId(userId: number, customerId: string): Promise<User>;
  updateUserStripeInfo(userId: number, stripeInfo: { stripeCustomerId: string, stripeSubscriptionId: string }): Promise<User>;
  
  // Price suggestions
  getPriceSuggestions(userId: number): Promise<PriceSuggestion[]>;
  createPriceSuggestion(suggestion: any): Promise<PriceSuggestion>;
}

export class SupabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateSubscriptionTier(userId: number, tier: string, suggestionsCount: number): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        subscriptionTier: tier,
        suggestionsRemaining: suggestionsCount,
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async decrementSuggestionsRemaining(userId: number): Promise<User> {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    
    // Only decrement if user has suggestions remaining and is not on business tier
    if (user.subscriptionTier !== 'business' && user.suggestionsRemaining > 0) {
      const [updatedUser] = await db
        .update(users)
        .set({
          suggestionsRemaining: user.suggestionsRemaining - 1,
        })
        .where(eq(users.id, userId))
        .returning();
      return updatedUser;
    }
    
    return user;
  }

  async updateStripeCustomerId(userId: number, customerId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        stripeCustomerId: customerId,
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: number, stripeInfo: { stripeCustomerId: string, stripeSubscriptionId: string }): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        stripeCustomerId: stripeInfo.stripeCustomerId,
        stripeSubscriptionId: stripeInfo.stripeSubscriptionId,
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async getPriceSuggestions(userId: number): Promise<PriceSuggestion[]> {
    const suggestions = await db
      .select()
      .from(priceSuggestions)
      .where(eq(priceSuggestions.userId, userId));
    return suggestions;
  }

  async createPriceSuggestion(suggestion: any): Promise<PriceSuggestion> {
    const [result] = await db
      .insert(priceSuggestions)
      .values(suggestion)
      .returning();
    return result;
  }
}

export const storage = new SupabaseStorage();