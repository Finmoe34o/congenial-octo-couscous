import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { hashPassword, signJWT } from "../../../lib/auth";
import { storage } from "../../../lib/storage";
import { z } from "zod";

// Validate registration request
const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const validationResult = registerSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: validationResult.error.issues },
        { status: 400 }
      );
    }
    
    const {email, password } = validationResult.data;
    
    // Check if the email is already taken
    
    const existingUserByEmail = await storage.getUserByEmail(email);
    if (existingUserByEmail) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 400 }
      );
    }
    
    // Hash the password
    const hashedPassword = await hashPassword(password);
    // Create the user
    const user = await storage.createUser({
      email,
      password: hashedPassword,
      subscriptionTier: "basic", // Default to basic tier
      suggestionsRemaining: 5,    // Start with 5 suggestions for free tier
      createdAt: new Date().toISOString(),
    });
    
    // Create a JWT
    const token = await signJWT({
      userId: user.id,
      email: user.email,
    });
    
    // Return the user (without the password) and token
    const { password: _, ...userWithoutPassword } = user;
    
    // Create response with user data and token
    const response = NextResponse.json({
      ...userWithoutPassword,
      token,
    });
    
    // Set the cookie
    response.cookies.set({
      name: "authToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}