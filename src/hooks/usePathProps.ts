import { menus } from "@/constants/menuTree";
import { usePathname } from "next/navigation";

const usePathProps = (minorUrl?: string) => {
  const fullPathname = usePathname();
  const splitted = fullPathname.split("/");

  const majorPathname = "/" + splitted[1];
  const minorPathname = splitted[2] ? "/" + splitted[2] : "/";

  const majorPathInfo = menus.find((item) => item.url === majorPathname);
  const minorPathInfo = majorPathInfo?.subMenu?.find(
    (item) => item.url === minorPathname,
  );

  let isFocused = null;
  if (minorUrl) {
    isFocused = minorUrl === minorPathname;
  }

  return {
    fullPathname,
    majorPathname,
    minorPathname,
    majorPathInfo,
    minorPathInfo,
    isFocused,
  };
};

export default usePathProps;
