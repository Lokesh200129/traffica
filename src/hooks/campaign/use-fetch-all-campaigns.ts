import { useQuery } from '@tanstack/react-query';
import api from "@/lib/axios";
import { TBackendCampaign, TCampaignFormData } from '@/types/campaign';
import { DateFilterState } from '@/app/[locale]/(protected)/campaign/_lib/data';

interface GetCampaignsParams {
    page?: number;
    limit?: number;
    name?: string;
    dateFilter?: DateFilterState;
}

interface CampaignsResponse {
    message: string;
    campaigns: TBackendCampaign[];
    pagination: {
        total: number;
        totalPages: number;
        currentPage: number;
        limit: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export const useGetCampaigns = ({ page = 1, limit = 10, name = "", dateFilter }: GetCampaignsParams = {}) => {
    return useQuery({
        queryKey: ["campaigns", page, limit, name, dateFilter],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: String(page),
                limit: String(limit),
                ...(name && { name }),
                ...(dateFilter?.from && { from: dateFilter.from }),
                ...(dateFilter?.to && { to: dateFilter.to }),
            });

            return await api<CampaignsResponse>({
                url: `/campaigns?${params.toString()}`,
                method: "GET",
            });
        },
    });
};