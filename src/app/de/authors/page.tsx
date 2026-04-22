import type { Metadata } from "next";
import Link from "next/link";
import { User } from "lucide-react";
import NavbarDe from "@/components/landing/de/NavbarDe";
import FooterDe from "@/components/landing/de/FooterDe";
import { getAllAuthors } from "@/content/authors";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Redaktionsteam – Offert Pro",
  description:
    "Lernen Sie das Team hinter den Leitfäden und Artikeln von Offert Pro kennen: Produktspezialistinnen, Customer-Success-Leads und Juristinnen mit tiefer Erfahrung in B2B-Vertrieb und europäischer Compliance.",
  alternates: {
    canonical: `${SITE_URL}/de/authors`,
    languages: {
      "sv-SE": `${SITE_URL}/authors`,
      en: `${SITE_URL}/en/authors`,
      de: `${SITE_URL}/de/authors`,
      "x-default": `${SITE_URL}/authors`,
    },
  },
  openGraph: {
    title: "Redaktionsteam – Offert Pro",
    description:
      "Lernen Sie das Team hinter den Leitfäden und Artikeln von Offert Pro kennen.",
    url: `${SITE_URL}/de/authors`,
    locale: "de",
    alternateLocale: ["sv_SE", "en"],
    type: "website",
  },
};

export default function AuthorsIndexPageDe() {
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
        jobTitle: a.roleDe,
        url: `${SITE_URL}/de/authors/${a.slug}`,
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
      <NavbarDe />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
            Redaktionsteam
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mt-3">
            Die Menschen hinter unseren Artikeln
          </h1>
          <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-2xl">
            Jeder Artikel im Offert-Pro-Blog wird von einer Person aus unserem
            Team geschrieben oder geprüft — keine Ghostwriter, keine generischen
            KI-SEO-Texte. Lernen Sie die Menschen hinter den Leitfäden kennen.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {authors.map((a) => (
            <Link
              key={a.slug}
              href={`/de/authors/${a.slug}`}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{a.name}</h2>
                  <p className="text-sm text-indigo-600 mt-0.5">{a.roleDe}</p>
                  <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                    {a.bioDe}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FooterDe />
    </div>
  );
}
