"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Megaphone, Plus, Wallet, User } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
    { label: "Overview", icon: LayoutDashboard, href: "/overview" },
    { label: "Campaign", icon: Megaphone, href: "/campaign" },
    { label: "Create", icon: Plus, href: "/create-campaign" },
    { label: "Billing", icon: Wallet, href: "/billing" },
    { label: "Profile", icon: User, href: "/profile" },
]

export default function MobileBottomBar() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border px-4 py-2">
            <div className="flex items-center justify-around">
                {NAV_ITEMS.map(({ label, icon: Icon, href }) => (
                    <Link key={href} href={href} className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all">
                        <Icon size={20} className={cn("transition-colors", pathname.includes(href) ? "text-accent" : "text-muted-foreground")} />
                        <span className={cn("text-[10px] font-medium", pathname.includes(href) ? "text-accent" : "text-muted-foreground")}>
                            {label}
                        </span>
                    </Link>
                ))}
            </div>
        </nav>
    )
}