import "server-only";
import type { Locale } from "./config";
import { defaultLocale, isLocale } from "./config";

/** Lazy dictionary loader. Only the requested locale is bundled per request. */
const dictionaries = {
  sv: () => import("./dictionaries/sv.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  de: () => import("./dictionaries/de.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;

export async function getDictionary(locale: string): Promise<Dictionary> {
  const resolved = isLocale(locale) ? locale : defaultLocale;
  return dictionaries[resolved]();
}
