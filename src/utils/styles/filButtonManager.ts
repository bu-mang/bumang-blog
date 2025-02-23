import type { ButtonColorType, ButtonSizeType } from "@/types";
import { cn } from "../cn";

const getButtonColorStyle = (
  fillColor: ButtonColorType,
  size?: ButtonSizeType,
) => {
  let layoutColorStyle: string;
  let layoutSizeStyle: string;

  let textColorStyle: string;
  let textSizeStyle: string;

  // ButtonInnerLayout
  let flexBoxClass;

  // COLOR
  switch (fillColor) {
    case "light":
      layoutColorStyle = "bg-gray-5 hover:bg-gray-10 transition-colors";
      textColorStyle = "text-gray-700";
      break;

    default:
    case "dark":
      layoutColorStyle = "bg-gray-600 hover:bg-gray-800 transition-colors";
      textColorStyle = "text-white";
      break;
  }

  // SIZE
  switch (size) {
    case "lg":
      layoutSizeStyle = "px-8 h-14 rounded-lg";
      textSizeStyle = "text-xl font-semibold";
      flexBoxClass = "flex items-center gap-3";
      break;

    case "md":
      layoutSizeStyle = "px-4 h-10 rounded-lg";
      textSizeStyle = "text-lg font-medium";
      flexBoxClass = "flex items-center gap-3";
      break;

    case "sm":
    default:
      layoutSizeStyle = "px-4 h-8 rounded-md";
      textSizeStyle = "text-base font-medium";
      flexBoxClass = "flex items-center gap-2";
      break;
  }

  // 조립
  const fillStyle = cn(layoutColorStyle, layoutSizeStyle);
  const textStyle = cn(textColorStyle, textSizeStyle, "truncate");

  return {
    textStyle,
    fillStyle,
    flexBoxClass,
  };
};

export { getButtonColorStyle };
