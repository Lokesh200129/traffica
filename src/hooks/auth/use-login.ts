import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "@/lib/axios";
import parseError from '@/lib/parse-error';
import { toast } from "sonner";
import { TUser } from '../../../type';

export const useLogin = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            return await api<TUser>({
                url: "/login",
                method: "POST",
                data,
            });
        },
        onSuccess: (loggedInUser) => {
            queryClient.setQueryData(["current-user"], loggedInUser); 
            toast.success(`Welcome back!`);

            const locale = window.location.pathname.split("/")[1] || "en"
            window.location.href = `/${locale}/overview` 
        },
        onError: (err) => {
            toast.error(parseError(err));
        },
    });
};