import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Priser – Enkla, transparenta planer",
  description:
    "Börja gratis, väx i din takt. Offert Pro erbjuder planer från 0 kr/mån. Ingen bindningstid, inget kreditkort krävs. Jämför Gratis, Starter, Pro och Business.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Priser – Offert Pro",
    description: "Planer från 0 kr/mån. Gratis att börja, ingen bindningstid.",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
