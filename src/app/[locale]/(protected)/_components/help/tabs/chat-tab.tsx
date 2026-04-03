// tabs/chat-tab.tsx
"use client"
import { useState, useRef, useEffect } from "react";
import { Send, Loader2, ChevronLeft } from "lucide-react";
import { useGetMessage } from "@/hooks/message/use-get-message";
import { useSendMessage } from "@/hooks/message/use-send-message";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useGetTickets } from "@/hooks/message/use-get-tickets";
import { TMessageResponse } from "@/types/message";

interface ChatTabProps {
    ticketId: string;
    onBack: () => void;
}

export function ChatTab({ ticketId, onBack }: ChatTabProps) {
    const [msg, setMsg] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    const { data: messages, isLoading } = useGetMessage(ticketId);
    const { mutate: sendMessage, isPending: isSending } = useSendMessage(ticketId);

    const { data: tickets } = useGetTickets();
    const ticket = tickets?.find((t) => t._id === ticketId);
    const isClosed = ticket?.status === "closed";
    console.log(messages);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!msg.trim() || isSending) return;
        sendMessage(msg, { onSuccess: () => setMsg("") });
    };

    const grouped = groupMessagesByDate(messages);

    return (
        <div className="flex flex-col h-full bg-background">
            {/* Header */}
            <div className="py-4 px-3 bg-accent/50 flex items-center">
                <div className="w-1/4">
                    <button onClick={onBack}>
                        <ChevronLeft className="cursor-pointer" />
                    </button>
                </div>
                <h1 className="font-semibold text-xl text-foreground text-center w-1/2">Support Agent</h1>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    Object.entries(grouped).map(([date, msgs]) => (
                        <div key={date}>
                            {/* Date separator */}
                            <div className="flex justify-center my-3">
                                <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                                    {date}
                                </span>
                            </div>

                            {msgs?.map((m: any) => (
                                <div key={m._id} className={cn("flex flex-col mb-3", m.sender === "USER" ? "items-end" : "items-start")}>
                                    <div className={cn(
                                        "max-w-[80%]  px-3 py-2 rounded-2xl text-sm break-words overflow-hidden",
                                        m.sender === "USER"
                                            ? "bg-accent text-white rounded-tr-none"
                                            : "bg-muted text-foreground rounded-tl-none"
                                    )}>
                                        <p className="whitespace-pre-wrap leading-relaxed">
                                            {m.text}
                                        </p>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground mt-1 px-1">
                                        {format(new Date(m.createdAt), "hh:mm a")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-border">
                <p className="text-[10px] text-center text-muted-foreground mb-2">
                    Chat support is available Monday to Friday 9:00 AM – 6:00 PM. We're here to help!
                </p>
                <div className="flex gap-2 items-end bg-muted/40 rounded-2xl px-3 py-2">
                    <textarea
                        value={msg}
                        onChange={e => setMsg(e.target.value)}
                        placeholder="Type a message..."
                        rows={1}
                        disabled={isClosed}
                        className={`flex-1 bg-transparent text-sm resize-none focus:outline-none py-2 px-1 rounded-md ${isClosed ? "cursor-not-allowed opacity-50" : ""}`}
                        onKeyDown={e => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!msg.trim() || isSending}
                        className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity shrink-0"
                    >
                        {isSending ? <Loader2 size={16} className="animate-spin text-white" /> : <Send size={16} className="text-white" />}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Helper to group messages by date
function groupMessagesByDate(messages: TMessageResponse[] | undefined) {
    if (!messages) return {};

    return messages.reduce((acc: Record<string, TMessageResponse[]>, msg) => {
        const date = format(new Date(msg.createdAt), "MMM d, yyyy");
        if (!acc[date]) acc[date] = [];
        acc[date].push(msg);
        return acc;
    }, {});
}