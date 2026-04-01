import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { IBillingDetail } from "@/types/billing";

export const useGetBillingDetails = () => {
    return useQuery({
        queryKey: ["billing-details"],
        queryFn: async () => {
            const res = await api<IBillingDetail>({
                url: "/billing",
                method: "GET",
            });
            return res;
        },
        staleTime: 1000 * 60 * 5,
    });
};