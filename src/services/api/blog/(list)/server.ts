import { END_POINTS } from "@/constants/routes/endpoints";
import serverFetch from "@/services/lib/serverFetch";
import { GroupType } from "@/types/category";

const getGroupedCategoryTree = async () => {
  const res = await serverFetch<GroupType[]>(
    process.env.LOCAL_HOST + END_POINTS.GET_GROUP_CATEGORY_MENU_TREE,
  );

  return res;
};

export default getGroupedCategoryTree;
