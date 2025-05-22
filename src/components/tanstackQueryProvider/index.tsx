"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { clientQueryClient } from "@/services/lib/queryClients";

interface ProviderProps {
  children: ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={clientQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
