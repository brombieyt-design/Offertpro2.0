/** Supported locales for the marketing site. Dashboard remains Swedish-only for now. */
export const locales = ["sv", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sv";

/** Display names for the language switcher */
export const localeNames: Record<Locale, string> = {
  sv: "Svenska",
  en: "English",
};

/** BCP 47 language tags for hreflang and Open Graph */
export const localeTags: Record<Locale, string> = {
  sv: "sv-SE",
  en: "en",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
