"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Mail,
  Trash2,
  Copy,
  Edit3,
  Save,
  X,
  Plus,
  Wallet,
  Calendar,
} from "lucide-react";
import { invoiceStatusLabels, invoiceStatusColors } from "@/lib/constants";
import { formatDate, cn } from "@/lib/utils";
import { useSettings } from "@/lib/settings-context";
import { useToast } from "@/components/Toast";
import type { Invoice, LineItem } from "@/types";

export default function InvoiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { formatMoney: formatCurrency, vatRate: defaultVatRate } = useSettings();
  const id = params.id as string;
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Edit state
  const [editItems, setEditItems] = useState<LineItem[]>([]);
  const [editCustomer, setEditCustomer] = useState({ name: "", email: "", company: "" });
  const [editDueDate, setEditDueDate] = useState("");
  const [editPaymentTerms, setEditPaymentTerms] = useState("");

  // Payment form state
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    amount: 0,
    paidAt: new Date().toISOString().split("T")[0],
    method: "Bankgiro",
    reference: "",
    note: "",
  });

  async function fetchInvoice() {
    setLoading(true);
    try {
      const res = await fetch(`/api/invoices?id=${id}`);
      if (!res.ok) {
        router.push("/invoices");
        return;
      }
      const data = await res.json();
      setInvoice(data);
    } catch {
      router.push("/invoices");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  function startEditing() {
    if (!invoice) return;
    setEditCustomer({
      name: invoice.customer.name,
      email: invoice.customer.email,
      company: invoice.customer.company || "",
    });
    setEditItems(invoice.items.map((i) => ({ ...i })));
    setEditDueDate(invoice.dueDate);
    setEditPaymentTerms(invoice.paymentTerms);
    setEditing(true);
  }

  function cancelEditing() {
    setEditing(false);
  }

  async function saveEdits() {
    setSaving(true);
    try {
      const res = await fetch("/api/invoices", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          customer: { ...invoice!.customer, ...editCustomer },
          items: editItems,
          dueDate: editDueDate,
          paymentTerms: editPaymentTerms,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setInvoice(updated);
        setEditing(false);
        toast("Faktura uppdaterad", "success");
      }
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(status: string) {
    const res = await fetch("/api/invoices", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setInvoice(updated);
      toast(`Status ändrad till ${invoiceStatusLabels[status]}`, "success");
    }
  }

  async function deleteInvoice() {
    if (!confirm("Vill du ta bort denna faktura?")) return;
    await fetch("/api/invoices", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.push("/invoices");
  }

  async function duplicateInvoice() {
    if (!invoice) return;
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: invoice.customer,
        items: invoice.items,
        status: "draft",
        paymentTerms: invoice.paymentTerms,
      }),
    });
    if (res.ok) {
      const newInvoice = await res.json();
      toast("Faktura duplicerad", "success");
      router.push(`/invoices/${newInvoice.id}`);
    }
  }

  async function recordPayment() {
    if (!invoice) return;
    if (!paymentForm.amount || paymentForm.amount <= 0) {
      toast("Ange ett belopp", "error");
      return;
    }
    try {
      const res = await fetch("/api/invoices/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: invoice.id, ...paymentForm }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setInvoice(updated);
      toast("Betalning registrerad", "success");
      setShowPaymentForm(false);
      setPaymentForm({
        amount: 0,
        paidAt: new Date().toISOString().split("T")[0],
        method: "Bankgiro",
        reference: "",
        note: "",
      });
    } catch {
      toast("Kunde inte registrera betalning", "error");
    }
  }

  async function deletePayment(paymentId: string) {
    if (!invoice) return;
    if (!confirm("Ta bort denna betalning?")) return;
    try {
      const res = await fetch("/api/invoices/payments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: invoice.id, paymentId }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setInvoice(updated);
      toast("Betalning borttagen", "success");
    } catch {
      toast("Kunde inte ta bort betalning", "error");
    }
  }

  async function sendEmail() {
    const res = await fetch("/api/send-invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    toast(data.message, res.ok ? "success" : "error");
    fetchInvoice();
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
        <p className="text-sm text-gray-400">Laddar faktura...</p>
      </div>
    );
  }

  if (!invoice) return null;

  const subtotal = (editing ? editItems : invoice.items).reduce(
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
            href="/invoices"
            className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {invoice.number}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {invoice.customer.name} &middot; {invoice.customer.company}
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
                onClick={duplicateInvoice}
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
                href={`/api/invoices/pdf?id=${invoice.id}`}
                download
                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                title="Ladda ner PDF"
              >
                <Download className="w-4 h-4" />
              </a>
              <button
                onClick={deleteInvoice}
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
            value={invoice.status}
            onChange={(e) => updateStatus(e.target.value)}
            className={cn(
              "appearance-none cursor-pointer px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-indigo-200",
              invoiceStatusColors[invoice.status]
            )}
          >
            <option value="draft">Utkast</option>
            <option value="sent">Skickad</option>
            <option value="paid">Betald</option>
            <option value="overdue">Förfallen</option>
            <option value="partially_paid">Delvis betald</option>
          </select>
        </div>
        <div className="h-8 w-px bg-gray-200" />
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Utfärdad</p>
          <p className="text-sm text-gray-900">{formatDate(invoice.issuedAt)}</p>
        </div>
        <div className="h-8 w-px bg-gray-200" />
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Förfaller</p>
          {editing ? (
            <input
              type="date"
              className="text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
          ) : (
            <p className="text-sm text-gray-900">{formatDate(invoice.dueDate)}</p>
          )}
        </div>
        <div className="h-8 w-px bg-gray-200" />
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Betalningsvillkor</p>
          {editing ? (
            <input
              type="text"
              className="text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              value={editPaymentTerms}
              onChange={(e) => setEditPaymentTerms(e.target.value)}
            />
          ) : (
            <p className="text-sm text-gray-900">{invoice.paymentTerms}</p>
          )}
        </div>
        <div className="h-8 w-px bg-gray-200" />
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Totalbelopp</p>
          <p className="text-sm font-bold text-gray-900">{formatCurrency(invoice.total)}</p>
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
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{invoice.customer.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">E-post</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{invoice.customer.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Företag</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{invoice.customer.company || "-"}</p>
                </div>
                {invoice.customer.phone && (
                  <div>
                    <p className="text-xs text-gray-500">Telefon</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{invoice.customer.phone}</p>
                  </div>
                )}
                {invoice.customer.address && (
                  <div>
                    <p className="text-xs text-gray-500">Adress</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{invoice.customer.address}</p>
                  </div>
                )}
                {invoice.customer.city && (
                  <div>
                    <p className="text-xs text-gray-500">Stad</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{invoice.customer.city}</p>
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
                {(editing ? editItems : invoice.items).map((item) => (
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
                href={`/api/invoices/pdf?id=${invoice.id}`}
                download
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
              >
                <Download className="w-4 h-4 text-indigo-500" />
                Ladda ner PDF
              </a>
              <button
                onClick={duplicateInvoice}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
              >
                <Copy className="w-4 h-4 text-purple-500" />
                Duplicera faktura
              </button>
              <button
                onClick={deleteInvoice}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Ta bort faktura
              </button>
            </div>
          </div>

          {/* Payments panel */}
          <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-600" />
                Betalningar
              </h3>
              <button
                onClick={() => {
                  const remaining = invoice.total - (invoice.paidAmount || 0);
                  setPaymentForm((p) => ({
                    ...p,
                    amount: remaining > 0 ? remaining : invoice.total,
                  }));
                  setShowPaymentForm((v) => !v);
                }}
                className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800"
              >
                <Plus className="w-3.5 h-3.5" />
                Registrera
              </button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-emerald-50 rounded-xl px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold">
                  Betalt
                </p>
                <p className="text-sm font-bold text-emerald-900 mt-0.5">
                  {formatCurrency(invoice.paidAmount || 0)}
                </p>
              </div>
              <div className="bg-amber-50 rounded-xl px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-wider text-amber-700 font-semibold">
                  Återstår
                </p>
                <p className="text-sm font-bold text-amber-900 mt-0.5">
                  {formatCurrency(Math.max(0, invoice.total - (invoice.paidAmount || 0)))}
                </p>
              </div>
            </div>

            {showPaymentForm && (
              <div className="space-y-3 mb-4 p-3 bg-gray-50 rounded-xl animate-slide-up">
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Belopp
                  </label>
                  <input
                    type="number"
                    min={0.01}
                    step="0.01"
                    value={paymentForm.amount || ""}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, amount: Number(e.target.value) })
                    }
                    className="form-input"
                    autoFocus
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">
                      Datum
                    </label>
                    <input
                      type="date"
                      value={paymentForm.paidAt}
                      onChange={(e) =>
                        setPaymentForm({ ...paymentForm, paidAt: e.target.value })
                      }
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">
                      Metod
                    </label>
                    <select
                      value={paymentForm.method}
                      onChange={(e) =>
                        setPaymentForm({ ...paymentForm, method: e.target.value })
                      }
                      className="form-input"
                    >
                      <option>Bankgiro</option>
                      <option>Plusgiro</option>
                      <option>Swish</option>
                      <option>Banköverföring</option>
                      <option>Kontant</option>
                      <option>Kort</option>
                      <option>Annan</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Referens (valfri)
                  </label>
                  <input
                    type="text"
                    value={paymentForm.reference}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, reference: e.target.value })
                    }
                    placeholder="OCR / referens"
                    className="form-input"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={recordPayment}
                    className="flex-1 px-3 py-2 text-xs font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
                  >
                    Spara betalning
                  </button>
                  <button
                    onClick={() => setShowPaymentForm(false)}
                    className="px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Avbryt
                  </button>
                </div>
              </div>
            )}

            {/* Payment list */}
            {(!invoice.payments || invoice.payments.length === 0) ? (
              <p className="text-xs text-gray-400 text-center py-4">
                Inga betalningar registrerade
              </p>
            ) : (
              <div className="space-y-2">
                {invoice.payments.map((p) => (
                  <div
                    key={p.id}
                    className="group flex items-start justify-between gap-2 px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(p.amount)}
                      </p>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        {formatDate(p.paidAt)}
                        {p.method && <span>· {p.method}</span>}
                      </p>
                      {p.reference && (
                        <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                          Ref: {p.reference}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => deletePayment(p.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 rounded-md transition-all"
                      aria-label="Ta bort betalning"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
