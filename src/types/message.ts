import { ObjectId } from "mongodb";
export interface TMessageResponse {
    _id: string; 
    ticketId: string;
    userId: string;
    text: string;
    sender: 'USER' | 'ADMIN';
    createdAt: string | Date;
    updatedAt: string | Date;
}