import { Tabbar } from "@/components";
import { menus } from "@/constants/menuTree";

interface TabLayoutProps {
  children: React.ReactNode;
}

const TabLayout = ({ children }: TabLayoutProps) => {
  const WORK = menus[3];

  return (
    <div className="mt-16 h-full w-full flex-1 px-layout">
      <Tabbar
        page={WORK.title}
        pageUrl={WORK.url}
        subMenu={WORK.subMenu ?? []}
      />
      {children}
    </div>
  );
};

export default TabLayout;
