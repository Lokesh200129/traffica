import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from '@/lib/axios';
import { toast } from "sonner";
import parseError from "@/lib/parse-error";

export const useSendMessage = (ticketId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (text: string) => {
            return await api({
                url: "/message",
                method: "POST",
                data: { text, ticketId }
            });
        },
        onSuccess: () => {
            // Invalidate messages for this specific ticket only
            queryClient.invalidateQueries({ queryKey: ["messages", ticketId] });
        },
        onError: (err) => {
            toast.error(parseError(err));
        },
    });
};