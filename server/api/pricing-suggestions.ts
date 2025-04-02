import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './db';
import { storage } from './storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    // Verify JWT token
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    // Get the user ID from the database
    const appUser = await storage.getUserByEmail(user.email);
    
    if (!appUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Get pricing suggestions for the user
    const suggestions = await storage.getPriceSuggestions(appUser.id);
    
    return res.status(200).json(suggestions);
  } catch (error) {
    console.error('Error fetching pricing suggestions:', error);
    return res.status(500).json({ error: 'Failed to fetch pricing suggestions' });
  }
}