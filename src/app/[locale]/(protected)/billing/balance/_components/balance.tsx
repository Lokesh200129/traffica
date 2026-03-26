"use client"
import { ShoppingCart } from "lucide-react";
import { AppButton } from "@/components/button";
import { useBalanceModal } from "@/store/balance-modal";
import { useCurrentUser } from "@/hooks/auth/use-current-user";

export default function Balance() {
    const { toggle } = useBalanceModal();
    const { data: user, isLoading } = useCurrentUser();

    const availableCredits = user?.creditBalance?.availableCredits || 0;

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Balance</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Website Traffic Balance
                </p>
            </div>

            {/* Credits card */}
            <div className="rounded-2xl border border-border bg-card p-6 flex items-center justify-between">
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Total Credits Available
                    </p>
                    {isLoading ? (
                        <div className="h-10 w-32 rounded-lg bg-muted animate-pulse" />
                    ) : (
                        <p className="text-4xl font-bold tabular-nums">
                            {availableCredits.toLocaleString("en-IN")}
                        </p>
                    )}
                </div>

                <AppButton
                    title="Buy Credits"
                    icon={ShoppingCart}
                    onClick={toggle}
                />
            </div>
        </div>
    );
}