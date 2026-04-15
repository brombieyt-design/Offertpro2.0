"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Plus,
  Trash2,
  Pencil,
  X,
  Package,
  Search,
  Sparkles,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useSettings } from "@/lib/settings-context";

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

interface PredefinedTemplate {
  name: string;
  description: string;
  category: string;
  items: Omit<TemplateItem, "id">[];
}

const PREDEFINED_TEMPLATES: PredefinedTemplate[] = [
  {
    name: "Webbutveckling – Grundpaket",
    description: "Standard webbprojekt med design, utveckling och lansering",
    category: "Teknik",
    items: [
      { description: "Förstudie & kravspecifikation", quantity: 8, unitPrice: 1200, discount: 0 },
      { description: "UX/UI-design (wireframes & mockups)", quantity: 16, unitPrice: 1100, discount: 0 },
      { description: "Frontend-utveckling (HTML/CSS/JS)", quantity: 40, unitPrice: 1050, discount: 0 },
      { description: "Backend & databasintegration", quantity: 24, unitPrice: 1150, discount: 0 },
      { description: "Testning & kvalitetssäkring", quantity: 8, unitPrice: 950, discount: 0 },
      { description: "Lansering & driftsättning", quantity: 4, unitPrice: 1200, discount: 0 },
    ],
  },
  {
    name: "Grafisk Design – Varumärkespaket",
    description: "Komplett visuell identitet för företag",
    category: "Design",
    items: [
      { description: "Logotyp (3 förslag + revision)", quantity: 1, unitPrice: 8500, discount: 0 },
      { description: "Färgpalett & typografi", quantity: 1, unitPrice: 3500, discount: 0 },
      { description: "Visitkort (design)", quantity: 1, unitPrice: 2500, discount: 0 },
      { description: "Brevpapper & e-postsignatur", quantity: 1, unitPrice: 2000, discount: 0 },
      { description: "Grafisk manual (brand guidelines)", quantity: 1, unitPrice: 5000, discount: 0 },
    ],
  },
  {
    name: "IT-konsultation – Månadsavtal",
    description: "Löpande IT-stöd och rådgivning per månad",
    category: "Teknik",
    items: [
      { description: "Systemförvaltning & övervakning", quantity: 20, unitPrice: 1100, discount: 0 },
      { description: "Helpdesk & användarsupport", quantity: 10, unitPrice: 950, discount: 0 },
      { description: "Säkerhetsöversyn & backup", quantity: 4, unitPrice: 1300, discount: 0 },
      { description: "Uppdateringar & patchhantering", quantity: 4, unitPrice: 1050, discount: 0 },
    ],
  },
  {
    name: "Digital Marknadsföring",
    description: "Kampanjpaket för sociala medier och Google Ads",
    category: "Marknadsföring",
    items: [
      { description: "Strategi & målgruppsanalys", quantity: 8, unitPrice: 1200, discount: 0 },
      { description: "Innehållsproduktion (texter & bilder)", quantity: 20, unitPrice: 1000, discount: 0 },
      { description: "Google Ads – kampanjhantering", quantity: 1, unitPrice: 4500, discount: 0 },
      { description: "Social media management (månadsvis)", quantity: 1, unitPrice: 6000, discount: 0 },
      { description: "Månadsrapport & analys", quantity: 1, unitPrice: 1500, discount: 0 },
    ],
  },
  {
    name: "Redovisning – Löpande bokföring",
    description: "Bokföring och löneadministration för småföretag",
    category: "Ekonomi",
    items: [
      { description: "Löpande bokföring (per månad)", quantity: 1, unitPrice: 2500, discount: 0 },
      { description: "Löneadministration (per anställd)", quantity: 3, unitPrice: 600, discount: 0 },
      { description: "Kvartalsrapport", quantity: 1, unitPrice: 1800, discount: 0 },
      { description: "Momsdeklaration", quantity: 1, unitPrice: 800, discount: 0 },
    ],
  },
  {
    name: "Fotografering – Företagsfoto",
    description: "Professionell fotografering för företag och personal",
    category: "Kreativt",
    items: [
      { description: "Fotografering på plats (halvdag)", quantity: 1, unitPrice: 5500, discount: 0 },
      { description: "Bildredigering (per bild)", quantity: 20, unitPrice: 250, discount: 0 },
      { description: "Leverans av högupplösta filer", quantity: 1, unitPrice: 500, discount: 0 },
    ],
  },
  {
    name: "Snickeri & Renovering",
    description: "Inomhusrenovering och snickeriarbeten",
    category: "Hantverkstjänster",
    items: [
      { description: "Arbetskostnad (per timme)", quantity: 40, unitPrice: 650, discount: 0 },
      { description: "Material (uppskattning)", quantity: 1, unitPrice: 8000, discount: 0 },
      { description: "Hyra av verktyg & maskiner", quantity: 1, unitPrice: 1500, discount: 0 },
      { description: "Städning & bortforsling av skräp", quantity: 1, unitPrice: 1200, discount: 0 },
    ],
  },
  {
    name: "Utbildning & Workshop",
    description: "Företagsanpassad utbildning och workshopar",
    category: "Utbildning",
    items: [
      { description: "Förberedelse & kursmaterial", quantity: 8, unitPrice: 1100, discount: 0 },
      { description: "Kursledning (per timme)", quantity: 8, unitPrice: 1500, discount: 0 },
      { description: "Deltagarhandledning (per person)", quantity: 10, unitPrice: 500, discount: 0 },
      { description: "Uppföljning & utvärdering", quantity: 2, unitPrice: 1000, discount: 0 },
    ],
  },
  {
    name: "Elinstallation – Villor & Lägenheter",
    description: "Elarbeten för bostäder, inkl. jordfelsbrytare och belysning",
    category: "Hantverkstjänster",
    items: [
      { description: "Arbetstid elektriker (per timme)", quantity: 16, unitPrice: 780, discount: 0 },
      { description: "Material (kablar, uttag, säkringar)", quantity: 1, unitPrice: 4500, discount: 0 },
      { description: "Installation jordfelsbrytare", quantity: 2, unitPrice: 1200, discount: 0 },
      { description: "Besiktning & dokumentation", quantity: 1, unitPrice: 1800, discount: 0 },
      { description: "ROT-avdrag (50%)", quantity: 1, unitPrice: -6240, discount: 0 },
    ],
  },
  {
    name: "Rörmokeri – Badrumsrenovering",
    description: "VVS-arbeten vid byte av rör, blandare och sanitetsporslin",
    category: "Hantverkstjänster",
    items: [
      { description: "Arbetstid rörmokare (per timme)", quantity: 20, unitPrice: 820, discount: 0 },
      { description: "Material (rör, kopplingar, tätningar)", quantity: 1, unitPrice: 5500, discount: 0 },
      { description: "Byte av blandare (per st)", quantity: 3, unitPrice: 850, discount: 0 },
      { description: "Installation toalett & tvättställ", quantity: 1, unitPrice: 3200, discount: 0 },
      { description: "ROT-avdrag (50%)", quantity: 1, unitPrice: -8200, discount: 0 },
    ],
  },
  {
    name: "Målning – Invändig",
    description: "Invändig målning av rum, inkl. grundning och spackling",
    category: "Hantverkstjänster",
    items: [
      { description: "Arbetstid målare (per timme)", quantity: 24, unitPrice: 620, discount: 0 },
      { description: "Spackling & slipning av väggar", quantity: 1, unitPrice: 2500, discount: 0 },
      { description: "Grundfärg", quantity: 10, unitPrice: 180, discount: 0 },
      { description: "Täckfärg (2 strykningar)", quantity: 20, unitPrice: 220, discount: 0 },
      { description: "Skydd av golv & möbler", quantity: 1, unitPrice: 500, discount: 0 },
      { description: "ROT-avdrag (50%)", quantity: 1, unitPrice: -7440, discount: 0 },
    ],
  },
  {
    name: "Takläggning – Tegelpannor",
    description: "Byte av takpannor och tätskikt på villa",
    category: "Hantverkstjänster",
    items: [
      { description: "Rivning av gammalt tak", quantity: 1, unitPrice: 8000, discount: 0 },
      { description: "Ny läkt & underlagstak", quantity: 120, unitPrice: 95, discount: 0 },
      { description: "Takpannor (per kvm)", quantity: 120, unitPrice: 280, discount: 0 },
      { description: "Nockpannor & beslag", quantity: 1, unitPrice: 4500, discount: 0 },
      { description: "Arbetstid takläggare (per timme)", quantity: 48, unitPrice: 700, discount: 0 },
      { description: "Bortforsling av gammalt material", quantity: 1, unitPrice: 3500, discount: 0 },
    ],
  },
  {
    name: "Snickeri – Köksrenovering",
    description: "Byte av köksluckor, bänkskivor och installation av köksskåp",
    category: "Hantverkstjänster",
    items: [
      { description: "Arbetstid snickare (per timme)", quantity: 32, unitPrice: 680, discount: 0 },
      { description: "Köksluckor (set)", quantity: 1, unitPrice: 12000, discount: 0 },
      { description: "Bänkskiva laminat (per lm)", quantity: 5, unitPrice: 1200, discount: 0 },
      { description: "Montering köksfläkt", quantity: 1, unitPrice: 1500, discount: 0 },
      { description: "Silikon & fogmassa", quantity: 1, unitPrice: 400, discount: 0 },
      { description: "ROT-avdrag (50%)", quantity: 1, unitPrice: -10880, discount: 0 },
    ],
  },
  {
    name: "Markarbeten – Uteplats & Altan",
    description: "Anläggning av uteplats med trädäck eller plattor",
    category: "Hantverkstjänster",
    items: [
      { description: "Markberedning & grävning", quantity: 1, unitPrice: 5500, discount: 0 },
      { description: "Grus & makadam (fundament)", quantity: 1, unitPrice: 3500, discount: 0 },
      { description: "Trädäck – virke (per kvm)", quantity: 30, unitPrice: 450, discount: 0 },
      { description: "Arbetstid anläggare (per timme)", quantity: 24, unitPrice: 640, discount: 0 },
      { description: "Räcke & avslutningslist", quantity: 1, unitPrice: 4200, discount: 0 },
    ],
  },
  {
    name: "Städtjänst – Hemstädning",
    description: "Regelbunden hemstädning med RUT-avdrag",
    category: "Hantverkstjänster",
    items: [
      { description: "Hemstädning 3 rum & kök (per tillfälle)", quantity: 4, unitPrice: 1400, discount: 0 },
      { description: "Fönsterputs (per tillfälle)", quantity: 2, unitPrice: 800, discount: 0 },
      { description: "Städmaterial & förbrukningsmaterial", quantity: 1, unitPrice: 300, discount: 0 },
      { description: "RUT-avdrag (50%)", quantity: 1, unitPrice: -2800, discount: 0 },
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Teknik: "bg-blue-100 text-blue-700",
  Design: "bg-purple-100 text-purple-700",
  Marknadsföring: "bg-orange-100 text-orange-700",
  Ekonomi: "bg-green-100 text-green-700",
  Kreativt: "bg-pink-100 text-pink-700",
  Hantverkstjänster: "bg-yellow-100 text-yellow-700",
  Utbildning: "bg-teal-100 text-teal-700",
};

export default function TemplatesPage() {
  const { formatMoney: formatCurrency } = useSettings();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [importing, setImporting] = useState<string | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [libraryFilter, setLibraryFilter] = useState("Alla");

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
    setShowLibrary(false);
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
    setShowLibrary(false);
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

  async function handleImport(tpl: PredefinedTemplate) {
    setImporting(tpl.name);
    await fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: tpl.name,
        description: tpl.description,
        items: tpl.items,
      }),
    });
    setImporting(null);
    fetchTemplates();
  }

  function calcTotal(items: { quantity: number; unitPrice: number; discount?: number }[]) {
    return items.reduce((sum, i) => {
      const disc = i.discount ? (i.quantity * i.unitPrice * i.discount) / 100 : 0;
      return sum + i.quantity * i.unitPrice - disc;
    }, 0);
  }

  const categories = ["Alla", ...Array.from(new Set(PREDEFINED_TEMPLATES.map((t) => t.category)))];

  const filteredLibrary =
    libraryFilter === "Alla"
      ? PREDEFINED_TEMPLATES
      : PREDEFINED_TEMPLATES.filter((t) => t.category === libraryFilter);

  const filteredTemplates = templates.filter((tpl) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      tpl.name.toLowerCase().includes(q) ||
      tpl.description.toLowerCase().includes(q) ||
      tpl.items.some((i) => i.description.toLowerCase().includes(q))
    );
  });

  const alreadyImported = new Set(templates.map((t) => t.name));

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
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setShowLibrary(!showLibrary);
              setShowForm(false);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Mallbibliotek
            {showLibrary ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Skapa mall
          </button>
        </div>
      </div>

      {/* Template Library */}
      {showLibrary && (
        <div className="bg-white rounded-xl border border-indigo-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                Färdiga mallar
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Välj en mall att importera till dina egna mallar
              </p>
            </div>
            <button
              onClick={() => setShowLibrary(false)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setLibraryFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  libraryFilter === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredLibrary.map((tpl) => {
              const imported = alreadyImported.has(tpl.name);
              const isImporting = importing === tpl.name;
              return (
                <div
                  key={tpl.name}
                  className="border border-gray-100 rounded-xl p-4 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            CATEGORY_COLORS[tpl.category] ?? "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {tpl.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900">{tpl.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5 mb-2">{tpl.description}</p>
                      <div className="space-y-0.5">
                        {tpl.items.slice(0, 3).map((item, idx) => (
                          <p key={idx} className="text-xs text-gray-400 truncate">
                            • {item.description}
                          </p>
                        ))}
                        {tpl.items.length > 3 && (
                          <p className="text-xs text-gray-400">
                            +{tpl.items.length - 3} fler rader
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(calcTotal(tpl.items))}
                      </span>
                      {imported ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-lg">
                          Importerad
                        </span>
                      ) : (
                        <button
                          onClick={() => handleImport(tpl)}
                          disabled={isImporting}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50"
                        >
                          <Download className="w-3 h-3" />
                          {isImporting ? "Importerar..." : "Importera"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
                            onChange={(e) =>
                              updateItem(item.id, "quantity", Number(e.target.value))
                            }
                            className="form-input"
                          />
                        </td>
                        <td className="py-2 pr-3">
                          <input
                            type="number"
                            min="0"
                            value={item.unitPrice}
                            onChange={(e) =>
                              updateItem(item.id, "unitPrice", Number(e.target.value))
                            }
                            className="form-input"
                          />
                        </td>
                        <td className="py-2 pr-3">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={item.discount || 0}
                            onChange={(e) =>
                              updateItem(item.id, "discount", Number(e.target.value))
                            }
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
          {filteredTemplates.map((tpl) => (
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
            Skapa egna mallar eller välj från vårt mallbibliotek med färdiga branschmallar.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setShowLibrary(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Bläddra mallbiblioteket
            </button>
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Skapa mall
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
