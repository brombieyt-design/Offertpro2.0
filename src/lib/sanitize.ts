/**
 * Input sanitization & validation helpers.
 * Use at API boundaries (route handlers) to defend against XSS and injection.
 */

/** Strip HTML tags and decode common entities. Use on user-supplied text saved to DB. */
export function sanitizeText(input: unknown, maxLength = 5000): string {
  if (input === null || input === undefined) return "";
  let s = String(input);
  // Strip script/style tags fully (with content)
  s = s.replace(/<\s*(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "");
  // Strip all remaining tags
  s = s.replace(/<\/?[a-z][^>]*>/gi, "");
  // Strip null bytes
  s = s.replace(/\u0000/g, "");
  // Trim and limit length
  return s.trim().slice(0, maxLength);
}

/** Strict email validation. */
export function sanitizeEmail(input: unknown): string {
  const s = String(input || "").trim().toLowerCase();
  // RFC 5322 simplified
  const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return re.test(s) ? s.slice(0, 254) : "";
}

/** Sanitize Swedish phone numbers — keep digits, +, spaces, dashes. */
export function sanitizePhone(input: unknown): string {
  const s = String(input || "").trim();
  return s.replace(/[^\d+\s()-]/g, "").slice(0, 30);
}

/** Sanitize Swedish org.nr (XXXXXX-XXXX). */
export function sanitizeOrgNr(input: unknown): string {
  const s = String(input || "").replace(/\D/g, "");
  if (s.length !== 10) return "";
  return s.slice(0, 6) + "-" + s.slice(6);
}

/** Sanitize Swedish personnummer (YYYYMMDD-XXXX or YYMMDD-XXXX). */
export function sanitizePersonnummer(input: unknown): string {
  const s = String(input || "").replace(/\D/g, "");
  if (s.length === 10) return s.slice(0, 6) + "-" + s.slice(6);
  if (s.length === 12) return s.slice(0, 8) + "-" + s.slice(8);
  return "";
}

/** Validate a URL is http(s) and not a javascript:/data: URL. */
export function sanitizeUrl(input: unknown): string {
  const s = String(input || "").trim();
  try {
    const url = new URL(s);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    return url.toString().slice(0, 2048);
  } catch {
    return "";
  }
}

/** Clamp a number to [min, max] and ensure finite. */
export function sanitizeNumber(
  input: unknown,
  { min = 0, max = Number.MAX_SAFE_INTEGER, fallback = 0 }: { min?: number; max?: number; fallback?: number } = {}
): number {
  const n = Number(input);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

/** Validate an enum value against allowed list. */
export function sanitizeEnum<T extends string>(
  input: unknown,
  allowed: readonly T[],
  fallback: T
): T {
  const s = String(input || "");
  return (allowed as readonly string[]).includes(s) ? (s as T) : fallback;
}
