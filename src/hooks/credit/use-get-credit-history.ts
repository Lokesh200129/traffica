"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

interface CreditHistoryItem {
    _id: string;
    type: "CREDIT" | "DEBIT";
    creditsAdded: number;
    balanceBefore: number;
    balanceAfter: number;
    description: string;
    referenceType: "PAYMENT" | "CAMPAIGN";
    referenceId: string;
    createdAt: string;
}

interface CreditHistoryResponse {
    history: CreditHistoryItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pageCount: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export const useCreditHistory = (limit = 10) => {
    const [page, setPage] = useState(1);

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["credit-history", page],
        queryFn: () =>
            api<CreditHistoryResponse>({
                url: `/credit-history?page=${page}&limit=${limit}`,
                method: "GET",
            }),
        placeholderData: (prev) => prev, // ✅ old data dikhta rahe while fetching
    });

    return {
        history: data?.history ?? [],
        pagination: data?.pagination,
        isLoading,
        isFetching,
        page,
        nextPage: () => data?.pagination?.hasNext && setPage(p => p + 1),
        prevPage: () => data?.pagination?.hasPrev && setPage(p => p - 1),
    };
};