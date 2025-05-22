"use client";

import { QueryClient } from "@tanstack/react-query";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { ReactNode, useState } from "react";

// CLIENT QUERY CLIENT
export const clientQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분
      gcTime: 10 * 60 * 1000, // 10분 (구 cacheTime)
      retry: (failureCount, error) => {
        // 401, 403 같은 인증 에러는 재시도하지 않음
        if (!isAxiosError(error)) return false;
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false, // 윈도우 포커스시 자동 refetch 비활성화
    },
    mutations: {
      retry: false, // mutation은 일반적으로 재시도하지 않음
    },
  },
});

interface ServerQueryHydrateBoundaryProps {
  children: ReactNode;
  dehydratedState: unknown;
}

// GENERATE SERVER-SIDE QUERY CLIENT
export function getServerSideQueryClient() {
  return new QueryClient();
}

// SERVER-SIDE QUERY CLIENT
export function ServerQueryHydrateBoundary({
  children,
  dehydratedState,
}: ServerQueryHydrateBoundaryProps) {
  const [queryClient] = useState(getServerSideQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
