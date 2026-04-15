import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/content/blog-posts";
import { getAllBlogPostsEn } from "@/content/blog-posts-en";

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
    { url: `${SITE_URL}/en/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
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

  return [...staticRoutes, ...blogPosts, ...blogPostsEn];
}
