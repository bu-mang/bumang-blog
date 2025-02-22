import type { ButtonColorType } from "@/types";

const getButtonColorStyle = (fillColor: ButtonColorType) => {
  let textStyle: string;
  let fillStyle: string;

  switch (fillColor) {
    case "light":
      fillStyle = "bg-gray-5 hover:bg-gray-10";
      textStyle = "text-gray-700 font-medium";
      break;

    default:
    case "dark":
      fillStyle = "bg-gray-600 hover:bg-gray-800";
      textStyle = "text-white font-medium";
      break;
  }
  return {
    textStyle,
    fillStyle,
  };
};

export { getButtonColorStyle };
