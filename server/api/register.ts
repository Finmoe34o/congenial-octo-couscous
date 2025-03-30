import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../db';
import { storage } from '../storage';
import { insertUserSchema } from '@shared/schema';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  try {
    // Validate input
    const userData = insertUserSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await storage.getUserByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    
    // Register with Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });
    
    if (authError) {
      return res.status(400).json({ error: authError.message });
    }
    
    // Create user in our database with default subscription tier
    const userWithSubscription = {
      ...userData,
      subscriptionTier: "basic",
      suggestionsRemaining: 5
    };
    
    const newUser = await storage.createUser(userWithSubscription);
    
    // Generate token
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "Server configuration error" });
    }
    
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    
    // Return new user data and token
    const { password: _, ...newUserData } = newUser;
    res.status(201).json({
      ...newUserData,
      token
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error in /api/register:", error);
    res.status(500).json({ error: "Registration failed" });
  }
}