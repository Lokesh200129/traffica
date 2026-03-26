"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import parseError from "@/lib/parse-error";
import { load } from "@cashfreepayments/cashfree-js";
import { useBalanceModal } from "@/store/balance-modal";

interface CreateOrderResponse {
    payment_session_id: string;
    order_id: string;
}

export const useCreatePaymentOrder = () => {
    const { toggle } = useBalanceModal();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (amount: number) => {
            return await api<CreateOrderResponse>({
                url: "/checkout/create-order",
                method: "POST",
                data: { amount },
            });
        },

        onSuccess: async (data) => {
            const cashfree = await load({
                mode: process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
                    ? "production"
                    : "sandbox",
            });

            // 1. Open Cashfree modal
            await cashfree.checkout({
                paymentSessionId: data.payment_session_id,
                redirectTarget: "_modal",
            });

            // 2. Cashfree modal closed — verify payment
            const verifyRes = await api<{ status: string }>({
                url: "/checkout/verify-order",
                method: "POST",
                data: { orderId: data.order_id },
            });

            // 3. Close balance modal
            toggle();

            // 4. Handle result
            if (verifyRes.status === "SUCCESS") {
                // Refetch user/credits so UI reflects new balance instantly
                await queryClient.invalidateQueries({ queryKey: ["current-user"] });
                toast.success("Payment successful! Credits added to your account.");
            } else {
                toast.error("Payment failed or cancelled. Please try again.");
            }
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },

        onError: (err) => toast.error(parseError(err)),
    });
};