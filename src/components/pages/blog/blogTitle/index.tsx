import { LuPlus } from "react-icons/lu";
import Link from "next/link";

const BlogTitle = () => {
  return (
    <div className="col-span-3 mb-5 flex h-10 w-full items-center justify-between font-semibold">
      {/* PAGE BlogTITLE */}
      <div className="flex items-center gap-2">
        <span className="text-xl">PageTitle</span>
        <span className="text-sm text-gray-200">28</span>
      </div>
      {/* NEW POST */}
      <Link
        href="/blog/edit"
        className="flex h-8 items-center rounded-md bg-gray-1 px-4 py-2 text-sm font-normal text-gray-700 transition-colors hover:bg-gray-5"
      >
        <LuPlus className="-translate-x-1.5" />
        <span>Write</span>
      </Link>
    </div>
  );
};

export default BlogTitle;
