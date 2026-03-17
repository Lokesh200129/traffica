
import { CreditCard, Plus } from "lucide-react";
import { AppButton } from "@/components/button";

interface EmptyCardsStateProps {
    onAddCard?: () => void;
}

export function EmptyCardsState({ onAddCard }: EmptyCardsStateProps) {
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