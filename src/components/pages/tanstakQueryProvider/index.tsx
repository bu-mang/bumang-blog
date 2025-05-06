"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useLayoutEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { clientQueryClient } from "@/api/lib/queryClients";

interface Provider {
  children: ReactNode;
  isAuthenticated: boolean;
}

export default function Providers({ children, isAuthenticated }: Provider) {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  useLayoutEffect(() => {
    setIsAuthenticated(isAuthenticated);
  }, []);

  return (
    <QueryClientProvider client={clientQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
