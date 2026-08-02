"use client";

import { cn } from "@/utils/cn";
import { usePathname } from "@/i18n/navigation";
import { PATHNAME } from "@/constants/routes/pathnameRoutes";
import { useBackgroundStore } from "@/store/background";
import { useState } from "react";
import FooterBackgroundSelect from "./footerBackgroundSelect";

const Footer = () => {
  // 블로그 창립 연도(프론트 첫 커밋 2024-09). "창립–현재" 범위로 표기.
  const FOUNDING_YEAR = 2024;
  const currentYear = new Date().getFullYear();
  const copyrightYears =
    currentYear > FOUNDING_YEAR
      ? `${FOUNDING_YEAR}–${currentYear}`
      : `${FOUNDING_YEAR}`;

  const pathname = usePathname();
  const isBlogEdit = pathname === "/blog/edit";
  const isAdmin = pathname.startsWith("/admin");
  const isHome = pathname === PATHNAME.HOME;

  const footerClass = cn(
    "flex w-full cursor-default text-xs",
    (isBlogEdit || isAdmin) && "hidden",
    isHome && "fixed bottom-10",
  );

  const list = useBackgroundStore((state) => state.home.list);
  const selectedIndex = useBackgroundStore((state) => state.home.selectedIndex);

  const [indicator, setIndicator] = useState(list[selectedIndex]);

  const handleIndicator = (selected: number) => {
    setIndicator(list[selected]);
  };

  return (
    <div className={footerClass}>
      <div className="none mx-[6vw] mt-20 grid h-20 flex-1 grid-cols-2 gap-[1.5vw] border-t-[1px] border-gray-10 pt-1">
        <div>
          <div className="flex h-4 items-center gap-2">
            {list.map((item) => (
              <FooterBackgroundSelect
                key={item[0]}
                target={item}
                onChangeIndicator={handleIndicator}
              />
            ))}
          </div>

          <div className="text-gray-200">{indicator[1]}</div>
        </div>

        <div>
          <div className="font-medium text-gray-700 dark:text-gray-300">
            © {copyrightYears}
          </div>

          <div className="text-gray-200">Made by Bumang</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
