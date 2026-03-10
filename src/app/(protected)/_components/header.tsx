"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import MainIcon from "@/components/main-icon"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import UserProfilePopover from './popover-option'
import { Bell } from "lucide-react"
const Header = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <nav className="w-full h-18 hidden md:flex justify-between items-center sticky top-0 px-6  backdrop-blur-md transition-colors duration-300">
            <MainIcon />

            <div className="flex  justify-center items-center gap-4">
                {/* Theme Toggle Button */}

                <Button
                    variant="ghost"
                    size="icon"
                    // onClick={toggleTheme}
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
                    {theme === "dark" ? (
                        <Sun className="h-4 w-4 text-yellow-400 transition-all" />
                    ) : (
                        <Moon className="h-4 w-4 text-slate-700 transition-all fill-slate-700/10" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>

                {/* Profile with popover */}
                <div className="pt-1.5">
                    <UserProfilePopover /></div>
            </div>
        </nav>
    )
}

export default Header 