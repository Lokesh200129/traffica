
import { useBalanceModal } from "@/store/balance-modal"
import { AppButton } from '@/components/button';

interface CreditsBadgeProps {
    credits?: number;

}

const CreditsBadge = ({ credits = 0 }: CreditsBadgeProps) => {

    const formattedCredits = credits.toLocaleString("en-IN");
    const toggle = useBalanceModal((state) => state.toggle)

    return (
        <div className="flex items-center justify-between gap-2 bg-accent/10 border border-accent/40 rounded-full px-3 py-1.5 w-full">
            <div className="flex gap-2">
                <span className="text-sm font-semibold text-accent">Credits :</span>

                <span className="text-xs font-semibold ">{formattedCredits}</span>
            </div>
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