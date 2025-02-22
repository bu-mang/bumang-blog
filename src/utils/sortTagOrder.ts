import { TagProps } from "@/types";

export const sortTagOrder = (
  targetArr: TagProps[],
  std: "label" | "value" = "label",
) => {
  return targetArr.sort((a, b) => a[std].localeCompare(b[std], ["en", "ko"]));
};
