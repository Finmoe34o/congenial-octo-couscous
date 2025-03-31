import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { storage } from './_lib/storage';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { insertUserSchema } from '../shared/schema';
import { fromZodError } from 'zod-validation-error';

const scryptAsync = promisify(scrypt);

// Password hashing function
async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString('hex')}.${salt}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate request body against schema
    const result = insertUserSchema.safeParse(req.body);
    
    if (!result.success) {
      const validationError = fromZodError(result.error);
      return res.status(400).json({ error: validationError.message });
    }
    
    const userData = result.data;

    // Check if user with this email already exists
    const existingUser = await storage.getUserByEmail(userData.email);
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(userData.password);

    // Create the user
    const user = await storage.createUser({
      ...userData,
      password: hashedPassword,
      subscriptionTier: 'free',
      suggestionsRemaining: 5,
    });

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // Return user information and token
    return res.status(201).json({
      ...userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}