import { Tabbar } from "@/components";
import { menus } from "@/constants/menuTree";

interface TabLayoutProps {
  children: React.ReactNode;
}

const TabLayout = ({ children }: TabLayoutProps) => {
  const LOG = menus[5];

  return (
    <div className="mt-16 h-full w-full flex-1 px-layout">
      <Tabbar page={LOG.title} pageUrl={LOG.url} subMenu={LOG.subMenu ?? []} />
      {children}
    </div>
  );
};

export default TabLayout;
