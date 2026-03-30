import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import parseError from "@/lib/parse-error";
import { IBillingDetail } from "../../../type";

export const useSaveBillingDetails = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: Partial<IBillingDetail>) => {
            return await api<IBillingDetail>({
                url: "/billing",
                method: "POST",
                data,
            });
        },
        onSuccess: () => {
            toast.success("Billing settings saved!");
            queryClient.invalidateQueries({ queryKey: ["billing-details"] });
        },
        onError: (err) => toast.error(parseError(err)),
    });
};