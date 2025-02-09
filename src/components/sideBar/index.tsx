"use client";

import Tabs from "./_components/tabs";
import Tags from "./_components/tags";
import Menus from "./_components/menus";

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
