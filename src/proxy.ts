import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

const protectedPaths = ["/dashboard", "/quotes", "/invoices", "/clients", "/analytics", "/settings", "/templates", "/saved-items"];
const authPaths = ["/login", "/signup"];
const publicApiPaths = [
  "/api/auth/login",
  "/api/auth/signup",
  "/api/auth/logout",
  "/api/quotes/public",
];

/**
 * Marketing paths that have a translated counterpart under /en/.
 * When a non-English-preferring visitor hits the Swedish URL we leave them
 * there. When an English-preferring visitor hits the Swedish URL for the
 * first time (no preference cookie) we redirect them to /en/<path>.
 */
const LOCALIZED_MARKETING_PATHS = [
  "/",
  "/pricing",
  "/for-ai",
];

const LOCALE_COOKIE = "NEXT_LOCALE";

// Simple in-memory rate limiter for auth endpoints (per-IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
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

function pickLocaleFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  const tags = header
    .split(",")
    .map((p) => p.trim().split(";")[0].toLowerCase());
  for (const tag of tags) {
    const primary = tag.split("-")[0] as Locale;
    if ((locales as readonly string[]).includes(primary)) return primary;
  }
  return defaultLocale;
}

function isMarketingRoot(pathname: string): boolean {
  return LOCALIZED_MARKETING_PATHS.some(
    (p) => pathname === p || (p !== "/" && pathname.startsWith(p + "/"))
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionId = request.cookies.get("session_id")?.value;

  // ── 1) Rate limit auth endpoints ────────────────────────────────
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

  // ── 2) Auth gate for dashboard ──────────────────────────────────
  if (isProtected && !sessionId) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // ── 3) Redirect authed users away from login/signup ─────────────
  if (isAuthPage && sessionId) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // ── 4) API auth gate ────────────────────────────────────────────
  const isApiRoute = pathname.startsWith("/api/");
  const isPublicApi = publicApiPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (isApiRoute && !isPublicApi && !sessionId) {
    return NextResponse.json(
      { error: "Ej autentiserad. Logga in först." },
      { status: 401 }
    );
  }

  // ── 5) Soft locale suggestion for first-time English visitors ───
  // Only redirect if: on a Swedish-root marketing page, no explicit locale
  // cookie, browser prefers English. This preserves Swedish SEO for all
  // direct URL hits and bots (bots usually don't send Accept-Language: en).
  const isEnTree = pathname === "/en" || pathname.startsWith("/en/");
  const hasLocalePref = request.cookies.get(LOCALE_COOKIE)?.value;

  if (
    !isEnTree &&
    !hasLocalePref &&
    isMarketingRoot(pathname) &&
    pickLocaleFromAcceptLanguage(request.headers.get("accept-language")) ===
      "en"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-touch-icon.png|og-image.png|logo.png|manifest.webmanifest|robots.txt|sitemap.xml|sw.js|llms.txt).*)",
  ],
};
