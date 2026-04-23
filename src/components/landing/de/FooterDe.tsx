import Link from "next/link";
import { Mail } from "lucide-react";
import LanguageSwitcher from "@/components/landing/LanguageSwitcher";

const columns = [
  {
    title: "Produkt",
    links: [
      { label: "Funktionsweise", href: "/de/funktionsweise" },
      { label: "Leistungen", href: "/de/leistungen" },
      { label: "Preise", href: "/de/pricing" },
      { label: "Integrationen", href: "/de/integrationen" },
      { label: "Für Unternehmen", href: "/de/fuer-unternehmen" },
      { label: "Für KI", href: "/de/for-ai" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Blog", href: "/de/blog" },
      { label: "Redaktionsteam", href: "/de/authors" },
      { label: "Änderungsprotokoll", href: "/de/changelog" },
      { label: "Presse", href: "/de/presse" },
      { label: "Kontakt", href: "mailto:hello@offertpro.se" },
      { label: "Schwedische Seite", href: "/" },
      { label: "Englische Seite", href: "/en" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Kontakt", href: "/de/kontakt" },
      { label: "FAQ", href: "/de/faq" },
      { label: "Sicherheit", href: "/de/sicherheit" },
      { label: "Status", href: "/de/status" },
      { label: "Anmelden", href: "/login" },
      { label: "Konto erstellen", href: "/signup" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Datenschutz", href: "/de/datenschutz" },
      { label: "AGB", href: "/de/agb" },
      { label: "AVV", href: "/de/avv" },
      { label: "Cookies", href: "/de/cookies" },
    ],
  },
];

export default function FooterDe() {
  return (
    <footer className="bg-gray-950 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 lg:gap-12">
          <div className="col-span-2">
            <Link href="/de" className="inline-flex items-center gap-2.5 mb-6 group">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-brand-600 transition-colors duration-300">
                <span className="text-white text-xs font-bold">OP</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Offert Pro
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-8">
              Die moderne Plattform für Angebote und Rechnungen. Erstellen Sie
              professionelle Dokumente, verfolgen Sie in Echtzeit und gewinnen
              Sie mehr Aufträge.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:hello@offertpro.se"
                className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-gray-300 transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
                hello@offertpro.se
              </a>
            </div>
            <div className="mt-6">
              <LanguageSwitcher variant="inline" />
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-6">
                {col.title}
              </h4>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            &copy; 2026 Offert Pro. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
