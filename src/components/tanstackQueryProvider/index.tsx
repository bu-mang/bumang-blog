"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { clientQueryClient } from "@/services/lib/queryClients";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";

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
      <ThemeProvider
        attribute="class" // ← 'class' 속성으로 테마 적용
        defaultTheme="system" // ← 기본값은 시스템 설정 따라감
        enableSystem // ← 시스템 다크모드 감지 활성화
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
