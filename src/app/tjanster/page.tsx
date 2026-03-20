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
import { features } from "@/lib/constants";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Eye,
  Copy,
  PenTool,
  Bell,
  GitBranch,
};

const detailedFeatures = [
  {
    icon: FileText,
    title: "Professionella PDF-offerter",
    description:
      "Skapa snygga, varumärkta PDF-offerter med din logotyp, färger och typsnitt. Välj bland flera mallar eller skapa din egen design från grunden.",
    benefits: [
      "Anpassad med ditt varumärke",
      "Flera professionella mallar",
      "Automatisk formatering",
      "Exportera till PDF med ett klick",
    ],
  },
  {
    icon: Eye,
    title: "Realtidsspårning",
    description:
      "Få omedelbara notiser när dina kunder öppnar och läser dina offerter. Se exakt vilka sektioner de spenderar mest tid på.",
    benefits: [
      "Öppnings-notiser i realtid",
      "Sektionsspårning",
      "Läshistorik per kund",
      "Optimal uppföljningstid",
    ],
  },
  {
    icon: PenTool,
    title: "E-signaturer",
    description:
      "Juridiskt bindande digitala signaturer inbyggt i plattformen. Kunder kan signera direkt i webbläsaren utan extra programvara.",
    benefits: [
      "Juridiskt bindande",
      "Signera i webbläsaren",
      "BankID-stöd",
      "Automatisk arkivering",
    ],
  },
  {
    icon: Bell,
    title: "Automatiska påminnelser",
    description:
      "Ställ in smarta påminnelser som skickas vid optimala tidpunkter. Öka din acceptansgrad utan manuellt arbete.",
    benefits: [
      "AI-optimerade tidpunkter",
      "Anpassningsbara meddelanden",
      "Eskaleringsregler",
      "Statistik per påminnelse",
    ],
  },
  {
    icon: Copy,
    title: "Mallbibliotek",
    description:
      "Spara tid med ett bibliotek av återanvändbara mallar. Skapa nya offerter på sekunder baserat på tidigare framgångsrika offerter.",
    benefits: [
      "Obegränsade mallar",
      "Kategoribaserad organisation",
      "Dynamiska variabler",
      "Team-delning",
    ],
  },
  {
    icon: GitBranch,
    title: "Statuspipeline",
    description:
      "Visuell försäljningspipeline för att hantera alla dina affärer. Dra och släpp offerter mellan stadier.",
    benefits: [
      "Drag & drop-gränssnitt",
      "Anpassningsbara stadier",
      "Automatiska statusbyten",
      "Pipeline-rapporter",
    ],
  },
];

export default function TjansterPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Tjänster
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Allt du behöver för
            <br />
            <span className="text-gray-400">professionella offerter</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Kraftfulla verktyg som hjälper dig att skapa, skicka och följa upp
            offerter snabbare än någonsin.
          </p>
        </div>
      </section>

      {/* Feature overview grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = iconMap[f.icon];
              return (
                <div
                  key={f.title}
                  className="bg-white rounded-2xl p-8 border border-gray-100/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 mb-5">
                    {Icon && <Icon className="h-5 w-5 text-indigo-600" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed features */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Utforska varje funktion
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Djupdyk i de verktyg som gör Offert Pro till marknadens bästa
              offertplattform.
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
            Testa alla funktioner gratis
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            Kom igång utan kostnad och utforska alla verktyg. Uppgradera när du
            är redo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/signup"
              className="inline-flex items-center px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg group"
            >
              Kom igång gratis
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center px-10 py-4 text-base font-medium text-gray-600 bg-white hover:bg-gray-50 rounded-full transition-all duration-300 border border-gray-200"
            >
              Se priser
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
