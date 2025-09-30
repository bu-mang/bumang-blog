import Tags from "./tags";
import Menus from "./menus";
import { getGroupedCategoryTree } from "@/services/api/blog/(list)";
import { GroupType } from "@/types";
import Tabs from "./tabs";

const SideBar = async () => {
  let menus: GroupType[] | null = null;

  try {
    menus = await getGroupedCategoryTree();
  } catch (err) {
    console.log(err, "err");
  }

  return (
    <div className="relative col-span-full mb-8 mt-20 flex flex-col gap-4 md:col-span-1 md:mt-0">
      <Tabs />
      <Menus menus={menus} />
      <Tags />
    </div>
  );
};

export default SideBar;
