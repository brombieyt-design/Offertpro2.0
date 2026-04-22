import type { Metadata } from "next";
import {
  FileText,
  Eye,
  Copy,
  PenTool,
  Bell,
  GitBranch,
  ArrowRight,
  Check,
} from "lucide-react";
import NavbarDe from "@/components/landing/de/NavbarDe";
import FooterDe from "@/components/landing/de/FooterDe";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

const featuresDe = [
  {
    icon: FileText,
    title: "Ansprechende PDFs",
    description:
      "Erstellen Sie professionelle, markenkonforme Angebote, die Kunden überzeugen.",
  },
  {
    icon: Eye,
    title: "Echtzeit-Tracking",
    description:
      "Erhalten Sie sofort Benachrichtigungen, wenn Kunden Ihre Angebote öffnen und lesen.",
  },
  {
    icon: Copy,
    title: "Wiederverwendbare Vorlagen",
    description: "Sparen Sie Zeit mit einer Bibliothek anpassbarer Angebotsvorlagen.",
  },
  {
    icon: PenTool,
    title: "E-Signaturen",
    description:
      "Rechtsverbindliche digitale Signaturen direkt in der Plattform — eIDAS-konform.",
  },
  {
    icon: Bell,
    title: "Automatische Erinnerungen",
    description:
      "Follow-up-Benachrichtigungen zum optimalen Zeitpunkt für beste Ergebnisse.",
  },
  {
    icon: GitBranch,
    title: "Status-Pipeline",
    description:
      "Visuelle Vertriebs-Pipeline, um all Ihre Deals zu verwalten — Drag & Drop zwischen Stufen.",
  },
];

const detailedFeatures = [
  {
    icon: FileText,
    title: "Professionelle PDF-Angebote",
    description:
      "Erstellen Sie ansprechende, markenkonforme PDF-Angebote mit Ihrem Logo, Ihren Farben und Ihrer Typografie. Wählen Sie aus mehreren Vorlagen oder gestalten Sie von Grund auf.",
    benefits: [
      "Angepasst an Ihr Branding",
      "Mehrere professionelle Vorlagen",
      "Automatische Formatierung",
      "PDF-Export mit einem Klick",
    ],
  },
  {
    icon: Eye,
    title: "Echtzeit-Tracking",
    description:
      "Erhalten Sie sofort Benachrichtigungen, sobald Kunden Ihre Angebote öffnen und lesen. Sehen Sie genau, welche Abschnitte am meisten Zeit erhalten.",
    benefits: [
      "Öffnungsbenachrichtigungen in Echtzeit",
      "Abschnittsweises Tracking",
      "Leseverlauf pro Kunde",
      "Optimaler Follow-up-Zeitpunkt",
    ],
  },
  {
    icon: PenTool,
    title: "E-Signaturen",
    description:
      "Rechtsverbindliche digitale Signaturen direkt in die Plattform integriert. Kunden signieren direkt im Browser — ohne zusätzliche Software.",
    benefits: [
      "Rechtsverbindlich (eIDAS)",
      "Im Browser signieren",
      "QES via D-Trust (Deutschland) verfügbar",
      "Automatische Archivierung",
    ],
  },
  {
    icon: Bell,
    title: "Automatische Erinnerungen",
    description:
      "Stellen Sie intelligente Erinnerungen ein, die zum optimalen Zeitpunkt versendet werden. Erhöhen Sie Ihre Annahmerate ohne manuelle Arbeit.",
    benefits: [
      "KI-optimierte Zeitpunkte",
      "Anpassbare Nachrichten",
      "Eskalationsregeln",
      "Statistik pro Erinnerung",
    ],
  },
  {
    icon: Copy,
    title: "Vorlagenbibliothek",
    description:
      "Sparen Sie Zeit mit einer Bibliothek wiederverwendbarer Vorlagen. Erstellen Sie neue Angebote in Sekunden basierend auf früheren erfolgreichen Abschlüssen.",
    benefits: [
      "Unbegrenzte Vorlagen",
      "Kategoriebasierte Organisation",
      "Dynamische Variablen",
      "Team-Freigabe",
    ],
  },
  {
    icon: GitBranch,
    title: "Status-Pipeline",
    description:
      "Visuelle Vertriebs-Pipeline, um all Ihre Deals zu verwalten. Angebote zwischen Stufen per Drag & Drop verschieben.",
    benefits: [
      "Drag-&-Drop-Oberfläche",
      "Anpassbare Stufen",
      "Automatische Statuswechsel",
      "Pipeline-Reports",
    ],
  },
];

export const metadata: Metadata = {
  title: "Leistungen – Alles, was Sie für professionelle Angebote brauchen",
  description:
    "PDF-Angebote, Echtzeit-Tracking, eIDAS-E-Signaturen, wiederverwendbare Vorlagen, automatische Erinnerungen und Status-Pipeline. Alles in einem Angebotstool.",
  alternates: {
    canonical: `${SITE_URL}/de/leistungen`,
    languages: {
      "sv-SE": `${SITE_URL}/tjanster`,
      de: `${SITE_URL}/de/leistungen`,
      "x-default": `${SITE_URL}/tjanster`,
    },
  },
  openGraph: {
    title: "Leistungen – Offert Pro",
    description:
      "PDF-Angebote, E-Signaturen, Echtzeit-Tracking — alles in einem Tool.",
    url: `${SITE_URL}/de/leistungen`,
    locale: "de",
    alternateLocale: ["sv_SE"],
    type: "website",
  },
};

export default function LeistungenPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarDe />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Leistungen
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Alles, was Sie für
            <br />
            <span className="text-gray-400">professionelle Angebote brauchen</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Leistungsstarke Werkzeuge, die Ihnen helfen, Angebote schneller als
            je zuvor zu erstellen, zu versenden und nachzuverfolgen.
          </p>
        </div>
      </section>

      {/* Feature overview grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresDe.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-8 border border-gray-100/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 mb-5">
                  <f.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed features */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Jede Funktion im Detail
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Tauchen Sie ein in die Werkzeuge, die Offert Pro zur besten
              Angebotsplattform für DACH machen.
            </p>
          </div>

          <div className="space-y-20">
            {detailedFeatures.map((feature, i) => (
              <div
                key={feature.title}
                className={`flex flex-col md:flex-row items-start gap-12 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 mb-5">
                    <feature.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-3 text-sm text-gray-600"
                      >
                        <Check className="h-4 w-4 text-indigo-500 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full">
                  <div className="bg-gray-50 rounded-3xl border border-gray-100 p-12 flex items-center justify-center min-h-[260px]">
                    <feature.icon className="h-24 w-24 text-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Alle Funktionen kostenlos testen
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            Starten Sie ohne Kosten und entdecken Sie alle Werkzeuge. Upgrade,
            wenn Sie bereit sind.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/signup"
              className="inline-flex items-center px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg group"
            >
              Kostenlos starten
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/de/pricing"
              className="inline-flex items-center px-10 py-4 text-base font-medium text-gray-600 bg-white hover:bg-gray-50 rounded-full transition-all duration-300 border border-gray-200"
            >
              Preise ansehen
            </a>
          </div>
        </div>
      </section>

      <FooterDe />
    </div>
  );
}
