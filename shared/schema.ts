import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
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

// Keep the existing users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Create insert schema for price suggestions
export const insertPriceSuggestionSchema = createInsertSchema(priceSuggestions).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPriceSuggestion = z.infer<typeof insertPriceSuggestionSchema>;
export type PriceSuggestion = typeof priceSuggestions.$inferSelect;
