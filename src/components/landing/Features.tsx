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
          <div className="text-center max-w-2xl mx-auto mb-24">
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
