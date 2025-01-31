"use client";

import TabBar from "./tabs";
import FilterBar from "./filters";

const TabFilterBar = () => {
  // TODO:
  // tab에 따라 FilterBar의 내용이 달라지게.

  return (
    <div className="relative mx-[3vw] mb-8">
      <TabBar />
      <FilterBar />
    </div>
  );
};

export default TabFilterBar;
