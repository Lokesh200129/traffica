import Link from "next/link";
import { AppButton } from "@/components/button";
import { REFER_TAB, LOGOUT_TAB } from "./sidebar-config";

interface SidebarBottomProps {
    onLogout: () => void;
}

export function SidebarBottom({ onLogout }: SidebarBottomProps) {
    return (
        <div className="mt-auto pt-4 border-t border-border space-y-2">
            {/* Refer & Earn */}
            <Link href={REFER_TAB.href} className="w-full block">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-colors">
                    <REFER_TAB.icon color="#ff8a33" size={22} />
                    <div className="text-left">
                        <p className="font-bold text-accent">{REFER_TAB.title}</p>
                        <p className="text-[10px] text-muted-foreground">{REFER_TAB.subtitle}</p>
                    </div>
                </button>
            </Link>

            {/* Logout */}
            <AppButton
                title={LOGOUT_TAB.title}
                onClick={onLogout}
                icon={LOGOUT_TAB.icon}
                className="bg-background text-accent hover:bg-accent/10"
            />
        </div>
    );
}
