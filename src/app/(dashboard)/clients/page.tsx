"use client";

import { useState, useEffect } from "react";
import { Plus, Users, Building2, Phone, MapPin, X, RefreshCw } from "lucide-react";
import type { Customer } from "@/types";
import { cn } from "@/lib/utils";

export default function ClientsPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    address: "",
    orgNr: "",
  });

  async function fetchCustomers() {
    setLoading(true);
    const res = await fetch("/api/customers");
    const data = await res.json();
    setCustomers(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", email: "", phone: "", company: "", city: "", address: "", orgNr: "" });
    setShowForm(false);
    fetchCustomers();
  }

  const withCompany = customers.filter((c) => c.company);
  const withPhone = customers.filter((c) => c.phone);
  const withAddress = customers.filter((c) => c.address);

  const clientStats = [
    { label: "Totala kunder", value: customers.length, icon: Users, color: "text-indigo-600 bg-indigo-50" },
    { label: "Med företag", value: withCompany.length, icon: Building2, color: "text-blue-600 bg-blue-50" },
    { label: "Med telefon", value: withPhone.length, icon: Phone, color: "text-green-600 bg-green-50" },
    { label: "Med adress", value: withAddress.length, icon: MapPin, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Kunder</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchCustomers}
            className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Ny kund
          </button>
        </div>
      </div>

      {/* New customer form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900">Ny kund</h2>
            <button onClick={() => setShowForm(false)} className="p-1 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Namn *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Anna Svensson"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">E-post *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="anna@foretag.se"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Företag</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Företag AB"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+46 70 123 45 67"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Stad</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Stockholm"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Org.nr</label>
              <input
                type="text"
                value={form.orgNr}
                onChange={(e) => setForm({ ...form, orgNr: e.target.value })}
                placeholder="556xxx-xxxx"
                className="form-input"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Spara kund
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {clientStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-16 px-6 text-center text-sm text-gray-400">
          Laddar kunder...
        </div>
      ) : customers.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Namn</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Företag</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">E-post</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Telefon</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Stad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-gray-900">{customer.name}</td>
                    <td className="px-5 py-3.5 text-gray-600">{customer.company || "—"}</td>
                    <td className="px-5 py-3.5 text-gray-600 hidden sm:table-cell">{customer.email}</td>
                    <td className="px-5 py-3.5 text-gray-600 hidden md:table-cell">{customer.phone || "—"}</td>
                    <td className="px-5 py-3.5 text-gray-600 hidden lg:table-cell">{customer.city || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-16 px-6 text-center">
          <div className="mx-auto w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
            <Users className="w-7 h-7 text-gray-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">Inga kunder ännu</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
            Lägg till din första kund för att komma igång med offerter och fakturor.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Ny kund
          </button>
        </div>
      )}
    </div>
  );
}
