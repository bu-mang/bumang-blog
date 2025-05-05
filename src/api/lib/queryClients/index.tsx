"use client";

import { QueryClient } from "@tanstack/react-query";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

// CLIENT QUERY CLIENT
export const clientQueryClient = new QueryClient();

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
