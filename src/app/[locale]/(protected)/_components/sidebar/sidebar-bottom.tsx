import { LOGOUT_TAB } from "./sidebar-config";
import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { TooltipContainer } from "@/components/tooltip-container";

interface SidebarBottomProps {
    onLogout: () => void;
    collapsed?: boolean;
    onToggleCollapse?: () => void;
}

export function SidebarBottom({ onLogout, collapsed, onToggleCollapse }: SidebarBottomProps) {
    const Icon = LOGOUT_TAB.icon;

    const btnClass = cn(
        "w-full flex items-center text-sm h-11 transition-all cursor-pointer rounded-lg",
        collapsed ? "justify-center px-0" : "justify-start gap-3 px-4"
    );

    return (
        <div className="mt-auto flex flex-col gap-2 pt-2">

            {/* Collapse toggle */}
            {collapsed ? (
                <TooltipContainer title="Expand" description="" side="right">
                    <button onClick={onToggleCollapse} className={cn(btnClass, "text-foreground hover:bg-accent/10")}>
                        <PanelLeftOpen size={18} />
                    </button>
                </TooltipContainer>
            ) : (
                <button onClick={onToggleCollapse} className={cn(btnClass, "text-foreground hover:bg-accent/10")}>
                    <PanelLeftClose size={18} />
                    <span>Collapse</span>
                </button>
            )}

            {/* Logout */}
            {collapsed ? (
                <TooltipContainer title={LOGOUT_TAB.title} description="" side="right">
                    <button onClick={onLogout} className={cn(btnClass, "text-accent hover:bg-accent/10")}>
                        <Icon size={18} />
                    </button>
                </TooltipContainer>
            ) : (
                <button onClick={onLogout} className={cn(btnClass, "text-accent hover:bg-accent/10")}>
                    <Icon size={18} />
                    <span>{LOGOUT_TAB.title}</span>
                </button>
            )}
        </div>
    );
}