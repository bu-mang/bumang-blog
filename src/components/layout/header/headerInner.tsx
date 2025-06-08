"use client";

import NavBanner from "./navLogo";
import NavBar from "./navBar";
import { usePathname } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/api/queryKey";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { getUserProfile } from "@/services/api/auth/client";

interface HeaderFallbackProps {
  isLoading: boolean;
}

export const HeaderFallback = ({ isLoading }: HeaderFallbackProps) => {
  const pathname = usePathname();
  switch (pathname) {
    case "/blog/edit":
      return null;
    default:
      return (
        <div className="fixed top-0 z-[100] h-fit w-full">
          <NavBanner />
          <NavBar isAuthenticated={false} isLoading={isLoading} />
        </div>
      );
  }
};

const HeaderInner = () => {
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
          <NavBar isAuthenticated={isAuthenticated} nickname={data.nickname} />
        </div>
      );
  }
};

export default HeaderInner;
