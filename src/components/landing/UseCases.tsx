import { Building2, Paintbrush, Wrench, Monitor, Briefcase, Truck, TrendingUp, BarChart3, Target, Users } from "lucide-react";

const useCases = [
  {
    title: "Bygg & Entreprenad",
    description:
      "Skapa detaljerade offerter med materiallistor, arbetstimmar och bilagor för byggprojekt.",
    icon: Building2,
  },
  {
    title: "Design & Kreativa byråer",
    description:
      "Presentera dina tjänster professionellt med snygga PDF-offerter som matchar ditt varumärke.",
    icon: Paintbrush,
  },
  {
    title: "Hantverkare",
    description:
      "Skicka offerter direkt från mobilen efter kundbesök. Snabbt, enkelt och professionellt.",
    icon: Wrench,
  },
  {
    title: "IT & Konsulter",
    description:
      "Strukturera komplexa projekt med fasindelade offerter och tydliga milstolpar.",
    icon: Monitor,
  },
  {
    title: "Redovisning & Juridik",
    description:
      "Standardisera dina offertmallar och håll koll på alla uppdrag med automatisk uppföljning.",
    icon: Briefcase,
  },
  {
    title: "Transport & Logistik",
    description:
      "Räkna ut priser baserat på avstånd och volym. Skicka offerter automatiskt till kunder.",
    icon: Truck,
  },
];

export default function UseCases() {
  return (
    <section className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
            Användningsområden
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Byggd för alla branscher
          </h2>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Oavsett bransch hjälper Offert Pro dig att skapa professionella
            offerter och vinna fler affärer.
          </p>
        </div>

        {/* Analytics dashboard mockup */}
        <div className="mb-20 rounded-2xl overflow-hidden border border-gray-200/60 shadow-lg shadow-gray-200/30 bg-gray-50 p-5 sm:p-8">
          {/* Metric cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {[
              { label: "Total intäkt", value: "1,2M kr", change: "+18%", icon: TrendingUp, color: "bg-indigo-50 text-indigo-600" },
              { label: "Offerter skickade", value: "142", change: "+12%", icon: BarChart3, color: "bg-blue-50 text-blue-600" },
              { label: "Vinstfrekvens", value: "68%", change: "+5%", icon: Target, color: "bg-emerald-50 text-emerald-600" },
              { label: "Unika kunder", value: "47", change: "+8%", icon: Users, color: "bg-amber-50 text-amber-600" },
            ].map((m) => (
              <div key={m.label} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${m.color}`}>
                    <m.icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900">{m.value}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">{m.change}</span>
                  <span className="text-xs text-gray-400">{m.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Revenue bar chart */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Intäktsutveckling</h4>
              <div className="flex items-end gap-1.5 h-32">
                {[40, 55, 35, 65, 50, 78, 60, 85, 70, 92, 80, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-indigo-500 rounded-t-sm min-h-[4px]"
                      style={{ height: `${h}%` }}
                    />
                    {i % 3 === 0 && <span className="text-[9px] text-gray-400">{["Jan","","","Apr","","","Jul","","","Okt","","Dec"][i]}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Conversion funnel */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Konverteringstratt</h4>
              <div className="space-y-3">
                {[
                  { stage: "Skickade", count: 142, pct: 100, color: "bg-indigo-500" },
                  { stage: "Öppnade", count: 118, pct: 83, color: "bg-blue-500" },
                  { stage: "Besvarade", count: 84, pct: 59, color: "bg-amber-500" },
                  { stage: "Accepterade", count: 62, pct: 44, color: "bg-green-500" },
                ].map((s) => (
                  <div key={s.stage} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600 font-medium">{s.stage}</span>
                      <span className="text-gray-400">{s.count} ({s.pct}%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="relative bg-gray-50/80 rounded-2xl p-8 lg:p-10 transition-all duration-500 hover:shadow-xl hover:bg-white group card-hover border border-transparent hover:border-gray-100"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white mb-6 group-hover:bg-indigo-50 transition-colors duration-500 shadow-sm">
                <useCase.icon className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                {useCase.title}
              </h3>
              <p className="mt-3 text-gray-400 leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
