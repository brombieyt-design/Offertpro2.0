import { PricingTier } from "@/types";

export const navItems = [
  { label: "Översikt", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Offerter", href: "/quotes", icon: "FileText" },
  { label: "Fakturor", href: "/invoices", icon: "ClipboardList" },
  { label: "Mallar", href: "/templates", icon: "Copy" },
  { label: "Kunder", href: "/clients", icon: "Users" },
  { label: "Analys", href: "/analytics", icon: "BarChart3" },
  { label: "Inställningar", href: "/settings", icon: "Settings" },
];

export const pricingTiers: PricingTier[] = [
  {
    name: "Gratis",
    price: 0,
    period: "/månad",
    description: "Perfekt för att komma igång",
    users: "1 användare",
    features: [
      "5 offerter/månad",
      "Grundläggande PDF-export",
      "E-postleverans",
      "7 dagars giltighet",
    ],
    cta: "Kom igång gratis",
  },
  {
    name: "Starter",
    price: 199,
    period: "/månad",
    description: "För växande företag",
    users: "1 användare",
    features: [
      "25 offerter/månad",
      "Anpassad varumärkning",
      "Realtidsspårning",
      "E-signaturer",
      "Mallbibliotek",
    ],
    cta: "Börja nu",
  },
  {
    name: "Pro",
    price: 499,
    period: "/månad",
    description: "För professionella team",
    users: "3 användare",
    popular: true,
    features: [
      "Obegränsade offerter",
      "Avancerad analys",
      "Anpassad domän",
      "API-åtkomst",
      "CRM-integrationer",
      "White-label PDF:er",
    ],
    cta: "Uppgradera till Pro",
  },
  {
    name: "Business",
    price: 999,
    period: "/månad",
    description: "För stora organisationer",
    users: "10 användare",
    features: [
      "Obegränsade offerter",
      "Teamsamarbete",
      "Anpassade arbetsflöden",
      "Dedikerad support",
      "SSO/SAML",
      "Zapier-integration",
    ],
    cta: "Kontakta oss",
  },
];

export const features = [
  {
    icon: "FileText",
    title: "Snygga PDF:er",
    description:
      "Skapa professionella, varumärkta offerter som imponerar på dina kunder.",
  },
  {
    icon: "Eye",
    title: "Realtidsspårning",
    description:
      "Få omedelbara notiser när kunder öppnar och läser dina offerter.",
  },
  {
    icon: "Copy",
    title: "Återanvändbara mallar",
    description:
      "Spara tid med ett bibliotek av anpassningsbara offertmallar.",
  },
  {
    icon: "PenTool",
    title: "E-signaturer",
    description:
      "Juridiskt bindande digitala signaturer inbyggt direkt i plattformen.",
  },
  {
    icon: "Bell",
    title: "Automatiska påminnelser",
    description:
      "Uppföljningsnotiser vid optimala tidpunkter för bästa resultat.",
  },
  {
    icon: "GitBranch",
    title: "Statuspipeline",
    description:
      "Visuell försäljningspipeline för att hantera alla dina affärer.",
  },
];

export const testimonials = [
  {
    quote:
      "Offert-pro halverade tiden vi lägger på offerter. Vår acceptansgrad ökade med 40% första månaden.",
    name: "Marcus Thompson",
    company: "Blue Ridge Construction",
    role: "VD",
  },
  {
    quote:
      "Realtidsspårningen är en game changer. Att veta exakt när kunden öppnar offerten gör all skillnad.",
    name: "Priya Sharma",
    company: "Pixel Studio",
    role: "Grundare",
  },
  {
    quote:
      "Våra kunder älskar hur professionellt allt ser ut. E-signaturerna gör det otroligt smidigt.",
    name: "James O'Brien",
    company: "Evergreen Events",
    role: "Affärsutvecklare",
  },
];

export const quoteStatusLabels: Record<string, string> = {
  draft: "Utkast",
  sent: "Skickad",
  opened: "Öppnad",
  accepted: "Accepterad",
  rejected: "Avvisad",
};

export const invoiceStatusLabels: Record<string, string> = {
  draft: "Utkast",
  sent: "Skickad",
  paid: "Betald",
  overdue: "Förfallen",
  partially_paid: "Delvis betald",
};

export const quoteStatusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  sent: "bg-blue-100 text-blue-700",
  opened: "bg-yellow-100 text-yellow-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export const invoiceStatusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  sent: "bg-blue-100 text-blue-700",
  paid: "bg-green-100 text-green-700",
  overdue: "bg-red-100 text-red-700",
  partially_paid: "bg-amber-100 text-amber-700",
};
