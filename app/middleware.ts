import { NextResponse, type NextRequest } from "next/server";
import { verifyJWT } from "./lib/auth";

// Define public paths that don't require authentication
const publicPaths = ["/", "/auth", "/api/auth/login", "/api/auth/register", "/api/auth/logout"];

// Middleware function to protect routes
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path is public (no auth needed)
  if (publicPaths.some(publicPath => 
    publicPath === pathname || 
    (publicPath.endsWith("*") && pathname.startsWith(publicPath.slice(0, -1))))) {
    return NextResponse.next();
  }

  // Check for authentication token
  const token = request.cookies.get("authToken")?.value;

  // Also check Authorization header for API routes
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader && authHeader.startsWith("Bearer ") 
    ? authHeader.substring(7) 
    : null;

  // Verify either cookie token or bearer token
  const tokenToVerify = token || bearerToken;
  
  if (!tokenToVerify) {
    // Redirect to login if accessing a page, return 401 if accessing an API route
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Verify the JWT token
  const payload = await verifyJWT(tokenToVerify);
  if (!payload) {
    // Invalid token, redirect to login or return 401
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // User is authenticated, continue
  return NextResponse.next();
}

// Configure which paths should trigger this middleware
export const config = {
  matcher: [
    // Skip static files and public paths
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};