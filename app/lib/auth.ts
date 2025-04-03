import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { storage } from "./storage";
import { User } from "./supabase";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

// JWT helpers for authentication
export interface JWTPayload {
  userId: number;
  email: string;
  exp?: number;
}

// Function to sign a new JWT
export async function signJWT(payload: JWTPayload) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT(payload as unknown as Record<string, any>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // 7 days expiration
    .sign(secretKey);

  return token;
}

// Function to verify a JWT
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as JWTPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

// Function to get the current user from a request
export async function getCurrentUser(req?: NextRequest): Promise<User | null> {
  try {
    // Get token from cookies or authorization header
    let token;
    
    if (req) {
      // From authorization header in API routes
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    } 
    
    // If not found in header, try cookies
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("authToken")?.value;
    }

    if (!token) {
      return null;
    }

    // Verify the token
    const payload = await verifyJWT(token);
    if (!payload || !payload.userId) {
      return null;
    }

    // Get the user from storage
    const user = await storage.getUser(payload.userId);
    return user || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

// Password hashing function
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = await scryptAsync(password, salt, 64) as Buffer;
  return `${derivedKey.toString('hex')}.${salt}`;
}

// Password comparison function
export async function comparePasswords(supplied: string, stored: string): Promise<boolean> {
  const [hashedPassword, salt] = stored.split('.');
  const derivedKey = await scryptAsync(supplied, salt, 64) as Buffer;
  const storedKey = Buffer.from(hashedPassword, 'hex');
  return timingSafeEqual(derivedKey, storedKey);
}