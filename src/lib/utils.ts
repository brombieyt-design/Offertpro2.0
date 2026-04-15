import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const CURRENCY_SUFFIX: Record<string, string> = {
  SEK: "kr",
  NOK: "kr",
  DKK: "kr",
  EUR: "€",
  USD: "$",
  GBP: "£",
};

const CURRENCY_LOCALE: Record<string, string> = {
  SEK: "sv-SE",
  NOK: "nb-NO",
  DKK: "da-DK",
  EUR: "sv-SE",
  USD: "en-US",
  GBP: "en-GB",
};

export function formatCurrency(amount: number, currency: string = "SEK"): string {
  const code = currency.toUpperCase();
  const locale = CURRENCY_LOCALE[code] || "sv-SE";
  const suffix = CURRENCY_SUFFIX[code] || code;
  const formatted = new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  // Symbol-prefix currencies (€, $, £) prefix; "kr" goes after.
  if (suffix.length === 1) return `${suffix}${formatted}`;
  return `${formatted} ${suffix}`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("sv-SE");
}

export function formatPercent(value: number): string {
  return `${value}%`;
}
