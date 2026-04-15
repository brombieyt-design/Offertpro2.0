"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Mail,
  Trash2,
  ArrowRightLeft,
  Copy,
  Edit3,
  Save,
  X,
  Plus,
} from "lucide-react";
import { quoteStatusLabels, quoteStatusColors } from "@/lib/constants";
import { formatDate, cn } from "@/lib/utils";
import { useSettings } from "@/lib/settings-context";
import { useToast } from "@/components/Toast";
import type { Quote, LineItem } from "@/types";

export default function QuoteDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { formatMoney: formatCurrency, vatRate: defaultVatRate } = useSettings();
  const id = params.id as string;
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [converting, setConverting] = useState(false);
  const { toast } = useToast();

  // Edit state
  const [editItems, setEditItems] = useState<LineItem[]>([]);
  const [editCustomer, setEditCustomer] = useState({ name: "", email: "", company: "" });
  const [editValidUntil, setEditValidUntil] = useState("");

  async function fetchQuote() {
    setLoading(true);
    try {
      const res = await fetch(`/api/quotes?id=${id}`);
      if (!res.ok) {
        router.push("/quotes");
        return;
      }
      const data = await res.json();
      setQuote(data);
    } catch {
      router.push("/quotes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuote();
  }, [id]);

  function startEditing() {
    if (!quote) return;
    setEditCustomer({
      name: quote.customer.name,
      email: quote.customer.email,
      company: quote.customer.company || "",
    });
    setEditItems(quote.items.map((i) => ({ ...i })));
    setEditValidUntil(quote.validUntil);
    setEditing(true);
  }

  function cancelEditing() {
    setEditing(false);
  }

  async function saveEdits() {
    setSaving(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          customer: { ...quote!.customer, ...editCustomer },
          items: editItems,
          validUntil: editValidUntil,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setQuote(updated);
        setEditing(false);
        toast("Offert uppdaterad", "success");
      }
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(status: string) {
    const res = await fetch("/api/quotes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setQuote(updated);
      toast(`Status ändrad till ${quoteStatusLabels[status]}`, "success");
    }
  }

  async function deleteQuote() {
    if (!confirm("Vill du ta bort denna offert?")) return;
    await fetch("/api/quotes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.push("/quotes");
  }

  async function duplicateQuote() {
    if (!quote) return;
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: quote.customer,
        items: quote.items,
        status: "draft",
      }),
    });
    if (res.ok) {
      const newQuote = await res.json();
      toast("Offert duplicerad", "success");
      router.push(`/quotes/${newQuote.id}`);
    }
  }

  async function convertToInvoice() {
    if (!quote || !confirm(`Skapa faktura från offert ${quote.number}?`)) return;
    setConverting(true);
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: quote.customer,
          items: quote.items,
          status: "draft",
          paymentTerms: "30 dagar netto",
        }),
      });
      if (res.ok) {
        toast("Faktura skapad", "success");
        router.push("/invoices");
      }
    } finally {
      setConverting(false);
    }
  }

  async function sendEmail() {
    const res = await fetch("/api/send-quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    toast(data.message, res.ok ? "success" : "error");
    fetchQuote();
  }

  function lineTotal(item: LineItem) {
    const subtotal = item.quantity * item.unitPrice;
    return subtotal - subtotal * ((item.discount || 0) / 100);
  }

  function addEditItem() {
    setEditItems((prev) => [
      ...prev,
      { id: String(Date.now()), description: "", quantity: 1, unitPrice: 0, discount: 0 },
    ]);
  }

  function removeEditItem(itemId: string) {
    if (editItems.length > 1) {
      setEditItems((prev) => prev.filter((i) => i.id !== itemId));
    }
  }

  function updateEditItem(itemId: string, field: keyof LineItem, value: string | number) {
    setEditItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, [field]: value } : i))
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-gray-400">Laddar offert...</p>
      </div>
    );
  }

  if (!quote) return null;

  const subtotal = (editing ? editItems : quote.items).reduce(
    (sum, item) => sum + lineTotal(item),
    0
  );
  const vat = subtotal * (defaultVatRate / 100);
  const total = subtotal + vat;

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/quotes"
            className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {quote.number}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {quote.customer.name} &middot; {quote.customer.company}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!editing ? (
            <>
              <button
                onClick={startEditing}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
              >
                <Edit3 className="w-4 h-4" />
                Redigera
              </button>
              <button
                onClick={duplicateQuote}
                className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                title="Duplicera"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={sendEmail}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                title="Skicka via e-post"
              >
                <Mail className="w-4 h-4" />
              </button>
              <a
                href={`/api/quotes/pdf?id=${quote.id}`}
                download
                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                title="Ladda ner PDF"
              >
                <Download className="w-4 h-4" />
              </a>
              {quote.status === "accepted" && (
                <button
                  onClick={convertToInvoice}
                  disabled={converting}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-full transition-all"
                >
                  <ArrowRightLeft className={cn("w-4 h-4", converting && "animate-spin")} />
                  Skapa faktura
                </button>
              )}
              <button
                onClick={deleteQuote}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                title="Ta bort"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={cancelEditing}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-all"
              >
                <X className="w-4 h-4" />
                Avbryt
              </button>
              <button
                onClick={saveEdits}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all shadow-sm"
              >
                <Save className="w-4 h-4" />
                {saving ? "Sparar..." : "Spara"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Status + dates bar */}
      <div className="flex items-center gap-6 bg-white rounded-2xl border border-gray-100/60 shadow-sm px-7 py-5">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Status</p>
          <select
            value={quote.status}
            onChange={(e) => updateStatus(e.target.value)}
            className={cn(
              "appearance-none cursor-pointer px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-indigo-200",
              quoteStatusColors[quote.status]
            )}
          >
            <option value="draft">Utkast</option>
            <option value="sent">Skickad</option>
            <option value="opened">Öppnad</option>
            <option value="accepted">Accepterad</option>
            <option value="rejected">Avvisad</option>
          </select>
        </div>
        <div className="h-8 w-px bg-gray-200" />
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Skapad</p>
          <p className="text-sm text-gray-900">{formatDate(quote.createdAt)}</p>
        </div>
        <div className="h-8 w-px bg-gray-200" />
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Giltig t.o.m.</p>
          {editing ? (
            <input
              type="date"
              className="text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              value={editValidUntil}
              onChange={(e) => setEditValidUntil(e.target.value)}
            />
          ) : (
            <p className="text-sm text-gray-900">{formatDate(quote.validUntil)}</p>
          )}
        </div>
        <div className="h-8 w-px bg-gray-200" />
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Totalbelopp</p>
          <p className="text-sm font-bold text-gray-900">{formatCurrency(quote.total)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Customer info */}
          <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-7">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Kundinformation</h2>
            {editing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Namn</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editCustomer.name}
                    onChange={(e) => setEditCustomer((p) => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">E-post</label>
                  <input
                    type="email"
                    className="form-input"
                    value={editCustomer.email}
                    onChange={(e) => setEditCustomer((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Företag</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editCustomer.company}
                    onChange={(e) => setEditCustomer((p) => ({ ...p, company: e.target.value }))}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Namn</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{quote.customer.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">E-post</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{quote.customer.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Företag</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{quote.customer.company || "-"}</p>
                </div>
                {quote.customer.phone && (
                  <div>
                    <p className="text-xs text-gray-500">Telefon</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{quote.customer.phone}</p>
                  </div>
                )}
                {quote.customer.address && (
                  <div>
                    <p className="text-xs text-gray-500">Adress</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{quote.customer.address}</p>
                  </div>
                )}
                {quote.customer.city && (
                  <div>
                    <p className="text-xs text-gray-500">Stad</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{quote.customer.city}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Line items */}
          <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-7">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">Radartiklar</h2>
              {editing && (
                <button
                  onClick={addEditItem}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  <Plus className="w-4 h-4" />
                  Lägg till rad
                </button>
              )}
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                    Beskrivning
                  </th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3 w-20">
                    Antal
                  </th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3 w-28">
                    À-pris
                  </th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3 w-20">
                    Rabatt
                  </th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3 w-28">
                    Summa
                  </th>
                  {editing && <th className="w-10" />}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {(editing ? editItems : quote.items).map((item) => (
                  <tr key={item.id}>
                    <td className="py-3">
                      {editing ? (
                        <input
                          type="text"
                          className="form-input"
                          value={item.description}
                          onChange={(e) => updateEditItem(item.id, "description", e.target.value)}
                        />
                      ) : (
                        <span className="text-sm text-gray-900">{item.description}</span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      {editing ? (
                        <input
                          type="number"
                          className="form-input text-right w-16"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => updateEditItem(item.id, "quantity", Number(e.target.value))}
                        />
                      ) : (
                        <span className="text-sm text-gray-600">{item.quantity}</span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      {editing ? (
                        <input
                          type="number"
                          className="form-input text-right w-24"
                          min={0}
                          value={item.unitPrice}
                          onChange={(e) => updateEditItem(item.id, "unitPrice", Number(e.target.value))}
                        />
                      ) : (
                        <span className="text-sm text-gray-600">{formatCurrency(item.unitPrice)}</span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      {editing ? (
                        <input
                          type="number"
                          className="form-input text-right w-16"
                          min={0}
                          max={100}
                          value={item.discount || 0}
                          onChange={(e) => updateEditItem(item.id, "discount", Number(e.target.value))}
                        />
                      ) : (
                        <span className="text-sm text-gray-600">
                          {item.discount ? `${item.discount}%` : "-"}
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(lineTotal(item))}
                      </span>
                    </td>
                    {editing && (
                      <td className="py-3 pl-2">
                        <button
                          onClick={() => removeEditItem(item.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delsumma</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Moms ({defaultVatRate}%)</span>
                <span>{formatCurrency(vat)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Totalt</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Snabbåtgärder</h3>
            <div className="space-y-2">
              <button
                onClick={sendEmail}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
              >
                <Mail className="w-4 h-4 text-blue-500" />
                Skicka via e-post
              </button>
              <a
                href={`/api/quotes/pdf?id=${quote.id}`}
                download
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
              >
                <Download className="w-4 h-4 text-indigo-500" />
                Ladda ner PDF
              </a>
              <button
                onClick={duplicateQuote}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
              >
                <Copy className="w-4 h-4 text-purple-500" />
                Duplicera offert
              </button>
              {quote.status === "accepted" && (
                <button
                  onClick={convertToInvoice}
                  disabled={converting}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
                >
                  <ArrowRightLeft className="w-4 h-4 text-green-500" />
                  Konvertera till faktura
                </button>
              )}
              <button
                onClick={deleteQuote}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Ta bort offert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
