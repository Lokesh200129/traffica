import { apiError } from "@/lib/api-response";
import withAuth from "@/lib/try-catch-with-auth";
import Message from "@/models/Message";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";

// GET /api/ticket — get all tickets for logged-in user
export const GET = withAuth(async (req, user) => {
    const tickets = await Ticket.find({ userId: user._id }).sort({ createdAt: -1 });
    return NextResponse.json(tickets);
});

// POST /api/ticket — create a new ticket (starts a new chat session)
export const POST = withAuth(async (req, user) => {
    const { title, category } = await req.json();
    if (!title || !category) return apiError("Title and category are required", 400);

    const existingOpenTicket = await Ticket.findOne({ userId: user._id, status: "open" });
    if (existingOpenTicket) {
        return apiError("You already have an open ticket. Close it before starting a new one.", 400);
    }

    const ticket = await Ticket.create({
        userId: user._id,
        title,
        category,
    });
    await Message.create({
        ticketId: ticket._id,
        userId: user._id,
        text: category,
        sender: "USER",
    });

    return NextResponse.json(ticket);
});