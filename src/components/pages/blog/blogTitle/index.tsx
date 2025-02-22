import { LuPlus } from "react-icons/lu";
import Link from "next/link";
import { FillButton } from "@/components/common";
import { getButtonColorStyle } from "@/utils/styles/filButtonManager";
import { cn } from "@/utils/cn";

const BlogTitle = () => {
  const { textStyle, fillStyle, flexBoxClass } = getButtonColorStyle("dark");

  return (
    <div className="col-span-3 mb-5 flex h-10 w-full items-center justify-between font-semibold">
      {/* PAGE BlogTITLE */}
      <div className="flex items-center gap-2">
        <span className="text-xl">PageTitle</span>
        <span className="text-sm text-gray-200">28</span>
      </div>
      {/* NEW POST */}
      <Link href="/blog/edit" className={cn(flexBoxClass, fillStyle)}>
        <LuPlus className={textStyle} />
        <span className={textStyle}>Write</span>
      </Link>
    </div>
  );
};

export default BlogTitle;
