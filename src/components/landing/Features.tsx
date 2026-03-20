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
    title: "Beskriv ditt behov",
    description:
      "Berätta vad du behöver hjälp med. Det tar bara en minut att fylla i dina uppgifter.",
    icon: ClipboardEdit,
  },
  {
    number: "02",
    title: "Få matchade offerter",
    description:
      "Vi matchar dig med de bästa leverantörerna. Du får skräddarsydda offerter direkt.",
    icon: MailCheck,
  },
  {
    number: "03",
    title: "Jämför och välj",
    description:
      "Jämför priser, betyg och villkor. Välj den offert som passar dig bäst.",
    icon: BarChart3,
  },
];

export default function Features() {
  return (
    <>
      {/* How it works */}
      <section
        id="hur-det-fungerar"
        className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-24">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
              Så enkelt är det
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Hur det fungerar
            </h2>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              Tre enkla steg till din perfekta offert.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative bg-gray-50/80 rounded-3xl p-10 lg:p-12 transition-all duration-500 hover:shadow-xl hover:bg-white hover:border-gray-100 border border-transparent group card-hover"
              >
                <span className="text-7xl font-extralight text-gray-200/80 leading-none group-hover:text-indigo-200/60 transition-colors duration-500 block">
                  {step.number}
                </span>
                <h3 className="mt-8 text-xl font-semibold text-gray-900 tracking-tight">
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
        className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-gray-50/50"
      >
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
              Funktioner
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Allt du behöver
            </h2>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              Kraftfulla verktyg som hjälper dig att skapa, skicka och följa upp
              offerter snabbare än någonsin.
            </p>
          </div>

          {/* Quote builder mockup */}
          <div className="mb-20 rounded-2xl overflow-hidden border border-gray-200/60 shadow-lg shadow-gray-200/30 bg-gray-50 p-5 sm:p-8">
            {/* Step indicators */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
              {["Kund", "Rader", "Förhandsgranska", "Skicka"].map((label, i) => (
                <div key={label} className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${i < 2 ? "bg-indigo-600 text-white" : i === 2 ? "bg-indigo-100 text-indigo-600 ring-2 ring-indigo-200" : "bg-gray-100 text-gray-400"}`}>
                      {i < 2 ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${i <= 2 ? "text-gray-900" : "text-gray-400"}`}>{label}</span>
                  </div>
                  {i < 3 && <div className={`w-8 sm:w-12 h-px ${i < 2 ? "bg-indigo-300" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>

            {/* PDF preview */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 sm:p-10 max-w-2xl mx-auto">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-lg font-bold text-indigo-600">Offert Pro</h4>
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
                <button className="flex items-center gap-1 text-xs text-indigo-600 font-medium">
                  <Plus className="w-3.5 h-3.5" /> Lägg till rad
                </button>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Totalt exkl. moms</p>
                  <p className="text-lg font-bold text-gray-900">72 000 kr</p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((f) => {
              const Icon = iconMap[f.icon];
              return (
                <div
                  key={f.title}
                  className="bg-white rounded-2xl p-8 lg:p-10 transition-all duration-500 hover:shadow-xl group card-hover border border-gray-100/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 mb-6 group-hover:bg-indigo-50 transition-colors duration-500">
                    {Icon && (
                      <Icon className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-gray-400 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
