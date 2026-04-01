"use client"
import { useQuery } from '@tanstack/react-query';
import api from "@/lib/axios";
import { TUser } from "@/types/user";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["current-user"],
        queryFn: async () => {
            return await api<TUser>({
                url: "/current-user",
                method: "GET",
            });
        },
        retry: false,
        staleTime: Infinity,
        gcTime: Infinity,
    });
};