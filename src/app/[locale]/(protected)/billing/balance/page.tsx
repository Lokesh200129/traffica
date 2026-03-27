import { Metadata } from "next";
import BalancePage from "./_components/balance";

export const metadata: Metadata = {
    title: "Balance",
    description: "",
};
export default function Page() {
    return < BalancePage />
}