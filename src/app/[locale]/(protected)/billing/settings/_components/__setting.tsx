"use client"
import { useEffect, useState, useMemo, useRef } from "react";
import { Country, State, City } from "country-state-city";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/button";
import { Input } from "@/components/ui/input";
import { useGetBillingDetails } from "@/hooks/billing/use-get-billing-detail";
import { useSaveBillingDetails } from "@/hooks/billing/use-save-billing-detail";

const ALL_COUNTRIES = Country.getAllCountries()

type Option = { value: string; label: string }

function SearchableSelect({ options, value, onChange, placeholder, disabled = false }: {
    options: Option[]
    value: string
    onChange: (value: string) => void
    placeholder: string
    disabled?: boolean
}) {
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const filtered = useMemo(() =>
        search.length < 1
            ? []
            : options
                .filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
                .slice(0, 10)
        , [search, options])

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
                setSearch("")
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    useEffect(() => { setSearch("") }, [value])

    const selectedLabel = options.find(o => o.value === value)?.label

    return (
        <div className="relative" ref={ref}>
            <Input
                placeholder={placeholder}
                value={search || selectedLabel || ""}
                disabled={disabled}
                onChange={e => { setSearch(e.target.value); setOpen(true) }}
                onFocus={e => { setOpen(true); e.target.select() }}
            />

            {open && filtered.length > 0 && (
                <div className="absolute top-11 left-0 right-0 z-50 bg-card border border-border rounded-lg shadow-lg max-h-52 overflow-y-auto">
                    {filtered.map(o => (
                        <div
                            key={o.value}
                            className="px-3 py-2 text-sm cursor-pointer hover:bg-accent/10 hover:text-accent"
                            onClick={() => { onChange(o.value); setSearch(""); setOpen(false) }}
                        >
                            {o.label}
                        </div>
                    ))}
                </div>
            )}

            {open && search.length > 0 && filtered.length === 0 && (
                <div className="absolute top-11 left-0 right-0 z-50 bg-card border border-border rounded-lg shadow-lg p-3 text-sm text-muted-foreground text-center">
                    No results found
                </div>
            )}
        </div>
    )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium leading-none">{label}</label>
            {children}
        </div>
    )
}

const DEFAULT_FORM = {
    companyName: "",
    gstin: "",
    billingEmail: "",
    companyAddress: "",
    city: "",
    postalCode: "",
    state: "",
    country: "",
    sendInvoices: false,
}

const DEFAULT_SELECTION = {
    countryCode: "",
    stateCode: "",
}

export default function BillingSettingsPage() {
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
        setSelection(prev => ({ ...prev, countryCode }))

        if (billingData.state) {
            const foundState = State.getStatesOfCountry(countryCode).find(
                s => s.name === billingData.state
            )
            if (foundState) {
                setSelection({ countryCode, stateCode: foundState.isoCode })
            }
        }
    }, [billingData])

    const update = (key: keyof typeof DEFAULT_FORM, value: string | boolean) =>
        setForm(prev => ({ ...prev, [key]: value }))

    const handleCountryChange = (isoCode: string) => {
        const country = ALL_COUNTRIES.find(c => c.isoCode === isoCode)
        setSelection({ countryCode: isoCode, stateCode: "" })
        update("country", country?.name || "")
        update("state", "")
        update("city", "")
    }

    const handleStateChange = (isoCode: string) => {
        const state = states.find(s => s.isoCode === isoCode)
        setSelection(prev => ({ ...prev, stateCode: isoCode }))
        update("state", state?.name || "")
        update("city", "")
    }

    const handleSave = async () => {
        setSaving(true)
        await saveSettings(form)
        setSaving(false)
    }

    return (
        <div className="w-full">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Billing Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Manage your billing information and preferences for invoices and payments.
                </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 w-full shadow-sm">
                <div className="flex flex-col gap-5">

                    {/* Company Name + GSTIN */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Company Name">
                            <Input value={form.companyName} onChange={e => update("companyName", e.target.value)} placeholder="Acme Inc." />
                        </Field>
                        <Field label="GSTIN">
                            <Input value={form.gstin} onChange={e => update("gstin", e.target.value)} placeholder="22AAAAA0000A1Z5" />
                        </Field>
                    </div>

                    {/* Billing Email + Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Billing Email">
                            <Input type="email" value={form.billingEmail} onChange={e => update("billingEmail", e.target.value)} placeholder="billing@company.com" />
                        </Field>
                        <Field label="Company Address">
                            <Input value={form.companyAddress} onChange={e => update("companyAddress", e.target.value)} placeholder="123 Main Street" />
                        </Field>
                    </div>

                    {/* Postal Code + Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Postal Code">
                            <Input value={form.postalCode} onChange={e => update("postalCode", e.target.value)} placeholder="400001" />
                        </Field>
                        <Field label="Country">
                            <SearchableSelect
                                options={ALL_COUNTRIES.map(c => ({ value: c.isoCode, label: c.name }))}
                                value={selection.countryCode}
                                onChange={handleCountryChange}
                                placeholder="Search country..."
                            />
                        </Field>
                    </div>

                    {/* State + City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="State">
                            <SearchableSelect
                                options={states.map(s => ({ value: s.isoCode, label: s.name }))}
                                value={selection.stateCode}
                                onChange={handleStateChange}
                                placeholder="Search state..."
                                disabled={!selection.countryCode}
                            />
                        </Field>
                        <Field label="City">
                            <SearchableSelect
                                options={cities.map(c => ({ value: c.name, label: c.name }))}
                                value={form.city}
                                onChange={(val) => update("city", val)}
                                placeholder="Search city..."
                                disabled={!selection.stateCode}
                            />
                        </Field>
                    </div>

                    <div className="border-t border-border my-2" />

                    {/* Toggle + Save */}
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
            </div>
        </div>
    )
}