import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "./lib/auth";
import { validateEnv } from "./lib/env";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass middleware for API routes and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/assets") ||
    pathname === "/api/health" ||
    pathname === "/api"
  ) {
    return NextResponse.next();
  }

  try {
    // Validate environment variables on each request in development
    if (process.env.NODE_ENV !== 'production') {
      const missingVars = validateEnv();
      if (missingVars.length > 0) {
        console.error('Missing required environment variables in middleware');
      }
    }

    // Check protected API routes
    if (pathname.startsWith("/api/")) {
      // Public API routes that don't need authentication
      if (
        pathname === "/api/register" || 
        pathname === "/api/login" || 
        pathname === "/api/logout"
      ) {
        return NextResponse.next();
      }

      const authHeader = request.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
          { error: "Unauthorized - No token provided" },
          { status: 401 }
        );
      }

      const token = authHeader.split(" ")[1];
      const payload = await verifyJWT(token);

      if (!payload) {
        return NextResponse.json(
          { error: "Unauthorized - Invalid token" },
          { status: 401 }
        );
      }

      return NextResponse.next();
    }

    // For non-API routes, next.js handles its routing
    return NextResponse.next();
  } catch (err: unknown) {
    console.error('Middleware error:', err);
    
    // For API routes, return JSON error
    if (pathname.startsWith("/api/")) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      return NextResponse.json(
        { error: "Internal server error", details: errorMessage }, 
        { status: 500 }
      );
    }
    
    // For page routes, let Next.js error boundary handle it
    return NextResponse.next();
  }
}

// Configure routes that need middleware
export const config = {
  matcher: ['/api/:path*'],
};