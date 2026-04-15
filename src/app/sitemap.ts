import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  /** Swedish routes with English alternates announced via `alternates.languages`. */
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          "sv-SE": SITE_URL,
          en: `${SITE_URL}/en`,
          "x-default": SITE_URL,
        },
      },
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/pricing`,
          en: `${SITE_URL}/en/pricing`,
          "x-default": `${SITE_URL}/pricing`,
        },
      },
    },
    {
      url: `${SITE_URL}/for-ai`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/for-ai`,
          en: `${SITE_URL}/en/for-ai`,
          "x-default": `${SITE_URL}/for-ai`,
        },
      },
    },
    { url: `${SITE_URL}/hur-det-fungerar`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tjanster`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/for-foretag`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/signup`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    // English tree
    { url: `${SITE_URL}/en`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/en/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/en/for-ai`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
  ];

  // Blog posts
  const blogPosts = [
    "sa-skriver-du-en-offert-som-vinner",
    "offert-vs-anbud-skillnaden",
    "5-tips-for-snabbare-betalning",
    "digitala-signaturer-guide",
    "offertmall-gratis-ladda-ner",
    "offert-pro-vs-fortnox",
    "offert-pro-vs-visma",
    "basta-offertverktyget-sverige-2026",
  ].map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogPosts];
}
