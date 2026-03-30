import { ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";


interface DropdownOption { label: string; value: string | number }

export  default function StyledDropdown({
    options,
    value,
    onChange,
    placeholder = "Select…",
}: {
    options: DropdownOption[];
    value: string | number;
    onChange: (val: string | number) => void;
    placeholder?: string;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const selected = options.find(o => o.value === value);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative w-full">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className={cn(
                    "w-full h-10 flex items-center justify-between gap-2",
                    "rounded-md border border-input bg-background px-3 text-sm",
                    "hover:border-accent/60 transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
                    open && "border-accent/60 ring-1 ring-accent"
                )}
            >
                <span className={cn("truncate", !selected && "text-muted-foreground")}>
                    {selected ? selected.label : placeholder}
                </span>
                <ChevronDown
                    className={cn("h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200", open && "rotate-180")}
                />
            </button>

            {/* Panel */}
            {open && (
                <div className={cn(
                    "absolute z-50 w-full mt-1.5",
                    "rounded-xl border border-border bg-popover shadow-xl",
                    "animate-in fade-in-0 zoom-in-95 duration-150",
                    "overflow-hidden"
                )}>
                    <ul className="max-h-52 overflow-y-auto py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full">
                        {options.map(opt => {
                            const isSelected = opt.value === value;
                            return (
                                <li key={String(opt.value)}>
                                    <button
                                        type="button"
                                        onClick={() => { onChange(opt.value); setOpen(false); }}
                                        className={cn(
                                            "w-full flex items-center justify-between gap-3 px-3 py-2.5 text-sm",
                                            "hover:bg-accent/10 transition-colors duration-100 text-left",
                                            isSelected && "bg-accent/10 text-accent font-medium"
                                        )}
                                    >
                                        <span>{opt.label}</span>
                                        {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-accent" />}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}