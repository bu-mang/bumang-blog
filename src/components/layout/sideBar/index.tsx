"use client";

import Tabs from "./_ingredients/tabs";
import Tags from "./_ingredients/tags";
import Menus from "./_ingredients/menus";

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
