import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../db';
import { storage } from '../storage';
import jwt from 'jsonwebtoken';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    
    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      return res.status(401).json({ error: error.message });
    }
    
    // Get user from our storage
    const user = await storage.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    
    // Create JWT token
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "Server configuration error" });
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    
    // Return user data and token
    const { password: _, ...userData } = user;
    res.status(200).json({
      ...userData,
      token
    });
  } catch (error) {
    console.error("Error in /api/login:", error);
    res.status(500).json({ error: "Login failed" });
  }
}