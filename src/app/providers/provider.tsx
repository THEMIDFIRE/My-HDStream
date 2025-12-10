'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // Data fresh for 5 minutes
                gcTime: 10 * 60 * 1000, // Cache for 10 minutes (formerly cacheTime)
                refetchOnWindowFocus: false, // Don't refetch on window focus
                refetchOnReconnect: true, // Refetch when internet reconnects
                retry: 2, // Retry failed requests twice
            },
        },
    }))

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* DevTools only visible in development */}
            <ReactQueryDevtools initialIsOpen={false} position='bottom' />
        </QueryClientProvider>
    )
}