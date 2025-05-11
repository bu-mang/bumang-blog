import { getAllTags } from "@/services/api/blog/(list)/server";
import TagWrapperLayer from "./tagWrapper";

const Tags = async () => {
  let tags = null;

  try {
    const res = await getAllTags();
    console.log(res, "getAllTags");

    tags = res;
  } catch (err) {}

  return (
    <div className="mt-8 flex w-full flex-col gap-2 px-2">
      <h4 className="text-lg font-semibold">Tags</h4>
      <TagWrapperLayer tags={tags} />
    </div>
  );
};

export default Tags;
