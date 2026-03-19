import { Phone, Mail } from "lucide-react";

const columns = [
  {
    title: "Produkt",
    links: [
      { label: "Funktioner", href: "#funktioner" },
      { label: "Priser", href: "#priser" },
      { label: "Mallar", href: "/templates" },
      { label: "Integrationer", href: "/integrations" },
      { label: "API", href: "/api-docs" },
    ],
  },
  {
    title: "Företag",
    links: [
      { label: "Om oss", href: "/about" },
      { label: "Blogg", href: "/blog" },
      { label: "Karriär", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Hjälpcenter", href: "/help" },
      { label: "Kontakta oss", href: "/contact" },
      { label: "Integritetspolicy", href: "/privacy" },
      { label: "Villkor", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand column */}
          <div className="col-span-2">
            <a href="/" className="inline-block mb-6">
              <span className="text-xl font-bold tracking-tight text-gray-900">
                OFFERT <span className="font-light text-gray-400">PRO</span>
              </span>
            </a>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-8">
              Den moderna plattformen för offerter och fakturor. Bygg
              professionella dokument, spåra i realtid och stäng fler affärer.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+46101234567"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                <Phone className="h-4 w-4" />
                010-123 45 67
              </a>
              <a
                href="mailto:hej@offertpro.se"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
                hej@offertpro.se
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-900 mb-6">
                {col.title}
              </h4>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-gray-600 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-300">
            &copy; 2026 Offert Pro. Alla rättigheter förbehållna.
          </p>

          <div className="flex items-center gap-5">
            {/* Twitter / X */}
            <a
              href="#"
              className="text-gray-300 hover:text-gray-500 transition-colors duration-300"
              aria-label="Twitter"
            >
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              className="text-gray-300 hover:text-gray-500 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
