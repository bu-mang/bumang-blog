"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { clientQueryClient } from "@/services/lib/queryClients";

interface ProviderProps {
  children: ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  // production에서만 사용할 수 없도록
  if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
    console = window.console || {};
    console.log = function no_console() {}; // console log 막기
    console.warn = function no_console() {}; // console warning 막기
    console.error = function () {}; // console error 막기
  }

  return (
    <QueryClientProvider client={clientQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
