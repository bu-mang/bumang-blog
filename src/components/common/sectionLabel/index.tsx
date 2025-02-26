import { LuPlus } from "react-icons/lu";
import Link from "next/link";
import { getButtonColorStyle } from "@/utils/styles/filButtonManager";
import { cn } from "@/utils/cn";

interface SectionLabelProps {
  title: string;
  amount?: number;
  isActionButtonOn?: boolean;
  isDraggable?: boolean;
  className?: string;
}

const SectionLabel = ({
  title = "PageTitle",
  amount,
  isActionButtonOn = false,
  isDraggable = false,
  className,
}: SectionLabelProps) => {
  const { textStyle, fillStyle, flexBoxClass } = getButtonColorStyle("dark");
  const titleClass = cn(
    "col-span-3 mb-5 flex h-10 w-full items-center justify-between font-semibold",
    isDraggable && "pointer-events-none",
    className,
  );

  return (
    <div className={titleClass}>
      {/* PAGE Label */}
      <div className="flex items-center gap-2">
        <span className="text-xl">{title}</span>
        <span className="text-sm text-gray-200">{amount}</span>
      </div>
      {/* NEW POST */}
      {isActionButtonOn && (
        <Link href="/blog/edit" className={cn(flexBoxClass, fillStyle)}>
          <LuPlus className={textStyle} />
          <span className={textStyle}>Write</span>
        </Link>
      )}
    </div>
  );
};

export default SectionLabel;
