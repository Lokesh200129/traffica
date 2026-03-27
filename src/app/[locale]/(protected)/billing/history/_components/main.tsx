"use client"
import { useState } from "react";
import BalanceCard from "./balance-card";
import { BusinessInfoCard } from "./business-info-card";
import { BillingToggle, type BillingTab } from "./billing-toogle";
import PaymentsTable from "./payment-tab";
import CreditsTable from "./credit-tab";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useBalanceModal } from "@/store/balance-modal";
import { useGetBillingDetails } from "@/hooks/billing/use-get-billing-detail"; 

export default function Main() {
    const [activeTab, setActiveTab] = useState<BillingTab>("payments");
    const toggle = useBalanceModal((state) => state.toggle);

    const { data: user } = useCurrentUser();
    const { data: billing } = useGetBillingDetails();
    console.log(billing);
    return (
        <div className="flex flex-col gap-12">
            <div className="flex md:flex-row flex-col gap-4 w-full items-stretch">
                <div className="flex flex-col gap-5 w-1/2">
                    <BalanceCard
                        balance={user?.creditBalance?.availableCredits || 0}
                        onAddFunds={toggle}
                    />
                    <BillingToggle active={activeTab} onChange={setActiveTab} />
                </div>

                <div className="w-1/2">
                    <BusinessInfoCard
                        companyName={billing?.companyName}
                        email={billing?.billingEmail}
                        address={billing?.companyAddress}
                        taxId={billing?.gstin}
                    />
                </div>
            </div>

            {activeTab === "payments" ? <PaymentsTable /> : <CreditsTable />}
        </div>
    );
}