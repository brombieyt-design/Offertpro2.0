"use client";

import { use, useEffect, useMemo, useState } from "react";
import { Check, X, Loader2, FileText, Calendar, Clock, CheckCircle2, ShieldCheck } from "lucide-react";

interface PublicQuote {
  id: string;
  number: string;
  customer: { name: string; company?: string };
  items: {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
    optional?: boolean;
    selected?: boolean;
  }[];
  status: string;
  createdAt: string;
  validUntil: string;
  total: number;
  coverImage?: string;
  introText?: string;
  termsText?: string;
  openedAt?: string;
  acceptedAt?: string;
  rejectedAt?: string;
  signedBy?: string;
  company: {
    companyName?: string;
    logo?: string;
    primaryColor?: string;
    email?: string;
    phone?: string;
    website?: string;
  };
  defaults: { currency: string };
}

export default function PublicQuotePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const [quote, setQuote] = useState<PublicQuote | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [signName, setSignName] = useState("");
  const [showSignModal, setShowSignModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/quotes/public?token=${encodeURIComponent(token)}`)
      .then((r) => {
        if (!r.ok) throw new Error(r.status === 404 ? "Offerten hittades inte" : "Kunde inte läsa offerten");
        return r.json();
      })
      .then((data) => {
        if (!cancelled) setQuote(data);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || "Fel");
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const accent = quote?.company?.primaryColor || "#4F46E5";
  const currency = quote?.defaults?.currency || "SEK";

  const fmt = useMemo(
    () => (n: number) => {
      const code = currency.toUpperCase();
      const locale = code === "USD" || code === "GBP" ? "en-US" : code === "EUR" ? "de-DE" : "sv-SE";
      const formatted = new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(n);
      const suffix = code === "USD" ? "$" : code === "EUR" ? "€" : code === "GBP" ? "£" : code;
      return suffix.length === 1 ? `${suffix}${formatted}` : `${formatted} ${suffix}`;
    },
    [currency]
  );

  async function toggleItem(itemId: string, selected: boolean) {
    if (!quote) return;
    setBusy(itemId);
    try {
      const res = await fetch("/api/quotes/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action: "toggle", itemId, selected }),
      });
      if (res.ok) {
        const data = await res.json();
        setQuote(data);
      }
    } finally {
      setBusy(null);
    }
  }

  async function accept() {
    if (!quote) return;
    setBusy("accept");
    try {
      const res = await fetch("/api/quotes/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action: "accept", signedBy: signName || quote.customer.name }),
      });
      if (res.ok) {
        const data = await res.json();
        setQuote(data);
        setShowSignModal(false);
      }
    } finally {
      setBusy(null);
    }
  }

  async function reject() {
    if (!quote) return;
    setBusy("reject");
    try {
      const res = await fetch("/api/quotes/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action: "reject" }),
      });
      if (res.ok) {
        const data = await res.json();
        setQuote(data);
        setShowRejectModal(false);
      }
    } finally {
      setBusy(null);
    }
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h1 className="text-lg font-semibold text-gray-900 mb-2">Offerten kunde inte visas</h1>
          <p className="text-sm text-gray-500">{loadError}</p>
        </div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  const isDecided = quote.status === "accepted" || quote.status === "rejected";
  const companyName = quote.company.companyName || "Offert Pro";

  return (
    <div className="min-h-screen bg-gray-50" style={{ ["--accent" as string]: accent } as React.CSSProperties}>
      {/* Hero */}
      <div className="relative">
        {quote.coverImage ? (
          <div
            className="h-64 md:h-80 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${quote.coverImage})` }}
          />
        ) : (
          <div
            className="h-40 md:h-56 w-full"
            style={{
              background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 50%, ${accent}99 100%)`,
            }}
          />
        )}

        {/* Company header overlay */}
        <div className="absolute inset-x-0 top-0 px-6 py-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            {quote.company.logo ? (
              <img src={quote.company.logo} alt={companyName} className="h-9 w-9 rounded-lg bg-white/10 object-contain p-1" />
            ) : (
              <div className="h-9 w-9 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center text-sm font-bold">
                {companyName.slice(0, 2).toUpperCase()}
              </div>
            )}
            <span className="font-semibold">{companyName}</span>
          </div>
          <span className="text-xs tracking-wider uppercase opacity-80">Offert {quote.number}</span>
        </div>
      </div>

      {/* Main card */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 -mt-20 md:-mt-24 relative">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Title section */}
          <div className="px-6 md:px-10 pt-10 pb-8 border-b border-gray-100">
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">Offert till</p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {quote.customer.company || quote.customer.name}
            </h1>
            {quote.customer.company && (
              <p className="text-sm text-gray-500">Att: {quote.customer.name}</p>
            )}

            <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                Skapad {quote.createdAt}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                Giltig till {quote.validUntil}
              </div>
            </div>
          </div>

          {/* Intro */}
          {quote.introText && (
            <div className="px-6 md:px-10 py-8 border-b border-gray-100">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{quote.introText}</p>
            </div>
          )}

          {/* Items */}
          <div className="px-6 md:px-10 py-8 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-5">
              Innehåll
            </h2>
            <div className="space-y-3">
              {quote.items.map((item) => {
                const lineTotal = item.quantity * item.unitPrice * (1 - (item.discount ?? 0) / 100);
                const included = !item.optional || item.selected !== false;
                const isOptional = !!item.optional;
                return (
                  <div
                    key={item.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
                      included ? "border-gray-200 bg-white" : "border-gray-100 bg-gray-50 opacity-60"
                    }`}
                  >
                    {isOptional && !isDecided ? (
                      <button
                        type="button"
                        disabled={busy === item.id}
                        onClick={() => toggleItem(item.id, !included)}
                        className="shrink-0 mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all disabled:opacity-50"
                        style={{
                          borderColor: included ? accent : "#d1d5db",
                          background: included ? accent : "transparent",
                        }}
                        aria-label={included ? "Ta bort" : "Lägg till"}
                      >
                        {included && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </button>
                    ) : (
                      <div className="shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center" style={{ background: included ? `${accent}15` : "#f3f4f6" }}>
                        <Check className="w-3 h-3" style={{ color: included ? accent : "#9ca3af" }} strokeWidth={3} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900">{item.description}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.quantity} × {fmt(item.unitPrice)}
                            {item.discount ? ` · −${item.discount}%` : ""}
                            {isOptional && <span className="ml-2 text-gray-400">· Valfri</span>}
                          </p>
                        </div>
                        <div className="text-right font-semibold text-gray-900 whitespace-nowrap">
                          {fmt(lineTotal)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex items-baseline justify-between">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Totalt</span>
              <span className="text-3xl font-bold" style={{ color: accent }}>
                {fmt(quote.total)}
              </span>
            </div>
          </div>

          {/* Terms */}
          {quote.termsText && (
            <div className="px-6 md:px-10 py-8 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                Villkor
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{quote.termsText}</p>
            </div>
          )}

          {/* Actions */}
          <div className="px-6 md:px-10 py-8">
            {quote.status === "accepted" ? (
              <div className="flex items-start gap-4 p-5 rounded-xl" style={{ background: `${accent}10` }}>
                <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" style={{ color: accent }} />
                <div>
                  <p className="font-semibold text-gray-900">Offerten är accepterad</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Signerad av <strong>{quote.signedBy || quote.customer.name}</strong>
                    {quote.acceptedAt && ` den ${new Date(quote.acceptedAt).toLocaleString("sv-SE")}`}
                  </p>
                </div>
              </div>
            ) : quote.status === "rejected" ? (
              <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-100">
                <X className="w-6 h-6 shrink-0 mt-0.5 text-gray-500" />
                <div>
                  <p className="font-semibold text-gray-900">Offerten har avvisats</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {quote.rejectedAt && `Avvisad den ${new Date(quote.rejectedAt).toLocaleString("sv-SE")}`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowSignModal(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white shadow-sm hover:shadow-md transition-all"
                  style={{ background: accent }}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Acceptera offerten
                </button>
                <button
                  type="button"
                  onClick={() => setShowRejectModal(true)}
                  className="sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                  Avvisa
                </button>
              </div>
            )}

            <p className="mt-6 text-xs text-gray-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Säker signering · {companyName}
            </p>
          </div>
        </div>

        {/* Company footer */}
        <div className="text-center py-10 text-xs text-gray-400">
          {quote.company.email && <span>{quote.company.email}</span>}
          {quote.company.email && quote.company.phone && <span className="mx-2">·</span>}
          {quote.company.phone && <span>{quote.company.phone}</span>}
          {quote.company.website && (
            <>
              <span className="mx-2">·</span>
              <a href={quote.company.website} className="hover:text-gray-600">{quote.company.website}</a>
            </>
          )}
        </div>
      </div>

      {/* Sign modal */}
      {showSignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Acceptera offerten</h3>
            <p className="text-sm text-gray-500 mb-5">
              Genom att skriva ditt namn nedan godkänner du offerten som bindande.
            </p>
            <label className="text-xs font-medium text-gray-600 block mb-1.5">Ditt namn</label>
            <input
              type="text"
              value={signName}
              onChange={(e) => setSignName(e.target.value)}
              placeholder={quote.customer.name}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none transition-colors"
            />
            <div className="mt-2 p-3 rounded-lg bg-gray-50 text-xs text-gray-600">
              Totalt belopp: <strong>{fmt(quote.total)}</strong>
            </div>
            <div className="mt-6 flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowSignModal(false)}
                className="px-4 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
              >
                Avbryt
              </button>
              <button
                type="button"
                disabled={busy === "accept"}
                onClick={accept}
                className="px-5 py-2.5 rounded-lg font-semibold text-white shadow-sm disabled:opacity-50 inline-flex items-center gap-2"
                style={{ background: accent }}
              >
                {busy === "accept" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Signera & acceptera
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Avvisa offerten?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Detta meddelar avsändaren att du inte vill gå vidare med offerten.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
              >
                Avbryt
              </button>
              <button
                type="button"
                disabled={busy === "reject"}
                onClick={reject}
                className="px-5 py-2.5 rounded-lg font-semibold text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-50 inline-flex items-center gap-2"
              >
                {busy === "reject" ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                Avvisa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
