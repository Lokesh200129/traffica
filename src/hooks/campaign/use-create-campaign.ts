import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "@/lib/axios";
import { useRouter } from 'next/navigation';
import parseError from '@/lib/parse-error';
import { toast } from "sonner";
import { BCampaign } from '../../../type';
import { CampaignFormData } from '@/app/[locale]/(protected)/_types/type';

export interface CampaignResponse extends BCampaign {
    message: string;
}

export const useCreateCampaign = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CampaignFormData) => {
            return await api<CampaignResponse>({
                url: "/campaigns",
                method: "POST",
                data,
            });
        },
        onSuccess: () => {
            toast.success("Campaign launched successfully!");
            router.replace('/campaign');
            queryClient.invalidateQueries({ queryKey: ["campaigns"] });
        },
        onError: (err) => {
            toast.error(parseError(err));
        }, 
    });
};