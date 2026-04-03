"use client"
import { useState } from "react";
import { Wrench, Loader2, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { useGetTickets } from "@/hooks/message/use-get-tickets";
import { useCreateTicket } from "@/hooks/message/use-create-ticket";
import { cn } from "@/lib/utils";
import { TTicket } from "@/types/ticket";
const CATEGORIES = ["Payment Related Issue", "Campaign Related Issue"];

interface MessagesTabProps {
    onSelectTicket: (ticketId: string) => void;
}

export function MessagesTab({ onSelectTicket }: MessagesTabProps) {
    const { data: tickets, isLoading } = useGetTickets();
    const { mutate: createTicket } = useCreateTicket();
    const [creatingCategory, setCreatingCategory] = useState<string | null>(null)
    // console.log("tickets", tickets);
    const openTicket = tickets?.find((t: any) => t.status === "open");

    const handleCategorySelect = (category: string) => {
        setCreatingCategory(category);
        console.log(category);
        createTicket(
            { title: category, category },
            {
                onSuccess: (ticket: any) => {
                    setCreatingCategory(null);
                    console.log('on sucess', ticket._id);
                    onSelectTicket(ticket._id);
                },
                onError: () => setCreatingCategory(null),
            }
        );
    };

    return (
        <div className="flex flex-col h-full bg-background">
            <div className="py-4 px-4 bg-accent/50">
                <h1 className="font-semibold text-xl text-foreground text-center">Chat with us</h1>
            </div>

            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <>
                            {/* Ticket List */}
                            {tickets && tickets.length > 0 && (
                                <div className="p-3 space-y-2 max-h-58 overflow-y-auto">
                                    {tickets!.map((ticket: TTicket) => (
                                        <button
                                            key={ticket._id}
                                            onClick={() => onSelectTicket(ticket._id)}
                                            className="w-full flex items-center gap-3 p-3 rounded-2xl bg-muted/40 hover:bg-muted/70 transition-colors text-left cursor-pointer"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center shrink-0">
                                                <Wrench size={18} className="text-background" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm text-foreground truncate">{ticket.title}</p>
                                                <p className="text-xs text-muted-foreground truncate">{ticket.category}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-1 shrink-0">
                                                <span className={cn(
                                                    "text-xs font-medium",
                                                    ticket.status === "open" ? "text-green-500" : "text-muted-foreground"
                                                )}>
                                                    {ticket.status === "open" ? "Open" : "Closed"}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {format(new Date(ticket.createdAt), "dd/MM/yyyy")}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* New Conversation */}
                            <div className="px-3 pt-2 pb-3">
                                <p className="text-xs text-foreground font-semibold uppercase tracking-wide px-1 mb-2">
                                    Start New Conversation
                                </p>

                                {openTicket ? (
                                    // Blocked state
                                    <div className="p-3 rounded-2xl bg-muted/30 border border-border text-center">
                                        <p className="text-xs text-muted-foreground">
                                            You have an open ticket.
                                        </p>
                                    </div>
                                ) : (
                                    // Category picker
                                    <div className="space-y-2">
                                        {CATEGORIES.map((cat) => (
                                            <button
                                            key={cat}
                                            onClick={() => handleCategorySelect(cat)}
                                            disabled={!!creatingCategory}
                                            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-border bg-muted/20 hover:bg-muted/50 transition-colors text-left disabled:opacity-50"
                                        >
                                            <span className="text-sm text-foreground">{cat}</span>
                                            {creatingCategory === cat ? (
                                                <Loader2 size={15} className="animate-spin text-muted-foreground" />
                                            ) : (
                                                <ChevronRight size={15} className="text-muted-foreground" />
                                            )}
                                        </button>
                                    ))}
                                        </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}