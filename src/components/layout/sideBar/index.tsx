import Tabs from "./tabs";
import Tags from "./tags";
import Menus from "./menus";

const SideBar = () => {
  return (
    <div className="relative mb-8 flex flex-col gap-4 px-4">
      <Tabs />
      <Menus />
      <Tags />
    </div>
  );
};

export default SideBar;
