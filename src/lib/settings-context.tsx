"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { formatCurrency as fmt } from "@/lib/utils";

export interface AppSettings {
  company?: {
    companyName?: string;
    orgNumber?: string;
    vatNumber?: string;
    email?: string;
    phone?: string;
    website?: string;
    address?: string;
    city?: string;
    zipCode?: string;
    logo?: string;
    primaryColor?: string;
  };
  payment?: {
    bankgiro?: string;
    plusgiro?: string;
    bankName?: string;
    iban?: string;
    bic?: string;
    defaultTerms?: string;
    lateInterest?: string;
    reminderFee?: string;
  };
  defaults?: {
    quoteValidity?: string;
    vatRate?: string;
    currency?: string;
    language?: string;
    invoicePrefix?: string;
    quotePrefix?: string;
    footerNote?: string;
    emailSignature?: string;
  };
}

interface SettingsContextValue {
  settings: AppSettings;
  loading: boolean;
  currency: string;
  vatRate: number;
  formatMoney: (n: number) => string;
  refresh: () => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: {},
  loading: true,
  currency: "SEK",
  vatRate: 25,
  formatMoney: (n) => fmt(n, "SEK"),
  refresh: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>({});
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(() => {
    fetch("/api/settings")
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => setSettings(data || {}))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // Initial load + refetch on "settings-updated" event.
  // We attach a listener that syncs external state into React state -
  // setState is only called from async callbacks, never synchronously in the effect body.
  useEffect(() => {
    load();
    function onUpdate() {
      load();
    }
    window.addEventListener("settings-updated", onUpdate);
    return () => window.removeEventListener("settings-updated", onUpdate);
  }, [load]);

  const loading = !loaded;

  const currency = settings.defaults?.currency || "SEK";
  const vatRate = Number(settings.defaults?.vatRate ?? 25) || 25;
  const formatMoney = (n: number) => fmt(n, currency);

  return (
    <SettingsContext.Provider
      value={{ settings, loading, currency, vatRate, formatMoney, refresh: load }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
