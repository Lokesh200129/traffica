// ── Saved Cards ───────────────────────────────────────────────────────────────
export interface SavedCard {
    id: string;
    last4: string;
    brand: "visa" | "mastercard" | "amex" | "rupay";
    expMonth: number;
    expYear: number;
    holderName: string;
    isDefault: boolean;
}

// ── Balance ───────────────────────────────────────────────────────────────────
export interface BalanceTier {
    type: "Economy" | "Expert";
    credits: number;
}

export interface BalanceData {
    tiers: BalanceTier[];
}

// ── Billing Settings ──────────────────────────────────────────────────────────
export interface BillingSettings {
    firstName: string;
    lastName: string;
    companyName: string;
    gstin: string;
    companyAddress: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
    preferredCurrency: string;
    billingEmail: string;
    sendInvoices: boolean;
}

// ── Billing History ───────────────────────────────────────────────────────────
export type TransactionType = "Credit" | "Debit" | "Refund" | "Purchase";

export interface BillingTransaction {
    id: string;
    date: string;       // "YYYY-MM-DD"
    amount: number;
    currency: string;
    reference: string;
    type: TransactionType;
    description: string;
    invoiceUrl?: string;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
export const MOCK_CARDS: SavedCard[] = [
    { id: "card-1", last4: "4242", brand: "visa", expMonth: 12, expYear: 2027, holderName: "Arjun Sharma", isDefault: true },
    { id: "card-2", last4: "5555", brand: "mastercard", expMonth: 8, expYear: 2026, holderName: "Arjun Sharma", isDefault: false },
    { id: "card-3", last4: "3782", brand: "amex", expMonth: 3, expYear: 2028, holderName: "Traffica Inc.", isDefault: false },
];

export const MOCK_BALANCE: BalanceData = {
    tiers: [
        { type: "Economy", credits: 1240 },
        { type: "Expert", credits: 380 },
    ],
};

export const MOCK_SETTINGS: BillingSettings = {
    firstName: "",
    lastName: "",
    companyName: "",
    gstin: "",
    companyAddress: "",
    city: "",
    postalCode: "",
    state: "",
    country: "India",
    preferredCurrency: "INR, Indian Rupee",
    billingEmail: "",
    sendInvoices: false,
};

export const MOCK_TRANSACTIONS: BillingTransaction[] = [
    { id: "txn-001", date: "2025-01-22", amount: 2999, currency: "INR", reference: "REF-8821A", type: "Purchase", description: "Expert Traffic Pack — 500 credits", invoiceUrl: "#" },
    { id: "txn-002", date: "2025-01-18", amount: 999, currency: "INR", reference: "REF-7712B", type: "Purchase", description: "Economy Traffic Pack — 200 credits", invoiceUrl: "#" },
    { id: "txn-003", date: "2025-01-10", amount: 500, currency: "INR", reference: "REF-6630C", type: "Credit", description: "Referral bonus — Priya M.", invoiceUrl: undefined },
    { id: "txn-004", date: "2025-01-05", amount: 4999, currency: "INR", reference: "REF-5541D", type: "Purchase", description: "Expert Traffic Pack — 1000 credits", invoiceUrl: "#" },
    { id: "txn-005", date: "2024-12-28", amount: 999, currency: "INR", reference: "REF-4420E", type: "Refund", description: "Partial refund — Campaign cancelled", invoiceUrl: "#" },
    { id: "txn-006", date: "2024-12-20", amount: 1499, currency: "INR", reference: "REF-3310F", type: "Purchase", description: "Economy Traffic Pack — 300 credits", invoiceUrl: "#" },
    { id: "txn-007", date: "2024-12-15", amount: 250, currency: "INR", reference: "REF-2201G", type: "Credit", description: "Welcome bonus", invoiceUrl: undefined },
    { id: "txn-008", date: "2024-12-10", amount: 2999, currency: "INR", reference: "REF-1190H", type: "Purchase", description: "Expert Traffic Pack — 500 credits", invoiceUrl: "#" },
    { id: "txn-009", date: "2024-12-05", amount: 999, currency: "INR", reference: "REF-0081I", type: "Debit", description: "Campaign spend — Summer Sale Blast", invoiceUrl: undefined },
    { id: "txn-010", date: "2024-11-28", amount: 4999, currency: "INR", reference: "REF-9972J", type: "Purchase", description: "Expert Traffic Pack — 1000 credits", invoiceUrl: "#" },
    { id: "txn-011", date: "2024-11-20", amount: 500, currency: "INR", reference: "REF-8863K", type: "Credit", description: "Referral bonus — Rahul V.", invoiceUrl: undefined },
    { id: "txn-012", date: "2024-11-15", amount: 1499, currency: "INR", reference: "REF-7754L", type: "Purchase", description: "Economy Traffic Pack — 300 credits", invoiceUrl: "#" },
];