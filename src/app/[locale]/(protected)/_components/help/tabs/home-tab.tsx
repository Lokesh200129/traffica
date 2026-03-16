"use client"
import { ArrowRight, Search, ChevronRight, X } from "lucide-react";
import { QUICK_QUESTIONS, type HelpTabs } from "../types/help-widget-types";

const TEAM_AVATARS = [
    "https://api.dicebear.com/7.x/notionists/svg?seed=Alan",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Janis",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Mike",
];

interface HomeTabProps {
    onTabChange: (t: HelpTabs) => void;
    onClose: () => void;
}

export function HomeTab({ onTabChange, onClose }: HomeTabProps) {
    return (
        <div className="flex flex-col h-full">
            {/* Hero */}
            <div className="relative bg-gradient-to-b from-accent via-accent to-accent/0 px-5 pt-6 pb-16">
                <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
                <div className="absolute left-4 bottom-0 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

                {/* Brand + Avatars + Close — single row */}
                <div className="flex items-center justify-between mb-6 mt-2">
                    {/* Left: Brand */}
                    <span className="text-white font-extrabold text-xl tracking-tight leading-none">
                        Traffic<span className="bg-amber-50 p-1 mx-1.5 rounded-full text-sm">⚡</span>Arbitrage
                    </span>

                    {/* Right: Avatars + Close */}
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {TEAM_AVATARS.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt="team"
                                    className="w-9 h-9 rounded-full border-2 border-accent object-cover bg-white"
                                />
                            ))}
                        </div>
                        <button
                            onClick={onClose}
                            className="w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors backdrop-blur-sm ml-1"
                        >
                            <X size={14} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                {/* Headline */}
                <div className="mb-2">
                    <h2 className="text-white font-extrabold text-2xl leading-tight">Hi there 👋</h2>
                    <h2 className="text-white font-extrabold text-2xl leading-tight">How can we help?</h2>
                </div>
            </div>

            {/* Cards */}
            <div className="flex-1 overflow-y-auto px-4 -mt-10 space-y-3 pb-4">
                {/* Send message CTA */}
                <button
                    onClick={() => onTabChange("messages")}
                    className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-2xl shadow-md hover:shadow-lg hover:border-accent/30 transition-all group cursor-pointer"
                >
                    <div className="text-left">
                        <p className="text-sm font-semibold text-foreground">Send us a message</p>
                        <p className="text-xs text-muted-foreground mt-0.5">We typically reply in under 2 minutes</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center group-hover:opacity-90 transition-opacity shrink-0">
                        <ArrowRight size={16} className="text-white" />
                    </div>
                </button>

                {/* Search for help card */}
                <div className="bg-card border border-border rounded-2xl shadow-md overflow-hidden">
                    <button
                        onClick={() => onTabChange("help")}
                        className="w-full flex items-center justify-between px-4 py-3.5 border-b border-border hover:bg-muted/30 transition-colors"
                    >
                        <span className="text-sm font-semibold text-foreground">Search for help</span>
                        <Search size={16} className="text-accent shrink-0" />
                    </button>

                    {QUICK_QUESTIONS.map((q, i) => (
                        <button
                            key={i}
                            onClick={() => onTabChange("help")}
                            className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-muted/30 transition-colors border-b border-border last:border-0"
                        >
                            <span className="text-sm text-foreground/80 leading-snug pr-3">{q}</span>
                            <ChevronRight size={15} className="text-accent shrink-0" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}