import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../storage';
import jwt from 'jsonwebtoken';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  try {
    // Authentication check
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    // Extract and verify token
    const token = authHeader.split(' ')[1];
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "Server configuration error" });
    }
    
    const payload = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
    
    // Get user data
    const user = await storage.getUser(payload.userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    
    // Get user's pricing suggestions
    const suggestions = await storage.getPriceSuggestions(user.id);
    
    res.status(200).json(suggestions);
  } catch (error) {
    console.error("Error in /api/pricing-suggestions:", error);
    res.status(500).json({ error: "Failed to fetch pricing suggestions" });
  }
}