'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react';
import { Toaster } from 'sonner';
import ClientProvider from './client-provider';
// import PostFormModal from './post-form-modal';
import { ThemeProvider } from '@/components/theme-provider'
export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                refetchOnWindowFocus: false,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <Toaster richColors position="top-center" duration={2000} />
            <ClientProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange  
                >
                    {children}
                </ThemeProvider>
            </ClientProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider >
    );
}