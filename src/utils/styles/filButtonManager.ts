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
  // 시맨틱 토큰 사용 → .dark 클래스에 따라 라이트/다크 자동 반전.
  // "light" = 서브/은은한(secondary), "dark" = 메인 액션(primary).
  switch (fillColor) {
    case "light":
      layoutColorStyle =
        "bg-secondary border hover:bg-secondary/80 transition-colors";
      textColorStyle = "text-secondary-foreground";
      break;

    default:
    case "dark":
      layoutColorStyle = "bg-primary hover:bg-primary/90 transition-colors";
      textColorStyle = "text-primary-foreground";
      break;
  }

  // SIZE
  switch (size) {
    case "lg":
      layoutSizeStyle = "px-8 h-14 rounded-lg active:scale-95";
      textSizeStyle = "text-xl font-semibold";
      flexBoxClass = "flex items-center gap-3";
      break;

    case "md":
      layoutSizeStyle = "px-4 h-10 rounded-lg active:scale-95";
      textSizeStyle = "text-lg font-medium";
      flexBoxClass = "flex items-center gap-3";
      break;

    case "sm":
    default:
      layoutSizeStyle = "px-4 h-8 rounded-md active:scale-95";
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
