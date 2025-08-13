import { LAYOUT_PADDING_ALONGSIDE } from "@/constants/layouts/layout";
import { cn } from "@/utils/cn";

const Grid = () => {
  return (
    <div
      className={cn(
        "fixed z-10 grid h-full w-full grid-cols-4 gap-[1.5vw] bg-blue-100 opacity-50",
        LAYOUT_PADDING_ALONGSIDE,
      )}
    >
      <div className="grid h-full grid-cols-2 gap-[1.5vw] bg-blue-100">
        <div className="h-full bg-blue-300" />
        <div className="h-full bg-blue-300" />
      </div>
      <div className="grid h-full grid-cols-2 gap-[1.5vw] bg-blue-100">
        <div className="h-full bg-blue-300" />
        <div className="h-full bg-blue-300" />
      </div>
      <div className="grid h-full grid-cols-2 gap-[1.5vw] bg-blue-100">
        <div className="h-full bg-blue-300" />
        <div className="h-full bg-blue-300" />
      </div>
      <div className="grid h-full grid-cols-2 gap-[1.5vw] bg-blue-100">
        <div className="h-full bg-blue-300" />
        <div className="h-full bg-blue-300" />
      </div>
    </div>
  );
};

export default Grid;
