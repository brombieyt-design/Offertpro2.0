import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LogoBar from "@/components/landing/LogoBar";
import SocialProof from "@/components/landing/SocialProof";
import Features from "@/components/landing/Features";
import Comparison from "@/components/landing/Comparison";
import UseCases from "@/components/landing/UseCases";
import Results from "@/components/landing/Results";
import Integrations from "@/components/landing/Integrations";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import TrustBadges from "@/components/landing/TrustBadges";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Offert Pro – Skapa professionella offerter & fakturor för småföretag",
  alternates: { canonical: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Är det verkligen gratis att komma igång?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja! Vår gratisplan inkluderar upp till 5 offerter per månad, utan kreditkort. Du kan uppgradera när som helst om du behöver mer.",
      },
    },
    {
      "@type": "Question",
      name: "Hur fungerar e-signaturerna?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dina kunder kan signera offerter direkt i webbläsaren. Du får en notis så fort offerten är signerad och kan följa statusen i realtid.",
      },
    },
    {
      "@type": "Question",
      name: "Kan jag använda mina egna mallar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolut. Du kan skapa egna mallar med ditt varumärke, logotyp och färger. Spara dem för att snabbt återanvända vid framtida offerter.",
      },
    },
    {
      "@type": "Question",
      name: "Vilka betalningsmetoder stöds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vi stöder betalning via kort (Visa, Mastercard), Swish och faktura. Alla betalningar hanteras säkert via Stripe.",
      },
    },
    {
      "@type": "Question",
      name: "Kan jag byta plan när som helst?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, du kan uppgradera eller nedgradera din plan när som helst. Ändringen träder i kraft direkt och du betalar bara mellanskillnaden.",
      },
    },
    {
      "@type": "Question",
      name: "Hur säker är min data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vi använder kryptering i vila och under överföring. All data lagras på servrar inom EU och vi följer GDPR fullt ut.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Hem", item: "https://offertpro.se" },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <Hero />
      <LogoBar />
      <SocialProof />
      <Features />
      <Comparison />
      <UseCases />
      <Results />
      <Integrations />
      <Pricing />
      <Testimonials />
      <TrustBadges />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
