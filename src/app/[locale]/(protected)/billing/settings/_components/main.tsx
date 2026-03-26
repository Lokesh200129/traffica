// app/[locale]/billing/settings/page.tsx
import { BillingForm } from "./billing-form"

export default function BillingSettingsPage() {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Billing Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Manage your billing information and preferences for invoices and payments.
                </p>
            </div>

            {/* Form Card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <BillingForm />
            </div>
        </div>
    )
}