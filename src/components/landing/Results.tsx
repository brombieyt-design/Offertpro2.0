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
  },
  {
    icon: Clock,
    value: 75,
    suffix: "%",
    label: "Mindre tid på offerter",
    description: "Automatisera det repetitiva",
  },
  {
    icon: Target,
    value: 2,
    suffix: "x",
    label: "Snabbare deal-cycle",
    description: "Från offert till signatur",
  },
  {
    icon: Award,
    value: 98,
    suffix: "%",
    label: "Kundnöjdhet",
    description: "Baserat på 200+ recensioner",
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
    <section className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 mb-4">
            Resultat
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Verkliga resultat från
            <br />
            verkliga företag
          </h2>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Våra kunder ser mätbara förbättringar redan första månaden.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 mx-auto mb-6">
                <stat.icon className="h-5 w-5 text-indigo-400" />
              </div>
              <p className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
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
