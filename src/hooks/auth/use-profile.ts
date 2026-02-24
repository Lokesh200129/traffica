import { useQuery } from '@tanstack/react-query';
import api from "@/lib/axios";

export const usePublicProfile = (username: string) => {
    return useQuery({
        queryKey: ["public-profile", username],
        queryFn: async () => {
            const response = await api({
                url: `/p/${username}`,
                method: "GET",
            });
            return response;
        },

        enabled: !!username,
        retry: false
    });
};