import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, User } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { getAllAuthors, getAuthor } from "@/content/authors";
import { getAllBlogPosts } from "@/content/blog-posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export function generateStaticParams() {
  return getAllAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return { title: "Författare hittades inte" };

  return {
    title: `${author.name} – ${author.roleSv}`,
    description: author.bioSv,
    alternates: {
      canonical: `${SITE_URL}/authors/${author.slug}`,
      languages: {
        "sv-SE": `${SITE_URL}/authors/${author.slug}`,
        en: `${SITE_URL}/en/authors/${author.slug}`,
        de: `${SITE_URL}/de/authors/${author.slug}`,
        "x-default": `${SITE_URL}/authors/${author.slug}`,
      },
    },
    openGraph: {
      title: `${author.name} – Offert Pro`,
      description: author.bioSv,
      url: `${SITE_URL}/authors/${author.slug}`,
      locale: "sv_SE",
      alternateLocale: ["en", "de"],
      type: "profile",
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const posts = getAllBlogPosts().filter((p) => p.author === author.name);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.roleSv,
    description: author.bioSv,
    url: `${SITE_URL}/authors/${author.slug}`,
    worksFor: {
      "@type": "Organization",
      name: "Offert Pro",
      url: SITE_URL,
    },
    knowsAbout: author.expertise,
    ...(author.sameAs ? { sameAs: author.sameAs } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hem", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Redaktionen", item: `${SITE_URL}/authors` },
      { "@type": "ListItem", position: 3, name: author.name, item: `${SITE_URL}/authors/${author.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />

      <article className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-400">
            <Link href="/" className="hover:text-indigo-600">Hem</Link>
            <span className="mx-1.5">/</span>
            <Link href="/authors" className="hover:text-indigo-600">Redaktionen</Link>
            <span className="mx-1.5">/</span>
            <span className="text-gray-600">{author.name}</span>
          </nav>

          <div className="flex items-start gap-6 mb-10">
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <User className="w-9 h-9 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                {author.name}
              </h1>
              <p className="text-indigo-600 mt-1">{author.roleSv}</p>
              <p className="text-sm text-gray-400 mt-1">
                {author.yearsExperience}+ års erfarenhet · Offert Pro
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            {author.bioSv}
          </p>

          <div className="border-t border-gray-100 pt-8 mb-12">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Kompetensområden
            </h2>
            <div className="flex flex-wrap gap-2">
              {author.expertise.map((e) => (
                <span
                  key={e}
                  className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>

          {posts.length > 0 && (
            <div className="border-t border-gray-100 pt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Artiklar av {author.name}
              </h2>
              <ul className="space-y-4">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="block bg-white border border-gray-100 hover:border-indigo-200 rounded-xl p-5 transition-all"
                    >
                      <h3 className="text-base font-semibold text-gray-900">
                        {p.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {p.description}
                      </p>
                      <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                        <span className="text-indigo-600 font-medium">{p.category}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {p.readTime}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}
