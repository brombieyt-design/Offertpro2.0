export type QuoteStatus = "draft" | "sent" | "opened" | "accepted" | "rejected";
export type InvoiceStatus =
  | "draft"
  | "sent"
  | "paid"
  | "overdue"
  | "partially_paid";

export type CustomerType = "business" | "private";
export type TaxDeduction = "none" | "rot" | "rut";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  city?: string;
  address?: string;
  orgNr?: string;
  personnummer?: string;
  customerType?: CustomerType;
  notes?: string;
  tags?: string[];
  createdAt?: string;
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
  taxDeduction?: TaxDeduction;
  laborCost?: number;
  tags?: string[];
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
  taxDeduction?: TaxDeduction;
  laborCost?: number;
  tags?: string[];
}

export interface SavedItem {
  id: string;
  description: string;
  unitPrice: number;
  category?: string;
  createdAt: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  items: LineItem[];
  createdAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  passwordHash: string;
  createdAt: string;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: string;
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
