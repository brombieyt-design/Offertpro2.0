import { FileText, Eye, Copy, PenTool, Bell, GitBranch } from "lucide-react";
import { features } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Eye,
  Copy,
  PenTool,
  Bell,
  GitBranch,
};

export default function Features() {
  return (
    <section id="funktioner" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Allt du behöver för att vinna fler affärer
          </h2>
          <p className="mt-4 text-lg text-gray-600">
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
                className="rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 mb-4">
                  {Icon && <Icon className="h-6 w-6 text-indigo-600" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
