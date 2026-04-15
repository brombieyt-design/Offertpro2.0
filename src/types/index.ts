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
  /** Optional add-on the customer can include/exclude on the public offer page */
  optional?: boolean;
  /** Whether the customer has opted in to this optional item (default true = included) */
  selected?: boolean;
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
  /** Cling-style interactive offer fields ------------------------------- */
  /** Base64 data URL or external URL shown as the hero on /q/[token] */
  coverImage?: string;
  /** Presentation text shown above line items (plain text, line breaks preserved) */
  introText?: string;
  /** Terms block shown below line items */
  termsText?: string;
  /** Random URL-safe token used to build the public share URL /q/[token] */
  shareToken?: string;
  /** First time the customer opened the public page */
  openedAt?: string;
  /** When the customer accepted the offer */
  acceptedAt?: string;
  /** When the customer rejected the offer */
  rejectedAt?: string;
  /** Customer's name as typed in the signature box */
  signedBy?: string;
}

export interface Payment {
  id: string;
  amount: number;
  paidAt: string;
  method?: string;
  reference?: string;
  note?: string;
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
  payments?: Payment[];
  paidAmount?: number;
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
