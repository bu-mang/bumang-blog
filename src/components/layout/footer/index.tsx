"use client";

import { cn } from "@/utils/cn";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const linkClass = "transition-all duration-300 hover:text-gray-700";

  const pathname = usePathname();
  const isBlogEdit = pathname === "/blog/edit";

  const footerClass = cn(
    "flex w-full cursor-default text-xs",
    isBlogEdit && "hidden",
  );

  return (
    <div className={footerClass}>
      <div className="none mx-[6vw] mt-20 grid h-20 flex-1 grid-cols-2 gap-[1.5vw] border-t-[1px] border-gray-10 pt-1">
        <div>
          <div className="font-medium text-gray-700">© {currentYear}</div>
          <div className="text-gray-200">Made by Bumang</div>
        </div>
        <div>
          <div className="font-medium text-gray-700">Contact</div>
          <div className="text-gray-200">
            <Link href="#" className={linkClass}>
              LinkedIn
            </Link>
            ,{" "}
            <Link href="#" className={linkClass}>
              Notion
            </Link>
            ,{" "}
            <Link href="#" className={linkClass}>
              Old Blog
            </Link>
            ,{" "}
            <Link href="#" className={linkClass}>
              Behance
            </Link>
            ,{" "}
            <Link href="#" className={linkClass}>
              Email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
