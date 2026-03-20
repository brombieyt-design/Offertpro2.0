"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, Clock, Target, Award } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: 40,
    suffix: "%",
    label: "Högre acceptansgrad",
    description: "Jämfört med manuella offerter",
    gradient: "from-brand-400 to-blue-400",
  },
  {
    icon: Clock,
    value: 75,
    suffix: "%",
    label: "Mindre tid på offerter",
    description: "Automatisera det repetitiva",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    icon: Target,
    value: 2,
    suffix: "x",
    label: "Snabbare deal-cycle",
    description: "Från offert till signatur",
    gradient: "from-emerald-400 to-teal-400",
  },
  {
    icon: Award,
    value: 98,
    suffix: "%",
    label: "Kundnöjdhet",
    description: "Baserat på 200+ recensioner",
    gradient: "from-amber-400 to-orange-400",
  },
];

function AnimatedNumber({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Results() {
  return (
    <section className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-gray-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 mesh-gradient opacity-[0.08]" />
      <div className="absolute inset-0 dot-grid opacity-20" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)" }} />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-xs font-semibold text-brand-300 tracking-wide">Resultat</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Verkliga resultat från
            <br />
            <span className="gradient-text">verkliga företag</span>
          </h2>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Våra kunder ser mätbara förbättringar redan första månaden.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-3xl glass-dark hover:bg-white/10 transition-all duration-500 card-hover group"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-5xl font-bold text-white tracking-tight">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-base font-semibold text-white">
                {stat.label}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
