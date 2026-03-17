
"use client"
import { Star, Trash2, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SavedCard } from "../../_lib/mock-data-type";

const brandConfig: Record<SavedCard["brand"], { label: string; bg: string }> = {
    visa: { label: "VISA", bg: "from-blue-900 via-blue-800 to-blue-700" },
    mastercard: { label: "MASTERCARD", bg: "from-rose-800 via-rose-700 to-orange-600" },
    amex: { label: "AMEX", bg: "from-sky-800 via-sky-700 to-cyan-600" },
    rupay: { label: "RUPAY", bg: "from-emerald-800 via-emerald-700 to-emerald-600" },
};

interface CardItemProps {
    card: SavedCard;
    onSetDefault: (id: string) => void;
    onDelete: (id: string) => void;
}

export function CardItem({ card, onSetDefault, onDelete }: CardItemProps) {
    const brand = brandConfig[card.brand];

    return (
        <div className="flex flex-col gap-2.5">
            <div className={cn(
                "relative rounded-2xl bg-gradient-to-br text-white overflow-hidden transition-all p-5 space-y-5",
                brand.bg,
                card.isDefault
                    ? "shadow-[0_0_0_2px_hsl(var(--accent)),0_8px_32px_-4px_hsl(var(--accent)/0.5)]"
                    : "shadow-sm"
            )}>
                <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/5" />
                <div className="absolute -right-2 -top-2 w-20 h-20 rounded-full bg-white/5" />

                <div className="flex justify-between items-center">
                    <Wifi size={19} className="opacity-70 rotate-90" />
                    <span className="font-black tracking-widest opacity-80 text-[11px]">
                        {brand.label}
                    </span>
                </div>

                <p className="tracking-[0.22em] font-mono opacity-90 text-sm">
                    •••• •••• •••• {card.last4}
                </p>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[9px] uppercase opacity-50 mb-0.5">Card Holder</p>
                        <p className="font-semibold text-xs">{card.holderName}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] uppercase opacity-50 mb-0.5">Expires</p>
                        <p className="font-semibold text-xs">
                            {String(card.expMonth).padStart(2, "0")}/{card.expYear}
                        </p>
                    </div>
                </div>

                {card.isDefault && (
                    <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                        <Star size={7} fill="currentColor" className="text-yellow-400" />
                        Default
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={() => onSetDefault(card.id)}
                    disabled={card.isDefault}
                    className={cn(
                        "flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition-colors",
                        card.isDefault
                            ? "border-accent/30 bg-accent/10 text-accent cursor-default"
                            : "border-border text-muted-foreground hover:text-accent hover:border-accent"
                    )}
                >
                    <Star size={11} fill={card.isDefault ? "currentColor" : "none"} />
                    {card.isDefault ? "Default" : "Set Default"}
                </button>
                <button
                    onClick={() => onDelete(card.id)}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                >
                    <Trash2 size={11} />
                    Remove
                </button>
            </div>
        </div>
    );
}