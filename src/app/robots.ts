import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

/**
 * Explicit public allowlist. Anything inside the dashboard or APIs is
 * disallowed below. Keep this list in sync with `src/app/sitemap.ts`.
 */
const publicPaths = [
  // Swedish tree (root)
  "/",
  "/pricing",
  "/for-ai",
  "/hur-det-fungerar",
  "/tjanster",
  "/for-foretag",
  "/blog",
  "/authors",
  "/security",
  "/changelog",
  "/press",
  "/status",
  "/integritet",
  "/villkor",
  "/dpa",
  "/cookies",
  "/signup",
  "/login",
  // English tree
  "/en",
  "/en/pricing",
  "/en/for-ai",
  "/en/how-it-works",
  "/en/services",
  "/en/for-businesses",
  "/en/blog",
  "/en/authors",
  "/en/security",
  "/en/changelog",
  "/en/press",
  "/en/status",
  "/en/privacy",
  "/en/terms",
  "/en/dpa",
  "/en/cookies",
  // German tree
  "/de",
  "/de/pricing",
  "/de/for-ai",
  "/de/funktionsweise",
  "/de/leistungen",
  "/de/fuer-unternehmen",
  "/de/blog",
  "/de/authors",
  "/de/sicherheit",
  "/de/changelog",
  "/de/presse",
  "/de/status",
  "/de/datenschutz",
  "/de/agb",
  "/de/avv",
  "/de/cookies",
];

/**
 * Private-by-default paths. The `/q/` share-link route is left unlisted so
 * that offers remain indexable only via the sitemap entries the customer
 * explicitly exposes.
 */
const blockedPaths = [
  "/api/",
  "/dashboard/",
  "/quotes/",
  "/invoices/",
  "/templates/",
  "/clients/",
  "/saved-items/",
  "/analytics/",
  "/settings/",
  "/q/",
  "/offline",
];

/**
 * AI crawlers we explicitly welcome. Mirrors the `publicPaths` allowlist so
 * LLM grounding and search products index the same surface as Googlebot.
 */
const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: publicPaths,
        disallow: blockedPaths,
      },
      ...aiCrawlers.map((ua) => ({
        userAgent: ua,
        allow: publicPaths,
        disallow: blockedPaths,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
