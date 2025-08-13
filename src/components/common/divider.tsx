import { cn } from "@/utils/cn";

interface DividerProps {
  direction?: "horizontal" | "vertical";
  size?: 6 | 8 | 14 | 16 | 18;
  color?: string;
  className?: string;
}

const Divider = ({
  direction = "vertical",
  size = 14,
  color = "bg-gray-100",
  className,
}: DividerProps) => {
  const dividerClass = cn(
    {
      [`w-1.5 h-[1px]`]: direction === "horizontal" && size === 6,
      [`w-2 h-[1px]`]: direction === "horizontal" && size === 8,
      [`w-3.5 h-[1px]`]: direction === "horizontal" && size === 14,
      [`w-4 h-[1px]`]: direction === "horizontal" && size === 16,
      [`w-[18px] h-[1px]`]: direction === "horizontal" && size === 18,

      [`h-1.5 w-[1px]`]: direction === "vertical" && size === 6,
      [`h-2 w-[1px]`]: direction === "vertical" && size === 8,
      [`h-3.5 w-[1px]`]: direction === "vertical" && size === 14,
      [`h-4 w-[1px]`]: direction === "vertical" && size === 16,
      [`h-[18px] w-[1px]`]: direction === "vertical" && size === 18,
      [color]: !!color,
    },
    className,
  );

  return <div className={dividerClass} />;
};

export default Divider;
