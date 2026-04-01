
import { useMutation } from "@tanstack/react-query";    
import { TAgency } from "@/types/campaign";
import { toast } from "sonner";
import parseError from "@/lib/parse-error";
import api from "@/lib/axios";


export function useCreateAgency() {
    return useMutation({
        mutationFn: async (data: {
            agencyName: string;
            country: string;
            plan: string;
            services: string;
            website: string;
        }) => {
            return await api<TAgency>({
                url: "/agency",
                method: "POST",
                data,
            });
        },
        onSuccess: () => toast.success("Agency application submitted successfully!"),
        onError: (err) => toast.error(parseError(err))
    });
}