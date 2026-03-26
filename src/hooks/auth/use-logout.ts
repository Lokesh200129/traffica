"use client";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import parseError from '@/lib/parse-error';
import { useTheme } from "next-themes";
export const useLogout = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { setTheme } = useTheme();

    return useMutation({
        mutationFn: async () => {
            return await api({
                url: "/logout",
                method: "POST"
            });
        },
        onSuccess: () => {
            setTheme("light");
            queryClient.clear();
            toast.success("Logged out successfully");
            const locale = window.location.pathname.split("/")[1] || "en"
            window.location.href = `/${locale}`
        },
        onError: (err) => {
            toast.error(parseError(err));
        },
    });
};