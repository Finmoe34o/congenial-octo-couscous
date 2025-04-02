import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { comparePasswords, signJWT } from "../../../lib/auth";
import { storage } from "../../../lib/storage";
import { z } from "zod";

// Validate login request
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const validationResult = loginSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: validationResult.error.issues },
        { status: 400 }
      );
    }
    
    const { email, password } = validationResult.data;
    
    // Check if the user exists
    const user = await storage.getUserByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    
    // Verify the password
    const isPasswordValid = await comparePasswords(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    
    // Create a JWT
    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;
    
    const token = await signJWT({
      userId: user.id,
      username: user.username,
      email: user.email,
    });
    
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
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}