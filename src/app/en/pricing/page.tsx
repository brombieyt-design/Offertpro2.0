import type { Metadata } from "next";
import PricingClient from "./PricingClient";
import NavbarEn from "@/components/landing/en/NavbarEn";
import FooterEn from "@/components/landing/en/FooterEn";
import { getDictionary } from "@/i18n/dictionaries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary("en");
  return {
    title: dict.pricing.meta.title,
    description: dict.pricing.meta.description,
    alternates: {
      canonical: `${SITE_URL}/en/pricing`,
      languages: {
        "sv-SE": `${SITE_URL}/pricing`,
        en: `${SITE_URL}/en/pricing`,
        "x-default": `${SITE_URL}/pricing`,
      },
    },
    openGraph: {
      title: dict.pricing.meta.title,
      description: dict.pricing.meta.description,
      url: `${SITE_URL}/en/pricing`,
      locale: "en",
      alternateLocale: ["sv_SE"],
      type: "website",
    },
  };
}

export default async function EnPricingPage() {
  const dict = await getDictionary("en");
  return (
    <div className="min-h-screen bg-white">
      <NavbarEn />
      <PricingClient dict={dict} />
      <FooterEn />
    </div>
  );
}
