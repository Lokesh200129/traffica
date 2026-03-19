"use client"
import { useEffect, useRef, useState } from "react";
import { type DateFilterState, type DatePreset, PRESETS, DATE_FILTER_DEFAULT, getPresetRange } from "../_lib/data"

interface DateFilterDropdownProps {
    value: DateFilterState;
    onChange: (v: DateFilterState) => void;
}

export function DateFilterDropdown({ value, onChange }: DateFilterDropdownProps) {
    const [open, setOpen] = useState(false);
    const [localFrom, setLocalFrom] = useState(value.from);
    const [localTo, setLocalTo] = useState(value.to);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const selectPreset = (preset: DatePreset) => {
        if (preset === "custom") {
            onChange({ preset, from: localFrom, to: localTo });
            return;
        }
        if (preset === "all") {
            onChange(DATE_FILTER_DEFAULT);
            setOpen(false);
            return;
        }
        const range = getPresetRange(preset);
        onChange({ preset, ...range });
        setOpen(false);
    };

    const applyCustom = () => {
        onChange({ preset: "custom", from: localFrom, to: localTo });
        setOpen(false);
    };

    const displayLabel = value.preset === "custom" && value.from && value.to
        ? `${value.from} → ${value.to}`
        : PRESETS.find(p => p.value === value.preset)?.label ?? "All Time";

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground hover:bg-muted transition-colors"
            >
                <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <span className="max-w-[160px] truncate">{displayLabel}</span>
                <svg className={`w-3 h-3 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 mt-1.5 w-60 bg-card border border-border rounded-lg shadow-xl z-[999] overflow-hidden">
                    <div className="py-1">
                        {PRESETS.map(p => (
                            <button
                                key={p.value}
                                onClick={() => selectPreset(p.value)}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-accent/10 hover:text-accent
                                    ${value.preset === p.value ? "bg-accent/10 text-accent font-semibold" : "text-foreground"}`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>

                    {value.preset === "custom" && (
                        <div className="border-t border-border p-3 flex flex-col gap-2.5">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Start Date</label>
                                <input
                                    type="date"
                                    value={localFrom}
                                    max={localTo || undefined}
                                    onChange={e => setLocalFrom(e.target.value)}
                                    className="w-full px-2 py-1.5 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">End Date</label>
                                <input
                                    type="date"
                                    value={localTo}
                                    min={localFrom || undefined}
                                    onChange={e => setLocalTo(e.target.value)}
                                    className="w-full px-2 py-1.5 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                                />
                            </div>
                            <button
                                onClick={applyCustom}
                                disabled={!localFrom || !localTo}
                                className="w-full py-2 rounded-md bg-accent text-accent-foreground text-xs font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
                            >
                                Apply Range
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
