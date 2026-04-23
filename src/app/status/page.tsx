import type { Metadata } from "next";
import { CheckCircle2, AlertTriangle, XCircle, Wrench } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  components,
  incidents,
  uptimeString,
  type ComponentStatus,
} from "@/content/status";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Systemstatus – Offert Pro",
  description:
    "Aktuell driftstatus för Offert Pro: webbapp, API, PDF, e-post, e-signaturer och databas. 90-dagars upptime och senaste incidenter.",
  alternates: {
    canonical: `${SITE_URL}/status`,
    languages: {
      "sv-SE": `${SITE_URL}/status`,
      en: `${SITE_URL}/en/status`,
      de: `${SITE_URL}/de/status`,
      "x-default": `${SITE_URL}/status`,
    },
  },
  openGraph: {
    title: "Systemstatus – Offert Pro",
    description:
      "Driftstatus för alla komponenter, 90-dagars upptime och incidenthistorik.",
    url: `${SITE_URL}/status`,
    locale: "sv_SE",
    alternateLocale: ["en", "de"],
    type: "website",
  },
};

const statusMeta: Record<
  ComponentStatus,
  { label: string; icon: typeof CheckCircle2; dot: string; text: string }
> = {
  operational: {
    label: "Fungerar",
    icon: CheckCircle2,
    dot: "bg-emerald-500",
    text: "text-emerald-700",
  },
  degraded: {
    label: "Försämrad",
    icon: AlertTriangle,
    dot: "bg-amber-500",
    text: "text-amber-700",
  },
  partial_outage: {
    label: "Delvis avbrott",
    icon: AlertTriangle,
    dot: "bg-amber-600",
    text: "text-amber-700",
  },
  major_outage: {
    label: "Större avbrott",
    icon: XCircle,
    dot: "bg-red-500",
    text: "text-red-700",
  },
  maintenance: {
    label: "Underhåll",
    icon: Wrench,
    dot: "bg-indigo-500",
    text: "text-indigo-700",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("sv-SE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function StatusPage() {
  const allOk = components.every((c) => c.status === "operational");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Systemstatus
          </p>
          <div
            className={`inline-flex items-center gap-3 px-5 py-3 rounded-full ${
              allOk ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                allOk ? "bg-emerald-500" : "bg-amber-500"
              } animate-pulse`}
            />
            <span className="text-sm font-semibold">
              {allOk
                ? "Alla system fungerar som förväntat"
                : "Vissa system rapporterar problem"}
            </span>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            Senast uppdaterad: {formatDate(new Date().toISOString())}
          </p>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Komponenter
          </h2>
          <ul className="space-y-2">
            {components.map((c) => {
              const meta = statusMeta[c.status];
              return (
                <li
                  key={c.id}
                  className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-6 py-4"
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`} />
                    <span className="text-sm font-medium text-gray-900">
                      {c.label.sv}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs text-gray-400 tabular-nums">
                      {uptimeString(c.uptime90d)} · 90 d
                    </span>
                    <span className={`text-xs font-semibold ${meta.text}`}>
                      {meta.label}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Senaste incidenter
          </h2>
          {incidents.length === 0 ? (
            <p className="text-sm text-gray-500">
              Inga incidenter att rapportera de senaste 90 dagarna.
            </p>
          ) : (
            <ul className="space-y-8">
              {incidents.map((inc) => {
                const meta = statusMeta[inc.severity];
                const status = inc.resolvedAt ? "Löst" : "Pågår";
                return (
                  <li
                    key={inc.id}
                    className="bg-white border border-gray-100 rounded-2xl p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`} />
                        <h3 className="text-base font-semibold text-gray-900">
                          {inc.title.sv}
                        </h3>
                      </div>
                      <span className="text-xs text-gray-400 tabular-nums">
                        {formatDate(inc.startedAt)}
                        {inc.resolvedAt ? ` → ${formatDate(inc.resolvedAt)}` : ""}
                        {" · "}
                        {status}
                      </span>
                    </div>
                    <ol className="space-y-3 pl-4 border-l-2 border-gray-100">
                      {inc.updates.map((u, i) => (
                        <li key={i} className="text-sm">
                          <time className="text-xs text-gray-400 tabular-nums block mb-1">
                            {formatDate(u.at)}
                          </time>
                          <p className="text-gray-600 leading-relaxed">
                            {u.body.sv}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm text-gray-500">
            Sett ett problem vi inte rapporterat? Mejla{" "}
            <a
              href="mailto:status@offertpro.se"
              className="text-indigo-600 hover:underline"
            >
              status@offertpro.se
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
