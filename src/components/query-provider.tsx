'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react';
import { Toaster } from 'sonner';
import ClientProvider from './client-provider';
import { ThemeProvider } from '@/components/theme-provider'
import BillingModal from "@/app/[locale]/(protected)/_components/balance-input";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000 * 2,
                refetchOnWindowFocus: false,
                refetchOnMount: "always",
                retry: 1,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <Toaster richColors position="top-center" duration={2000} />
            <ClientProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                >
                    <BillingModal />

                    {children}
                </ThemeProvider>
            </ClientProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider >
    );
}