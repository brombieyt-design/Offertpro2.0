import { Phone, Mail } from "lucide-react";

const columns = [
  {
    title: "Produkt",
    links: [
      { label: "Hur det fungerar", href: "/hur-det-fungerar" },
      { label: "Tjänster", href: "/tjanster" },
      { label: "Priser", href: "/pricing" },
      { label: "Integrationer", href: "/tjanster#integrationer" },
    ],
  },
  {
    title: "Företag",
    links: [
      { label: "För företag", href: "/for-foretag" },
      { label: "Blogg", href: "/blog" },
      { label: "Om oss", href: "/for-foretag" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Kontakta oss", href: "mailto:hej@offertpro.se" },
      { label: "Logga in", href: "/login" },
      { label: "Skapa konto", href: "/signup" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand column */}
          <div className="col-span-2">
            <a href="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-brand-600 transition-colors duration-300">
                <span className="text-white text-xs font-bold">OP</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Offert Pro
              </span>
            </a>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-8">
              Den moderna plattformen för offerter och fakturor. Bygg
              professionella dokument, spåra i realtid och stäng fler affärer.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+46101234567"
                className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-gray-300 transition-colors duration-300"
              >
                <Phone className="h-4 w-4" />
                010-123 45 67
              </a>
              <a
                href="mailto:hej@offertpro.se"
                className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-gray-300 transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
                hej@offertpro.se
              </a>
            </div>
          </div>

          {/* Link columns */}
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

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            &copy; 2026 Offert Pro. Alla rättigheter förbehållna.
          </p>

          <div className="flex items-center gap-5">
            {/* Twitter / X */}
            <a
              href="#"
              className="text-gray-600 hover:text-gray-400 transition-colors duration-300"
              aria-label="Twitter / X"
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
              className="text-gray-600 hover:text-gray-400 transition-colors duration-300"
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
            {/* GitHub */}
            <a
              href="#"
              className="text-gray-600 hover:text-gray-400 transition-colors duration-300"
              aria-label="GitHub"
            >
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
