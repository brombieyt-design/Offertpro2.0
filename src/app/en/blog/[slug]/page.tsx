import type { Metadata } from "next";
import Link from "next/link";
import { Clock, User, ChevronRight, Home } from "lucide-react";
import { notFound } from "next/navigation";
import {
  getBlogPostEn,
  getAllBlogPostsEn,
} from "@/content/blog-posts-en";
import { authorNameToSlug, getAuthorByName } from "@/content/authors";
import NavbarEn from "@/components/landing/en/NavbarEn";
import FooterEn from "@/components/landing/en/FooterEn";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export async function generateStaticParams() {
  return getAllBlogPostsEn().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostEn(slug);
  if (!post) return {};

  const hasSwedish = !!post.swedishSlug;
  const languages: Record<string, string> = {
    en: `${SITE_URL}/en/blog/${post.slug}`,
    "x-default": `${SITE_URL}/en/blog/${post.slug}`,
  };
  if (hasSwedish) {
    languages["sv-SE"] = `${SITE_URL}/blog/${post.swedishSlug}`;
    languages["x-default"] = `${SITE_URL}/blog/${post.swedishSlug}`;
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${SITE_URL}/en/blog/${post.slug}`,
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${SITE_URL}/en/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      locale: "en",
      alternateLocale: hasSwedish ? ["sv_SE"] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function EnBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostEn(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en",
    author: (() => {
      const authorBio = getAuthorByName(post.author);
      return {
        "@type": "Person",
        name: post.author,
        jobTitle: post.authorRole,
        ...(authorBio
          ? {
              url: `${SITE_URL}/en/authors/${authorBio.slug}`,
              knowsAbout: authorBio.expertise,
            }
          : {}),
        worksFor: {
          "@type": "Organization",
          name: "Offert Pro",
          url: SITE_URL,
        },
      };
    })(),
    publisher: {
      "@type": "Organization",
      name: "Offert Pro",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/en/blog/${post.slug}`,
    image: `${SITE_URL}/og-image.png`,
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/en/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/en/blog/${post.slug}`,
      },
    ],
  };

  const howToJsonLd = post.howToSteps
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: post.title,
        description: post.description,
        inLanguage: "en",
        step: post.howToSteps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      }
    : null;

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}
      <NavbarEn />

      <article className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-1.5 text-sm text-gray-400">
              <li>
                <Link
                  href="/en"
                  className="hover:text-brand-600 transition-colors flex items-center gap-1"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span className="sr-only">Home</span>
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li>
                <Link href="/en/blog" className="hover:text-brand-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li className="text-gray-600 font-medium truncate max-w-[250px]">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} read
            </span>
            <span className="text-sm text-gray-400">
              {new Date(post.date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3 mb-12 pb-8 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
              <User className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <Link
                href={`/en/authors/${authorNameToSlug(post.author)}`}
                className="text-sm font-medium text-gray-900 hover:text-brand-600 transition-colors"
              >
                {post.author}
              </Link>
              <p className="text-xs text-gray-500">{post.authorRole}</p>
            </div>
            {post.swedishSlug && (
              <Link
                href={`/blog/${post.swedishSlug}`}
                hrefLang="sv"
                className="ml-auto text-xs text-brand-600 hover:text-brand-700 font-medium"
              >
                Läs på svenska →
              </Link>
            )}
          </div>

          {/* Content */}
          <div
            className="prose prose-gray prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:text-gray-600
              prose-a:text-brand-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-li:text-gray-600
              prose-strong:text-gray-900
              prose-table:text-sm
              prose-th:bg-gray-50 prose-th:px-4 prose-th:py-2
              prose-td:px-4 prose-td:py-2 prose-td:border-b prose-td:border-gray-100
              prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-gray-800 prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-100"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-brand-50 rounded-2xl p-8 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Ready to send better proposals?
            </h3>
            <p className="text-gray-600 mb-6">
              Get started free — create your first proposal in under 5 minutes.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors"
            >
              Try it free
            </Link>
          </div>
        </div>
      </article>

      <FooterEn />
    </div>
  );
}
