import Tabs from "./tabs";
import Tags from "./tags";
import Menus from "./menus";
import { getGroupedCategoryTree } from "@/services/api/blog/(list)/server";
import { GroupType } from "@/types";

const SideBar = async () => {
  let menus: GroupType[] | null = null;

  try {
    const res = await getGroupedCategoryTree();
    if (res) {
      menus = res;
    }
  } catch (err) {
    console.log(err, "err");
  }

  return (
    <div className="relative mb-8 flex flex-col gap-4 px-4">
      <Tabs />
      <Menus menus={menus} />
      <Tags />
    </div>
  );
};

export default SideBar;
