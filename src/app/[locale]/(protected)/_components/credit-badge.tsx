import Link from "next/link";
import currencyFormatter from "@/lib/currency-format";
import { useBalanceModal } from "@/store/balance-modal"
import { Button } from "@/components/ui/button";
import { AppButton } from '@/components/button';

interface CreditsBadgeProps {
    credits?: number;

}

const CreditsBadge = ({ credits = 0 }: CreditsBadgeProps) => {

    const formattedCredits = credits.toLocaleString("en-IN");
    const toggle = useBalanceModal((state) => state.toggle)

    return (
        <div className="flex items-center gap-2 bg-accent/10 border border-accent/40 rounded-full px-3 py-1.5 w-full">
            <span className="text-sm font-semibold text-accent">Credits :</span>

            <span className="text-xs font-semibold ">{formattedCredits}</span>
            {/* <Button
                variant="ghost"
                size="icon"
                onClick={toggle}
                className="bg-accent text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-accent/90 transition-colors"

            >
                Buy Credits
            </Button> */}
            <AppButton

                size="icon"
                onClick={toggle}
                title=" Buy Credits"
                className="w-26"
            />


        </div>
    )
}

export default CreditsBadge;