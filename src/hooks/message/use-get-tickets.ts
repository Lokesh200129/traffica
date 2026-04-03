import { useQuery } from "@tanstack/react-query";
import api from '@/lib/axios';
import { TTicket } from "@/types/ticket";


export const useGetTickets = () => {

    return useQuery({
        queryKey: ["tickets"],
        queryFn: async () => {
            const res = await api<TTicket[]>({
                url: "/ticket",
                method: "GET",
            });
            return res;
        },
    });
};