import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
    ticketId: {
        type: Schema.Types.ObjectId,
        ref: "Ticket",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
}, { timestamps: true });

export default models.Message || model("Message", MessageSchema);