"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Save, Check, RefreshCw, Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/components/Toast";

const tabList = [
  { id: "company", label: "Företagsprofil" },
  { id: "payment", label: "Betalning" },
  { id: "defaults", label: "Standardvärden" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company");
  const [saved, setSaved] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [company, setCompany] = useState({
    companyName: "",
    orgNumber: "",
    vatNumber: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    zipCode: "",
    logo: "",
    primaryColor: "#4f46e5",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [payment, setPayment] = useState({
    bankgiro: "",
    plusgiro: "",
    bankName: "",
    iban: "",
    bic: "",
    defaultTerms: "30",
    lateInterest: "8",
    reminderFee: "60",
  });

  const [defaults, setDefaults] = useState({
    quoteValidity: "30",
    vatRate: "25",
    currency: "SEK",
    language: "sv",
    invoicePrefix: "FAK",
    quotePrefix: "QT",
    footerNote: "",
    emailSignature: "",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.company) setCompany((prev) => ({ ...prev, ...data.company }));
          if (data.payment) setPayment((prev) => ({ ...prev, ...data.payment }));
          if (data.defaults) setDefaults((prev) => ({ ...prev, ...data.defaults }));
        }
      } catch {
        // Keep defaults on error
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast("Endast bilder är tillåtna", "error");
      return;
    }
    if (file.size > 500_000) {
      toast("Bilden är för stor (max 500 KB)", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setCompany((prev) => ({ ...prev, logo: result }));
        toast("Logotyp uppladdad", "success");
      }
    };
    reader.onerror = () => toast("Kunde inte läsa filen", "error");
    reader.readAsDataURL(file);
  }

  async function handleSave(section: string) {
    const payload: Record<string, unknown> = {};
    if (section === "company") payload.company = company;
    if (section === "payment") payload.payment = payment;
    if (section === "defaults") payload.defaults = defaults;

    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSaved(section);
      setTimeout(() => setSaved(null), 2000);
      toast("Inställningar sparade!", "success");
    } catch {
      toast("Kunde inte spara inställningar.", "error");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Inställningar</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl border border-gray-100 shadow-sm p-1 w-full sm:w-fit overflow-x-auto scrollbar-hide">
        {tabList.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0",
              activeTab === tab.id
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Company profile tab */}
      {activeTab === "company" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-5">
            Företagsinformation
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Denna information visas på offerter och fakturor.
          </p>

          {/* Logo upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Företagslogotyp
            </label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                {company.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={company.logo}
                    alt="Logotyp"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-300" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-fit"
                >
                  <Upload className="w-3.5 h-3.5" />
                  {company.logo ? "Byt logotyp" : "Ladda upp logotyp"}
                </button>
                {company.logo && (
                  <button
                    type="button"
                    onClick={() => setCompany({ ...company, logo: "" })}
                    className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 bg-white border border-red-100 rounded-lg hover:bg-red-50 transition-colors w-fit"
                  >
                    <X className="w-3.5 h-3.5" />
                    Ta bort
                  </button>
                )}
                <p className="text-[11px] text-gray-400">
                  PNG, JPG eller SVG. Max 500 KB.
                </p>
              </div>
            </div>
          </div>

          {/* Brand color */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Varumärkesfärg
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={company.primaryColor}
                onChange={(e) => setCompany({ ...company, primaryColor: e.target.value })}
                className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={company.primaryColor}
                onChange={(e) => setCompany({ ...company, primaryColor: e.target.value })}
                placeholder="#4f46e5"
                className="form-input w-32 font-mono text-sm"
              />
              <p className="text-xs text-gray-400">
                Används som accentfärg på dina dokument.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Företagsnamn
              </label>
              <input
                type="text"
                value={company.companyName}
                onChange={(e) => setCompany({ ...company, companyName: e.target.value })}
                placeholder="Ditt Företag AB"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Organisationsnummer
              </label>
              <input
                type="text"
                value={company.orgNumber}
                onChange={(e) => setCompany({ ...company, orgNumber: e.target.value })}
                placeholder="556xxx-xxxx"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                VAT-nummer
              </label>
              <input
                type="text"
                value={company.vatNumber}
                onChange={(e) => setCompany({ ...company, vatNumber: e.target.value })}
                placeholder="SE556xxxxxxxxx01"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                E-post
              </label>
              <input
                type="email"
                value={company.email}
                onChange={(e) => setCompany({ ...company, email: e.target.value })}
                placeholder="info@foretag.se"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Telefon
              </label>
              <input
                type="tel"
                value={company.phone}
                onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                placeholder="+46 70 123 45 67"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Webbplats
              </label>
              <input
                type="url"
                value={company.website}
                onChange={(e) => setCompany({ ...company, website: e.target.value })}
                placeholder="https://foretag.se"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Adress
              </label>
              <input
                type="text"
                value={company.address}
                onChange={(e) => setCompany({ ...company, address: e.target.value })}
                placeholder="Storgatan 1"
                className="form-input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Postnummer
                </label>
                <input
                  type="text"
                  value={company.zipCode}
                  onChange={(e) => setCompany({ ...company, zipCode: e.target.value })}
                  placeholder="111 43"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Stad
                </label>
                <input
                  type="text"
                  value={company.city}
                  onChange={(e) => setCompany({ ...company, city: e.target.value })}
                  placeholder="Stockholm"
                  className="form-input"
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={() => handleSave("company")}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              {saved === "company" ? (
                <>
                  <Check className="w-4 h-4" />
                  Sparat!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Spara inställningar
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Payment tab */}
      {activeTab === "payment" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-2">
              Bankuppgifter
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Dessa uppgifter visas på dina fakturor.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Bankgiro
                </label>
                <input
                  type="text"
                  value={payment.bankgiro}
                  onChange={(e) => setPayment({ ...payment, bankgiro: e.target.value })}
                  placeholder="123-4567"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Plusgiro
                </label>
                <input
                  type="text"
                  value={payment.plusgiro}
                  onChange={(e) => setPayment({ ...payment, plusgiro: e.target.value })}
                  placeholder="12 34 56-7"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Banknamn
                </label>
                <input
                  type="text"
                  value={payment.bankName}
                  onChange={(e) => setPayment({ ...payment, bankName: e.target.value })}
                  placeholder="Swedbank"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  IBAN
                </label>
                <input
                  type="text"
                  value={payment.iban}
                  onChange={(e) => setPayment({ ...payment, iban: e.target.value })}
                  placeholder="SE00 0000 0000 0000 0000 0000"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  BIC/SWIFT
                </label>
                <input
                  type="text"
                  value={payment.bic}
                  onChange={(e) => setPayment({ ...payment, bic: e.target.value })}
                  placeholder="SWEDSESS"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-2">
              Betalningsvillkor
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Standardvillkor för nya fakturor.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Standard betaltid
                </label>
                <select
                  value={payment.defaultTerms}
                  onChange={(e) => setPayment({ ...payment, defaultTerms: e.target.value })}
                  className="form-input"
                >
                  <option value="0">Omedelbart</option>
                  <option value="10">10 dagar netto</option>
                  <option value="20">20 dagar netto</option>
                  <option value="30">30 dagar netto</option>
                  <option value="45">45 dagar netto</option>
                  <option value="60">60 dagar netto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Dröjsmålsränta (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={payment.lateInterest}
                  onChange={(e) => setPayment({ ...payment, lateInterest: e.target.value })}
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Påminnelseavgift (kr)
                </label>
                <input
                  type="number"
                  min="0"
                  value={payment.reminderFee}
                  onChange={(e) => setPayment({ ...payment, reminderFee: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => handleSave("payment")}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            {saved === "payment" ? (
              <>
                <Check className="w-4 h-4" />
                Sparat!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Spara betalningsinställningar
              </>
            )}
          </button>
        </div>
      )}

      {/* Defaults tab */}
      {activeTab === "defaults" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-2">
              Dokument-inställningar
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Standardvärden som används vid skapande av nya offerter och fakturor.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Offertens giltighet (dagar)
                </label>
                <select
                  value={defaults.quoteValidity}
                  onChange={(e) => setDefaults({ ...defaults, quoteValidity: e.target.value })}
                  className="form-input"
                >
                  <option value="14">14 dagar</option>
                  <option value="30">30 dagar</option>
                  <option value="45">45 dagar</option>
                  <option value="60">60 dagar</option>
                  <option value="90">90 dagar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Momssats (%)
                </label>
                <select
                  value={defaults.vatRate}
                  onChange={(e) => setDefaults({ ...defaults, vatRate: e.target.value })}
                  className="form-input"
                >
                  <option value="0">0% (momsfritt)</option>
                  <option value="6">6%</option>
                  <option value="12">12%</option>
                  <option value="25">25%</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Valuta
                </label>
                <select
                  value={defaults.currency}
                  onChange={(e) => setDefaults({ ...defaults, currency: e.target.value })}
                  className="form-input"
                >
                  <option value="SEK">SEK - Svensk krona</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="NOK">NOK - Norsk krona</option>
                  <option value="DKK">DKK - Dansk krona</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Språk
                </label>
                <select
                  value={defaults.language}
                  onChange={(e) => setDefaults({ ...defaults, language: e.target.value })}
                  className="form-input"
                >
                  <option value="sv">Svenska</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-2">
              Numrering
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Prefix för automatisk numrering av offerter och fakturor.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Offert-prefix
                </label>
                <input
                  type="text"
                  value={defaults.quotePrefix}
                  onChange={(e) => setDefaults({ ...defaults, quotePrefix: e.target.value })}
                  placeholder="QT"
                  className="form-input"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Resultat: {defaults.quotePrefix}-2026-001
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Faktura-prefix
                </label>
                <input
                  type="text"
                  value={defaults.invoicePrefix}
                  onChange={(e) => setDefaults({ ...defaults, invoicePrefix: e.target.value })}
                  placeholder="FAK"
                  className="form-input"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Resultat: {defaults.invoicePrefix}-2026-001
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-2">
              Texter
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Standardtexter som läggs till på dokument.
            </p>
            <div className="space-y-5 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Fotnotstext på fakturor/offerter
                </label>
                <textarea
                  value={defaults.footerNote}
                  onChange={(e) => setDefaults({ ...defaults, footerNote: e.target.value })}
                  rows={2}
                  placeholder="T.ex. Tack för ert förtroende! Vid frågor kontakta oss."
                  className="form-input resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  E-postsignatur
                </label>
                <textarea
                  value={defaults.emailSignature}
                  onChange={(e) => setDefaults({ ...defaults, emailSignature: e.target.value })}
                  rows={3}
                  placeholder="Med vänliga hälsningar,&#10;Ditt Företag AB"
                  className="form-input resize-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => handleSave("defaults")}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            {saved === "defaults" ? (
              <>
                <Check className="w-4 h-4" />
                Sparat!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Spara standardvärden
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
