import { users, priceSuggestions, type User, type InsertUser, type PriceSuggestion, type InsertPriceSuggestion } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

// Enhanced interface with new methods for user management and pricing
export interface IStorage {
  // Session store for auth
  sessionStore: session.Store;
  
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
  createPriceSuggestion(suggestion: InsertPriceSuggestion): Promise<PriceSuggestion>;
}

// PostgreSQL Database Storage Implementation
export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  
  constructor() {
    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

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
    // Add current timestamp
    const userWithTimestamp = {
      ...insertUser,
      createdAt: new Date().toISOString()
    };
    
    const [user] = await db
      .insert(users)
      .values(userWithTimestamp)
      .returning();
    
    return user;
  }
  
  async updateSubscriptionTier(userId: number, tier: string, suggestionsCount: number): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ 
        subscriptionTier: tier,
        suggestionsRemaining: suggestionsCount
      })
      .where(eq(users.id, userId))
      .returning();
      
    return user;
  }
  
  async decrementSuggestionsRemaining(userId: number): Promise<User> {
    // Get the current user
    const [currentUser] = await db.select().from(users).where(eq(users.id, userId));
    
    // Calculate remaining suggestions (don't go below 0)
    const remaining = Math.max(0, (currentUser?.suggestionsRemaining || 0) - 1);
    
    // Update the user
    const [user] = await db
      .update(users)
      .set({ suggestionsRemaining: remaining })
      .where(eq(users.id, userId))
      .returning();
      
    return user;
  }
  
  async updateStripeCustomerId(userId: number, customerId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ stripeCustomerId: customerId })
      .where(eq(users.id, userId))
      .returning();
      
    return user;
  }
  
  async updateUserStripeInfo(userId: number, stripeInfo: { stripeCustomerId: string, stripeSubscriptionId: string }): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ 
        stripeCustomerId: stripeInfo.stripeCustomerId,
        stripeSubscriptionId: stripeInfo.stripeSubscriptionId
      })
      .where(eq(users.id, userId))
      .returning();
      
    return user;
  }
  
  async getPriceSuggestions(userId: number): Promise<PriceSuggestion[]> {
    return db
      .select()
      .from(priceSuggestions)
      .where(eq(priceSuggestions.userId, userId))
      .orderBy(priceSuggestions.createdAt);
  }
  
  async createPriceSuggestion(suggestion: InsertPriceSuggestion): Promise<PriceSuggestion> {
    // Add current timestamp
    const suggestionWithTimestamp = {
      ...suggestion,
      createdAt: new Date().toISOString()
    };
    
    const [newSuggestion] = await db
      .insert(priceSuggestions)
      .values(suggestionWithTimestamp)
      .returning();
      
    return newSuggestion;
  }
}

// Switch from MemStorage to DatabaseStorage
export const storage = new DatabaseStorage();
