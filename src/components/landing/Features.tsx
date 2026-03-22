import {
  FileText,
  Eye,
  Copy,
  PenTool,
  Bell,
  GitBranch,
  ClipboardEdit,
  MailCheck,
  BarChart3,
  Check,
  Plus,
  ArrowRight,
} from "lucide-react";
import { features } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Eye,
  Copy,
  PenTool,
  Bell,
  GitBranch,
};

const steps = [
  {
    number: "01",
    title: "Skapa din offert",
    description: "Fyll i kunduppgifter, lägg till radartiklar och välj bland dina sparade mallar. Klart på under 2 minuter.",
    icon: ClipboardEdit,
  },
  {
    number: "02",
    title: "Skicka & spåra",
    description: "Skicka offerten som PDF via e-post. Följ i realtid när kunden öppnar och läser din offert.",
    icon: MailCheck,
  },
  {
    number: "03",
    title: "Stäng affären",
    description: "När offerten accepteras – konvertera direkt till faktura med ett klick. Allt flödar automatiskt.",
    icon: BarChart3,
  },
];

export default function Features() {
  return (
    <>
      {/* How it works */}
      <section
        id="hur-det-fungerar"
        className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
      >
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 mb-6">
              <span className="text-xs font-semibold text-brand-600 tracking-wide">Så enkelt är det</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Hur det fungerar
            </h2>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              Tre enkla steg till din perfekta offert.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="relative bg-white rounded-3xl p-10 lg:p-12 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-500/5 border border-gray-100 group card-hover"
              >
                {/* Step number with gradient */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-500">
                    {step.number}
                  </div>
                  {i < 2 && (
                    <ArrowRight className="hidden md:block absolute -right-4 top-16 w-5 h-5 text-gray-200 z-10" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section
        id="funktioner"
        className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-gray-50/50 relative overflow-hidden"
      >
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 mb-6">
              <span className="text-xs font-semibold text-purple-600 tracking-wide">Funktioner</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Allt du behöver
            </h2>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              Kraftfulla verktyg som hjälper dig att skapa, skicka och följa upp
              offerter snabbare än någonsin.
            </p>
          </div>

          {/* Quote builder mockup */}
          <div className="mb-20 rounded-2xl overflow-hidden border border-gray-200/60 shadow-xl shadow-gray-200/30 bg-white p-5 sm:p-8">
            {/* Step indicators */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
              {["Kund", "Rader", "Förhandsgranska", "Skicka"].map((label, i) => (
                <div key={label} className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${i < 2 ? "bg-brand-600 text-white shadow-sm shadow-brand-600/30" : i === 2 ? "bg-brand-100 text-brand-600 ring-2 ring-brand-200" : "bg-gray-100 text-gray-400"}`}>
                      {i < 2 ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${i <= 2 ? "text-gray-900" : "text-gray-400"}`}>{label}</span>
                  </div>
                  {i < 3 && <div className={`w-8 sm:w-12 h-px ${i < 2 ? "bg-brand-300" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>

            {/* PDF preview */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 sm:p-10 max-w-2xl mx-auto shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-lg font-bold text-brand-600">Offert Pro</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Storgatan 1, 111 22 Stockholm</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">OFFERT</p>
                  <p className="text-xs text-gray-500">#QT-2026-031</p>
                  <p className="text-xs text-gray-400 mt-1">2026-03-20</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-1">TILL</p>
                <p className="text-sm font-medium text-gray-900">Andersson Bygg AB</p>
                <p className="text-xs text-gray-400">Byggvägen 12, 114 55 Stockholm</p>
              </div>
              {/* Line items */}
              <table className="w-full text-xs mb-6">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 text-gray-400 font-medium">Beskrivning</th>
                    <th className="text-right py-2 text-gray-400 font-medium">Antal</th>
                    <th className="text-right py-2 text-gray-400 font-medium">Pris</th>
                    <th className="text-right py-2 text-gray-400 font-medium">Summa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-2 text-gray-700">Webbdesign – responsiv layout</td>
                    <td className="py-2 text-right text-gray-500">1</td>
                    <td className="py-2 text-right text-gray-500">45 000 kr</td>
                    <td className="py-2 text-right font-medium text-gray-900">45 000 kr</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-700">SEO-optimering</td>
                    <td className="py-2 text-right text-gray-500">1</td>
                    <td className="py-2 text-right text-gray-500">12 000 kr</td>
                    <td className="py-2 text-right font-medium text-gray-900">12 000 kr</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-700">Copywriting (per sida)</td>
                    <td className="py-2 text-right text-gray-500">5</td>
                    <td className="py-2 text-right text-gray-500">3 000 kr</td>
                    <td className="py-2 text-right font-medium text-gray-900">15 000 kr</td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                <button className="flex items-center gap-1 text-xs text-brand-600 font-medium hover:text-brand-700 transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Lägg till rad
                </button>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Totalt exkl. moms</p>
                  <p className="text-lg font-bold text-gray-900">72 000 kr</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Grid - feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = iconMap[f.icon];
              const isLarge = i === 0 || i === 3;
              return (
                <div
                  key={f.title}
                  className={`relative bg-white rounded-2xl p-8 lg:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-500/5 group card-hover border border-gray-100 overflow-hidden ${isLarge ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 mb-6 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-purple-500 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-brand-500/20">
                      {Icon && (
                        <Icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-500" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-gray-400 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
