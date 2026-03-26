"use client"
import { useState, useMemo, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

type Option = { value: string; label: string }

export function SearchableSelect({ options, value, onChange, placeholder, disabled = false }: {
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
        search.length === 0
            ? []
            : options
                .filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
                .slice(0, 10)
        , [search, options])

    useEffect(() => { setSearch("") }, [value])

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

    const selectedLabel = options.find(o => o.value === value)?.label

    // ✅ clear — value aur search dono reset
    const handleClear = () => {
        onChange("")
        setSearch("")
        setOpen(false)
    }

    return (
        <div className="relative" ref={ref}>
            <Input
                placeholder={placeholder}
                value={search || selectedLabel || ""}
                disabled={disabled}
                onChange={e => { setSearch(e.target.value); setOpen(true) }}
                onFocus={() => setOpen(true)}
                // ✅ right padding taaki X button text pe na aaye
                className="pr-8"
            />

            {/* ✅ clear button — sirf tab dikhao jab value selected ho */}
            {value && !disabled && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive transition-colors"
                >
                    <X size={14} />
                </button>
            )}

            {/* Dropdown */}
            {open && filtered.length > 0 && (
                <div className="absolute top-11 left-0 right-0 z-50 bg-card border border-border rounded-lg shadow-lg max-h-52 overflow-y-auto">
                    {filtered.map(o => (
                        <div
                            key={o.value}
                            className="px-3 py-2 text-sm cursor-pointer hover:bg-accent/10 hover:text-accent"
                            onClick={() => { onChange(o.value); setOpen(false) }}
                        >
                            {o.label}
                        </div>
                    ))}
                </div>
            )}

            {/* No results */}
            {open && search.length > 0 && filtered.length === 0 && (
                <div className="absolute top-11 left-0 right-0 z-50 bg-card border border-border rounded-lg shadow-lg p-3 text-sm text-muted-foreground text-center">
                    No results found
                </div>
            )}
        </div>
    )
}