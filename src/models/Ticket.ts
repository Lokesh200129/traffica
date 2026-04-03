import { Schema, model, models } from "mongoose";

const TicketSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open"
    },
}, { timestamps: true });

export default models.Ticket || model("Ticket", TicketSchema);