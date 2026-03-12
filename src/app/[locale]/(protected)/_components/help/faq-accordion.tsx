"use client"
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQItem } from "./types/help-widget-types";

interface FAQAccordionProps {
    item: FAQItem;
}

export function FAQAccordion({ item }: FAQAccordionProps) {
    const [open, setOpen] = useState(false);
    return (
        <button
            onClick={() => setOpen(o => !o)}
            className="w-full text-left border-b border-border last:border-0"
        >
            <div className="flex items-center justify-between py-3.5 px-1 gap-3">
                <span className="text-sm text-foreground font-medium leading-snug">
                    {item.question}
                </span>
                <ChevronDown
                    size={15}
                    className={cn(
                        "shrink-0 text-muted-foreground transition-transform duration-200",
                        open && "rotate-180"
                    )}
                />
            </div>
            {open && (
                <div className="pb-3.5 px-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
            )}
        </button>
    );
}
