import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const SITE_NAME = "Offert Pro";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4F46E5",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Offert Pro – Skapa professionella offerter & fakturor för småföretag",
    template: "%s | Offert Pro",
  },
  description:
    "Skapa professionella offerter och fakturor på minuter. Spåra öppningar i realtid, samla e-signaturer och vinn fler affärer. Gratis att börja – inget kreditkort krävs.",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "offertsystem",
    "offertverktyg",
    "offertprogram",
    "offertprogram Sverige",
    "offertsoftware",
    "offertverktyg småföretag",
    "faktureringsprogram",
    "faktureringsverktyg",
    "skapa offert online",
    "e-signatur offert",
    "offert PDF",
    "offertmall",
    "gratis offertverktyg",
    "SaaS offert Sverige",
    "offert och faktura",
    "professionella offerter",
    "digital offerthantering",
  ],
  openGraph: {
    title: "Offert Pro – Vinn fler affärer med professionella offerter",
    description:
      "Skapa offerter och fakturor, spåra kundengagemang i realtid och samla e-signaturer – allt på ett ställe. Gratis att börja.",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "sv_SE",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Offert Pro – Professionella offerter och fakturor för småföretag",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Offert Pro – Vinn fler affärer med professionella offerter",
    description:
      "Skapa offerter och fakturor, spåra kundengagemang i realtid och samla e-signaturer. Gratis att börja.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "business",
};

// JSON-LD structured data for the entire site
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Offert Pro hjälper småföretag att skapa professionella offerter och fakturor snabbt och enkelt.",
  foundingDate: "2026",
  sameAs: ["https://twitter.com/offertpro", "https://linkedin.com/company/offertpro"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hej@offertpro.se",
    contactType: "customer service",
    availableLanguage: "Swedish",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Stockholm",
    addressCountry: "SE",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Offertverktyg och faktureringsprogram för svenska småföretag. Skapa professionella offerter med PDF-export, e-signaturer och realtidsspårning.",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "SEK",
    lowPrice: "0",
    highPrice: "999",
    offerCount: "4",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
  featureList: [
    "Skapa professionella PDF-offerter",
    "E-signaturer",
    "Realtidsspårning",
    "Återanvändbara mallar",
    "Automatiska påminnelser",
    "Fakturering",
  ],
  screenshot: `${SITE_URL}/og-image.png`,
  softwareVersion: "2.0",
  author: {
    "@type": "Organization",
    name: SITE_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
