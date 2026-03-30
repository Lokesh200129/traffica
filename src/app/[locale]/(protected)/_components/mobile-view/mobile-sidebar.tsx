"use client"
import { useTheme } from "next-themes"
import MainIcon from "@/components/main-icon"
import { Sun, Moon, Bell, Headset, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import UserProfilePopover from '../popover-option'
import CreditsBadge from "../credit-badge"
import { LanguageSwitcher } from "../language-switcher"
import { NotificationPanel } from "../notification/notification-panel"
import { useState, useRef, useEffect } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { Mail, BookOpen } from "lucide-react"
import { SupportIconBtn } from "../support-icon-btn"
import { useCurrentUser } from "@/hooks/auth/use-current-user"
import { Switch } from "@/components/ui/switch"

const MobileHeader = () => {
    const { theme, setTheme } = useTheme()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const [showSupport, setShowSupport] = useState(false)
    const { data: user } = useCurrentUser()
    const bellRef = useRef<HTMLDivElement>(null)
    const supportRef = useRef<HTMLDivElement>(null)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    // Close sidebar on outside click
    const hamburgerRef = useRef<HTMLButtonElement>(null)

    // Close sidebar on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                sidebarRef.current && !sidebarRef.current.contains(e.target as Node) &&
                hamburgerRef.current && !hamburgerRef.current.contains(e.target as Node)
            ) {
                setSidebarOpen(false)
                setShowNotifications(false)
                setShowSupport(false)
            }
        }
        if (sidebarOpen) {
            document.addEventListener("mousedown", handler)
        }
        return () => document.removeEventListener("mousedown", handler)
    }, [sidebarOpen])
    // useEffect(() => {
    //     const handler = (e: MouseEvent) => {
    //         if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
    //             setSidebarOpen(false)
    //             setShowNotifications(false)
    //             setShowSupport(false)
    //         }
    //     }
    //     if (sidebarOpen) {
    //         document.addEventListener("mousedown", handler)
    //     }
    //     return () => document.removeEventListener("mousedown", handler)
    // }, [sidebarOpen])

    // Close on route change / scroll lock
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [sidebarOpen])

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

    return (
        <>
            {/* ── Top bar ── */}
            <nav className="w-full h-14 flex md:hidden justify-between items-center sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border px-4 z-50">
                <MainIcon />

                <Button
                    ref={hamburgerRef}
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(o => !o)}
                    aria-label="Toggle menu"
                    className={cn(
                        "h-9 w-9 rounded-full border border-border",
                        "flex items-center justify-center transition-all duration-300",
                        "hover:bg-muted hover:border-accent/50",
                        sidebarOpen && "bg-muted border-accent/50"
                    )}
                >
                    <span className={cn("transition-transform duration-300", sidebarOpen ? "rotate-90" : "rotate-0")}>
                        {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </span>
                </Button>
            </nav>

            {/* ── Backdrop ── */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 md:hidden transition-opacity duration-300",
                    sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setSidebarOpen(false)}
            />

            {/* ── Slide-in Sidebar ── */}
            <div
                ref={sidebarRef}
                className={cn(
                    "fixed top-14 right-0 h-[calc(100dvh-3.5rem)] w-72 z-50 md:hidden",
                    "bg-card border-l border-border shadow-2xl",
                    "flex flex-col gap-1 p-4",
                    "transition-transform duration-300 ease-in-out",
                    sidebarOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Credits */}
                {/* <div className="flex items-center gap-3 px-3 py-3 rounded-xl border border-border bg-muted/40"> */}
                <CreditsBadge credits={user?.creditBalance?.availableCredits} />
                {/* </div> */}

                <div className="w-full h-px bg-border my-1" />

                {/* Language */}
                <div className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-muted/60 transition-colors">
                    <span className="text-sm text-foreground/70 font-medium">Language</span>
                    <LanguageSwitcher />
                </div>

                {/* Notifications */}
                <div className="relative" ref={bellRef}>
                    <button
                        onClick={() => { setShowNotifications(o => !o); setShowSupport(false) }}
                        className={cn(
                            "w-full flex items-center justify-between px-3 py-3 rounded-xl",
                            "hover:bg-muted/60 transition-colors text-sm font-medium",
                            showNotifications && "bg-muted/60"
                        )}
                    >
                        <span className="flex items-center gap-3 text-foreground/70">
                            <Bell className="h-4 w-4" />
                            Notifications
                        </span>
                    </button>
                    {showNotifications && (
                        <div className="mt-1 rounded-xl overflow-hidden border border-border">
                            <NotificationPanel onClose={() => setShowNotifications(false)} />
                        </div>
                    )}
                </div>

                {/* Support */}
                <div ref={supportRef}>
                    <button
                        onClick={() => { setShowSupport(o => !o); setShowNotifications(false) }}
                        className={cn(
                            "w-full flex items-center justify-between px-3 py-3 rounded-xl",
                            "hover:bg-muted/60 transition-colors text-sm font-medium",
                            showSupport && "bg-muted/60"
                        )}
                    >
                        <span className="flex items-center gap-3 text-foreground/70">
                            <Headset className="h-4 w-4" />
                            Support
                        </span>
                    </button>
                    {showSupport && (
                        <div className="flex gap-3 px-3 pt-2 pb-1">
                            <SupportIconBtn href="https://wa.me/yourNumber" icon={FaWhatsapp} label="WhatsApp" title="Chat on WhatsApp" />
                            <SupportIconBtn href="mailto:support@traffica.com" icon={Mail} label="Email" title="Email support" />
                            <SupportIconBtn
                                onClick={() => window.dispatchEvent(new CustomEvent("open-help-widget", { detail: "help" }))}
                                href="/help/faq"
                                icon={BookOpen}
                                label="FAQ"
                                title="Browse FAQ & Help docs"
                            />
                        </div>
                    )}
                </div>

                <button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-muted/60 transition-colors"
                >
                    <span className="flex items-center gap-3 text-sm font-medium text-foreground/70">
                        {mounted && theme === "dark"
                            ? <Sun className="h-4 w-4 text-yellow-400" />
                            : <Moon className="h-4 w-4 text-slate-500 fill-slate-200" />
                        }
                        {mounted && theme === "dark" ? "Light mode" : "Dark mode"}
                    </span>
                    <Switch checked={mounted && theme === "dark"} onCheckedChange={toggleTheme} />
                </button>
                <div className="w-full h-px bg-border my-1" />

                {/* User profile */}
                <div className="flex items-center gap-3 px-3 py-2">
                    <UserProfilePopover />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold leading-tight">{user?.name ?? "My Account"}</span>
                        <span className="text-xs text-muted-foreground truncate max-w-[160px]">{user?.email ?? ""}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileHeader