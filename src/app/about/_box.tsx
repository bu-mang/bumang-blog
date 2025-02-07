import { cn } from "@/utils/cn";
import { HTMLAttributes } from "react";

interface SectionBoxProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const SectionBox = ({ children }: SectionBoxProps) => {
  return (
    <div className="w-full px-[3vw]">
      <div className="auto-rows-[minmax(auto, max-content)] grid w-full grid-cols-8 gap-x-[1vw] gap-y-[1vw] border-t-[1px] border-gray-10 pt-3">
        {children}
      </div>
    </div>
  );
};

const SubBox = ({ children, className, ...props }: SectionBoxProps) => {
  const subBoxClass = cn(
    "grid grid-cols-5 border-t-[1px] border-gray-10 py-8 gap-y-8",
    className,
  );

  return (
    <div className={subBoxClass} {...props}>
      {children}
    </div>
  );
};

export { SectionBox, SubBox };
