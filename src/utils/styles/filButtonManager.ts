import type { ButtonColorType } from "@/types";
import { cn } from "../cn";

const getButtonColorStyle = (fillColor: ButtonColorType) => {
  let textStyle: string;
  let fillStyle: string;
  let flexBoxClass = "flex items-center gap-2";

  switch (fillColor) {
    case "light":
      fillStyle = cn(
        "bg-gray-5 hover:bg-gray-10 px-4 h-8 rounded-md transition-colors",
      );
      textStyle = "text-gray-700 font-medium";
      break;

    default:
    case "dark":
      fillStyle = cn(
        "bg-gray-600 hover:bg-gray-800 px-4 h-8 rounded-md transition-colors",
      );
      textStyle = "text-white font-medium";
      break;
  }
  return {
    textStyle,
    fillStyle,
    flexBoxClass,
  };
};

export { getButtonColorStyle };
