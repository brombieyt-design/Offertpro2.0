import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/quotes", "/invoices", "/clients", "/analytics", "/settings", "/templates"];
const authPaths = ["/login", "/signup"];
const publicApiPaths = ["/api/auth/login", "/api/auth/signup", "/api/auth/logout"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionId = request.cookies.get("session_id")?.value;

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
