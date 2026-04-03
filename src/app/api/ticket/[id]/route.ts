import { apiError, apiSuccess } from "@/lib/api-response";
import withAuth from "@/lib/try-catch-with-auth";
import Ticket from "@/models/Ticket";

// PATCH /api/ticket/:id — open or close a ticket
export const PATCH = withAuth(async (req, user, { params }) => {
    const { status } = await req.json();
    if (!["open", "closed"].includes(status)) return apiError("Invalid status", 400);

    const ticket = await Ticket.findOneAndUpdate(
        { _id: params.id, userId: user._id }, // ensure ownership
        { status },
        { new: true }
    );

    if (!ticket) return apiError("Ticket not found", 404);
    return apiSuccess(ticket, "Ticket updated");
});