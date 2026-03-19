import { useQuery } from '@tanstack/react-query';
import api from "@/lib/axios";
import { BCampaign } from '../../../type';

interface GetCampaignsParams {
    page?: number;
    limit?: number;
}

interface CampaignsResponse {
    message: string;
    campaigns: BCampaign[];
    pagination: {
        total: number;
        totalPages: number;
        currentPage: number;
        limit: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export const useGetCampaigns = ({ page = 1, limit = 10 }: GetCampaignsParams = {}) => {
    return useQuery({
        queryKey: ["campaigns", page, limit],
        queryFn: async () => {
            return await api<CampaignsResponse>({
                url: `/campaigns?page=${page}&limit=${limit}`,
                method: "GET",
            });
        },
    });
};