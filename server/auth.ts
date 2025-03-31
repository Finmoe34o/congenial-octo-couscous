import { Express, Request, Response, NextFunction } from "express";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import jwt from "jsonwebtoken";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

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

// Password hashing helpers
const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
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

      // Create user in our database with hashed password
      const hashedPassword = await hashPassword(password);
      
      const user = await storage.createUser({
        username,
        email,
        password: hashedPassword,
        subscriptionTier: 'free', // Default tier
        suggestionsRemaining: 5, // Free tier starts with 5 suggestions
        createdAt: new Date().toISOString()
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '30d' }
      );

      // Return user data with token
      res.status(201).json({
        ...user,
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  // Login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Check password
      const passwordMatch = await comparePasswords(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '30d' }
      );
      
      // Return user with token
      res.json({
        ...user,
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Logout endpoint
  app.post("/api/logout", (req, res) => {
    // Since we're using JWT, we don't need to do anything on the server
    // The client will remove the token
    res.sendStatus(200);
  });

  // User endpoint
  app.get("/api/user", (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    res.json(req.user);
  });
}