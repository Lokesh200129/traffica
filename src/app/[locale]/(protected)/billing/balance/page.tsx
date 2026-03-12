"use client"
import { ShoppingCart, ArrowRight } from "lucide-react";
import type { BalanceData } from "../_lib/mock-data-type";
import { MOCK_BALANCE } from "../_lib/mock-data-type";
import { AppButton } from "@/components/button";

// ── Main Component ────────────────────────────────────────────────────────────
interface BalanceProps {
    data?: BalanceData;
    onBuyCredits?: () => void;
    onConvert?: () => void;
}

export default function Balance({
    data = MOCK_BALANCE,
    onBuyCredits,
    onConvert,
}: BalanceProps) {
    const totalCredits = data.tiers.reduce((sum, t) => sum + t.credits, 0);

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Balance</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Website Traffic Balance
                </p>
            </div>

            {/* Credits card — Buy + Convert both here */}
            <div className="rounded-2xl border border-border bg-card p-6 flex items-center justify-between">
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Total Credits Available
                    </p>
                    <p className="text-4xl font-bold tabular-nums">
                        {totalCredits.toLocaleString("en-IN")}
                    </p>
                </div>

                <div className="flex items-center gap-2">


                    {/* Buy — primary CTA */}
                    <AppButton
                        title="Buy Credits"
                        icon={ShoppingCart}
                        onClick={onBuyCredits}
                    />
                </div>
            </div>
        </div>
    );
}