// "use client"
// import { useState, useRef, useEffect } from "react";
// import { MessageSquare, ChevronDown } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { type HelpTabs } from "./types/help-widget-types";
// import { BottomNav } from "./bottom-nav";
// import { HomeTab } from "./tabs/home-tab";
// import { MessagesTab } from "./tabs/messages-tab";
// import { HelpTab } from "./tabs/help-tab";

// interface HelpWidgetProps {
//     defaultTab?: HelpTabs;
// }

// export default function HelpWidget({ defaultTab = "home" }: HelpWidgetProps) {
//     const [open, setOpen] = useState(false);
//     const [tab, setTab] = useState<HelpTabs>(defaultTab);
//     const ref = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handler = (e: MouseEvent) => {
//             if (ref.current && !ref.current.contains(e.target as Node)) {
//                 setOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handler);
//         return () => document.removeEventListener("mousedown", handler);
//     }, []);

//     useEffect(() => {
//         const handler = (e: any) => {
//             setOpen(true);
//             setTab(e.detail); // "help"
//         };
//         window.addEventListener("open-help-widget", handler);
//         return () => window.removeEventListener("open-help-widget", handler);
//     }, []);
//     return (
//         <div
//             ref={ref}
//             className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3"
//         >
//             {open && (
//                 <div className="
//                     w-[calc(100vw-2rem)] sm:w-96
//                     h-[min(600px,80svh)]
//                     bg-card border border-border rounded-3xl shadow-2xl
//                     flex flex-col overflow-hidden
//                     animate-in slide-in-from-bottom-4 fade-in duration-200 relative
//                 ">


//                     {/* Tab content */}
//                     <div className="flex-1 overflow-hidden">
//                         {tab === "home" && <HomeTab onTabChange={setTab} onClose={() => setOpen(false)} />}
//                         {tab === "messages" && <MessagesTab />}
//                         {tab === "help" && <HelpTab />}
//                     </div>

//                     {/* Bottom nav */}
//                     {tab !== "messages" && <BottomNav active={tab} onChange={setTab} />}

//                 </div>
//             )}

//             {/* FAB toggle */}
//             <button
//                 onClick={() => setOpen(o => !o)}
//                 className={cn(
//                     "w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95",
//                     open ? "bg-muted text-foreground" : "bg-accent text-accent-foreground"
//                 )}
//             >
//                 {open ? <ChevronDown size={22} /> : <MessageSquare size={22} />}
//             </button>
//         </div>
//     );
// }

// help-widget.tsx
"use client"
import { useState, useRef, useEffect } from "react";
import { MessageSquare, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { type HelpTabs } from "./types/help-widget-types";
import { BottomNav } from "./bottom-nav";
import { HomeTab } from "./tabs/home-tab";
import { MessagesTab } from "./tabs/messages-tab";
import { HelpTab } from "./tabs/help-tab";
import { ChatTab } from "./tabs/chat-tab"; // new

interface HelpWidgetProps {
    defaultTab?: HelpTabs;
}

export default function HelpWidget({ defaultTab = "home" }: HelpWidgetProps) {
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState<HelpTabs>(defaultTab);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        const handler = (e: any) => { setOpen(true); setTab(e.detail); };
        window.addEventListener("open-help-widget", handler);
        return () => window.removeEventListener("open-help-widget", handler);
    }, []);

    const isInsideChat = tab === "messages" && selectedTicketId !== null;

    return (
        <div ref={ref} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
            {open && (
                <div className="
                    w-[calc(100vw-2rem)] sm:w-96
                    h-[min(600px,80svh)]
                    bg-card border border-border rounded-3xl shadow-2xl
                    flex flex-col overflow-hidden
                    animate-in slide-in-from-bottom-4 fade-in duration-200
                ">
                    <div className="flex-1 overflow-hidden">
                        {tab === "home" && <HomeTab onTabChange={setTab} onClose={() => setOpen(false)} />}

                        {tab === "messages" && !selectedTicketId && (
                            <MessagesTab onSelectTicket={(id) => setSelectedTicketId(id)} />
                        )}

                        {tab === "messages" && selectedTicketId && (
                            <ChatTab
                                ticketId={selectedTicketId}
                                onBack={() => setSelectedTicketId(null)}
                            />
                        )}

                        {tab === "help" && <HelpTab />}
                    </div>

                    {/* Hide bottom nav when inside a chat */}
                    {!isInsideChat && <BottomNav active={tab} onChange={(t) => { setTab(t); setSelectedTicketId(null); }} />}
                </div>
            )}

            <button
                onClick={() => setOpen(o => !o)}
                className={cn(
                    "w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95",
                    open ? "bg-muted text-foreground" : "bg-accent text-accent-foreground"
                )}
            >
                {open ? <ChevronDown size={22} /> : <MessageSquare size={22} />}
            </button>
        </div>
    );
}