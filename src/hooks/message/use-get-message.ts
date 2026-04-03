import { useQuery } from "@tanstack/react-query";
import api from '@/lib/axios';
import { TMessageResponse } from "@/types/message";

export const useGetMessage = (ticketId: string) => {
    return useQuery({
        queryKey: ["messages", ticketId],
        queryFn: async () => {
            const res = await api<TMessageResponse[]>({
                url: `/message?ticketId=${ticketId}`,
                method: "GET",
            });
            return res;
        },
        enabled: !!ticketId,
    });
};