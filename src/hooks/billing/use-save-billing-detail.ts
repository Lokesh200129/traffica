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
        onSuccess: (updatedData) => {
            toast.success("Billing settings saved!");
            queryClient.setQueryData(["billing-settings"], updatedData);
        },
        onError: (err) => toast.error(parseError(err)),
    });
};