"use client"
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

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
    const params = useParams();
    const locale = params.locale as string;

    return (
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Business Info</h3>
                <Link
                    href={`/${locale}/billing/settings`}
                    className="flex items-center gap-1.5 text-xs text-accent hover:underline"
                >
                    <Pencil size={12} />
                    Edit
                </Link>
            </div>

            <div className="flex flex-col gap-3">
                <InfoRow label="Company Name" value={companyName} />
                <InfoRow label="Registered Email" value={email} />
                <InfoRow label="Address" value={address} />
                <InfoRow label="Tax ID" value={taxId} />
            </div>
        </div>
    );
}