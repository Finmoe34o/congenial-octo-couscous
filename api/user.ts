import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { storage } from './_lib/storage';

// JWT verification helper
const verifyToken = (token: string): { userId: number } | null => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not set');
    }
    return jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
  } catch (error) {
    return null;
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Check for authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  
  try {
    // Get user data
    const user = await storage.getUser(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    
    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}