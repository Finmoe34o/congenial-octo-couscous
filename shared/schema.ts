import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Our pricing suggestion data model
export const priceSuggestions = pgTable("price_suggestions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  skillType: text("skill_type").notNull(),
  experienceLevel: text("experience_level").notNull(),
  projectScope: text("project_scope").notNull(),
  location: text("location"),
  targetMarket: text("target_market"),
  minPrice: text("min_price").notNull(),
  recommendedPrice: text("recommended_price").notNull(),
  premiumPrice: text("premium_price").notNull(),
  createdAt: text("created_at").notNull(),
});

// Enhanced users table with subscription data
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  subscriptionTier: text("subscription_tier").default("basic").notNull(),
  suggestionsRemaining: integer("suggestions_remaining").default(5).notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users)
  .pick({
    username: true,
    email: true,
    password: true,
    subscriptionTier: true,
    suggestionsRemaining: true,
    createdAt: true,
  })
  .extend({
    // Simpler email validation that accepts more formats
    email: z.string().min(5).max(255).refine((val) => val.includes('@'), {
      message: "Email must contain '@'",
    }),
  });

// Create insert schema for price suggestions
export const insertPriceSuggestionSchema = createInsertSchema(priceSuggestions).omit({
  id: true,
  createdAt: true,
  minPrice: true,
  recommendedPrice: true,
  premiumPrice: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPriceSuggestion = z.infer<typeof insertPriceSuggestionSchema>;
export type PriceSuggestion = typeof priceSuggestions.$inferSelect;
