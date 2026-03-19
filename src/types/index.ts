export type QuoteStatus = "draft" | "sent" | "opened" | "accepted" | "rejected";
export type InvoiceStatus =
  | "draft"
  | "sent"
  | "paid"
  | "overdue"
  | "partially_paid";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  city?: string;
  address?: string;
  orgNr?: string;
  notes?: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
}

export interface Quote {
  id: string;
  number: string;
  customer: Customer;
  items: LineItem[];
  status: QuoteStatus;
  createdAt: string;
  validUntil: string;
  total: number;
}

export interface Invoice {
  id: string;
  number: string;
  customer: Customer;
  items: LineItem[];
  status: InvoiceStatus;
  issuedAt: string;
  dueDate: string;
  total: number;
  paymentTerms: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  items: LineItem[];
  createdAt: string;
}

export interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  users: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}
