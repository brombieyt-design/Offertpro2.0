import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/quotes", "/invoices", "/clients", "/analytics", "/settings", "/templates"];
const authPaths = ["/login", "/signup"];
const publicApiPaths = ["/api/auth/login", "/api/auth/signup", "/api/auth/logout"];

// Simple in-memory rate limiter for auth endpoints (per-IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) return false;
  entry.count++;
  return true;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionId = request.cookies.get("session_id")?.value;

  // Rate limit auth endpoints
  if (pathname.startsWith("/api/auth/login") || pathname.startsWith("/api/auth/signup")) {
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "För många försök. Vänta en minut och försök igen." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }
  }

  const isProtected = protectedPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  const isAuthPage = authPaths.some((p) => pathname === p);

  // Redirect unauthenticated users to login
  if (isProtected && !sessionId) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from login/signup
  if (isAuthPage && sessionId) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Protect API routes — return 401 if no session (except public auth endpoints)
  const isApiRoute = pathname.startsWith("/api/");
  const isPublicApi = publicApiPaths.some((p) => pathname === p);

  if (isApiRoute && !isPublicApi && !sessionId) {
    return NextResponse.json(
      { error: "Ej autentiserad. Logga in först." },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/quotes/:path*",
    "/invoices/:path*",
    "/clients/:path*",
    "/analytics/:path*",
    "/settings/:path*",
    "/templates/:path*",
    "/login",
    "/signup",
    "/api/:path*",
  ],
};
