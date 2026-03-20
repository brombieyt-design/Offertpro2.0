"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  Mail,
  LinkIcon,
  Send,
} from "lucide-react";
import { customers } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";

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
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 state
  const [customerSearch, setCustomerSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    address: "",
    orgNr: "",
    reference: "",
    paymentTerms: "30 dagar netto",
    notes: "",
  });

  // Step 2 state
  const [items, setItems] = useState<LineItemData[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0, discount: 0 },
  ]);

  // Step 4 state
  const [deliveryEmail, setDeliveryEmail] = useState(true);
  const [deliveryLink, setDeliveryLink] = useState(false);
  const [sendEmail, setSendEmail] = useState("");
  const [sendMessage, setSendMessage] = useState(
    "Hej,\n\nBifogat finner du vår faktura. Vänligen betala inom angiven förfallotid.\n\nMed vänlig hälsning"
  );

  const filteredCustomers = customerSearch
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
          c.company?.toLowerCase().includes(customerSearch.toLowerCase())
      )
    : [];

  const selectCustomer = (c: (typeof customers)[0]) => {
    setFormData({
      name: c.name,
      email: c.email,
      phone: c.phone || "",
      company: c.company || "",
      city: c.city || "",
      address: c.address || "",
      orgNr: c.orgNr || "",
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

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== id));
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
  const vat = subtotal * 0.25;
  const total = subtotal + vat;

  const getDueDate = () => {
    const now = new Date();
    if (formData.paymentTerms === "Förfaller omedelbart") return now;
    const match = formData.paymentTerms.match(/(\d+)/);
    const days = match ? parseInt(match[1]) : 30;
    return new Date(now.getTime() + days * 86400000);
  };

  const canProceed = () => {
    if (currentStep === 1) {
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
      <div className="flex items-center justify-center gap-0">
        {steps.map((step, idx) => (
          <div key={step.number} className="flex items-center">
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
                  "text-xs mt-2 font-medium",
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
                  "step-line w-24 mx-3 mb-6",
                  currentStep > step.number ? "bg-indigo-600" : ""
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Customer info */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-8 space-y-7">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-gray-900">
              Kundinformation
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Vem ska fakturan skickas till?
            </p>
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
                    <div className="text-xs text-gray-500">{c.company}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Kundnamn <span className="text-red-500">*</span>
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
                placeholder="t.ex. anna@foretag.se"
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
                Faktureringsadress
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
        </div>
      )}

      {/* Step 2: Line items */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-8 space-y-7">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-gray-900">Radposter</h2>
            <p className="text-sm text-gray-500 mt-1">
              Lägg till produkter eller tjänster
            </p>
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
                  <th className="w-10"></th>
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
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
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
            onClick={addItem}
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            Lägg till rad
          </button>

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
          </div>
        </div>
      )}

      {/* Step 3: Preview */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-8 space-y-7">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-gray-900">
              Förhandsgranska
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Granska fakturan innan du skickar
            </p>
          </div>

          {/* PDF-like preview */}
          <div className="border border-gray-200/80 rounded-2xl p-10 max-w-2xl mx-auto space-y-10 shadow-sm bg-white">
            {/* Company header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-indigo-600">
                  Offert Pro
                </h3>
                <p className="text-xs text-gray-500 mt-1.5">
                  Storgatan 1, 111 22 Stockholm
                </p>
                <p className="text-xs text-gray-500">info@offertpro.se</p>
              </div>
              <div className="text-right">
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
                Faktureras till
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {formData.name}
              </p>
              <p className="text-sm text-gray-600">{formData.company}</p>
              {formData.orgNr && (
                <p className="text-sm text-gray-600">
                  Org.nr: {formData.orgNr}
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
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-8 space-y-7">
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
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200/60 px-8 py-5 flex items-center justify-between z-10">
        <button
          onClick={goBack}
          disabled={currentStep === 1}
          className={cn(
            "px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300",
            currentStep === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          )}
        >
          Tillbaka
        </button>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-300">
            Spara utkast
          </button>
          {currentStep < 4 ? (
            <button
              onClick={goNext}
              disabled={!canProceed()}
              className={cn(
                "px-7 py-2.5 text-sm font-medium rounded-full transition-all duration-300",
                canProceed()
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              Nästa steg
            </button>
          ) : (
            <button className="inline-flex items-center gap-2 px-7 py-2.5 text-sm font-medium rounded-full bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-300">
              <Send className="w-4 h-4" />
              Skicka faktura
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
