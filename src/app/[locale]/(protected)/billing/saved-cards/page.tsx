"use client"
import { useState } from "react";
import { CreditCard, Star, Trash2, Plus, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/button";
import type { SavedCard } from "../_lib/mock-data-type";
import { MOCK_CARDS } from "../_lib/mock-data-type";

const brandConfig: Record<SavedCard["brand"], { label: string; bg: string }> = {
    visa: { label: "VISA", bg: "from-blue-900 via-blue-800 to-blue-700" },
    mastercard: { label: "MASTERCARD", bg: "from-rose-800 via-rose-700 to-orange-600" },
    amex: { label: "AMEX", bg: "from-sky-800 via-sky-700 to-cyan-600" },
    rupay: { label: "RUPAY", bg: "from-emerald-800 via-emerald-700 to-emerald-600" },
};

// ── Card UI ───────────────────────────────────────────────────────────────────
function CardItem({
    card,
    small = false,
    onSetDefault,
    onDelete,
}: {
    card: SavedCard;
    small?: boolean;
    onSetDefault: (id: string) => void;
    onDelete: (id: string) => void;
}) {
    const brand = brandConfig[card.brand];

    return (
        <div className="flex flex-col gap-2.5">

            {/* Card — default gets accent glow highlight */}
            <div className={cn(
                "relative rounded-2xl bg-gradient-to-br text-white overflow-hidden transition-all",
                brand.bg,
                small ? "p-4 space-y-4" : "p-5 space-y-5",
                card.isDefault
                    ? "shadow-[0_0_0_2px_hsl(var(--accent)),0_8px_32px_-4px_hsl(var(--accent)/0.5)]"
                    : "shadow-sm"
            )}>
                {/* Decorative circles */}
                <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/5" />
                <div className="absolute -right-2 -top-2 w-20 h-20 rounded-full bg-white/5" />

                {/* Top row */}
                <div className="flex justify-between items-center">
                    <Wifi size={small ? 15 : 19} className="opacity-70 rotate-90" />
                    <span className={cn("font-black tracking-widest opacity-80", small ? "text-[9px]" : "text-[11px]")}>
                        {brand.label}
                    </span>
                </div>

                {/* Card number */}
                <p className={cn("tracking-[0.22em] font-mono opacity-90", small ? "text-xs" : "text-sm")}>
                    •••• •••• •••• {card.last4}
                </p>

                {/* Bottom row */}
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[9px] uppercase opacity-50 mb-0.5">Card Holder</p>
                        <p className={cn("font-semibold", small ? "text-[11px]" : "text-xs")}>{card.holderName}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] uppercase opacity-50 mb-0.5">Expires</p>
                        <p className={cn("font-semibold", small ? "text-[11px]" : "text-xs")}>
                            {String(card.expMonth).padStart(2, "0")}/{card.expYear}
                        </p>
                    </div>
                </div>

                {/* Default badge */}
                {card.isDefault && (
                    <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                        <Star size={7} fill="currentColor" className="text-yellow-400" />
                        Default
                    </div>
                )}
            </div>

            {/* Actions — equal width buttons */}
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

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ onAddCard }: { onAddCard?: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <CreditCard size={24} className="text-muted-foreground" />
            </div>
            <p className="text-foreground font-semibold mb-1">No cards saved</p>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                Add a payment method to avoid disruptions to your campaigns.
            </p>
            <AppButton title="Add Card Now" icon={Plus} onClick={onAddCard} />
        </div>
    );
}

// ── Main ──────────────────────────────────────────────────────────────────────
interface SavedCardsProps {
    initialCards?: SavedCard[];
    onAddCard?: () => void;
    onDeleteCard?: (id: string) => void;
    onSetDefault?: (id: string) => void;
}

export default function SavedCards({
    initialCards = MOCK_CARDS,
    onAddCard,
    onDeleteCard,
    onSetDefault,
}: SavedCardsProps) {
    const [cards, setCards] = useState<SavedCard[]>(initialCards);

    const handleSetDefault = (id: string) => {
        setCards(prev => prev.map(c => ({ ...c, isDefault: c.id === id })));
        onSetDefault?.(id);
    };

    const handleDelete = (id: string) => {
        setCards(prev => {
            const filtered = prev.filter(c => c.id !== id);
            const wasDefault = prev.find(c => c.id === id)?.isDefault;
            // auto-assign next available card as default
            if (wasDefault && filtered.length > 0) {
                filtered[0] = { ...filtered[0], isDefault: true };
            }
            return filtered;
        });
        onDeleteCard?.(id);
    };

    const defaultCard = cards.find(c => c.isDefault);
    const otherCards = cards.filter(c => !c.isDefault);

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Saved Cards</h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage your payment methods</p>
                </div>
                <AppButton title="Add Card" icon={Plus} size="sm" onClick={onAddCard} />
            </div>

            {cards.length === 0 ? <EmptyState onAddCard={onAddCard} /> : (
                <div className="space-y-8">

                    {/* Row 1 — default card */}
                    {defaultCard && (
                        <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                                Default Card
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                <CardItem
                                    card={defaultCard}
                                    onSetDefault={handleSetDefault}
                                    onDelete={handleDelete}
                                />
                            </div>
                        </div>
                    )}

                    {/* Row 2 — other cards, slightly smaller */}
                    {otherCards.length > 0 && (
                        <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                                Other Cards
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {otherCards.map(card => (
                                    <CardItem
                                        key={card.id}
                                        card={card}
                                        small
                                        onSetDefault={handleSetDefault}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}