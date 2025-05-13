import BlogEditInner from "@/components/pages/blog/edit/EditInner";
import {
  getAllTags,
  getGroupedCategoryTree,
} from "@/services/api/blog/(list)/server";
import { GroupType, TagType } from "@/types";

export default async function BlogEditServerLayer() {
  let groupLists: GroupType[] = [];
  let tagLists: TagType[] = [];

  try {
    const [groups, tags] = await Promise.all([
      await getGroupedCategoryTree(),
      await getAllTags(),
    ]);

    groupLists = groups;
    tagLists = tags;
  } catch (err: unknown) {
    console.log(err, "err");
  }

  return <BlogEditInner groupLists={groupLists} tagLists={tagLists} />;
}
