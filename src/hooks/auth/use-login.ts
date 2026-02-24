import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "@/lib/axios";
import { useRouter } from 'next/navigation';
import parseError from '@/lib/parse-error';
import { toast } from "sonner";

export const useLogin = () => {
    const router = useRouter();
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
            toast.success(`Welcome back!`);
            queryClient.setQueryData(["current-user"], loggedInUser);
            router.replace('/');
        },
        onError: (err) => {
            toast.error(parseError(err));
        },
    });
};