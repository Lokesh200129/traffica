// ── Payment (existing) ────────────────────────────────────────────────────────
export type TransactionType = "Purchase" | "Credit" | "Debit" | "Refund";

export interface BillingTransaction {
    id: string;
    date: string;
    amount: number;
    reference: string;
    type: TransactionType;
    description: string;
    invoiceUrl?: string;
}

// ── Credits ───────────────────────────────────────────────────────────────────
export type CreditAction = "Campaign Created" | "Credit Added" | "Refund" | "Bonus";

export interface CreditTransaction {
    id: string;
    date: string;
    credits: number;         // positive = added, negative = consumed
    action: CreditAction;
    campaignName?: string;   // filled when action = "Campaign Created"
    description: string;
    balanceAfter: number;
}

// ── Mock Payments ─────────────────────────────────────────────────────────────
// export const MOCK_TRANSACTIONS: BillingTransaction[] = [
//     { id: "1", date: "2024-03-15", amount: 5000, reference: "TXN-001", type: "Purchase", description: "Campaign Credits Purchase", invoiceUrl: "#" },
//     { id: "2", date: "2024-03-10", amount: 1000, reference: "TXN-002", type: "Credit", description: "Referral Bonus Credit" },
//     { id: "3", date: "2024-03-08", amount: 2500, reference: "TXN-003", type: "Debit", description: "Campaign Charges - Spring Sale" },
//     { id: "4", date: "2024-03-05", amount: 500, reference: "TXN-004", type: "Refund", description: "Campaign Cancelled Refund", invoiceUrl: "#" },
//     { id: "5", date: "2024-03-01", amount: 10000, reference: "TXN-005", type: "Purchase", description: "Bulk Credits Purchase", invoiceUrl: "#" },
//     { id: "6", date: "2024-02-25", amount: 3000, reference: "TXN-006", type: "Debit", description: "Campaign Charges - Winter Promo" },
//     { id: "7", date: "2024-02-20", amount: 1500, reference: "TXN-007", type: "Credit", description: "Promotional Bonus" },
//     { id: "8", date: "2024-02-15", amount: 2000, reference: "TXN-008", type: "Purchase", description: "Credit Top-up", invoiceUrl: "#" },
//     { id: "9", date: "2024-02-10", amount: 800, reference: "TXN-009", type: "Debit", description: "Campaign Charges - Flash Sale" },
//     { id: "10", date: "2024-02-05", amount: 300, reference: "TXN-010", type: "Refund", description: "Overcharge Refund" },
// ];

// ── Mock Credits ──────────────────────────────────────────────────────────────
// export const MOCK_CREDITS: CreditTransaction[] = [
//     { id: "c1", date: "2024-03-15", credits: 5000, action: "Credit Added", description: "Purchased credits", balanceAfter: 12000 },
//     { id: "c2", date: "2024-03-14", credits: -1200, action: "Campaign Created", campaignName: "Spring Sale 2024", description: "Credits consumed for campaign", balanceAfter: 7000 },
//     { id: "c3", date: "2024-03-12", credits: 1000, action: "Bonus", description: "Referral bonus credits", balanceAfter: 8200 },
//     { id: "c4", date: "2024-03-10", credits: -800, action: "Campaign Created", campaignName: "Flash Deal", description: "Credits consumed for campaign", balanceAfter: 7200 },
//     { id: "c5", date: "2024-03-08", credits: 500, action: "Refund", description: "Campaign cancelled refund", balanceAfter: 8000 },
//     { id: "c6", date: "2024-03-05", credits: -2000, action: "Campaign Created", campaignName: "Winter Promo", description: "Credits consumed for campaign", balanceAfter: 7500 },
//     { id: "c7", date: "2024-03-01", credits: 10000, action: "Credit Added", description: "Bulk credit purchase", balanceAfter: 9500 },
//     { id: "c8", date: "2024-02-28", credits: -500, action: "Campaign Created", campaignName: "Weekend Boost", description: "Credits consumed for campaign", balanceAfter: 9500 },
// ];