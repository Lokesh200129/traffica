"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Megaphone, Wallet, User, ChevronUp, ChevronDown, Settings, History } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const NAV_ITEMS = [
    { label: "Overview", icon: LayoutDashboard, href: "/overview" },
    { label: "Campaign", icon: Megaphone, href: "/campaign" },
    { label: "Profile", icon: User, href: "/profile" },
]

export default function MobileBottomBar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const isBillingActive = pathname.includes("/billing")

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border px-4 py-2">
            <div className="flex items-center justify-around">
                {/* Regular Nav Items: Overview & Campaign */}
                {NAV_ITEMS.slice(0, 2).map(({ label, icon: Icon, href }) => {
                    const isActive = pathname.includes(href)
                    return <NavLink key={href} href={href} label={label} icon={Icon} isActive={isActive} />
                })}

                {/* Billing Popover Item */}
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                        <button className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl transition-all">
                            <div className="flex flex-col items-center justify-center gap-1">
                                <Wallet
                                    size={20}
                                    className={cn(
                                        "transition-colors",
                                        isBillingActive ? "text-accent" : "text-muted-foreground"
                                    )}
                                />
                                <span className={cn(
                                    "text-[10px] font-medium transition-colors",
                                    isBillingActive ? "text-accent" : "text-muted-foreground"
                                )}>
                                    Billing
                                </span>
                            </div>
                            {/* Toggle Icon based on state */}
                            {isOpen ? (
                                <ChevronDown size={14} className="text-muted-foreground mt-1" />
                            ) : (
                                <ChevronUp size={14} className="text-muted-foreground mt-1" />
                            )}
                        </button>
                    </PopoverTrigger>

                    {/* Reduced width: w-32 (128px) instead of w-48 */}
                    <PopoverContent side="top" align="center" className="w-32 p-1 mb-2 bg-popover border-border shadow-lg">
                        <div className="flex flex-col gap-0.5">
                            <PopoverLink href="/billing/balance" icon={Wallet} label="Balance" />
                            <PopoverLink href="/billing/settings" icon={Settings} label="Settings" />
                            <PopoverLink href="/billing/history" icon={History} label="History" />
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Profile Item */}
                {NAV_ITEMS.slice(2).map(({ label, icon: Icon, href }) => {
                    const isActive = pathname.includes(href)
                    return <NavLink key={href} href={href} label={label} icon={Icon} isActive={isActive} />
                })}
            </div>
        </nav>
    )
}

function NavLink({ href, label, icon: Icon, isActive }: any) {
    return (
        <Link href={href} className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all">
            <Icon size={20} className={isActive ? "text-accent" : "text-muted-foreground"} />
            <span className={cn("text-[10px] font-medium", isActive ? "text-accent" : "text-muted-foreground")}>
                {label}
            </span>
        </Link>
    )
}

function PopoverLink({ href, icon: Icon, label }: any) {
    return (
        <Link
            href={href}
            className="flex items-center gap-2 p-2 hover:bg-accent rounded-md transition-colors"
        >
            <Icon size={14} className="text-muted-foreground" />
            <span className="text-xs font-medium">{label}</span>
        </Link>
    )
}