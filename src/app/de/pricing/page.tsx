import type { Metadata } from "next";
import PricingClient from "./PricingClient";
import NavbarDe from "@/components/landing/de/NavbarDe";
import FooterDe from "@/components/landing/de/FooterDe";
import { getDictionary } from "@/i18n/dictionaries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary("de");
  return {
    title: dict.pricing.meta.title,
    description: dict.pricing.meta.description,
    alternates: {
      canonical: `${SITE_URL}/de/pricing`,
      languages: {
        "sv-SE": `${SITE_URL}/pricing`,
        en: `${SITE_URL}/en/pricing`,
        de: `${SITE_URL}/de/pricing`,
        "x-default": `${SITE_URL}/pricing`,
      },
    },
    openGraph: {
      title: dict.pricing.meta.title,
      description: dict.pricing.meta.description,
      url: `${SITE_URL}/de/pricing`,
      locale: "de",
      alternateLocale: ["sv_SE", "en"],
      type: "website",
    },
  };
}

export default async function DePricingPage() {
  const dict = await getDictionary("de");
  return (
    <div className="min-h-screen bg-white">
      <NavbarDe />
      <PricingClient dict={dict} />
      <FooterDe />
    </div>
  );
}
