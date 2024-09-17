import { menus } from "@/constants/menuTree";
import { usePathname } from "next/navigation";

const usePathProps = (minorUrl?: string) => {
  const pathname = usePathname().split("/");

  const majorPathname = "/" + pathname[1];
  const minorPathname = pathname[2] ? "/" + pathname[2] : "/";

  const majorPathInfo = menus.find((item) => item.url === majorPathname);
  const minorPathInfo = majorPathInfo?.subMenu?.find(
    (item) => item.url === minorPathname,
  );

  let isFocused = null;
  if (minorUrl) {
    isFocused = minorUrl === minorPathname;
  }

  return {
    majorPathname,
    minorPathname,
    majorPathInfo,
    minorPathInfo,
    isFocused,
  };
};

export default usePathProps;
