import { Metadata } from "next";
import { CampaignTable } from "./_components/campaign-table";
export const metadata: Metadata = {
    title: "Campaign",
    description: "",
};

const Page = () => <CampaignTable />

export default Page;