"use client"

import { useTheme } from "next-themes"
import MainIcon from "@/components/main-icon"
import { Sun, Moon, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import UserProfilePopover from './popover-option'
import CreditsBadge from "./credit-badge"
import { LanguageSwitcher } from "./language-switcher"
const Header = () => {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <nav className="w-full h-18 hidden md:flex justify-between items-center sticky top-0 backdrop-blur-md transition-colors duration-300 border-b border-border px-6 overflow-visible">
            <MainIcon />

            <div className="flex justify-center items-center gap-4 z-999">
                <CreditsBadge />
                <LanguageSwitcher />
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "cursor-pointer transition-all duration-300",
                        "h-9 w-9 rounded-full border border-border",
                        "hover:bg-muted hover:border-accent/50",
                        "flex items-center justify-center"
                    )}
                >
                    <Bell />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className={cn(
                        "cursor-pointer transition-all duration-300",
                        "h-9 w-9 rounded-full border border-border",
                        "hover:bg-muted hover:border-accent/50",
                        "flex items-center justify-center"
                    )}
                >
                    {/* suppress hydration mismatch on just this element */}
                    <Sun className="h-4 w-4 text-yellow-400 hidden dark:block" />
                    <Moon className="h-4 w-4 text-slate-700 fill-slate-700/10 dark:hidden" />
                    <span className="sr-only">Toggle theme</span>
                </Button>

                <div className="pt-1.5">
                    <UserProfilePopover />
                </div>
            </div>
        </nav>
    )
}

export default Header