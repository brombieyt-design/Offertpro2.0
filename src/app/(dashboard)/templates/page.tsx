import { Copy, Plus } from "lucide-react";
import { templates } from "@/lib/mock-data";

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mallar</h1>
          <p className="text-sm text-gray-500 mt-1">
            Spara återanvändbara radartiklar för offerter och fakturor
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" />
          Skapa mall
        </button>
      </div>

      {/* Empty state */}
      {templates.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-16 px-6 text-center">
          <div className="mx-auto w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
            <Copy className="w-7 h-7 text-gray-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            Inga mallar ännu
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
            Skapa mallar med vanliga radartiklar så du snabbt kan fylla i nya
            offerter och fakturor.
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors">
            <Plus className="w-4 h-4" />
            Skapa din första mall
          </button>
        </div>
      )}
    </div>
  );
}
