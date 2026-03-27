"use client"
import { useTheme } from "next-themes"
import MainIcon from "@/components/main-icon"
import { Sun, Moon, Bell, Headset } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import UserProfilePopover from './popover-option'
import CreditsBadge from "./credit-badge"
import { LanguageSwitcher } from "./language-switcher"
import { NotificationPanel } from "./notification/notification-panel"
import { useState, useRef, useEffect } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { Mail, BookOpen } from "lucide-react"
import { SupportIconBtn } from "./support-icon-btn"
import { useCurrentUser } from "@/hooks/auth/use-current-user"

const Header = () => {
    const { theme, setTheme } = useTheme()
    const [showNotifications, setShowNotifications] = useState(false)
    const [showSupport, setShowSupport] = useState(false)
    const { data: user } = useCurrentUser()
    // const availableCredits = user?.creditBalance?.availableCredits || 0
    const bellRef = useRef<HTMLDivElement>(null)
    const supportRef = useRef<HTMLDivElement>(null)

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    useEffect(() => {
        const handler = (e: MouseEvent) => {

            if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
                setShowNotifications(false)
            }
            if (supportRef.current && !supportRef.current.contains(e.target as Node)) {
                setShowSupport(false)
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <nav className="w-full h-18 hidden md:flex justify-between items-center sticky top-0  transition-colors duration-300 border-b border-border px-6 overflow-visible z-50">
            <MainIcon />

            <div className="flex justify-center items-center gap-4 z-999">
                <CreditsBadge credits={user?.creditBalance?.availableCredits} />
                <LanguageSwitcher />

                {/* Bell — ref wraps button + panel dono */}
                <div className="relative" ref={bellRef}>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowNotifications(o => !o)}
                        className={cn(
                            "cursor-pointer transition-all duration-300",
                            "h-9 w-9 rounded-full border border-border",
                            "hover:bg-muted hover:border-accent/50",
                            "flex items-center justify-center",
                            showNotifications && "bg-muted border-accent/50"
                        )}
                    >
                        <Bell className="h-4 w-4" />
                    </Button>
                    {showNotifications && (
                        <NotificationPanel onClose={() => setShowNotifications(false)} />
                    )}
                </div>

                {/* Support — ref wraps button + panel dono */}
                <div className="relative" ref={supportRef}>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowSupport(o => !o)}
                        className={cn(
                            "cursor-pointer transition-all duration-300",
                            "h-9 w-9 rounded-full border border-border",
                            "hover:bg-muted hover:border-accent/50",
                            "flex items-center justify-center",
                            showSupport && "bg-muted border-accent/50"
                        )}
                    >
                        <Headset className="h-4 w-4" />
                    </Button>
                    {showSupport && (
                        <div className="absolute top-12 right-0 z-50 bg-card border border-border rounded-xl shadow-xl p-3">
                            <div className="flex gap-2">
                                <SupportIconBtn href="https://wa.me/yourNumber" icon={FaWhatsapp} label="WhatsApp" title="Chat on WhatsApp" />
                                <SupportIconBtn href="mailto:support@traffica.com" icon={Mail} label="Email" title="Email support" />
                                <SupportIconBtn
                                    onClick={() => window.dispatchEvent(new CustomEvent("open-help-widget", { detail: "help" }))}
                                    href="/help/faq"
                                    icon={BookOpen}
                                    label="FAQ"
                                    title="Browse FAQ & Help docs" />
                            </div>
                        </div>
                    )}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className={cn(
                        "cursor-pointer transition-all duration-300",
                        "h-9 w-9 rounded-full border border-border",
                        "flex items-center justify-center",
                        mounted && theme === "dark"
                            ? "hover:bg-yellow-400/10 hover:border-yellow-400/50"
                            : "hover:bg-slate-200 hover:border-slate-400/50"
                    )}
                >
                    {mounted && theme === "dark"
                        ? <Sun className="h-4 w-4 text-yellow-400" />
                        : <Moon className="h-4 w-4 text-slate-600 fill-slate-200" />
                    }
                    <span className="sr-only">Toggle theme</span>
                </Button>

                <div className="pt-1.5 z-200">
                    <UserProfilePopover />
                </div>
            </div>
        </nav>
    )
}

export default Header