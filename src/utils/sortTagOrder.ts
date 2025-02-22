import { TagProps } from "@/types";

/**
 * 태그 순서 정렬
 */
export const sortTagOrder = (
  targetArr: TagProps[],
  std: "label" | "value" = "label",
) => {
  return targetArr.sort((a, b) => a[std].localeCompare(b[std], ["en", "ko"]));
};
