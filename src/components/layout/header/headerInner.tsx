"use client";

import NavBanner from "./navLogo";
import NavBar from "./navBar";

import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/api/queryKey";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";
import { getUserProfile, postLogout } from "@/services/api/auth/client";
import { usePathname } from "@/i18n/navigation";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { isValidRole } from "@/types/user";
import { PATHNAME } from "@/constants/routes/pathnameRoutes";

interface HeaderFallbackProps {
  isLoading: boolean;
  locale: string;
}

export const HeaderFallback = ({ isLoading, locale }: HeaderFallbackProps) => {
  const pathname = usePathname();

  // Hide header on these paths
  if (
    pathname === "/blog/edit" ||
    pathname.startsWith("/admin") ||
    /^\/play\/\d+$/.test(pathname)
  ) {
    return null;
  }

  return (
    <div className="fixed top-0 z-[100] h-fit w-full">
      <NavBanner />
      <NavBar isAuthenticated={false} isLoading={isLoading} locale={locale} />
    </div>
  );
};

interface HeaderInnerProps {
  locale: string;
}

const HeaderInner = ({ locale }: HeaderInnerProps) => {
  return (
    <ErrorBoundary
      fallback={<HeaderFallback locale={locale} isLoading={false} />}
      onError={(error) => console.error("🔥 Header 에러:", error)}
    >
      <Suspense
        clientOnly
        fallback={<HeaderFallback locale={locale} isLoading />}
      >
        <HeaderInnerAuthenticated locale={locale} />
      </Suspense>
    </ErrorBoundary>
  );
};

export function HeaderInnerAuthenticated({ locale }: HeaderInnerProps) {
  const setUserAndIsAuthenticated = useAuthStore(
    (state) => state.setUserAndIsAuthenticated,
  );
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_USER_PROFILE,
    queryFn: async () => {
      const result = await getUserProfile();
      return result;
    },
    retry: false, // 인증 실패 시 재시도 안 함
  });

  useEffect(() => {
    if (!data) return;

    // 권한 체계 리네임(user/admin/owner → guest/member/host) 이전에 발급된
    // 토큰/세션은 구 role 값을 들고 있다. 이 경우 강제 로그아웃 후 재로그인 유도.
    if (!isValidRole(data.role)) {
      postLogout().finally(() => {
        setUserAndIsAuthenticated({
          isAuthenticated: false,
          isAuthLoading: false,
          user: null,
        });
        window.location.href = PATHNAME.HOME; // full reload
      });
      return;
    }

    if (!isAuthenticated) {
      setUserAndIsAuthenticated({
        isAuthenticated: true,
        user: {
          nickname: data.nickname,
          role: data.role,
          id: data.id,
        },
        isAuthLoading: false,
      });
    }

    // eslint-disable-next-line
  }, [data]);

  /**
   * @FACTORY
   */
  const pathname = usePathname();

  // Hide header on these paths
  if (
    pathname === "/blog/edit" ||
    pathname.startsWith("/admin") ||
    /^\/play\/\d+$/.test(pathname)
  ) {
    return null;
  }

  switch (pathname) {
    default:
      return (
        <div className="fixed top-0 z-[100] h-fit w-full">
          <NavBanner />
          <NavBar
            isAuthenticated={isAuthenticated}
            nickname={data.nickname}
            locale={locale}
          />
        </div>
      );
  }
}

export default HeaderInner;
