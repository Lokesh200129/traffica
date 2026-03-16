"use client"
import { HelpCircle, Plus } from "lucide-react";
import { AppButton } from "@/components/button";

interface BalanceCardProps {
    balance?: number;
    currency?: string;
    onAddFunds?: () => void;
}

export default function BalanceCard({
    balance = 0,
    onAddFunds,
}: BalanceCardProps) {
    return (
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-8">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <HelpCircle size={15} />
                <span>Total Credit Available</span>
            </div>

            <p className="text-4xl font-bold tracking-tight text-foreground">
                {balance.toLocaleString("en-IN")}
            </p>

            <AppButton
                title="Add Funds"
                icon={Plus}
                variant="default"
                onClick={onAddFunds}
                className="w-fit"
            />
        </div>
    );
}