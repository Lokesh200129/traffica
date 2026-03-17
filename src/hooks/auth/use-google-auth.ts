import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "@/lib/axios";
import { useRouter } from 'next/navigation';
import parseError from '@/lib/parse-error';
import { toast } from "sonner";

export const useGoogleAuth = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (token: string) => {
            return await api<TUser>({
                url: "/google",
                method: "POST",
                data: { token },
            });
        },
        onSuccess: (loggedInUser) => {
            toast.success(`Welcome!`);
            queryClient.setQueryData(["current-user"], loggedInUser);
            router.replace('/en/overview');
        },
        onError: (err) => {
            toast.error(parseError(err));
        },
    });
};