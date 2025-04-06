import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../lib/auth";
import { storage } from "../../lib/storage";

export async function GET(request: NextRequest) {
  
  try {
    // Get the current user
    const user = await getCurrentUser(request);
    console.log(user,"user user user user user")
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Check if the user is on a paid tier (Pro or Business)
    if (user.subscriptionTier !== 'pro' && user.subscriptionTier !== 'business') {
      return NextResponse.json(
        { error: "This feature is only available on Pro or Business plans" },
        { status: 403 }
      );
    }
    
    // Get the user's pricing suggestions
    const suggestions = await storage.getPriceSuggestions(user.id);
    
    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("Error fetching pricing suggestions:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}