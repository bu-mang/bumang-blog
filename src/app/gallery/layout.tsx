import TabbarDeck from "@/components/common/tabbar";
import { menus } from "@/constants/menuTree";

interface TabLayoutProps {
  children: React.ReactNode;
}

const TabLayout = ({ children }: TabLayoutProps) => {
  const GALLERY = menus[3];

  return (
    <div className="mt-16 h-full w-full flex-1 px-layout">
      <TabbarDeck
        page={GALLERY.title}
        pageUrl={GALLERY.url}
        subMenu={GALLERY.subMenu ?? []}
      />
      {children}
    </div>
  );
};

export default TabLayout;
