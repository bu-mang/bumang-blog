import { getAllTags } from "@/services/api/blog/(list)";
import TagWrapperLayer from "./tagWrapper";
import { TagType } from "@/types";

const Tags = async () => {
  let tags: TagType[] | null = null;

  try {
    tags = await getAllTags();
  } catch (err) {}

  return (
    <div className="mt-8 flex w-full flex-col gap-2 px-2">
      <h4 className="text-lg font-semibold">Tags</h4>
      <TagWrapperLayer tags={tags} />
    </div>
  );
};

export default Tags;
