const logos = [
  { name: "Nordberg Bygg", initials: "NB" },
  { name: "Pixel Studio", initials: "PS" },
  { name: "Cleantech Solutions", initials: "CS" },
  { name: "Digital Vision", initials: "DV" },
  { name: "Evergreen Events", initials: "EE" },
  { name: "Skansen Consulting", initials: "SC" },
  { name: "TechFlow AB", initials: "TF" },
  { name: "Bright Nordic", initials: "BN" },
];

export default function LogoBar() {
  const doubled = [...logos, ...logos];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100/80 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-gray-300 mb-10">
          Används av ledande företag i Sverige
        </p>
        {/* Marquee scroll */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee whitespace-nowrap">
            {doubled.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex items-center gap-2.5 mx-8 opacity-40 hover:opacity-70 transition-opacity duration-300 cursor-default shrink-0"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-[10px] font-bold text-gray-500 tracking-tight">
                  {logo.initials}
                </div>
                <span className="text-sm font-semibold text-gray-400 tracking-tight">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
