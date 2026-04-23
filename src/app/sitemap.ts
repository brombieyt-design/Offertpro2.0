import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/content/blog-posts";
import { getAllBlogPostsEn } from "@/content/blog-posts-en";
import { getAllBlogPostsDe } from "@/content/blog-posts-de";
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
    {
      url: `${SITE_URL}/hur-det-fungerar`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/hur-det-fungerar`,
          en: `${SITE_URL}/en/how-it-works`,
          de: `${SITE_URL}/de/funktionsweise`,
          "x-default": `${SITE_URL}/hur-det-fungerar`,
        },
      },
    },
    {
      url: `${SITE_URL}/tjanster`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/tjanster`,
          en: `${SITE_URL}/en/services`,
          de: `${SITE_URL}/de/leistungen`,
          "x-default": `${SITE_URL}/tjanster`,
        },
      },
    },
    {
      url: `${SITE_URL}/for-foretag`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/for-foretag`,
          en: `${SITE_URL}/en/for-businesses`,
          de: `${SITE_URL}/de/fuer-unternehmen`,
          "x-default": `${SITE_URL}/for-foretag`,
        },
      },
    },
    { url: `${SITE_URL}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/signup`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    {
      url: `${SITE_URL}/security`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/security`,
          en: `${SITE_URL}/en/security`,
          de: `${SITE_URL}/de/sicherheit`,
          "x-default": `${SITE_URL}/security`,
        },
      },
    },
    {
      url: `${SITE_URL}/changelog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/changelog`,
          en: `${SITE_URL}/en/changelog`,
          de: `${SITE_URL}/de/changelog`,
          "x-default": `${SITE_URL}/changelog`,
        },
      },
    },
    {
      url: `${SITE_URL}/press`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/press`,
          en: `${SITE_URL}/en/press`,
          de: `${SITE_URL}/de/presse`,
          "x-default": `${SITE_URL}/press`,
        },
      },
    },
    {
      url: `${SITE_URL}/status`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.4,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/status`,
          en: `${SITE_URL}/en/status`,
          de: `${SITE_URL}/de/status`,
          "x-default": `${SITE_URL}/status`,
        },
      },
    },
    {
      url: `${SITE_URL}/integritet`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/integritet`,
          en: `${SITE_URL}/en/privacy`,
          de: `${SITE_URL}/de/datenschutz`,
          "x-default": `${SITE_URL}/integritet`,
        },
      },
    },
    {
      url: `${SITE_URL}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/cookies`,
          en: `${SITE_URL}/en/cookies`,
          de: `${SITE_URL}/de/cookies`,
          "x-default": `${SITE_URL}/cookies`,
        },
      },
    },
    {
      url: `${SITE_URL}/villkor`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/villkor`,
          en: `${SITE_URL}/en/terms`,
          de: `${SITE_URL}/de/agb`,
          "x-default": `${SITE_URL}/villkor`,
        },
      },
    },
    {
      url: `${SITE_URL}/dpa`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/dpa`,
          en: `${SITE_URL}/en/dpa`,
          de: `${SITE_URL}/de/avv`,
          "x-default": `${SITE_URL}/dpa`,
        },
      },
    },
    {
      url: `${SITE_URL}/kontakt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/kontakt`,
          en: `${SITE_URL}/en/contact`,
          de: `${SITE_URL}/de/kontakt`,
          "x-default": `${SITE_URL}/kontakt`,
        },
      },
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/faq`,
          en: `${SITE_URL}/en/faq`,
          de: `${SITE_URL}/de/faq`,
          "x-default": `${SITE_URL}/faq`,
        },
      },
    },
    {
      url: `${SITE_URL}/integrations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/integrations`,
          en: `${SITE_URL}/en/integrations`,
          de: `${SITE_URL}/de/integrationen`,
          "x-default": `${SITE_URL}/integrations`,
        },
      },
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/blog`,
          en: `${SITE_URL}/en/blog`,
          de: `${SITE_URL}/de/blog`,
          "x-default": `${SITE_URL}/blog`,
        },
      },
    },
    // English tree
    { url: `${SITE_URL}/en`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/en/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/en/for-ai`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    {
      url: `${SITE_URL}/en/how-it-works`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/hur-det-fungerar`,
          en: `${SITE_URL}/en/how-it-works`,
          de: `${SITE_URL}/de/funktionsweise`,
          "x-default": `${SITE_URL}/hur-det-fungerar`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/tjanster`,
          en: `${SITE_URL}/en/services`,
          de: `${SITE_URL}/de/leistungen`,
          "x-default": `${SITE_URL}/tjanster`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/for-businesses`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/for-foretag`,
          en: `${SITE_URL}/en/for-businesses`,
          de: `${SITE_URL}/de/fuer-unternehmen`,
          "x-default": `${SITE_URL}/for-foretag`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/security`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/security`,
          en: `${SITE_URL}/en/security`,
          de: `${SITE_URL}/de/sicherheit`,
          "x-default": `${SITE_URL}/security`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/changelog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/changelog`,
          en: `${SITE_URL}/en/changelog`,
          de: `${SITE_URL}/de/changelog`,
          "x-default": `${SITE_URL}/changelog`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/press`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/press`,
          en: `${SITE_URL}/en/press`,
          de: `${SITE_URL}/de/presse`,
          "x-default": `${SITE_URL}/press`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/status`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.4,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/status`,
          en: `${SITE_URL}/en/status`,
          de: `${SITE_URL}/de/status`,
          "x-default": `${SITE_URL}/status`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/integritet`,
          en: `${SITE_URL}/en/privacy`,
          de: `${SITE_URL}/de/datenschutz`,
          "x-default": `${SITE_URL}/integritet`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/cookies`,
          en: `${SITE_URL}/en/cookies`,
          de: `${SITE_URL}/de/cookies`,
          "x-default": `${SITE_URL}/cookies`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/villkor`,
          en: `${SITE_URL}/en/terms`,
          de: `${SITE_URL}/de/agb`,
          "x-default": `${SITE_URL}/villkor`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/dpa`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/dpa`,
          en: `${SITE_URL}/en/dpa`,
          de: `${SITE_URL}/de/avv`,
          "x-default": `${SITE_URL}/dpa`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/kontakt`,
          en: `${SITE_URL}/en/contact`,
          de: `${SITE_URL}/de/kontakt`,
          "x-default": `${SITE_URL}/kontakt`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/faq`,
          en: `${SITE_URL}/en/faq`,
          de: `${SITE_URL}/de/faq`,
          "x-default": `${SITE_URL}/faq`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/integrations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/integrations`,
          en: `${SITE_URL}/en/integrations`,
          de: `${SITE_URL}/de/integrationen`,
          "x-default": `${SITE_URL}/integrations`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/blog`,
          en: `${SITE_URL}/en/blog`,
          de: `${SITE_URL}/de/blog`,
          "x-default": `${SITE_URL}/blog`,
        },
      },
    },
    // German tree
    { url: `${SITE_URL}/de`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/de/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/de/for-ai`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    {
      url: `${SITE_URL}/de/funktionsweise`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/hur-det-fungerar`,
          en: `${SITE_URL}/en/how-it-works`,
          de: `${SITE_URL}/de/funktionsweise`,
          "x-default": `${SITE_URL}/hur-det-fungerar`,
        },
      },
    },
    {
      url: `${SITE_URL}/de/leistungen`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/tjanster`,
          en: `${SITE_URL}/en/services`,
          de: `${SITE_URL}/de/leistungen`,
          "x-default": `${SITE_URL}/tjanster`,
        },
      },
    },
    {
      url: `${SITE_URL}/de/fuer-unternehmen`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/for-foretag`,
          en: `${SITE_URL}/en/for-businesses`,
          de: `${SITE_URL}/de/fuer-unternehmen`,
          "x-default": `${SITE_URL}/for-foretag`,
        },
      },
    },
    {
      url: `${SITE_URL}/de/sicherheit`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/security`,
          en: `${SITE_URL}/en/security`,
          de: `${SITE_URL}/de/sicherheit`,
          "x-default": `${SITE_URL}/security`,
        },
      },
    },
    {
      url: `${SITE_URL}/de/changelog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/changelog`,
          en: `${SITE_URL}/en/changelog`,
          de: `${SITE_URL}/de/changelog`,
          "x-default": `${SITE_URL}/changelog`,
        },
      },
    },
    {
      url: `${SITE_URL}/de/presse`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/press`,
          en: `${SITE_URL}/en/press`,
          de: `${SITE_URL}/de/presse`,
          "x-default": `${SITE_URL}/press`,
        },
      },
    },
    {
      url: `${SITE_URL}/de/status`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.4,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/status`,
          en: `${SITE_URL}/en/status`,
          de: `${SITE_URL}/de/status`,
          "x-default": `${SITE_URL}/status`,
        },
      },
    },
    {
      url: `${SITE_URL}/de/datenschutz`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/integritet`,
          en: `${SITE_URL}/en/privacy`,
          de: `${SITE_URL}/de/datenschutz`,
          "x-default": `${SITE_URL}/integritet`,
        },
      },
    },
    {
      url: `${SITE_URL}/de/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/cookies`,
          en: `${SITE_URL}/en/cookies`,
          de: `${SITE_URL}/de/cookies`,
          "x-default": `${SITE_URL}/cookies`,
        },
      },
    },
    {
      url: `${SITE_URL}/de/agb`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/villkor`,
          en: `${SITE_URL}/en/terms`,
          de: `${SITE_URL}/de/agb`,
          "x-default": `${SITE_URL}/villkor`,
        },
      },
    },
    {
      url: `${SITE_URL}/de/avv`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/dpa`,
          en: `${SITE_URL}/en/dpa`,
          de: `${SITE_URL}/de/avv`,
          "x-default": `${SITE_URL}/dpa`,
        },
      },
    },
    {
      url: `${SITE_URL}/de/kontakt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/kontakt`,
          en: `${SITE_URL}/en/contact`,
          de: `${SITE_URL}/de/kontakt`,
          "x-default": `${SITE_URL}/kontakt`,
        },
      },
    },
    {
      url: `${SITE_URL}/de/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/faq`,
          en: `${SITE_URL}/en/faq`,
          de: `${SITE_URL}/de/faq`,
          "x-default": `${SITE_URL}/faq`,
        },
      },
    },
    {
      url: `${SITE_URL}/de/integrationen`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/integrations`,
          en: `${SITE_URL}/en/integrations`,
          de: `${SITE_URL}/de/integrationen`,
          "x-default": `${SITE_URL}/integrations`,
        },
      },
    },
    {
      url: `${SITE_URL}/de/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          "sv-SE": `${SITE_URL}/blog`,
          en: `${SITE_URL}/en/blog`,
          de: `${SITE_URL}/de/blog`,
          "x-default": `${SITE_URL}/blog`,
        },
      },
    },
  ];

  /**
   * Build `alternates.languages` for a blog post given optional counterpart
   * slugs in the other two locales. The current locale is always included;
   * x-default points at the Swedish version when present, otherwise at the
   * current locale.
   */
  type BlogAlternates = {
    alternates: {
      languages: Record<string, string>;
    };
  };
  const blogAlternates = (
    current: "sv" | "en" | "de",
    slugs: { sv?: string; en?: string; de?: string }
  ): BlogAlternates | Record<string, never> => {
    const entries: [string, string][] = [];
    if (slugs.sv) entries.push(["sv-SE", `${SITE_URL}/blog/${slugs.sv}`]);
    if (slugs.en) entries.push(["en", `${SITE_URL}/en/blog/${slugs.en}`]);
    if (slugs.de) entries.push(["de", `${SITE_URL}/de/blog/${slugs.de}`]);
    // x-default prefers Swedish, then English, then the current locale
    const defaultSlug = slugs.sv
      ? `${SITE_URL}/blog/${slugs.sv}`
      : slugs.en
      ? `${SITE_URL}/en/blog/${slugs.en}`
      : slugs.de
      ? `${SITE_URL}/de/blog/${slugs.de}`
      : `${SITE_URL}/${current === "sv" ? "blog" : `${current}/blog`}`;
    entries.push(["x-default", defaultSlug]);
    if (entries.length === 1) return {};
    return { alternates: { languages: Object.fromEntries(entries) } };
  };

  /** Swedish blog posts. Announce English and German counterparts when present. */
  const blogPosts: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => {
    const deMatch = getAllBlogPostsDe().find(
      (p) => p.swedishSlug === post.slug
    );
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly",
      priority: 0.6,
      ...blogAlternates("sv", {
        sv: post.slug,
        en: post.englishSlug,
        de: deMatch?.slug,
      }),
    };
  });

  /** English blog posts. Announce Swedish and German counterparts when present. */
  const blogPostsEn: MetadataRoute.Sitemap = getAllBlogPostsEn().map((post) => {
    const deMatch = getAllBlogPostsDe().find(
      (p) => p.englishSlug === post.slug
    );
    return {
      url: `${SITE_URL}/en/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly",
      priority: 0.65,
      ...blogAlternates("en", {
        sv: post.swedishSlug,
        en: post.slug,
        de: deMatch?.slug,
      }),
    };
  });

  /** German blog posts. Announce Swedish and English counterparts when present. */
  const blogPostsDe: MetadataRoute.Sitemap = getAllBlogPostsDe().map((post) => ({
    url: `${SITE_URL}/de/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.65,
    ...blogAlternates("de", {
      sv: post.swedishSlug,
      en: post.englishSlug,
      de: post.slug,
    }),
  }));

  /** Author profile pages with tri-locale hreflang across sv, en and de. */
  const authorLanguages = (slug: string) => ({
    "sv-SE": `${SITE_URL}/authors/${slug}`,
    en: `${SITE_URL}/en/authors/${slug}`,
    de: `${SITE_URL}/de/authors/${slug}`,
    "x-default": `${SITE_URL}/authors/${slug}`,
  });

  const authorIndexLanguages = {
    "sv-SE": `${SITE_URL}/authors`,
    en: `${SITE_URL}/en/authors`,
    de: `${SITE_URL}/de/authors`,
    "x-default": `${SITE_URL}/authors`,
  };

  const authorRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/authors`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages: authorIndexLanguages },
    },
    {
      url: `${SITE_URL}/en/authors`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages: authorIndexLanguages },
    },
    {
      url: `${SITE_URL}/de/authors`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages: authorIndexLanguages },
    },
    ...getAllAuthors().flatMap((a): MetadataRoute.Sitemap => [
      {
        url: `${SITE_URL}/authors/${a.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.4,
        alternates: { languages: authorLanguages(a.slug) },
      },
      {
        url: `${SITE_URL}/en/authors/${a.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.4,
        alternates: { languages: authorLanguages(a.slug) },
      },
      {
        url: `${SITE_URL}/de/authors/${a.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.4,
        alternates: { languages: authorLanguages(a.slug) },
      },
    ]),
  ];

  return [
    ...staticRoutes,
    ...blogPosts,
    ...blogPostsEn,
    ...blogPostsDe,
    ...authorRoutes,
  ];
}
