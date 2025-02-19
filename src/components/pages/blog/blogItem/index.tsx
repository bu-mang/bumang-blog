import { Tag } from "@/components/common";
import Image from "next/image";
import Link from "next/link";
import { LuMoveRight } from "react-icons/lu";

interface BlogItemProps {
  title: string;
  content: string;
  category: string;
  tags: string[];
  date: Date;
  id: number;
  imageUrl: string;
}

const BlogItem = ({
  title,
  content,
  category,
  tags,
  date,
  id,
  imageUrl,
}: BlogItemProps) => {
  return (
    <Link href={"/blog/" + id} className="group">
      {/* IMAGE */}
      <div className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-8 bg-gray-50">
        <Image src={imageUrl} alt="postImage" fill />
      </div>
      <div className="my-2">
        {/* TITLE */}
        <div className="flex items-center hover:text-gray-500">
          <div className="flex-1 flex-nowrap truncate text-ellipsis font-medium">
            {title}
          </div>
          <LuMoveRight className="animate-arrow text-gray-200 opacity-0 transition-all duration-500 group-hover:opacity-100" />
        </div>

        {/* CONTENT */}
        <div className="flex-1 flex-nowrap truncate text-ellipsis text-sm">
          {content}
        </div>
      </div>

      {/* TAGS */}
      <div className="flex w-full items-center gap-2 transition-all duration-500">
        <div className="gap-1ew flex flex-wrap">
          {tags.map((tag) => (
            <Tag key={tag} title={tag} size="sm" type="button" />
          ))}
        </div>

        {/* DIVIDER */}
        <div className="h-3 w-[1px] bg-gray-50" />

        {/* DATE */}
        <div className="text-xs text-gray-200">
          {date.toLocaleDateString("ko-kr")}
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;
