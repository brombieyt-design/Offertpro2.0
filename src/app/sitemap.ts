import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/content/blog-posts";
import { getAllBlogPostsEn } from "@/content/blog-posts-en";
import { getAllAuthors } from "@/content/authors";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  /**
   * Swedish routes with English and German alternates announced via
   * `alternates.languages`. Swedish is the x-default.
   */
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
          de: `${SITE_URL}/de`,
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
          de: `${SITE_URL}/de/pricing`,
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
          de: `${SITE_URL}/de/for-ai`,
          "x-default": `${SITE_URL}/for-ai`,
        },
      },
    },
    { url: `${SITE_URL}/hur-det-fungerar`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tjanster`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/for-foretag`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/signup`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/blog`,
          en: `${SITE_URL}/en/blog`,
          "x-default": `${SITE_URL}/blog`,
        },
      },
    },
    // English tree
    { url: `${SITE_URL}/en`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/en/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/en/for-ai`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/en/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    // German tree
    { url: `${SITE_URL}/de`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/de/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/de/for-ai`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
  ];

  /** Swedish blog posts. If a post has an English counterpart, announce it. */
  const blogPosts: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
    ...(post.englishSlug
      ? {
          alternates: {
            languages: {
              "sv-SE": `${SITE_URL}/blog/${post.slug}`,
              en: `${SITE_URL}/en/blog/${post.englishSlug}`,
              "x-default": `${SITE_URL}/blog/${post.slug}`,
            },
          },
        }
      : {}),
  }));

  /** English blog posts. If matched to a Swedish post, announce alternates. */
  const blogPostsEn: MetadataRoute.Sitemap = getAllBlogPostsEn().map((post) => ({
    url: `${SITE_URL}/en/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.65,
    ...(post.swedishSlug
      ? {
          alternates: {
            languages: {
              "sv-SE": `${SITE_URL}/blog/${post.swedishSlug}`,
              en: `${SITE_URL}/en/blog/${post.slug}`,
              "x-default": `${SITE_URL}/en/blog/${post.slug}`,
            },
          },
        }
      : {}),
  }));

  /** Author profile pages with reciprocal hreflang between sv and en. */
  const authorRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/authors`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/authors`,
          en: `${SITE_URL}/en/authors`,
          "x-default": `${SITE_URL}/authors`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/authors`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/authors`,
          en: `${SITE_URL}/en/authors`,
          "x-default": `${SITE_URL}/authors`,
        },
      },
    },
    ...getAllAuthors().flatMap((a): MetadataRoute.Sitemap => [
      {
        url: `${SITE_URL}/authors/${a.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.4,
        alternates: {
          languages: {
            "sv-SE": `${SITE_URL}/authors/${a.slug}`,
            en: `${SITE_URL}/en/authors/${a.slug}`,
            "x-default": `${SITE_URL}/authors/${a.slug}`,
          },
        },
      },
      {
        url: `${SITE_URL}/en/authors/${a.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.4,
        alternates: {
          languages: {
            "sv-SE": `${SITE_URL}/authors/${a.slug}`,
            en: `${SITE_URL}/en/authors/${a.slug}`,
            "x-default": `${SITE_URL}/authors/${a.slug}`,
          },
        },
      },
    ]),
  ];

  return [...staticRoutes, ...blogPosts, ...blogPostsEn, ...authorRoutes];
}
