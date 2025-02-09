import { cn } from "@/utils/cn";
import { HTMLAttributes } from "react";

interface SectionBoxProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const SectionBox = ({ children, className, ...props }: SectionBoxProps) => {
  const sectionBoxClass = cn("w-full px-[3vw] opacity-0", className);

  return (
    <div className={sectionBoxClass} {...props}>
      <div className="auto-rows-[minmax(auto, max-content)] relative grid w-full grid-cols-8 gap-x-[1.5vw] gap-y-[1.5vw] border-t-[1px] border-gray-10 pt-3">
        {children}
      </div>
    </div>
  );
};

const SubBox = ({ children, className, ...props }: SectionBoxProps) => {
  const subBoxClass = cn(
    "relative grid grid-cols-5 border-t-[1px] border-gray-10 py-8 gap-y-8",
    className,
  );

  return (
    <div className={subBoxClass} {...props}>
      {children}
    </div>
  );
};

export { SectionBox, SubBox };
