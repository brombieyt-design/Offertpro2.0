import Image from "next/image";
import { Building2, Paintbrush, Wrench, Monitor, Briefcase, Truck } from "lucide-react";

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

        {/* Analytics illustration */}
        <div className="mb-20 rounded-2xl overflow-hidden border border-gray-200/60 shadow-lg shadow-gray-200/30">
          <Image
            src="/images/analytics-chart.svg"
            alt="Offert Pro analys - acceptansgrad och offertstatistik"
            width={800}
            height={400}
            className="w-full h-auto"
          />
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
