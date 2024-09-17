import { menus } from "@/constants/menuTree";
import { IoIosMenu as MenuIcon } from "react-icons/io";
import { TbUser as UserIcon } from "react-icons/tb";
import { TbBrightnessFilled as BrightIcon } from "react-icons/tb";
import { FiBookOpen as BookIcon } from "react-icons/fi";

import Link from "next/link";

const Header = () => {
  const LOGOMENU = menus[0];
  const GUESTBOOK = menus[1];
  const WORK = menus[2];
  const GALLERY = menus[3];
  const SIGNIN = menus[4];

  return (
    <div className="fixed top-0 z-10 flex w-screen flex-col px-layout pt-layout">
      <div className="flex h-header w-full justify-center rounded-12 bg-gray-700">
        {/* Upper */}
        <div className="flex h-header w-full items-center">
          <div className="pl-header-margin flex h-full w-1/4 items-center justify-start">
            <MenuIcon color="white" size={24} />
          </div>
          <div className="flex w-1/2 justify-between text-14 text-white">
            <Link href={WORK.url}>{WORK.title}</Link>
            <Link href={LOGOMENU.url} className="font-semibold">
              {LOGOMENU.as}
            </Link>
            <Link href={GALLERY.url}>{GALLERY.title}</Link>
          </div>
          <div className="pr-header-margin flex h-full w-1/4 items-center justify-end gap-5">
            <Link href={GUESTBOOK.url}>
              <UserIcon color="white" size={22} />
            </Link>
            <Link href={SIGNIN.url}>
              <BookIcon color="white" size={20} />
            </Link>
            <button>
              <BrightIcon color="white" size={20} />
            </button>
          </div>
        </div>
        {/* Bottom */}
        <div></div>
      </div>
    </div>
  );
};

export default Header;
