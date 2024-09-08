interface MainNavProps {
  children: React.ReactNode;
}

const MainNavTabs = ({ children }: MainNavProps) => {
  return <div className="flex items-center gap-6">{children}</div>;
};

export default MainNavTabs;
