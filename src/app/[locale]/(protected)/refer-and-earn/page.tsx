"use client"
import { useState } from "react"
import { Copy, Check, Mail, Link2, Gift } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AppButton } from "@/components/button"
import { cn } from "@/lib/utils"

type Tab = "invite" | "link"

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "invite", label: "Send Invite", icon: Mail },
    { key: "link", label: "Share a Link", icon: Link2 },
]

const MOCK_REFERRAL_LINK = "https://traffica.com/ref/lokesh123"

export default function ReferEarnPage() {
    const [activeTab, setActiveTab] = useState<Tab>("invite")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(MOCK_REFERRAL_LINK)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleSendInvite = () => {
        // API call here
        console.log({ email, message })
    }

    return (
        <div className="w-full">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Refer & Earn</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Invite friends and earn credits on every purchase they make.
                </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                    { label: "Total Referrals", value: "12" },
                    { label: "Credits Earned", value: "24,000" },
                    { label: "Commission Rate", value: "10%" },
                ].map(stat => (
                    <div key={stat.label} className="rounded-2xl border border-border bg-card px-5 py-4">
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-border bg-card p-6 w-full ">

                {/* Commission info */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20 mb-6">
                    <Gift size={18} className="text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/80">
                        Earn <span className="font-bold text-accent">10% commission</span> on all purchases your friends make.
                        Your friend also gets a <span className="font-bold text-accent">10% discount</span> on their first purchase.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 w-fit rounded-2xl border border-accent/20  p-1 mb-6">
                    {TABS.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={cn(
                                "flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all",
                                activeTab === tab.key
                                    ? "bg-accent text-white shadow-sm"
                                    : "text-foreground/60 hover:text-foreground"
                            )}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Send Invite Tab */}
                {activeTab === "invite" && (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Friend's Email</label>
                            <Input
                                type="email"
                                placeholder="friend@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">
                                Personal Message
                                <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                            </label>
                            <Textarea
                                placeholder="Hey! I've been using Traffica to grow my website traffic. You should check it out..."
                                className="min-h-28 resize-none"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                        </div>
                        <div className="pt-1">
                            <AppButton
                                title="Send Invitation"
                                onClick={handleSendInvite}
                            />
                        </div>
                    </div>
                )}

                {/* Share Link Tab */}
                {activeTab === "link" && (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Your Referral Link</label>
                            <div className="flex gap-2">
                                <Input
                                    value={MOCK_REFERRAL_LINK}
                                    readOnly
                                    className="text-muted-foreground"
                                />
                                <button
                                    onClick={handleCopy}
                                    className={cn(
                                        "flex items-center gap-2 px-4 rounded-md border text-sm font-medium transition-all shrink-0 cursor-pointer",
                                        copied
                                            ? "bg-green-500/10 border-green-500/20 text-green-500"
                                            : "bg-accent/10 border-accent/20 text-accent hover:bg-accent/20"
                                    )}
                                >
                                    {copied
                                        ? <><Check size={14} /> Copied!</>
                                        : <><Copy size={14} /> Copy</>
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Share options */}
                        {/* <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Share via</label>
                            <div className="flex gap-2 flex-wrap">
                                {[
                                    { label: "WhatsApp", color: "text-green-500 border-green-500/20 bg-green-500/10 hover:bg-green-500/20" },
                                    { label: "Twitter / X", color: "text-foreground border-border bg-muted/40 hover:bg-muted" },
                                    { label: "LinkedIn", color: "text-blue-500 border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20" },
                                    { label: "Email", color: "text-accent border-accent/20 bg-accent/10 hover:bg-accent/20" },
                                ].map(s => (
                                    <button
                                        key={s.label}
                                        className={cn(
                                            "px-4 py-2 rounded-lg border text-xs font-medium transition-all",
                                            s.color
                                        )}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div> */}

                    </div>
                )}

            </div>
        </div>
    )
}