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
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100/80">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-gray-300 mb-10">
          Används av ledande företag i Sverige
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 opacity-40 hover:opacity-70 transition-opacity duration-300 cursor-default"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-[10px] font-bold text-gray-500 tracking-tight">
                {logo.initials}
              </div>
              <span className="text-sm font-semibold text-gray-400 tracking-tight hidden sm:inline">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
