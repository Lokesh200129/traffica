import Link from "next/link";
import currencyFormatter from "@/lib/currency-format";

interface CreditsBadgeProps {
    credits?: number;
    buyHref?: string;
}

const CreditsBadge = ({ credits = 100000, buyHref = "#" }: CreditsBadgeProps) => {
    const formattedCredits = currencyFormatter(credits);
    return (
        <div className="flex items-center gap-2 bg-accent/10 border border-accent/40 rounded-full px-3 py-1.5">
            <span className="text-sm font-semibold text-accent">Credits :</span>

            <span className="text-xs font-semibold ">{formattedCredits}</span>
            <Link
                href={buyHref}
                className="bg-accent text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-accent/90 transition-colors"
            >
                Buy Credits
            </Link>
        </div>
    )
}

export default CreditsBadge;