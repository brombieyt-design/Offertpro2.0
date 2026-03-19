import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + " kr";
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("sv-SE");
}

export function formatPercent(value: number): string {
  return `${value}%`;
}
