export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Redo att vinna fler affärer?
        </h2>
        <p className="mt-4 text-lg text-indigo-100">
          Gå med hundratals företag som redan använder Offert-pro för att skapa
          professionella offerter och stänga fler avtal.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 rounded-lg transition-colors"
          >
            Börja gratis idag
          </a>
          <a
            href="#priser"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-white border border-white/30 hover:bg-white/10 rounded-lg transition-colors"
          >
            Se priser
          </a>
        </div>
      </div>
    </section>
  );
}
