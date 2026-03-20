import {
  ClipboardEdit,
  MailCheck,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Zap,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const steps = [
  {
    number: "01",
    title: "Beskriv ditt behov",
    description:
      "Fyll i en enkel beskrivning av vad du behöver hjälp med. Det tar bara en minut att fylla i dina uppgifter och krav.",
    details: [
      "Välj kategori och bransch",
      "Beskriv projektet i fritext",
      "Ange budget och tidslinje",
      "Ladda upp eventuella bilagor",
    ],
    icon: ClipboardEdit,
  },
  {
    number: "02",
    title: "Få matchade offerter",
    description:
      "Vi matchar dig med de bästa leverantörerna baserat på dina krav. Du får skräddarsydda offerter direkt i din inkorg.",
    details: [
      "AI-driven matchning",
      "Kvalitetssäkrade leverantörer",
      "Offerter inom 24 timmar",
      "Jämförbara format",
    ],
    icon: MailCheck,
  },
  {
    number: "03",
    title: "Jämför och välj",
    description:
      "Jämför priser, betyg och villkor sida vid sida. Välj den offert som passar dig bäst och signera digitalt.",
    details: [
      "Sida-vid-sida-jämförelse",
      "Transparenta priser",
      "Kundbetyg och recensioner",
      "Digital signering",
    ],
    icon: BarChart3,
  },
];

const benefits = [
  {
    title: "Spara tid",
    description: "Slipp ringa runt och jaga offerter. Allt sker automatiskt.",
    icon: Clock,
  },
  {
    title: "Bättre priser",
    description:
      "Konkurrens mellan leverantörer ger dig bättre villkor och priser.",
    icon: Zap,
  },
  {
    title: "Kvalitetssäkrat",
    description:
      "Alla leverantörer granskas och verifieras innan de kan lämna offerter.",
    icon: Shield,
  },
  {
    title: "Helt gratis",
    description:
      "Det kostar inget att ta emot offerter. Du betalar bara om du väljer att gå vidare.",
    icon: CheckCircle2,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Hur det fungerar
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Från behov till offert
            <br />
            <span className="text-gray-400">på tre enkla steg</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Vi har gjort det enkelt att hitta rätt leverantör. Beskriv ditt
            behov, få offerter och välj den bästa — allt på en plats.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-5xl space-y-16">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex flex-col md:flex-row items-start gap-12 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl font-extralight text-indigo-200">
                    {step.number}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
                    <step.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6">
                  {step.description}
                </p>
                <ul className="space-y-3">
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center gap-3 text-sm text-gray-600"
                    >
                      <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 flex items-center justify-center min-h-[280px]">
                  <step.icon className="h-24 w-24 text-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Varför välja Offert Pro?
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Vi tar bort krånglet och ger dig mer tid att fokusera på det
              viktiga.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 mx-auto mb-5">
                  <b.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Redo att få din första offert?
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            Kom igång gratis på under 2 minuter. Inget kreditkort krävs.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg group"
          >
            Kom igång gratis
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
