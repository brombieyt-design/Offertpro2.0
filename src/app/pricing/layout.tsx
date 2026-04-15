import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Priser – Enkla, transparenta planer",
  description:
    "Börja gratis, väx i din takt. Offert Pro erbjuder planer från 0 kr/mån. Ingen bindningstid, inget kreditkort krävs. Jämför Gratis, Starter, Pro och Business.",
  alternates: {
    canonical: `${SITE_URL}/pricing`,
    languages: {
      "sv-SE": `${SITE_URL}/pricing`,
      en: `${SITE_URL}/en/pricing`,
      de: `${SITE_URL}/de/pricing`,
      "x-default": `${SITE_URL}/pricing`,
    },
  },
  openGraph: {
    title: "Priser – Offert Pro",
    description: "Planer från 0 kr/mån. Gratis att börja, ingen bindningstid.",
    locale: "sv_SE",
    alternateLocale: ["en", "de"],
    url: `${SITE_URL}/pricing`,
  },
};

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Priser – Offert Pro",
  description: "Prisplaner för Offert Pro offertverktyg",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 4,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "Offert Pro Gratis",
          description: "Perfekt för att komma igång. 5 offerter/månad, PDF-export, e-postleverans.",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "SEK",
            priceValidUntil: "2026-12-31",
            availability: "https://schema.org/InStock",
            url: "https://offertpro.se/signup",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "Offert Pro Starter",
          description: "50 offerter/månad, e-signaturer, realtidsspårning, mallar.",
          offers: {
            "@type": "Offer",
            price: "199",
            priceCurrency: "SEK",
            priceValidUntil: "2026-12-31",
            availability: "https://schema.org/InStock",
            url: "https://offertpro.se/signup",
            unitCode: "MON",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Product",
          name: "Offert Pro Pro",
          description: "Obegränsat antal offerter, CRM-integration, prioriterad support, automatiska påminnelser.",
          offers: {
            "@type": "Offer",
            price: "499",
            priceCurrency: "SEK",
            priceValidUntil: "2026-12-31",
            availability: "https://schema.org/InStock",
            url: "https://offertpro.se/signup",
            unitCode: "MON",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Product",
          name: "Offert Pro Business",
          description: "Obegränsat användare, API-åtkomst, SSO, dedikerad kontaktperson.",
          offers: {
            "@type": "Offer",
            price: "999",
            priceCurrency: "SEK",
            priceValidUntil: "2026-12-31",
            availability: "https://schema.org/InStock",
            url: "https://offertpro.se/signup",
            unitCode: "MON",
          },
        },
      },
    ],
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      {children}
    </>
  );
}
