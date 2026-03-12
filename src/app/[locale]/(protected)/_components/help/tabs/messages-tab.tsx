"use client"
import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";

export function MessagesTab() {
    const [msg, setMsg] = useState("");
    const [sent, setSent] = useState(false);

    const handleSend = () => {
        if (!msg.trim()) return;
        setSent(true);
        setMsg("");
    };

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 py-3  flex flex-col items-center justify-center">
                <h3 className="font-bold text-foreground">Messages</h3>
                <p className="text-xs text-muted-foreground">Chat with our support team</p>
            </div>

            {/* Empty / sent state */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                {sent ? (
                    <>
                        <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4">
                            <MessageSquare size={24} className="text-green-500" />
                        </div>
                        <p className="font-semibold text-foreground mb-1">Message sent!</p>
                        <p className="text-sm text-muted-foreground">We'll get back to you shortly.</p>
                    </>
                ) : (
                    <>
                        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                            <MessageSquare size={24} className="text-muted-foreground" />
                        </div>
                        <p className="font-semibold text-foreground mb-1">No messages yet</p>
                        <p className="text-sm text-muted-foreground">Messages from our team will appear here.</p>
                    </>
                )}
            </div>

            {/* Compose */}
            <div className="px-4 pb-4">
                <div className="flex gap-2 items-end bg-muted rounded-2xl px-3 py-2">
                    <textarea
                        value={msg}
                        onChange={e => setMsg(e.target.value)}
                        placeholder="Send us a message…"
                        rows={2}
                        className="flex-1 bg-transparent text-sm resize-none focus:outline-none placeholder:text-muted-foreground p-4"
                        onKeyDown={e => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!msg.trim()}
                        className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity shrink-0"
                    >
                        <Send size={14} className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
