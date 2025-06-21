import { cn } from "@/utils/cn";
import { HTMLAttributes } from "react";

interface SectionBoxProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animated?: boolean;
  borderTop?: boolean;
}

// TODO: 설명 추가하기
const SectionBox = ({
  children,
  className,
  animated = true,
  borderTop = true,
  ...props
}: SectionBoxProps) => {
  const sectionBoxClass = cn(animated && "w-full opacity-0", className);

  return (
    <div className={sectionBoxClass} {...props}>
      <div
        className={cn(
          "auto-rows-[minmax(auto, max-content)] relative grid w-full grid-cols-8 gap-x-[1.5vw] gap-y-[1.5vw] border-gray-10 pt-3",
          borderTop && "border-t-[1px]",
        )}
      >
        {children}
      </div>
    </div>
  );
};

// TODO: 설명 추가하기
const SubBox = ({
  children,
  className,
  borderTop = true,
  ...props
}: SectionBoxProps) => {
  const subBoxClass = cn(
    "relative grid grid-cols-5 border-gray-10 py-8 gap-y-8",
    borderTop && "border-t-[1px]",
    className,
  );

  return (
    <div className={subBoxClass} {...props}>
      {children}
    </div>
  );
};

export { SectionBox, SubBox };
