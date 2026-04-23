export type CookieCategory = "essential" | "preferences" | "analytics";

export interface CookieRow {
  name: string;
  category: CookieCategory;
  /** Lifetime in plain words */
  lifetime: { sv: string; en: string; de: string };
  purpose: { sv: string; en: string; de: string };
}

/**
 * Single source of truth for the cookies we set. Surfaced on the
 * cookie-policy pages in all three locales.
 */
export const cookies: CookieRow[] = [
  {
    name: "op_session",
    category: "essential",
    lifetime: {
      sv: "Session (raderas när du stänger fliken)",
      en: "Session (cleared when you close the tab)",
      de: "Sitzung (wird beim Schließen des Tabs gelöscht)",
    },
    purpose: {
      sv: "Håller dig inloggad under sessionen.",
      en: "Keeps you signed in during the session.",
      de: "Hält Sie während der Sitzung angemeldet.",
    },
  },
  {
    name: "op_csrf",
    category: "essential",
    lifetime: {
      sv: "Session",
      en: "Session",
      de: "Sitzung",
    },
    purpose: {
      sv: "Skydd mot CSRF-attacker (Cross-Site Request Forgery).",
      en: "Protects against CSRF (Cross-Site Request Forgery) attacks.",
      de: "Schutz vor CSRF-Angriffen (Cross-Site Request Forgery).",
    },
  },
  {
    name: "op_locale",
    category: "preferences",
    lifetime: {
      sv: "1 år",
      en: "1 year",
      de: "1 Jahr",
    },
    purpose: {
      sv: "Kommer ihåg ditt språkval (svenska, engelska, tyska).",
      en: "Remembers your language choice (Swedish, English, German).",
      de: "Merkt sich Ihre Sprachauswahl (Schwedisch, Englisch, Deutsch).",
    },
  },
  {
    name: "op_theme",
    category: "preferences",
    lifetime: {
      sv: "1 år",
      en: "1 year",
      de: "1 Jahr",
    },
    purpose: {
      sv: "Kommer ihåg ljust eller mörkt tema.",
      en: "Remembers light or dark theme preference.",
      de: "Merkt sich helles oder dunkles Design.",
    },
  },
  {
    name: "_pk_id, _pk_ses (Plausible)",
    category: "analytics",
    lifetime: {
      sv: "Anonyma räkningar, ingen cookie sätts utan samtycke",
      en: "Anonymous counts, no cookie is set without consent",
      de: "Anonyme Zählung, kein Cookie ohne Einwilligung",
    },
    purpose: {
      sv: "Cookie-fri webbanalys (Plausible) inom EU. Ingen personprofilering, ingen tredjepartsdelning.",
      en: "Cookie-less web analytics (Plausible), hosted in the EU. No profiling, no third-party sharing.",
      de: "Cookie-freie Web-Analyse (Plausible), gehostet in der EU. Keine Profilbildung, keine Weitergabe an Dritte.",
    },
  },
];
