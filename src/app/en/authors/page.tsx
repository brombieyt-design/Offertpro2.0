import type { Metadata } from "next";
import Link from "next/link";
import { User } from "lucide-react";
import NavbarEn from "@/components/landing/en/NavbarEn";
import FooterEn from "@/components/landing/en/FooterEn";
import { getAllAuthors } from "@/content/authors";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Editorial team – Offert Pro",
  description:
    "Meet the team behind Offert Pro's guides and articles: product specialists, customer success leaders and legal advisors with deep experience in B2B sales and European compliance.",
  alternates: {
    canonical: `${SITE_URL}/en/authors`,
    languages: {
      "sv-SE": `${SITE_URL}/authors`,
      en: `${SITE_URL}/en/authors`,
      "x-default": `${SITE_URL}/authors`,
    },
  },
  openGraph: {
    title: "Editorial team – Offert Pro",
    description: "Meet the team behind Offert Pro's guides and articles.",
    url: `${SITE_URL}/en/authors`,
    locale: "en",
    alternateLocale: ["sv_SE"],
    type: "website",
  },
};

export default function AuthorsIndexPageEn() {
  const authors = getAllAuthors();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: authors.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: a.name,
        jobTitle: a.roleEn,
        url: `${SITE_URL}/en/authors/${a.slug}`,
        worksFor: { "@type": "Organization", name: "Offert Pro", url: SITE_URL },
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <NavbarEn />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
            Editorial team
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mt-3">
            The people behind our articles
          </h1>
          <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-2xl">
            Every article on the Offert Pro blog is written or reviewed by
            someone on our team — no ghostwriters, no generic AI-generated SEO
            filler. Meet the humans behind the guides.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {authors.map((a) => (
            <Link
              key={a.slug}
              href={`/en/authors/${a.slug}`}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{a.name}</h2>
                  <p className="text-sm text-indigo-600 mt-0.5">{a.roleEn}</p>
                  <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                    {a.bioEn}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FooterEn />
    </div>
  );
}
