
"use client"
import { useState } from "react";
import BalanceCard from "./_components/balance-card";
import { BusinessInfoCard } from "./_components/business-info-card";
import { BillingToggle, type BillingTab } from "./_components/billing-toogle";
import PaymentsTable from "./_components/payment-tab";
import CreditsTable from "./_components/credit-tab";

export default function BillingHistoryPage() {
    const [activeTab, setActiveTab] = useState<BillingTab>("payments");

    return (
        <div className=" flex flex-col gap-12">
            <div className="flex md:flex-row flex-col gap-4 w-full items-stretch">
                <div className=" flex flex-col gap-5 w-1/2">
                    <BalanceCard
                        balance={10000}
                        onAddFunds={() => console.log("Add funds clicked")}
                    />
                    {/* Toggle */}
                    <BillingToggle active={activeTab} onChange={setActiveTab} />

                </div>
                <div className=" w-1/2 ">
                    <BusinessInfoCard
                        email="lokeshpal210310@gmail.com"
                        onEdit={() => console.log("Edit business info")}
                    />
                </div>
            </div>

            {/* Table */}
            {activeTab === "payments" ? <PaymentsTable /> : <CreditsTable />}

        </div>
    );
}