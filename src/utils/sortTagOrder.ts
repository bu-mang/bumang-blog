import { TagType } from "@/types";

/**
 * 태그 순서 정렬
 */
export const sortStringOrder = (targetArr: TagType[]) => {
  return targetArr.sort((a, b) => a.title.localeCompare(b.title, ["en", "ko"]));
};
