import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-4xl text-center">
        <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-100 px-8 py-20 md:px-16 md:py-28">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Redo att komma igång?
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Gå med hundratals företag som redan använder Offert Pro för att skapa
            professionella offerter och stänga fler avtal.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg group"
            >
              Börja gratis idag
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <p className="mt-8 text-sm text-gray-300">
            Inget kreditkort krävs. Kom igång på under 2 minuter.
          </p>
        </div>
      </div>
    </section>
  );
}
