import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../db';
import { storage } from '../storage';
import jwt from 'jsonwebtoken';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Check for Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    // Extract token
    const token = authHeader.split(' ')[1];
    
    // Verify token
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "Server configuration error" });
    }
    
    const payload = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
    
    // Get user data
    const user = await storage.getUser(payload.userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    
    // Return user data (excluding password)
    const { password, ...userData } = user;
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error in /api/user:", error);
    res.status(401).json({ error: "Not authenticated" });
  }
}