import { apiError } from "@/lib/api-response";
import withAuth from "@/lib/try-catch-with-auth";
import Message from "@/models/Message";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";

// GET /api/message/:ticketId — get messages for a specific ticket
export const GET = withAuth(async (req, user) => {
    const { searchParams } = new URL(req.url);
    const ticketId = searchParams.get("ticketId");
    if (!ticketId) return apiError("ticketId is required", 400);

    // Verify ticket belongs to user
    const ticket = await Ticket.findOne({ _id: ticketId, userId: user._id });
    if (!ticket) return apiError("Ticket not found", 404);

    const messages = await Message.find({ ticketId }).sort({ createdAt: 1 }).select("-__v");
    return NextResponse.json(messages);
});

// POST /api/message — send a message in a ticket
export const POST = withAuth(async (req, user) => {
    const { text, ticketId } = await req.json();
    if (!text) return apiError("Message text is required", 400);
    if (!ticketId) return apiError("ticketId is required", 400);

    // Verify ticket belongs to user and is open
    const ticket = await Ticket.findOne({ _id: ticketId, userId: user._id });
    if (!ticket) return apiError("Ticket not found", 404);
    if (ticket.status === "closed") return apiError("This ticket is closed", 400);

    const message = await Message.create({
        ticketId,
        userId: user._id,
        text,
        sender: "USER",
    });

    return NextResponse.json(message);
});
