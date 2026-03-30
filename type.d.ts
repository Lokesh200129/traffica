import mongoose, { Schema, Document, Model } from "mongoose";

type TUser = {
    _id?: string,
    username?: string,
    name?: string,
    email?: string,
    password?: string,
    profileImage?: string
    authProvider?: "local" | "google";
    creditBalance?: {
        availableCredits?: number,
        lastAdded?: number,
        lastUpdatedAt?: Date
    }
}

// Campaign type for backend model
interface BCampaign extends Document {
    userId: mongoose.Types.ObjectId;
    campaignName: string;
    webUrl: string;
    pageViews: number;
    pageSize: number;
    duration: {
        mode: "fixed" | "random";
        fixedSec: number;
        randomFrom: number;
        randomTo: number;
    };
    geoType: "Global" | "Countries";
    country: string;
    trafficSource: string;
    device: string;
    createdAt: Date;
    updatedAt: Date;
    status: "APPROVED" | "PENDING" | "REJECTED" | "COMPLETED";
    creditUsed: number;
}

// 
export interface TAgency {
    userId: mongoose.Types.ObjectId;
    agencyName: string;
    country: string;
    plan: string;
    services: string;
    website: string;
    createdAt: Date;
}


export interface IBillingDetail extends Document {
    userId: mongoose.Types.ObjectId;
    companyName: string;
    gstin: string;
    billingEmail: string;
    companyAddress: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
    sendInvoices: boolean;
}

// Transaction Type

export interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    orderId: string; // Cashfree order_id
    paymentSessionId?: string;
    cfOrderId?: string; // Cashfree ka internal reference ID
    amount: number; // Dollar amount (e.g. 10.50)
    currency?: string; // "USD"
    creditsAdded: number; // Kitne credits mile (e.g. 10500)
    status: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";
    paymentMethod?: string; // card, upi, etc.
    rawResponse?: any; // Cashfree ka poora webhook response save karne ke liye
    createdAt: Date;
    updatedAt: Date;
    cfPaymentId?: string; // ✅ actual payment transaction id from Cashfree


}
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
