"use client";

import NavBanner from "./navLogo";
import NavBar from "./navBar";

import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/api/queryKey";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { getUserProfile } from "@/services/api/auth/client";
import { usePathname } from "@/i18n/navigation";

interface HeaderFallbackProps {
  isLoading: boolean;
  locale: string;
}

export const HeaderFallback = ({ isLoading, locale }: HeaderFallbackProps) => {
  const setUserAndIsAuthenticated = useAuthStore(
    (state) => state.setUserAndIsAuthenticated,
  );

  useEffect(() => {
    setUserAndIsAuthenticated({
      isAuthenticated: false,
      user: null,
      isAuthLoading: false,
    });
    // eslint-disable-next-line
  }, []);

  const pathname = usePathname();
  switch (pathname) {
    case "/blog/edit":
      return null;
    default:
      return (
        <div className="fixed top-0 z-[100] h-fit w-full">
          <NavBanner />
          <NavBar
            isAuthenticated={false}
            isLoading={isLoading}
            locale={locale}
          />
        </div>
      );
  }
};

interface HeaderInnerProps {
  locale: string;
}

const HeaderInner = ({ locale }: HeaderInnerProps) => {
  const setUserAndIsAuthenticated = useAuthStore(
    (state) => state.setUserAndIsAuthenticated,
  );
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_USER_PROFILE,
    queryFn: getUserProfile,
  });

  useEffect(() => {
    if (data) {
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
  switch (pathname) {
    case "/blog/edit":
      return null;
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
};

export default HeaderInner;
