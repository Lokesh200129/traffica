"use client"
import { useState } from "react";
import { Pencil } from "lucide-react";
import { BillingForm } from "./_settings-modal/_components/billing-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";

interface BusinessInfoCardProps {
    companyName?: string;
    email?: string;
    address?: string;
    taxId?: string;
}

function InfoRow({ label, value }: { label: string; value?: string }) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="text-sm text-foreground">
                {value || <span className="text-muted-foreground/50">——</span>}
            </span>
        </div>
    );
}

export function BusinessInfoCard({
    companyName,
    email,
    address,
    taxId,
}: BusinessInfoCardProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">Business Info</h3>
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-1.5 text-xs text-accent hover:underline"
                    >
                        <Pencil size={12} />
                        Edit
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    <InfoRow label="Company Name" value={companyName} />
                    <InfoRow label="Registered Email" value={email} />
                    <InfoRow label="Address" value={address} />
                    <InfoRow label="Tax ID" value={taxId} />
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-2xl overflow-visible">

                    <DialogHeader>
                        <DialogTitle>Billing Settings</DialogTitle>
                        <DialogDescription>
                            Manage your billing information and preferences.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <BillingForm setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        </>
    );
}