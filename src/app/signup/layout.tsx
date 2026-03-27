import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skapa konto gratis",
  description:
    "Registrera dig gratis på Offert Pro. Skapa professionella offerter och fakturor på minuter – inget kreditkort krävs.",
  alternates: { canonical: "/signup" },
  openGraph: {
    title: "Skapa konto gratis – Offert Pro",
    description:
      "Kom igång gratis med Offert Pro. 5 offerter/mån, PDF-export, e-signaturer och realtidsspårning.",
  },
  robots: { index: true, follow: true },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
