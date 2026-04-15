"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Users, Building2, Phone, MapPin, X, RefreshCw, Pencil, Trash2, Search, User, Upload, Eye } from "lucide-react";
import type { Customer, CustomerType } from "@/types";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/Toast";

const emptyForm = { name: "", email: "", phone: "", company: "", city: "", address: "", orgNr: "", personnummer: "", customerType: "business" as CustomerType };

export default function ClientsPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [importing, setImporting] = useState(false);
  const { toast } = useToast();

  async function handleCsvImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const text = await file.text();
      const lines = text.split(/\r?\n/).filter((l) => l.trim());
      if (lines.length < 2) {
        toast("CSV-filen är tom eller saknar rader.", "error");
        return;
      }
      const headers = lines[0]
        .toLowerCase()
        .split(/[,;]/)
        .map((h) => h.trim().replace(/"/g, ""));
      const rows = lines.slice(1).map((line) => {
        const cells = line.split(/[,;]/).map((c) => c.trim().replace(/^"|"$/g, ""));
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => (obj[h] = cells[i] || ""));
        return {
          name: obj.name || obj.namn || obj.kontaktperson || "",
          email: obj.email || obj["e-post"] || obj.mejl || "",
          phone: obj.phone || obj.telefon || obj.tel || "",
          company: obj.company || obj.företag || obj.foretag || "",
          city: obj.city || obj.stad || obj.ort || "",
          address: obj.address || obj.adress || "",
          orgNr: obj.orgnr || obj["org.nr"] || obj.organisationsnummer || "",
          customerType: obj.company || obj.företag ? "business" : "private",
        };
      }).filter((r) => r.name && r.email);

      if (rows.length === 0) {
        toast("Inga giltiga rader hittades. Säkerställ att kolumnerna 'name' och 'email' finns.", "error");
        return;
      }

      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rows),
      });
      if (!res.ok) throw new Error();
      const result = await res.json();
      toast(`${result.created} kunder importerades`, "success");
      fetchCustomers();
    } catch {
      toast("Kunde inte importera CSV-filen.", "error");
    } finally {
      setImporting(false);
      e.target.value = "";
    }
  }

  async function fetchCustomers() {
    setLoading(true);
    try {
      const res = await fetch("/api/customers");
      const data = res.ok ? await res.json() : [];
      setCustomers(Array.isArray(data) ? data : []);
    } catch {
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  function openEdit(customer: Customer) {
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone || "",
      company: customer.company || "",
      city: customer.city || "",
      address: customer.address || "",
      orgNr: customer.orgNr || "",
      personnummer: customer.personnummer || "",
      customerType: customer.customerType || (customer.company ? "business" : "private"),
    });
    setEditingId(customer.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (editingId) {
      await fetch("/api/customers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      });
    } else {
      await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    resetForm();
    fetchCustomers();
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    await fetch("/api/customers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeleting(null);
    fetchCustomers();
  }

  const filtered = search.trim()
    ? customers.filter((c) => {
        const q = search.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          (c.company || "").toLowerCase().includes(q) ||
          (c.city || "").toLowerCase().includes(q)
        );
      })
    : customers;

  const businessCustomers = customers.filter((c) => c.customerType !== "private" && c.company);
  const privateCustomers = customers.filter((c) => c.customerType === "private" || (!c.company && !c.orgNr));
  const withPhone = customers.filter((c) => c.phone);
  const withAddress = customers.filter((c) => c.address);

  const clientStats = [
    { label: "Totala kunder", value: customers.length, icon: Users, color: "text-indigo-600 bg-indigo-50" },
    { label: "Företagskunder", value: businessCustomers.length, icon: Building2, color: "text-blue-600 bg-blue-50" },
    { label: "Privatkunder", value: privateCustomers.length, icon: User, color: "text-green-600 bg-green-50" },
    { label: "Med adress", value: withAddress.length, icon: MapPin, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Kunder</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchCustomers}
            className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
            title="Uppdatera"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </button>
          <label
            className={cn(
              "inline-flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer",
              importing && "opacity-50 pointer-events-none"
            )}
            title="Importera CSV (kolumner: name, email, phone, company, city, address, orgnr)"
          >
            <Upload className={cn("w-4 h-4", importing && "animate-spin")} />
            <span className="hidden sm:inline">{importing ? "Importerar..." : "Importera CSV"}</span>
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleCsvImport}
              className="hidden"
              disabled={importing}
            />
          </label>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Ny kund</span>
          </button>
        </div>
      </div>

      {/* New/Edit customer form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900">
              {editingId ? "Redigera kund" : "Ny kund"}
            </h2>
            <button onClick={resetForm} className="p-1 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
            {/* Customer type toggle */}
            <div className="flex gap-2 p-1 bg-gray-100/60 rounded-xl w-fit">
              <button
                type="button"
                onClick={() => setForm({ ...form, customerType: "business" })}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  form.customerType === "business"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <Building2 className="w-4 h-4" />
                Företag
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, customerType: "private" })}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  form.customerType === "private"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <User className="w-4 h-4" />
                Privatkund
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                placeholder={form.customerType === "private" ? "anna@gmail.com" : "anna@foretag.se"}
                className="form-input"
              />
            </div>

            {form.customerType === "business" ? (
              <>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Org.nr</label>
                  <input
                    type="text"
                    value={form.orgNr}
                    onChange={(e) => setForm({ ...form, orgNr: e.target.value })}
                    placeholder="556xxx-xxxx"
                    className="form-input"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Personnummer</label>
                <input
                  type="text"
                  value={form.personnummer}
                  onChange={(e) => setForm({ ...form, personnummer: e.target.value })}
                  placeholder="199001011234"
                  className="form-input"
                />
                <p className="text-xs text-gray-400 mt-1">Krävs för ROT/RUT-avdrag</p>
              </div>
            )}

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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Adress</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Storgatan 1"
                className="form-input"
              />
            </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                {editingId ? "Uppdatera kund" : "Spara kund"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Avbryt
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

      {/* Search */}
      {customers.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Sök kunder..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-16 px-6 text-center text-sm text-gray-400">
          Laddar kunder...
        </div>
      ) : filtered.length > 0 ? (
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
                  <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Åtgärder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-5 py-3.5 font-medium text-gray-900">
                      <Link
                        href={`/clients/${customer.id}`}
                        className="hover:text-brand-600 transition-colors"
                      >
                        {customer.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">
                      {customer.company || (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          <User className="w-3 h-3" />
                          Privatkund
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 hidden sm:table-cell">{customer.email}</td>
                    <td className="px-5 py-3.5 text-gray-600 hidden md:table-cell">{customer.phone || "—"}</td>
                    <td className="px-5 py-3.5 text-gray-600 hidden lg:table-cell">{customer.city || "—"}</td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(customer)}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors"
                          title="Redigera"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
                          disabled={deleting === customer.id}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                          title="Ta bort"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : customers.length > 0 && search ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-12 px-6 text-center">
          <p className="text-sm text-gray-500">Inga kunder matchar &quot;{search}&quot;</p>
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
            onClick={() => { resetForm(); setShowForm(true); }}
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
