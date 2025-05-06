"use client";

import NavBanner from "./navLogo";
import NavBar from "./navBar";
import { usePathname } from "next/navigation";

interface HeaderProps {
  isAuthenticated: boolean;
}

const HeaderInner = ({ isAuthenticated }: HeaderProps) => {
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
          <NavBar isAuthenticated={isAuthenticated} />
        </div>
      );
  }
};

export default HeaderInner;
