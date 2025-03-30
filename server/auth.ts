import { Express, Request, Response, NextFunction } from "express";
import { supabase } from "./db";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import jwt from "jsonwebtoken";

// Define a type for the user session
interface AuthSession {
  userId: number;
  username: string;
  email: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      authSession?: AuthSession;
      user?: SelectUser;
    }
  }
}

// Middleware to check if user is authenticated
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      req.user = undefined;
      return next();
    }
    
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as AuthSession;
    
    // Get user data
    const user = await storage.getUser(decoded.userId);
    if (user) {
      req.user = user;
      req.authSession = decoded;
    }
    
    next();
  } catch (error) {
    req.user = undefined;
    next();
  }
};

export function setupAuth(app: Express) {
  // Use auth middleware for all routes
  app.use(authMiddleware);

  // Registration endpoint
  app.post("/api/register", async (req, res, next) => {
    try {
      const { email, password, username } = req.body;
      
      // Check if user exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      
      // Check if email exists
      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        return res.status(400).json({ error: authError.message });
      }

      // Create user in our database
      const user = await storage.createUser({
        username,
        email,
        password: 'SUPABASE_AUTH_USER', // We don't need to store the password
        subscriptionTier: 'free', // Default tier
        suggestionsRemaining: 5, // Free tier starts with 5 suggestions
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '30d' }
      );

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      // Return user data with token
      res.status(201).json({
        ...userWithoutPassword,
        token
      });
    } catch (error) {
      next(error);
    }
  });

  // Login endpoint
  app.post("/api/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Sign in with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Get user from our database
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '30d' }
      );

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      // Return user data with token
      res.json({
        ...userWithoutPassword,
        token
      });
    } catch (error) {
      next(error);
    }
  });

  // Logout endpoint
  app.post("/api/logout", async (req, res) => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: "Failed to logout" });
    }
  });

  // Get current user
  app.get("/api/user", (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = req.user;
    res.json(userWithoutPassword);
  });
}