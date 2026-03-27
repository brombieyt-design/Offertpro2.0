"use client";

import { useState, useEffect } from "react";
import { Copy, Plus, Trash2, Pencil, X, Package, Search } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface TemplateItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
}

interface Template {
  id: string;
  name: string;
  description: string;
  items: TemplateItem[];
  createdAt: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formItems, setFormItems] = useState<TemplateItem[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0, discount: 0 },
  ]);

  async function fetchTemplates() {
    setLoading(true);
    try {
      const res = await fetch("/api/templates");
      const data = res.ok ? await res.json() : [];
      setTemplates(Array.isArray(data) ? data : []);
    } catch {
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTemplates();
  }, []);

  function resetForm() {
    setFormName("");
    setFormDesc("");
    setFormItems([{ id: "1", description: "", quantity: 1, unitPrice: 0, discount: 0 }]);
    setEditingId(null);
    setShowForm(false);
  }

  function openCreate() {
    resetForm();
    setShowForm(true);
  }

  function openEdit(tpl: Template) {
    setFormName(tpl.name);
    setFormDesc(tpl.description);
    setFormItems(
      tpl.items.length > 0
        ? tpl.items.map((item) => ({ ...item }))
        : [{ id: "1", description: "", quantity: 1, unitPrice: 0, discount: 0 }]
    );
    setEditingId(tpl.id);
    setShowForm(true);
  }

  function addItem() {
    setFormItems([
      ...formItems,
      { id: Date.now().toString(), description: "", quantity: 1, unitPrice: 0, discount: 0 },
    ]);
  }

  function removeItem(id: string) {
    if (formItems.length <= 1) return;
    setFormItems(formItems.filter((i) => i.id !== id));
  }

  function updateItem(id: string, field: keyof TemplateItem, value: string | number) {
    setFormItems(formItems.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formName.trim()) return;

    const validItems = formItems.filter((i) => i.description.trim());
    if (validItems.length === 0) return;

    if (editingId) {
      // Delete old and recreate (API has no PATCH)
      await fetch("/api/templates", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId }),
      });
    }

    await fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formName.trim(),
        description: formDesc.trim(),
        items: validItems.map(({ description, quantity, unitPrice, discount }) => ({
          description,
          quantity,
          unitPrice,
          discount: discount || 0,
        })),
      }),
    });

    resetForm();
    fetchTemplates();
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    await fetch("/api/templates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeleting(null);
    fetchTemplates();
  }

  function calcTotal(items: TemplateItem[]) {
    return items.reduce((sum, i) => {
      const disc = i.discount ? (i.quantity * i.unitPrice * i.discount) / 100 : 0;
      return sum + i.quantity * i.unitPrice - disc;
    }, 0);
  }

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
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Skapa mall
        </button>
      </div>

      {/* Search */}
      {templates.length > 0 && !showForm && (
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Sök mallar..."
            className="form-input pl-11 w-full sm:w-72"
          />
        </div>
      )}

      {/* Create/Edit form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900">
              {editingId ? "Redigera mall" : "Ny mall"}
            </h2>
            <button onClick={resetForm} className="p-1 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mallnamn *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="T.ex. Webbutvecklingsprojekt"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Beskrivning
                </label>
                <input
                  type="text"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Kort beskrivning av mallen"
                  className="form-input"
                />
              </div>
            </div>

            {/* Line items */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Radartiklar *
              </label>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 pr-3 text-xs font-medium text-gray-500 uppercase">
                        Beskrivning
                      </th>
                      <th className="text-left py-2 pr-3 text-xs font-medium text-gray-500 uppercase w-24">
                        Antal
                      </th>
                      <th className="text-left py-2 pr-3 text-xs font-medium text-gray-500 uppercase w-32">
                        Á-pris (kr)
                      </th>
                      <th className="text-left py-2 pr-3 text-xs font-medium text-gray-500 uppercase w-24">
                        Rabatt %
                      </th>
                      <th className="w-10" />
                    </tr>
                  </thead>
                  <tbody>
                    {formItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-50">
                        <td className="py-2 pr-3">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => updateItem(item.id, "description", e.target.value)}
                            placeholder="Tjänst eller produkt"
                            className="form-input"
                          />
                        </td>
                        <td className="py-2 pr-3">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                            className="form-input"
                          />
                        </td>
                        <td className="py-2 pr-3">
                          <input
                            type="number"
                            min="0"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))}
                            className="form-input"
                          />
                        </td>
                        <td className="py-2 pr-3">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={item.discount || 0}
                            onChange={(e) => updateItem(item.id, "discount", Number(e.target.value))}
                            className="form-input"
                          />
                        </td>
                        <td className="py-2">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={addItem}
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                Lägg till rad
              </button>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                {editingId ? "Uppdatera mall" : "Spara mall"}
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

      {/* Template list */}
      {loading ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-16 px-6 text-center text-sm text-gray-400">
          Laddar mallar...
        </div>
      ) : templates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates
            .filter((tpl) => {
              if (!searchQuery.trim()) return true;
              const q = searchQuery.toLowerCase();
              return (
                tpl.name.toLowerCase().includes(q) ||
                tpl.description.toLowerCase().includes(q) ||
                tpl.items.some((i) => i.description.toLowerCase().includes(q))
              );
            })
            .map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Package className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{tpl.name}</h3>
                    {tpl.description && (
                      <p className="text-xs text-gray-500 mt-0.5">{tpl.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEdit(tpl)}
                    className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors"
                    title="Redigera"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(tpl.id)}
                    disabled={deleting === tpl.id}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    title="Ta bort"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Items preview */}
              <div className="border-t border-gray-100 pt-3 space-y-1.5">
                {tpl.items.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 truncate flex-1 mr-2">{item.description}</span>
                    <span className="text-gray-900 font-medium whitespace-nowrap">
                      {item.quantity} × {formatCurrency(item.unitPrice)}
                    </span>
                  </div>
                ))}
                {tpl.items.length > 4 && (
                  <p className="text-xs text-gray-400">+{tpl.items.length - 4} fler rader</p>
                )}
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">
                  {tpl.items.length} {tpl.items.length === 1 ? "rad" : "rader"}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(calcTotal(tpl.items))}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : !showForm ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-16 px-6 text-center">
          <div className="mx-auto w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
            <Copy className="w-7 h-7 text-gray-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">Inga mallar ännu</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
            Skapa mallar med vanliga radartiklar så du snabbt kan fylla i nya offerter och
            fakturor.
          </p>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Skapa din första mall
          </button>
        </div>
      ) : null}
    </div>
  );
}
