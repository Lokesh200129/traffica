export interface TTicket {
    _id: string;
    title: string;
    category: string;
    status: "open" | "closed";
    createdAt: string;
    userId: string;
}