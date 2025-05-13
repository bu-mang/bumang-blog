import { Tag } from "@/components/common";
import { TagType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { LuMoveRight } from "react-icons/lu";

interface BlogItemProps {
  title: string;
  content: string;
  categoryValue: string;
  tags: TagType[];
  date: Date;
  id: number;
  imageUrl: string;
  size?: "lg" | "sm";
}

const BlogItem = ({
  title,
  content,
  categoryValue,
  tags,
  date,
  id,
  imageUrl,
  size = "sm",
}: BlogItemProps) => {
  const {
    titleStyle,
    contentStyle,
    tagWrapperStyle,
    dateStyle,
    tagAndDividerAlignStyle,
  } = getBlogItemStyle(size);

  return (
    <Link href={"/blog/" + id} className="group">
      {/* IMAGE */}
      <div className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-8 bg-gray-50">
        <Image src={imageUrl} alt="postImage" fill />
      </div>
      <div className="my-2">
        {/* TITLE */}
        <div className="flex items-center group-hover:text-gray-500">
          <div className={titleStyle}>{title}</div>
          <LuMoveRight className="animate-arrow text-gray-200 opacity-0 transition-all duration-500 group-hover:opacity-100" />
        </div>

        {/* CONTENT */}
        <div className={contentStyle}>{content}</div>
      </div>

      {/* TAGS */}
      <div className={tagAndDividerAlignStyle}>
        <div className={tagWrapperStyle}>
          {tags.map((tag) => (
            <Tag
              id={tag.id}
              key={tag.id}
              value={tag.value}
              label={tag.label}
              size={size}
              type="button"
              isActivated={false}
            />
          ))}
        </div>

        {/* DIVIDER */}
        <div className="h-3 w-[1px] bg-gray-50" />

        {/* DATE */}
        <div className={dateStyle}>{date.toLocaleDateString("ko-kr")}</div>
      </div>
    </Link>
  );
};

export default BlogItem;

const getBlogItemStyle = (size: "lg" | "sm") => {
  let titleStyle = "";
  let contentStyle = "";
  let tagWrapperStyle = "";
  let dateStyle = "";
  let tagAndDividerAlignStyle = "";
  switch (size) {
    case "lg":
      titleStyle = "line-clamp-2 flex-1 flex-nowrap text-lg font-semibold mt-2";
      contentStyle =
        "line-clamp-2 flex-1 flex-nowrap text-md text-gray-400 mt-1";
      tagWrapperStyle = "flex flex-wrap gap-2";
      dateStyle = "text-sm text-gray-200";
      tagAndDividerAlignStyle =
        "flex w-full items-center gap-2 transition-all duration-500 mt-4";
      break;

    case "sm":
    default:
      titleStyle = "line-clamp-2 flex-1 flex-nowrap font-medium";
      contentStyle = "line-clamp-1 flex-1 flex-nowrap text-sm text-gray-400";
      tagWrapperStyle = "flex flex-wrap gap-1";
      dateStyle = "text-xs text-gray-200";
      tagAndDividerAlignStyle =
        "flex w-full items-center gap-2 transition-all duration-500";
      break;
  }

  return {
    titleStyle,
    contentStyle,
    tagWrapperStyle,
    dateStyle,
    tagAndDividerAlignStyle,
  };
};
