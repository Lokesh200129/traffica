"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

interface Transaction {
    _id: string;
    orderId: string;
    amount: number;
    status: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";
    paymentMethod: string;
    creditsAdded: number;
    createdAt: string;
}

interface TransactionsResponse {
    transactions: Transaction[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pageCount: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export const useTransactions = (limit = 5) => {
    const [page, setPage] = useState(1);

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["transactions", page],
        queryFn: () =>
            api<TransactionsResponse>({
                url: `/checkout/get-transaction?page=${page}&limit=${limit}`,
                method: "GET",
            }),
        placeholderData: (prev) => prev,
    });

    return {
        transactions: data?.transactions ?? [],
        pagination: data?.pagination,
        isLoading,
        isFetching,
        page,
        nextPage: () => data?.pagination?.hasNext && setPage(p => p + 1),
        prevPage: () => data?.pagination?.hasPrev && setPage(p => p - 1),
    };
};