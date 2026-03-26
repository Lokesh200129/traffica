import api from "@/lib/axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import parseError from "@/lib/parse-error";
import { TUser } from "../../../type";
export const useSignup = () => {

    const queryClient = useQueryClient();
    const router = useRouter();

    const signupMutation = useMutation({
        mutationFn: async (data: TUser) => {
            return await api<TUser>({
                url: "/signup",
                method: "POST",
                data,
            });
        },
        onSuccess: (data) => {
            toast.success("Account created successfully!");
            queryClient.invalidateQueries({ queryKey: ["current-user"] });

            const locale = window.location.pathname.split("/")[1] || "en"
            window.location.href = `/${locale}/overview` 
        },
        onError: (err) => toast.error(parseError(err)),
    });

    return signupMutation;
};