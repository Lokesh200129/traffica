"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/axios";

type Status = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";

interface StatusResponse {
    status: Status;
    amount: number;
    orderId: string;
    paymentMethod: string;
}

const MAX_POLLS = 15; // 15 × 2s = 30 seconds max

export default function PaymentStatusPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get("order_id");
    const locale = searchParams.get("locale");
    let pollCount = 0;
    // http://localhost:3000/en/payment-status?order_id=order_1774427322633
    const { data, isLoading } = useQuery({
        queryKey: ["payment-status", orderId],
        queryFn: () =>
            api<StatusResponse>({
                url: `/checkout/status?orderId=${orderId}`,
                method: "GET",
            }),
        refetchInterval: (query) => {
            const status = query.state.data?.status;
            if (status !== "PENDING") return false; // ✅ resolved — stop
            pollCount++;
            if (pollCount >= MAX_POLLS) return false; // ✅ 30s timeout — stop
            return 2000;
        },
        enabled: !!orderId,
    });

    const isTimedOut = pollCount >= MAX_POLLS && data?.status === "PENDING";

    // Loading / still PENDING
    if (isLoading || data?.status === "PENDING") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-muted-foreground">Confirming your payment...</p>
            </div>
        );
    }

    // Timeout — still PENDING after 30s
    if (isTimedOut) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="text-5xl">⏳</div>
                <h1 className="text-2xl font-bold">Taking longer than expected</h1>
                <p className="text-muted-foreground text-center max-w-sm">
                    If your payment was deducted, it will reflect shortly.
                    Check your transaction history or contact support.
                </p>
                <button
                    onClick={() => router.push(`/${locale}/dashboard`)}
                    className="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
                >
                    Go to Dashboard
                </button>
            </div>
        );
    }

    // Success
    if (data?.status === "SUCCESS") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="text-5xl">✅</div>
                <h1 className="text-2xl font-bold">Payment Successful</h1>
                <p className="text-muted-foreground">
                    ₹{data.amount} paid via {data.paymentMethod}
                </p>
                <button
                    onClick={() => router.push(`/${locale}/dashboard`)}
                    className="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
                >
                    Go to Overview
                </button>
            </div>
        );
    }

    // Failed / Cancelled
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <div className="text-5xl">❌</div>
            <h1 className="text-2xl font-bold">Payment {data?.status === "CANCELLED" ? "Cancelled" : "Failed"}</h1>
            <p className="text-muted-foreground">
                {data?.status === "CANCELLED"
                    ? "You cancelled the payment."
                    : "Something went wrong with your payment."}
            </p>
            <button
                onClick={() => router.push(`/${locale}/overview`)}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
            >

                Try Again
            </button>
        </div>
    );
}