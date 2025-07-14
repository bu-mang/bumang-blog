import BlogEditInner from "@/components/pages/blog/edit/EditInner";
import { getAllTags, getGroupedCategoryTree } from "@/services/api/blog/(list)";
import { GroupType, TagType } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit", // 최종 결과: "회사소개 | 사이트명"
};

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
