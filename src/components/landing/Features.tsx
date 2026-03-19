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
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Hur det fungerar
            </h2>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed">
              Tre enkla steg till din perfekta offert.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative bg-gray-50 rounded-2xl p-10 transition-all duration-300 hover:shadow-lg group"
              >
                <span className="text-6xl font-light text-gray-200 leading-none group-hover:text-indigo-100 transition-colors duration-300">
                  {step.number}
                </span>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-gray-500 leading-relaxed">
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
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50/70"
      >
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Allt du behöver
            </h2>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed">
              Kraftfulla verktyg som hjälper dig att skapa, skicka och följa upp
              offerter snabbare än någonsin.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => {
              const Icon = iconMap[f.icon];
              return (
                <div
                  key={f.title}
                  className="bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 mb-5 group-hover:bg-indigo-100 transition-colors duration-300">
                    {Icon && <Icon className="h-6 w-6 text-indigo-600" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-gray-500 leading-relaxed">
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
