"use client"
import { useEffect, useState, useMemo } from "react"
import { Country, State, City } from "country-state-city"
import { cn } from "@/lib/utils"
import { AppButton } from "@/components/button"
import { Input } from "@/components/ui/input"
import { useGetBillingDetails } from "@/hooks/billing/use-get-billing-detail"
import { useSaveBillingDetails } from "@/hooks/billing/use-save-billing-detail"
import { Field } from "./field"
import { SearchableSelect } from "./searchable-select"

const ALL_COUNTRIES = Country.getAllCountries()

const DEFAULT_FORM = {
    companyName: "",
    gstin: "",
    billingEmail: "",
    companyAddress: "",
    postalCode: "",
    country: "",
    state: "",
    city: "",
    sendInvoices: false,
}

const DEFAULT_SELECTION = {
    countryCode: "",
    stateCode: "",
}

export function BillingForm() {
    const { data: billingData } = useGetBillingDetails()
    const { mutateAsync: saveSettings } = useSaveBillingDetails()
    const [form, setForm] = useState(DEFAULT_FORM)
    const [selection, setSelection] = useState(DEFAULT_SELECTION)
    const [saving, setSaving] = useState(false)

    const states = useMemo(() =>
        selection.countryCode ? State.getStatesOfCountry(selection.countryCode) : []
    , [selection.countryCode])

    const cities = useMemo(() =>
        selection.countryCode && selection.stateCode
            ? City.getCitiesOfState(selection.countryCode, selection.stateCode)
            : []
    , [selection.countryCode, selection.stateCode])

    useEffect(() => {
        if (!billingData) return
        setForm({ ...DEFAULT_FORM, ...billingData })

        const foundCountry = ALL_COUNTRIES.find(c => c.name === billingData.country)
        if (!foundCountry) return

        const countryCode = foundCountry.isoCode
        const foundState = State.getStatesOfCountry(countryCode)
            .find(s => s.name === billingData.state)

        setSelection({ countryCode, stateCode: foundState?.isoCode || "" })
    }, [billingData])

    const update = (key: keyof typeof DEFAULT_FORM, value: string | boolean) =>
        setForm(prev => ({ ...prev, [key]: value }))

    const onCountryChange = (isoCode: string) => {
        const name = ALL_COUNTRIES.find(c => c.isoCode === isoCode)?.name || ""
        setSelection({ countryCode: isoCode, stateCode: "" })
        setForm(prev => ({ ...prev, country: name, state: "", city: "" }))
    }

    const onStateChange = (isoCode: string) => {
        const name = states.find(s => s.isoCode === isoCode)?.name || ""
        setSelection(prev => ({ ...prev, stateCode: isoCode }))
        setForm(prev => ({ ...prev, state: name, city: "" }))
    }

    const handleSave = async () => {
        setSaving(true)
        await saveSettings(form)
        setSaving(false)
    }

    return (
        <div className="flex flex-col gap-6">

            {/* Row 1 — Company Name + GSTIN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Company Name">
                    <Input value={form.companyName}
                        onChange={e => update("companyName", e.target.value)}
                        placeholder="Acme Inc." />
                </Field>
                <Field label="GSTIN">
                    <Input value={form.gstin}
                        onChange={e => update("gstin", e.target.value)}
                        placeholder="22AAAAA0000A1Z5" />
                </Field>
            </div>

            {/* Row 2 — Billing Email + Company Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Billing Email">
                    <Input type="email" value={form.billingEmail}
                        onChange={e => update("billingEmail", e.target.value)}
                        placeholder="billing@company.com" />
                </Field>
                <Field label="Company Address">
                    <Input value={form.companyAddress}
                        onChange={e => update("companyAddress", e.target.value)}
                        placeholder="123 Main Street" />
                </Field>
            </div>

            {/* Row 3 — Postal Code + Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Postal Code">
                    <Input value={form.postalCode}
                        onChange={e => update("postalCode", e.target.value)}
                        placeholder="400001" />
                </Field>
                <Field label="Country">
                    <SearchableSelect
                        options={ALL_COUNTRIES.map(c => ({ value: c.isoCode, label: c.name }))}
                        value={selection.countryCode}
                        onChange={onCountryChange}
                        placeholder="Search country..."
                    />
                </Field>
            </div>

            {/* Row 4 — State + City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="State">
                    <SearchableSelect
                        options={states.map(s => ({ value: s.isoCode, label: s.name }))}
                        value={selection.stateCode}
                        onChange={onStateChange}
                        placeholder="Search state..."
                        disabled={!selection.countryCode}
                    />
                </Field>
                <Field label="City">
                    <SearchableSelect
                        options={cities.map(c => ({ value: c.name, label: c.name }))}
                        value={form.city}
                        onChange={val => update("city", val)}
                        placeholder="Search city..."
                        disabled={!selection.stateCode}
                    />
                </Field>
            </div>

            <div className="border-t border-border" />

            {/* Row 5 — Toggle + Save */}
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
                    <AppButton title="Save Changes" onClick={handleSave} isLoading={saving} />
                </div>
            </div>

        </div>
    )
}