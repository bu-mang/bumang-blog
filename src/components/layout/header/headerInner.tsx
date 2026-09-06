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

/**
 * 헤더의 프로필 조회가 실패했을 때 인증 상태를 "비로그인으로 확정"시킨다.
 *
 * 프로필 조회 실패(= 비로그인)도 인증 판정이 끝난 것이다. 그런데
 * useSuspenseQuery는 실패 시 throw하므로 HeaderInnerAuthenticated가 통째로
 * 언마운트되고, 그 안의 useEffect는 영영 돌지 않는다. 그래서 로딩 해제를
 * 에러가 실제로 도착하는 이 지점에서 한다. 이게 없으면 익명 방문자는
 * isAuthLoading이 true로 굳어, 이 플래그가 풀리기를 기다리는 로직
 * (블로그 상세의 조회수 증가 등)이 통째로 스킵된다.
 *
 * 컴포넌트의 props·state에 의존하지 않으므로 모듈 스코프에 둔다 —
 * 렌더마다 새 함수가 만들어지지 않는다.
 */
const handleHeaderAuthError = (error: Error) => {
  console.error("🔥 Header 에러:", error);

  useAuthStore.getState().setUserAndIsAuthenticated({
    isAuthenticated: false,
    isAuthLoading: false,
    user: null,
  });
};

const HeaderInner = ({ locale }: HeaderInnerProps) => {
  return (
    <ErrorBoundary
      fallback={<HeaderFallback locale={locale} isLoading={false} />}
      onError={handleHeaderAuthError}
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
