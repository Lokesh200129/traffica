"use client"

import { User, LogOut, MessageCircle, Mail, BookOpen, MessagesSquare } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import ProfileIcon from "@/components/profile-icon"
import { useLogout } from "@/hooks/auth/use-logout"
import { useCurrentUser } from "@/hooks/auth/use-current-user"
import { AppButton } from "@/components/button"
import GlobalLoader from "@/components/global-loader"
import { FaWhatsapp } from "react-icons/fa";

// ── Support icon button ───────────────────────────────────────────────────────
function SupportIconBtn({
    href,
    icon: Icon,
    label,
    title,
}: {
    href: string;
    icon: React.ElementType;
    label: string;
    title: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
            aria-label={title}
            className="flex flex-col items-center justify-center gap-1.5 flex-1 py-2.5 rounded-lg border border-border bg-muted/40 hover:bg-accent/10 hover:border-accent/40 hover:text-accent text-muted-foreground transition-all group"
        >
            <Icon size={17} className="transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-medium">{label}</span>
        </a>
    )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function UserProfilePopover() {
    const { data: user } = useCurrentUser()
    const { mutate: logout, isPending } = useLogout()

    if (isPending) return <GlobalLoader msg="Logging out..." />

    return (
        <div className="hidden md:block">
            <Popover>
                <PopoverTrigger asChild>
                    <button className="outline-none focus:ring-2 focus:ring-accent rounded-full transition-all">
                        <ProfileIcon className="border-2 border-border hover:border-accent" />
                    </button>
                </PopoverTrigger>

                <PopoverContent className="w-64 p-2 mt-2" align="end">

                    {/* ── User Info ──────────────────────────────────────── */}
                    <div className="flex items-center gap-3 p-3 mb-2 border-b border-border">
                        <ProfileIcon className="h-10 w-10" />
                        <div className="flex flex-col">
                            <p className="text-sm font-semibold truncate leading-none mb-1">
                                {user?.name || "User Name"}
                            </p>
                            <p className="text-xs text-muted-foreground truncate italic">
                                {user?.email || "user@email.com"}
                            </p>
                        </div>
                    </div>

                    {/* ── Nav ───────────────────────────────────────────── */}
                    <AppButton
                        title="Profile"
                        href="/profile"
                        icon={User}
                        fullWidth={true}
                        className="bg-background text-accent hover:bg-accent/10 flex items-start justify-start"
                    />


                    <div className="border-t border-border p-1 mt-2" />

                    {/* ── Logout ─────────────────────────────────────────── */}
                    <AppButton
                        title="Logout"
                        onClick={() => logout()}
                        icon={LogOut}
                        // fullWidth={true}
                        className="bg-background text-accent hover:bg-accent/10 w-full justify-start"
                    />
                    {/* <div className="border-t border-border p-1 mt-2" /> */}
                    {/* ── Support Section ────────────────────────────────── */}

                    {/* <div className=" px-2 flex flex-col gap-2 py-1">
                        <p className="text-sm tracking-wider text-accent font-semibold mb-2 px-1 flex items-center justify-start gap-4  ">
                            <MessagesSquare size={16} />
                            Support
                        </p>

                        <div className="flex gap-2">
                            <SupportIconBtn
                                href="https://wa.me/yourNumber"
                                icon={FaWhatsapp}
                                label="WhatsApp"
                                title="Chat on WhatsApp"
                            />
                            <SupportIconBtn
                                href="mailto:support@traffica.com"
                                icon={Mail}
                                label="Email"
                                title="Email support"
                            />
                            <SupportIconBtn
                                href="/help/faq"
                                icon={BookOpen}
                                label="FAQ"
                                title="Browse FAQ & Help docs"
                            />
                        </div>
                    </div> */}

                </PopoverContent>
            </Popover>
        </div>
    )
}