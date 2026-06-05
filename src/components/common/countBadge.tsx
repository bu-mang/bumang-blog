import { cn } from "@/utils/cn";
import Divider from "./divider";

interface CountBadgeProps {
  selected: number;
  total: number;
  /** 부모 `.group` 요소의 hover에 반응한다. 별도 hover 효과는 클래스로 덮어쓰면 됨. */
  className?: string;
}

/**
 * "선택 / 전체" 카운트를 표시하는 둥근 배지.
 * TagCombobox, AudienceCombobox 등 콤보박스 트리거 옆에서 공통으로 쓰인다.
 */
const CountBadge = ({ selected, total, className }: CountBadgeProps) => (
  <div
    className={cn(
      "flex min-w-8 items-center justify-evenly gap-1.5 rounded-full bg-foreground/80 px-2 py-0.5 shadow-md transition-transform group-hover:bg-foreground",
      className,
    )}
  >
    <span className="text-2xs font-semibold text-background">{selected}</span>
    <Divider size={14} direction="vertical" className="bg-background" />
    <span className="text-2xs font-semibold text-background">{total}</span>
  </div>
);

export default CountBadge;
