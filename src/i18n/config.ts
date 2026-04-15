/** Supported locales for the marketing site. Dashboard remains Swedish-only for now. */
export const locales = ["sv", "en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sv";

/** Display names for the language switcher */
export const localeNames: Record<Locale, string> = {
  sv: "Svenska",
  en: "English",
  de: "Deutsch",
};

/** BCP 47 language tags for hreflang and Open Graph */
export const localeTags: Record<Locale, string> = {
  sv: "sv-SE",
  en: "en",
  de: "de",
};

/**
 * Path prefix used for each locale. Swedish lives at the root (historical
 * SEO); English and German live under their own prefix.
 */
export const localePathPrefix: Record<Locale, string> = {
  sv: "",
  en: "/en",
  de: "/de",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
