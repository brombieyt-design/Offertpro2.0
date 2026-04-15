"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  Mail,
  LinkIcon,
  Send,
  Package,
  Building2,
  User,
  BookmarkPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SavedItemsPicker from "@/components/SavedItemsPicker";
import { useToast } from "@/components/Toast";
import { useSettings } from "@/lib/settings-context";
import type { SavedItem } from "@/types";

interface LineItemData {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
}

const steps = [
  { number: 1, label: "Kundinformation" },
  { number: 2, label: "Radposter" },
  { number: 3, label: "Förhandsgranska" },
  { number: 4, label: "Skicka" },
];

const paymentTermsOptions = [
  "Förfaller omedelbart",
  "10 dagar netto",
  "20 dagar netto",
  "30 dagar netto",
  "45 dagar netto",
  "60 dagar netto",
];

export default function NewInvoicePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { formatMoney: formatCurrency, vatRate: defaultVatRate } = useSettings();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 state
  const [customerType, setCustomerType] = useState<"business" | "private">("business");
  const [customerSearch, setCustomerSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    address: "",
    orgNr: "",
    personnummer: "",
    reference: "",
    paymentTerms: "30 dagar netto",
    notes: "",
  });

  // ROT/RUT state
  const [taxDeduction, setTaxDeduction] = useState<"none" | "rot" | "rut">("none");
  const [laborCost, setLaborCost] = useState(0);

  // Step 2 state
  const [items, setItems] = useState<LineItemData[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0, discount: 0 },
  ]);

  const [apiCustomers, setApiCustomers] = useState<Array<{id: string; name: string; email: string; phone?: string; company?: string; city?: string; address?: string; orgNr?: string}>>([]);
  const [templates, setTemplates] = useState<Array<{id: string; name: string; description: string; items: LineItemData[]}>>([]);
  const [showTemplates, setShowTemplates] = useState(false);

  useEffect(() => {
    fetch("/api/customers").then(r => r.ok ? r.json() : []).then(d => setApiCustomers(Array.isArray(d) ? d : [])).catch(() => {});
    fetch("/api/templates").then(r => r.ok ? r.json() : []).then(d => setTemplates(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);

  function applyTemplate(tpl: {items: LineItemData[]}) {
    setItems(tpl.items.map(item => ({
      id: String(Date.now()) + Math.random().toString(36).slice(2, 6),
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      discount: item.discount ?? 0,
    })));
    setShowTemplates(false);
  }

  // Step 4 state
  const [deliveryEmail, setDeliveryEmail] = useState(true);
  const [deliveryLink, setDeliveryLink] = useState(false);
  const [sendEmail, setSendEmail] = useState("");
  const [sendMessage, setSendMessage] = useState(
    "Hej,\n\nBifogat finner du vår faktura. Vänligen betala inom angiven förfallotid.\n\nMed vänlig hälsning"
  );

  const filteredCustomers = customerSearch
    ? apiCustomers.filter(
        (c) =>
          c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
          c.company?.toLowerCase().includes(customerSearch.toLowerCase())
      )
    : [];

  const selectCustomer = (c: (typeof apiCustomers)[0]) => {
    const isPrivate = !c.company && !c.orgNr;
    setCustomerType(isPrivate ? "private" : "business");
    setFormData({
      name: c.name,
      email: c.email,
      phone: c.phone || "",
      company: c.company || "",
      city: c.city || "",
      address: c.address || "",
      orgNr: c.orgNr || "",
      personnummer: "",
      reference: "",
      paymentTerms: "30 dagar netto",
      notes: "",
    });
    setSendEmail(c.email);
    setCustomerSearch("");
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "email") setSendEmail(value);
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        description: "",
        quantity: 1,
        unitPrice: 0,
        discount: 0,
      },
    ]);
  };

  const addItemFromSaved = (saved: SavedItem) => {
    setItems((prev) => {
      const isFirstEmpty =
        prev.length === 1 && !prev[0].description && !prev[0].unitPrice;
      const newItem = {
        id: String(Date.now()) + Math.random().toString(36).slice(2, 6),
        description: saved.description,
        quantity: 1,
        unitPrice: saved.unitPrice,
        discount: 0,
      };
      return isFirstEmpty ? [newItem] : [...prev, newItem];
    });
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const saveAsItem = async (item: LineItemData) => {
    if (!item.description.trim() || item.unitPrice <= 0) {
      toast("Beskrivning och à-pris krävs", "error");
      return;
    }
    try {
      const res = await fetch("/api/saved-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: item.description,
          unitPrice: item.unitPrice,
          category: "Övrigt",
        }),
      });
      if (!res.ok) throw new Error();
      toast("Sparad som artikel", "success");
    } catch {
      toast("Kunde inte spara", "error");
    }
  };

  const updateItem = (
    id: string,
    field: keyof LineItemData,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const lineTotal = (item: LineItemData) => {
    const subtotal = item.quantity * item.unitPrice;
    return subtotal - subtotal * (item.discount / 100);
  };

  const subtotal = items.reduce((sum, item) => sum + lineTotal(item), 0);
  const vat = subtotal * (defaultVatRate / 100);
  const total = subtotal + vat;

  const getDueDate = () => {
    const now = new Date();
    if (formData.paymentTerms === "Förfaller omedelbart") return now;
    const match = formData.paymentTerms.match(/(\d+)/);
    const days = match ? parseInt(match[1]) : 30;
    return new Date(now.getTime() + days * 86400000);
  };

  // ROT/RUT calculation
  const rotRutRate = taxDeduction === "rot" ? 0.3 : taxDeduction === "rut" ? 0.5 : 0;
  const rotRutDeduction = taxDeduction !== "none" ? laborCost * rotRutRate : 0;
  const rotRutMaxPerPerson = taxDeduction === "rot" ? 50000 : taxDeduction === "rut" ? 75000 : 0;
  const appliedDeduction = Math.min(rotRutDeduction, rotRutMaxPerPerson);
  const totalAfterDeduction = total - appliedDeduction;

  const canProceed = () => {
    if (currentStep === 1) {
      if (customerType === "private") {
        return formData.name && formData.email;
      }
      return formData.name && formData.email && formData.company;
    }
    if (currentStep === 2) {
      return items.some((i) => i.description && i.unitPrice > 0);
    }
    return true;
  };

  const goNext = () => {
    if (canProceed() && currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const goBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="space-y-8 pb-28">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/invoices"
          className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Ny faktura</h1>
          <p className="text-sm text-gray-500 mt-0.5">Faktura #FAK-2026-001</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0 overflow-x-auto px-2">
        {steps.map((step, idx) => (
          <div key={step.number} className="flex items-center shrink-0">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "step-dot",
                  currentStep === step.number
                    ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                    : currentStep > step.number
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-400"
                )}
              >
                {step.number}
              </div>
              <span
                className={cn(
                  "text-[10px] sm:text-xs mt-2 font-medium whitespace-nowrap",
                  currentStep >= step.number
                    ? "text-indigo-600"
                    : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "step-line w-8 sm:w-16 md:w-24 mx-1.5 sm:mx-3 mb-6",
                  currentStep > step.number ? "bg-indigo-600" : ""
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Customer info */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-7">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-gray-900">
              Kundinformation
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Vem ska fakturan skickas till?
            </p>
          </div>

          {/* Customer type toggle */}
          <div className="flex gap-2 p-1 bg-gray-100/60 rounded-xl w-fit">
            <button
              type="button"
              onClick={() => setCustomerType("business")}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                customerType === "business"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Building2 className="w-4 h-4" />
              Företag
            </button>
            <button
              type="button"
              onClick={() => setCustomerType("private")}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                customerType === "private"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <User className="w-4 h-4" />
              Privatkund
            </button>
          </div>

          {/* Customer search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              className="form-input pl-11"
              placeholder="Sök bland sparade kunder..."
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
            />
            {filteredCustomers.length > 0 && (
              <div className="absolute z-10 mt-2 w-full bg-white rounded-2xl border border-gray-200/80 shadow-lg max-h-48 overflow-y-auto">
                {filteredCustomers.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => selectCustomer(c)}
                    className="w-full text-left px-5 py-3.5 hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {c.name}
                    </div>
                    <div className="text-xs text-gray-500">{c.company || "Privatkund"}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {customerType === "private" ? "Fullständigt namn" : "Kundnamn"} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="t.ex. Anna Svensson"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                E-postadress <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="form-input"
                placeholder={customerType === "private" ? "t.ex. anna@gmail.com" : "t.ex. anna@foretag.se"}
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Telefonnummer
              </label>
              <input
                type="tel"
                className="form-input"
                placeholder="t.ex. +46 70 123 45 67"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
              <p className="text-xs text-gray-400 mt-1.5">för SMS-notis</p>
            </div>

            {customerType === "business" ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Företag <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="t.ex. Acme AB"
                    value={formData.company}
                    onChange={(e) => updateField("company", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Organisationsnummer
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="t.ex. 556789-0123"
                    value={formData.orgNr}
                    onChange={(e) => updateField("orgNr", e.target.value)}
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Personnummer
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="t.ex. 199001011234"
                  value={formData.personnummer}
                  onChange={(e) => updateField("personnummer", e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-1.5">Krävs för ROT/RUT-avdrag</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Er referens
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="t.ex. Johan Andersson"
                value={formData.reference}
                onChange={(e) => updateField("reference", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Stad / Region
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="t.ex. Stockholm"
                value={formData.city}
                onChange={(e) => updateField("city", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {customerType === "private" ? "Adress" : "Faktureringsadress"}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="t.ex. Kungsgatan 10, 111 43 Stockholm"
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Betalningsvillkor
              </label>
              <select
                className="form-input"
                value={formData.paymentTerms}
                onChange={(e) => updateField("paymentTerms", e.target.value)}
              >
                {paymentTermsOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Förfallodatum
              </label>
              <input
                type="text"
                className="form-input bg-gray-50"
                readOnly
                value={getDueDate().toLocaleDateString("sv-SE")}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Anteckningar (valfritt)
              </label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="Eventuella anteckningar..."
                value={formData.notes}
                onChange={(e) => updateField("notes", e.target.value)}
              />
            </div>
          </div>

          {/* ROT/RUT for private customers */}
          {customerType === "private" && (
            <div className="border-t border-gray-100 pt-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Skatteavdrag</h3>
              <div className="flex gap-2 flex-wrap">
                {([["none", "Inget avdrag"], ["rot", "ROT-avdrag (30%)"], ["rut", "RUT-avdrag (50%)"]] as const).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTaxDeduction(value)}
                    className={cn(
                      "px-4 py-2.5 text-sm font-medium rounded-xl border transition-all duration-200",
                      taxDeduction === value
                        ? value === "rot"
                          ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                          : value === "rut"
                            ? "bg-blue-50 border-blue-300 text-blue-700"
                            : "bg-gray-100 border-gray-300 text-gray-700"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {taxDeduction !== "none" && (
                <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-200/80">
                  <p className="text-xs text-gray-500 mb-3">
                    {taxDeduction === "rot"
                      ? "ROT-avdrag ger 30% skattereduktion på arbetskostnaden (max 50 000 kr/person/år). Gäller reparation, underhåll, om- och tillbyggnad av bostäder."
                      : "RUT-avdrag ger 50% skattereduktion på arbetskostnaden (max 75 000 kr/person/år). Gäller hushållsnära tjänster som städning, trädgårdsarbete m.m."}
                  </p>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Arbetskostnad (kr)
                  </label>
                  <input
                    type="number"
                    min={0}
                    className="form-input w-full sm:w-48"
                    placeholder="t.ex. 25000"
                    value={laborCost || ""}
                    onChange={(e) => setLaborCost(Number(e.target.value))}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Step 2: Line items */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-900">Radposter</h2>
              <p className="text-sm text-gray-500 mt-1">
                Lägg till produkter eller tjänster
              </p>
            </div>
            {templates.length > 0 && (
              <div className="relative">
                <button onClick={() => setShowTemplates(!showTemplates)} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all duration-300">
                  <Package className="w-4 h-4" />
                  Välj mall
                </button>
                {showTemplates && (
                  <div className="absolute right-0 z-10 mt-2 w-72 bg-white rounded-2xl border border-gray-200/80 shadow-lg max-h-64 overflow-y-auto">
                    {templates.map((tpl) => (
                      <button key={tpl.id} onClick={() => applyTemplate(tpl)} className="w-full text-left px-5 py-3.5 hover:bg-gray-50 transition-all duration-200 border-b border-gray-50 last:border-0">
                        <div className="text-sm font-medium text-gray-900">{tpl.name}</div>
                        {tpl.description && <div className="text-xs text-gray-500 mt-0.5">{tpl.description}</div>}
                        <div className="text-xs text-gray-400 mt-1">{tpl.items.length} {tpl.items.length === 1 ? "rad" : "rader"}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-4">
                    Beskrivning
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-4 w-24">
                    Antal
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-4 w-32">
                    À-pris (kr)
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-4 w-24">
                    Rabatt (%)
                  </th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-4 w-28">
                    Summa
                  </th>
                  <th className="w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3.5 pr-3">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Beskrivning..."
                        value={item.description}
                        onChange={(e) =>
                          updateItem(item.id, "description", e.target.value)
                        }
                      />
                    </td>
                    <td className="py-3.5 pr-3">
                      <input
                        type="number"
                        className="form-input"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td className="py-3.5 pr-3">
                      <input
                        type="number"
                        className="form-input"
                        min={0}
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "unitPrice",
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td className="py-3.5 pr-3">
                      <input
                        type="number"
                        className="form-input"
                        min={0}
                        max={100}
                        value={item.discount}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "discount",
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td className="py-3.5 text-right text-sm font-semibold text-gray-900">
                      {formatCurrency(lineTotal(item))}
                    </td>
                    <td className="py-3.5 pl-2">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => saveAsItem(item)}
                          title="Spara som artikel"
                          className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all duration-300"
                        >
                          <BookmarkPlus className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          title="Ta bort rad"
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
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

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={addItem}
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Lägg till rad
            </button>
            <SavedItemsPicker onPick={addItemFromSaved} />
          </div>

          {/* Summary */}
          <div className="border-t border-gray-100 pt-5 space-y-2.5">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delsumma</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Moms (25%)</span>
              <span>{formatCurrency(vat)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 pt-3 border-t border-gray-100">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            {taxDeduction !== "none" && appliedDeduction > 0 && (
              <>
                <div className="flex justify-between text-sm text-emerald-600 font-medium pt-2">
                  <span>{taxDeduction === "rot" ? "ROT-avdrag (30%)" : "RUT-avdrag (50%)"}</span>
                  <span>-{formatCurrency(appliedDeduction)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-emerald-700 pt-2 border-t border-emerald-100">
                  <span>Att betala efter avdrag</span>
                  <span>{formatCurrency(totalAfterDeduction)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Preview */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-7">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-gray-900">
              Förhandsgranska
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Granska fakturan innan du skickar
            </p>
          </div>

          {/* PDF-like preview */}
          <div className="border border-gray-200/80 rounded-2xl p-4 sm:p-6 md:p-10 max-w-2xl mx-auto space-y-6 sm:space-y-10 shadow-sm bg-white">
            {/* Company header */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-start">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-indigo-600">
                  Offert Pro
                </h3>
                <p className="text-xs text-gray-500 mt-1.5">
                  Storgatan 1, 111 22 Stockholm
                </p>
                <p className="text-xs text-gray-500">info@offertpro.se</p>
              </div>
              <div className="sm:text-right">
                <p className="text-sm font-bold text-gray-900">FAKTURA</p>
                <p className="text-sm text-gray-600">#FAK-2026-001</p>
                <p className="text-xs text-gray-500 mt-2">
                  Utfärdad:{" "}
                  {new Date().toLocaleDateString("sv-SE")}
                </p>
                <p className="text-xs text-gray-500">
                  Förfaller:{" "}
                  {getDueDate().toLocaleDateString("sv-SE")}
                </p>
                <p className="text-xs text-gray-500">
                  Betalningsvillkor: {formData.paymentTerms}
                </p>
              </div>
            </div>

            {/* Customer info */}
            <div className="bg-gray-50/80 rounded-xl p-5">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                {customerType === "private" ? "Privatkund" : "Faktureras till"}
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {formData.name}
              </p>
              {formData.company && <p className="text-sm text-gray-600">{formData.company}</p>}
              {formData.orgNr && (
                <p className="text-sm text-gray-600">
                  Org.nr: {formData.orgNr}
                </p>
              )}
              {formData.personnummer && (
                <p className="text-sm text-gray-600">
                  Personnr: {formData.personnummer}
                </p>
              )}
              <p className="text-sm text-gray-600">{formData.email}</p>
              {formData.address && (
                <p className="text-sm text-gray-600">{formData.address}</p>
              )}
              {formData.reference && (
                <p className="text-sm text-gray-600 mt-1">
                  Er referens: {formData.reference}
                </p>
              )}
            </div>

            {/* Items table */}
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 font-medium text-gray-600">
                    Beskrivning
                  </th>
                  <th className="text-right py-3 font-medium text-gray-600">
                    Antal
                  </th>
                  <th className="text-right py-3 font-medium text-gray-600">
                    À-pris
                  </th>
                  <th className="text-right py-3 font-medium text-gray-600">
                    Rabatt
                  </th>
                  <th className="text-right py-3 font-medium text-gray-600">
                    Summa
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items
                  .filter((i) => i.description)
                  .map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 text-gray-900">
                        {item.description}
                      </td>
                      <td className="py-3 text-right text-gray-600">
                        {item.quantity}
                      </td>
                      <td className="py-3 text-right text-gray-600">
                        {formatCurrency(item.unitPrice)}
                      </td>
                      <td className="py-3 text-right text-gray-600">
                        {item.discount > 0 ? `${item.discount}%` : "-"}
                      </td>
                      <td className="py-3 text-right font-medium text-gray-900">
                        {formatCurrency(lineTotal(item))}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="border-t-2 border-gray-200 pt-5 space-y-1.5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delsumma</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Moms (25%)</span>
                <span>{formatCurrency(vat)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-3">
                <span>Att betala</span>
                <span>{formatCurrency(total)}</span>
              </div>
              {taxDeduction !== "none" && appliedDeduction > 0 && (
                <>
                  <div className="flex justify-between text-sm text-emerald-600 font-medium pt-2">
                    <span>
                      {taxDeduction === "rot" ? "ROT-avdrag (30%)" : "RUT-avdrag (50%)"}
                      {laborCost > 0 && <span className="text-xs text-gray-400 ml-1">(arbetskostnad {formatCurrency(laborCost)})</span>}
                    </span>
                    <span>-{formatCurrency(appliedDeduction)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-emerald-700 pt-3 border-t border-emerald-200">
                    <span>Att betala efter avdrag</span>
                    <span>{formatCurrency(totalAfterDeduction)}</span>
                  </div>
                </>
              )}
            </div>

            {/* Payment info */}
            <div className="border-t border-gray-200 pt-5 text-xs text-gray-500 space-y-1.5">
              <p className="font-medium text-gray-700">Betalningsinformation</p>
              <p>Bankgiro: 123-4567</p>
              <p>Ange fakturanummer FAK-2026-001 som referens</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Send */}
      {currentStep === 4 && (
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-7">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-gray-900">
              Skicka faktura
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Välj leveransmetod och skicka
            </p>
          </div>

          {/* Delivery method */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Leveransmetod</p>
            <label className="flex items-center gap-3.5 p-4 border border-gray-200/80 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all duration-300">
              <input
                type="checkbox"
                checked={deliveryEmail}
                onChange={(e) => setDeliveryEmail(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              />
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">E-post</span>
            </label>
            <label className="flex items-center gap-3.5 p-4 border border-gray-200/80 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all duration-300">
              <input
                type="checkbox"
                checked={deliveryLink}
                onChange={(e) => setDeliveryLink(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              />
              <LinkIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Delbar länk</span>
            </label>
          </div>

          {deliveryEmail && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  E-postadress
                </label>
                <input
                  type="email"
                  className="form-input"
                  value={sendEmail}
                  onChange={(e) => setSendEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Meddelande
                </label>
                <textarea
                  className="form-input"
                  rows={5}
                  value={sendMessage}
                  onChange={(e) => setSendMessage(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200/60 px-3 sm:px-8 py-3 sm:py-5 flex items-center justify-between z-10 gap-2">
        <button
          onClick={goBack}
          disabled={currentStep === 1}
          className={cn(
            "px-3 sm:px-5 py-2 sm:py-2.5 text-sm font-medium rounded-full transition-all duration-300 shrink-0",
            currentStep === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          )}
        >
          Tillbaka
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={async () => {
              await fetch("/api/invoices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  customer: {
                    name: formData.name,
                    email: formData.email,
                    company: formData.company || undefined,
                    orgNr: formData.orgNr || undefined,
                    personnummer: formData.personnummer || undefined,
                    customerType,
                  },
                  items,
                  status: "draft",
                  paymentTerms: formData.paymentTerms,
                  taxDeduction: taxDeduction !== "none" ? taxDeduction : undefined,
                  laborCost: laborCost > 0 ? laborCost : undefined,
                }),
              });
              router.push("/invoices");
            }}
            className="px-3 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-300 hidden sm:block"
          >
            Spara utkast
          </button>
          {currentStep < 4 ? (
            <button
              onClick={goNext}
              disabled={!canProceed()}
              className={cn(
                "px-5 sm:px-7 py-2 sm:py-2.5 text-sm font-medium rounded-full transition-all duration-300",
                canProceed()
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              Nästa
            </button>
          ) : (
            <button
              onClick={async () => {
                await fetch("/api/invoices", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    customer: {
                      name: formData.name,
                      email: formData.email,
                      company: formData.company || undefined,
                      orgNr: formData.orgNr || undefined,
                      personnummer: formData.personnummer || undefined,
                      customerType,
                    },
                    items,
                    status: "sent",
                    paymentTerms: formData.paymentTerms,
                    taxDeduction: taxDeduction !== "none" ? taxDeduction : undefined,
                    laborCost: laborCost > 0 ? laborCost : undefined,
                  }),
                });
                router.push("/invoices");
              }}
              className="inline-flex items-center gap-2 px-5 sm:px-7 py-2 sm:py-2.5 text-sm font-medium rounded-full bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Skicka faktura</span>
              <span className="sm:hidden">Skicka</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
