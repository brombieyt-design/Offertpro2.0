import type { Metadata } from "next";
import Link from "next/link";
import { Clock, User, ChevronRight, Home } from "lucide-react";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts } from "@/content/blog-posts";
import { getAllBlogPostsDe } from "@/content/blog-posts-de";
import { authorNameToSlug, getAuthorByName } from "@/content/authors";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const hasEnglish = !!post.englishSlug;
  const deMatch = getAllBlogPostsDe().find((p) => p.swedishSlug === post.slug);
  const hasGerman = !!deMatch;
  const languages: Record<string, string> = {
    "sv-SE": `${SITE_URL}/blog/${post.slug}`,
    "x-default": `${SITE_URL}/blog/${post.slug}`,
  };
  if (hasEnglish) {
    languages.en = `${SITE_URL}/en/blog/${post.englishSlug}`;
  }
  if (hasGerman && deMatch) {
    languages.de = `${SITE_URL}/de/blog/${deMatch.slug}`;
  }

  const alternateLocale: string[] = [];
  if (hasEnglish) alternateLocale.push("en");
  if (hasGerman) alternateLocale.push("de");

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      locale: "sv_SE",
      alternateLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "sv-SE",
    author: (() => {
      const authorBio = getAuthorByName(post.author);
      return {
        "@type": "Person",
        name: post.author,
        ...(authorBio
          ? {
              jobTitle: authorBio.roleSv,
              url: `${SITE_URL}/authors/${authorBio.slug}`,
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
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: `${SITE_URL}/og-image.png`,
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hem", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blogg", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

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
      <Navbar />

      <article className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-1.5 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span className="sr-only">Hem</span>
                </Link>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5" /></li>
              <li>
                <Link href="/blog" className="hover:text-indigo-600 transition-colors">
                  Blogg
                </Link>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5" /></li>
              <li className="text-gray-600 font-medium truncate max-w-[250px]">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} läsning
            </span>
            <span className="text-sm text-gray-400">
              {new Date(post.date).toLocaleDateString("sv-SE", {
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
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <Link
                href={`/authors/${authorNameToSlug(post.author)}`}
                className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors"
              >
                {post.author}
              </Link>
              <p className="text-xs text-gray-500">
                {getAuthorByName(post.author)?.roleSv ?? "Offert Pro"}
              </p>
            </div>
            {post.englishSlug && (
              <Link
                href={`/en/blog/${post.englishSlug}`}
                hrefLang="en"
                className="ml-auto text-xs text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Read in English →
              </Link>
            )}
          </div>

          {/* Content */}
          <div
            className="prose prose-gray prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:leading-relaxed prose-p:text-gray-600
              prose-a:text-indigo-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-li:text-gray-600
              prose-strong:text-gray-900
              prose-table:text-sm
              prose-th:bg-gray-50 prose-th:px-4 prose-th:py-2
              prose-td:px-4 prose-td:py-2 prose-td:border-b prose-td:border-gray-100"
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
          <div className="mt-12 bg-indigo-50 rounded-2xl p-8 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Redo att skapa professionella offerter?
            </h3>
            <p className="text-gray-600 mb-6">
              Kom igång gratis – skapa din första offert på under 5 minuter.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Testa gratis
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
