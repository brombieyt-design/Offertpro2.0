import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logga in",
  description:
    "Logga in på ditt Offert Pro-konto. Skapa och hantera professionella offerter och fakturor för ditt företag.",
  alternates: { canonical: "/login" },
  openGraph: {
    title: "Logga in – Offert Pro",
    description:
      "Logga in för att skapa offerter, spåra kundengagemang och hantera dina fakturor.",
  },
  robots: { index: true, follow: true },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
