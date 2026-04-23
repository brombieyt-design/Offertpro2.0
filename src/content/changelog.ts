export type ChangeType = "added" | "changed" | "fixed";

export interface ChangelogEntry {
  version: string;
  /** ISO date */
  date: string;
  items: {
    type: ChangeType;
    /** Plain text per locale */
    sv: string;
    en: string;
    de: string;
  }[];
}

/**
 * Product changelog. Newest first. Each entry bundles items tagged
 * with a change type and translated into all three supported locales.
 * Surfaced on /changelog, /en/changelog and /de/changelog.
 */
export const changelog: ChangelogEntry[] = [
  {
    version: "2026.04",
    date: "2026-04-15",
    items: [
      {
        type: "added",
        sv: "Tyskt språkstöd: /de-marknadsträd, författarsidor och DACH-bloggartiklar.",
        en: "German locale: /de marketing tree, author pages and DACH blog articles.",
        de: "Deutsche Lokalisierung: /de-Marktbereich, Autorenseiten und DACH-Blogartikel.",
      },
      {
        type: "added",
        sv: "Redaktionella författarprofiler med Person JSON-LD för starkare E-E-A-T.",
        en: "Editorial author profiles with Person JSON-LD for stronger E-E-A-T signals.",
        de: "Redaktionelle Autorenprofile mit Person-JSON-LD für stärkere E-E-A-T-Signale.",
      },
      {
        type: "changed",
        sv: "Trespråkig hreflang (sv-SE, en, de, x-default) på samtliga marknadssidor och bloggposter.",
        en: "Tri-locale hreflang (sv-SE, en, de, x-default) on every marketing page and blog post.",
        de: "Dreisprachiges hreflang (sv-SE, en, de, x-default) auf jeder Marketingseite und jedem Blogartikel.",
      },
    ],
  },
  {
    version: "2026.03",
    date: "2026-03-28",
    items: [
      {
        type: "added",
        sv: "Cling-stil interaktiva offertsidor med delningslänkar och e-signering i webbläsaren.",
        en: "Cling-style interactive proposal pages with share links and in-browser e-signing.",
        de: "Cling-artige interaktive Angebotsseiten mit Freigabelinks und E-Signatur im Browser.",
      },
      {
        type: "added",
        sv: "Engelskt marknadsträd: /en med prissättning, blogg och LLM-sida.",
        en: "English marketing tree: /en with pricing, blog and LLM page.",
        de: "Englischer Marketingbereich: /en mit Preisen, Blog und LLM-Seite.",
      },
      {
        type: "fixed",
        sv: "Supportbotten visas inte längre på offertwizarden eller på offentliga offertsidor.",
        en: "The support bot is no longer shown on the proposal wizard or on public offer pages.",
        de: "Der Support-Bot wird nicht mehr im Angebots-Wizard oder auf öffentlichen Angebotsseiten angezeigt.",
      },
    ],
  },
  {
    version: "2026.02",
    date: "2026-02-18",
    items: [
      {
        type: "added",
        sv: "App-launch-redo: Postgres, asynkron databas, lint-städad kodbas och tom produktionsseed.",
        en: "App launch-ready: Postgres, async DB, lint-clean codebase and empty production seed.",
        de: "App startbereit: Postgres, asynchrone DB, lint-saubere Codebasis und leerer Produktions-Seed.",
      },
      {
        type: "added",
        sv: "Förfallna fakturor: påminnelse-e-post med förseningsavgift och dröjsmålsränta.",
        en: "Overdue invoices: reminder email with late fee and statutory interest.",
        de: "Überfällige Rechnungen: Mahn-E-Mail mit Mahnkostenpauschale und Verzugszinsen.",
      },
    ],
  },
  {
    version: "2026.01",
    date: "2026-01-25",
    items: [
      {
        type: "added",
        sv: "Betalningsregistrering med automatiska statusuppdateringar på fakturor.",
        en: "Payment recording with automatic invoice status updates.",
        de: "Zahlungserfassung mit automatischen Rechnungsstatus-Aktualisierungen.",
      },
      {
        type: "added",
        sv: "Flervalutastöd och konfigurerbar moms genom hela appen.",
        en: "Multi-currency support and configurable VAT across the app.",
        de: "Mehrwährungsunterstützung und konfigurierbare MwSt. in der gesamten App.",
      },
      {
        type: "changed",
        sv: "PDF-export använder nu företagslogotyp, varumärkesfärg och registreringsadress.",
        en: "PDF export now uses company logo, brand colour and registered address.",
        de: "PDF-Export verwendet jetzt Firmenlogo, Markenfarbe und eingetragene Geschäftsadresse.",
      },
    ],
  },
  {
    version: "2025.12",
    date: "2025-12-14",
    items: [
      {
        type: "added",
        sv: "Sparade poster-bibliotek, \"spara som post\", logotypsuppladdning och val av varumärkesfärg.",
        en: "Saved-items library, save-as-item, logo upload and brand colour picker.",
        de: "Bibliothek gespeicherter Positionen, &bdquo;Als Position speichern&ldquo;, Logo-Upload und Markenfarbwähler.",
      },
      {
        type: "added",
        sv: "Kunddetaljsidor, CSV-import, sparade poster med taggar.",
        en: "Customer detail pages, CSV import and saved items with tags.",
        de: "Kundendetailseiten, CSV-Import und gespeicherte Positionen mit Tags.",
      },
    ],
  },
  {
    version: "2025.11",
    date: "2025-11-20",
    items: [
      {
        type: "added",
        sv: "PWA-stöd, kommandopalett, tangentbordsgenvägar och mikrointeraktioner.",
        en: "PWA support, command palette, keyboard shortcuts and micro-interactions.",
        de: "PWA-Unterstützung, Befehlspalette, Tastaturkürzel und Mikrointeraktionen.",
      },
      {
        type: "added",
        sv: "Tillgänglighet (WCAG 2.1 AA), mobilnavigering, säkerhetsheaders och feltoasts.",
        en: "Accessibility (WCAG 2.1 AA), mobile navigation, security headers and error toasts.",
        de: "Barrierefreiheit (WCAG 2.1 AA), mobile Navigation, Sicherheits-Header und Fehler-Toasts.",
      },
    ],
  },
];

export function getChangelog(): ChangelogEntry[] {
  return [...changelog].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
