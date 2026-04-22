import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getAllBlogPosts } from "@/content/blog-posts";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Blogg – Tips, guider & nyheter om offerter och fakturor",
  description:
    "Lär dig skriva vinnande offerter, förbättra din faktureringsprocess och väx ditt företag. Tips, guider och nyheter från Offert Pro.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
    languages: {
      "sv-SE": `${SITE_URL}/blog`,
      en: `${SITE_URL}/en/blog`,
      de: `${SITE_URL}/de/blog`,
      "x-default": `${SITE_URL}/blog`,
    },
  },
  openGraph: {
    title: "Blogg – Offert Pro",
    description: "Tips, guider och nyheter om offerter, fakturor och småföretagande.",
    locale: "sv_SE",
    alternateLocale: ["en", "de"],
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Offert Pro Blogg",
  description: "Tips, guider och nyheter om offerter, fakturor och småföretagande i Sverige.",
  url: "https://offertpro.se/blog",
  publisher: {
    "@type": "Organization",
    name: "Offert Pro",
    url: "https://offertpro.se",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Blogg
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Tips, guider & insikter
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Lär dig skriva vinnande offerter, förbättra din faktureringsprocess och väx ditt företag med våra experttips.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className={`group bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 overflow-hidden ${
                i === 0 ? "md:col-span-2" : ""
              }`}
            >
              <Link href={`/blog/${post.slug}`} className="block p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(post.date).toLocaleDateString("sv-SE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h2
                  className={`font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-3 ${
                    i === 0 ? "text-2xl md:text-3xl" : "text-xl"
                  }`}
                >
                  {post.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-4">
                  {post.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 group-hover:gap-3 transition-all">
                  Läs mer
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-16 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Redo att skapa professionella offerter?
        </h2>
        <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
          Börja gratis idag – inget kreditkort, ingen bindningstid.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold bg-white text-indigo-600 rounded-xl hover:bg-gray-100 transition-colors"
        >
          Kom igång gratis
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
