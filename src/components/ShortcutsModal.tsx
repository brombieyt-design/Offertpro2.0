"use client";

import { useState, useEffect } from "react";
import { X, Keyboard } from "lucide-react";

const shortcuts = [
  {
    group: "Allmänt",
    items: [
      { keys: ["⌘", "K"], label: "Sök innehåll" },
      { keys: ["⌘", "J"], label: "Öppna kommandopalett" },
      { keys: ["?"], label: "Visa tangentbordsgenvägar" },
      { keys: ["Esc"], label: "Stäng modal eller dialog" },
    ],
  },
  {
    group: "Navigering",
    items: [
      { keys: ["G", "D"], label: "Gå till Översikt" },
      { keys: ["G", "Q"], label: "Gå till Offerter" },
      { keys: ["G", "I"], label: "Gå till Fakturor" },
      { keys: ["G", "C"], label: "Gå till Kunder" },
      { keys: ["G", "S"], label: "Gå till Inställningar" },
    ],
  },
  {
    group: "Skapa",
    items: [
      { keys: ["N", "Q"], label: "Ny offert" },
      { keys: ["N", "I"], label: "Ny faktura" },
      { keys: ["N", "C"], label: "Ny kund" },
    ],
  },
];

export default function ShortcutsModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("open-shortcuts", openHandler);

    const keyHandler = (e: KeyboardEvent) => {
      // Don't trigger when typing in input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", keyHandler);

    return () => {
      window.removeEventListener("open-shortcuts", openHandler);
      window.removeEventListener("keydown", keyHandler);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9997] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Tangentbordsgenvägar"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-brand-600" />
            <h2 className="text-base font-semibold text-gray-900">
              Tangentbordsgenvägar
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Stäng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-4 max-h-[60vh] overflow-y-auto">
          {shortcuts.map((section) => (
            <div key={section.group} className="mb-5 last:mb-0">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
                {section.group}
              </h3>
              <div className="space-y-1.5">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-1.5"
                  >
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <div className="flex gap-1">
                      {item.keys.map((k, j) => (
                        <kbd
                          key={j}
                          className="min-w-[24px] px-1.5 py-0.5 text-[11px] font-medium text-gray-600 bg-gray-50 rounded border border-gray-200 text-center"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
