import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getAllBlogPostsEn } from "@/content/blog-posts-en";
import NavbarEn from "@/components/landing/en/NavbarEn";
import FooterEn from "@/components/landing/en/FooterEn";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Blog – Guides, comparisons & insights on proposals and invoicing",
  description:
    "Long-form guides and comparisons for European small businesses: how to write winning proposals, choosing proposal software, eIDAS e-signatures and more.",
  alternates: {
    canonical: `${SITE_URL}/en/blog`,
    languages: {
      "sv-SE": `${SITE_URL}/blog`,
      en: `${SITE_URL}/en/blog`,
      "x-default": `${SITE_URL}/blog`,
    },
  },
  openGraph: {
    title: "Blog – Offert Pro",
    description:
      "Guides, comparisons and insights on proposals, invoicing and small business growth in Europe.",
    url: `${SITE_URL}/en/blog`,
    locale: "en",
    alternateLocale: ["sv_SE"],
    type: "website",
  },
};

export default function EnBlogPage() {
  const posts = getAllBlogPostsEn();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Offert Pro Blog",
    description:
      "Guides, comparisons and insights on proposals, invoicing and small business growth in Europe.",
    url: `${SITE_URL}/en/blog`,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "Offert Pro",
      url: SITE_URL,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `${SITE_URL}/en/blog/${p.slug}`,
      author: { "@type": "Person", name: p.author },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <NavbarEn />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-600 mb-4">
            Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Guides, comparisons & insights
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Long-form guides for European small businesses: proposal writing,
            pricing strategy, e-signature compliance and tool comparisons.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className={`group bg-white rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300 overflow-hidden ${
                i === 0 ? "md:col-span-2" : ""
              }`}
            >
              <Link href={`/en/blog/${post.slug}`} className="block p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h2
                  className={`font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-3 ${
                    i === 0 ? "text-2xl md:text-3xl" : "text-xl"
                  }`}
                >
                  {post.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-4">
                  {post.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-brand-600 group-hover:gap-3 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 py-16 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to send your first proposal?
        </h2>
        <p className="text-brand-100 mb-8 max-w-xl mx-auto">
          Start free today — no credit card, no commitment.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold bg-white text-brand-600 rounded-xl hover:bg-gray-100 transition-colors"
        >
          Get started free
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      <FooterEn />
    </div>
  );
}
