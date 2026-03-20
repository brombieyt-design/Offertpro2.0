import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

const publicPaths = ["/", "/pricing", "/hur-det-fungerar", "/tjanster", "/for-foretag", "/blog", "/signup", "/login"];
const blockedPaths = ["/api/", "/dashboard/", "/quotes/", "/invoices/", "/templates/", "/clients/", "/analytics/", "/settings/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow public, block dashboard/API
      {
        userAgent: "*",
        allow: publicPaths,
        disallow: blockedPaths,
      },
      // Explicitly allow AI crawlers
      {
        userAgent: "GPTBot",
        allow: publicPaths,
        disallow: blockedPaths,
      },
      {
        userAgent: "ChatGPT-User",
        allow: publicPaths,
        disallow: blockedPaths,
      },
      {
        userAgent: "ClaudeBot",
        allow: publicPaths,
        disallow: blockedPaths,
      },
      {
        userAgent: "PerplexityBot",
        allow: publicPaths,
        disallow: blockedPaths,
      },
      {
        userAgent: "Google-Extended",
        allow: publicPaths,
        disallow: blockedPaths,
      },
      {
        userAgent: "Applebot-Extended",
        allow: publicPaths,
        disallow: blockedPaths,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: publicPaths,
        disallow: blockedPaths,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
