"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { clientQueryClient } from "@/api/lib/queryClients";

interface Provider {
  children: ReactNode;
  token: string | null;
}

export default function Providers({ children, token }: Provider) {
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    setToken(token);
  }, [setToken, token]);

  return (
    <QueryClientProvider client={clientQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
