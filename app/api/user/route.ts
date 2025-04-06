import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Get the current user
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Return the user without the password
    const { password, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error getting user:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}