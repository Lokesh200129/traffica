import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from '@/lib/axios';
import { toast } from "sonner";
import parseError from "@/lib/parse-error";

export const useCreateTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { title: string; category: string }) => {
            const res = await api({ url: "/ticket", method: "POST", data });
            // console.log(res);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
        },
        onError: (err) => {
            toast.error(parseError(err));
        },
    });
};