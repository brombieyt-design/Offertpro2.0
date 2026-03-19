"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "company", label: "Företagsprofil" },
  { id: "payment", label: "Betalning" },
  { id: "defaults", label: "Standardvärden" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Inställningar</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl border border-gray-100 shadow-sm p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              activeTab === tab.id
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Company profile tab */}
      {activeTab === "company" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-5">
            Företagsinformation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Företagsnamn
              </label>
              <input
                type="text"
                placeholder="Ditt Företag AB"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Organisationsnummer
              </label>
              <input
                type="text"
                placeholder="556xxx-xxxx"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                VAT-nummer
              </label>
              <input
                type="text"
                placeholder="SE556xxxxxxxxx01"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                E-post
              </label>
              <input
                type="email"
                placeholder="info@foretag.se"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Telefon
              </label>
              <input
                type="tel"
                placeholder="+46 70 123 45 67"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Webbplats
              </label>
              <input
                type="url"
                placeholder="https://foretag.se"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Adress
              </label>
              <input
                type="text"
                placeholder="Storgatan 1"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Stad
              </label>
              <input
                type="text"
                placeholder="Stockholm"
                className="form-input"
              />
            </div>
          </div>
          <div className="mt-6">
            <button className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors">
              Spara inställningar
            </button>
          </div>
        </div>
      )}

      {/* Payment tab */}
      {activeTab === "payment" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-2">
            Betalningsinställningar
          </h2>
          <p className="text-sm text-gray-500">
            Konfigurera bankuppgifter och betalningsvillkor som visas på
            fakturor. Denna funktion kommer snart.
          </p>
        </div>
      )}

      {/* Defaults tab */}
      {activeTab === "defaults" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-2">
            Standardvärden
          </h2>
          <p className="text-sm text-gray-500">
            Ställ in standardvärden för offerters giltighet, betalningsvillkor
            och moms. Denna funktion kommer snart.
          </p>
        </div>
      )}
    </div>
  );
}
