import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "@/lib/axios";
import { useRouter } from 'next/navigation';
import parseError from '@/lib/parse-error';
import { toast } from "sonner";
import { TBackendCampaign, TCampaignFormData } from '@/types/campaign';

export interface CampaignResponse extends TBackendCampaign {
    message: string;
}

export const useCreateCampaign = () => {
    // const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TCampaignFormData) => {
            return await api<CampaignResponse>({
                url: "/campaigns",
                method: "POST",
                data,
            });
        },
        onSuccess: () => {
            toast.success("Campaign launched successfully!");
            // router.replace('/campaign');
            queryClient.invalidateQueries({ queryKey: ["campaigns", "current-user"] });
        },
        onError: (err) => {
            toast.error(parseError(err));
        },
    });
};