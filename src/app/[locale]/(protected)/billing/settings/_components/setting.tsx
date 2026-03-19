"use client"
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BillingSettings } from "../../_lib/mock-data-type";
import { MOCK_SETTINGS } from "../../_lib/mock-data-type";
import { AppButton } from "@/components/button"; // Agency page jesa button use karne ke liye

const COUNTRIES = ["India", "USA", "UK", "Canada", "Australia", "Singapore", "UAE"];
const CURRENCIES = ["INR, Indian Rupee", "USD, US Dollar", "GBP, British Pound", "AED, UAE Dirham", "SGD, Singapore Dollar"];
const STATES = ["Not selected", "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Telangana", "Gujarat", "Rajasthan"];

// Agency page ke labels jesa look dene ke liye
function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
            </label>
            {children}
        </div>
    );
}

// Shadcn Input style variables
const inputCls = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors";
const selectCls = `${inputCls} cursor-pointer appearance-none`;

interface BillingSettingsProps {
    initialData?: BillingSettings;
    onSave?: (data: BillingSettings) => Promise<void>;
}

export default function BillingSettingsPage({
    initialData = MOCK_SETTINGS,
    onSave,
}: BillingSettingsProps) {
    const [form, setForm] = useState<BillingSettings>(initialData);
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    const update = (key: keyof BillingSettings, value: string | boolean) =>
        setForm(prev => ({ ...prev, [key]: value }));

    const handleSave = async () => {
        setSaving(true);
        await onSave?.(form);
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="w-full">
            {/* Header - Agency Page Style */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Billing Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Manage your billing information and preferences for invoices and payments.
                </p>
            </div>

            {/* Form card - Exact Agency Page Padding & Border */}
            <div className="rounded-2xl border border-border bg-card p-6 w-full shadow-sm">
                <div className="flex flex-col gap-5">

                    {/* Row 1: First + Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="First Name">
                            <input className={inputCls} value={form.firstName} onChange={e => update("firstName", e.target.value)} placeholder="John" />
                        </Field>
                        <Field label="Last Name">
                            <input className={inputCls} value={form.lastName} onChange={e => update("lastName", e.target.value)} placeholder="Doe" />
                        </Field>
                    </div>

                    {/* Row 2: Company + GSTIN */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Company Name">
                            <input className={inputCls} value={form.companyName} onChange={e => update("companyName", e.target.value)} placeholder="Acme Inc." />
                        </Field>
                        <Field label="GSTIN">
                            <input className={inputCls} value={form.gstin} onChange={e => update("gstin", e.target.value)} placeholder="22AAAAA0000A1Z5" />
                        </Field>
                    </div>

                    {/* Row 3: Address */}
                    <Field label="Company Address">
                        <input className={inputCls} value={form.companyAddress} onChange={e => update("companyAddress", e.target.value)} placeholder="123 Main Street" />
                    </Field>

                    {/* Row 4: City + Postal */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="City">
                            <input className={inputCls} value={form.city} onChange={e => update("city", e.target.value)} placeholder="Mumbai" />
                        </Field>
                        <Field label="Postal Code">
                            <input className={inputCls} value={form.postalCode} onChange={e => update("postalCode", e.target.value)} placeholder="400001" />
                        </Field>
                    </div>

                    {/* Row 5: State + Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="State">
                            <select className={selectCls} value={form.state} onChange={e => update("state", e.target.value)}>
                                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </Field>
                        <Field label="Country">
                            <select className={selectCls} value={form.country} onChange={e => update("country", e.target.value)}>
                                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </Field>
                    </div>

                    {/* Row 6: Currency + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Preferred Currency">
                            <select className={selectCls} value={form.preferredCurrency} onChange={e => update("preferredCurrency", e.target.value)}>
                                {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </Field>
                        <Field label="Billing Email">
                            <input type="email" className={inputCls} value={form.billingEmail} onChange={e => update("billingEmail", e.target.value)} placeholder="billing@company.com" />
                        </Field>
                    </div>

                    <div className="border-t border-border my-2" />

                    {/* Row 7: Toggle + Save Action */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => update("sendInvoices", !form.sendInvoices)}
                                className={cn(
                                    "relative w-10 h-6 rounded-full transition-colors duration-200 shrink-0",
                                    form.sendInvoices ? "bg-accent" : "bg-muted"
                                )}
                            >
                                <span className={cn(
                                    "absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200",
                                    form.sendInvoices && "translate-x-4"
                                )} />
                            </button>
                            <span className="text-sm text-muted-foreground">
                                Send invoices to the billing email
                            </span>
                        </div>

                        <div className="w-full sm:w-auto min-w-[140px]">
                            <AppButton
                                title={saved ? "Saved" : saving ? "Saving..." : "Save Changes"}
                                onClick={handleSave}
                                isLoading={saving}
                                // Custom coloring for success state
                                className={cn(
                                    saved && "bg-green-600 hover:bg-green-700 border-none text-white"
                                )}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}