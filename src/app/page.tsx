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

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
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
