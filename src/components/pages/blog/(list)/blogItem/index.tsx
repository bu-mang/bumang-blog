"use client";

import { ButtonBase, Tag } from "@/components/common";
import { RoleType } from "@/types";
import { TagCompactType } from "@/types/tag";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { LuLock, LuLockKeyhole, LuLockOpen, LuMoveRight } from "react-icons/lu";

interface BlogItemProps {
  id: number;
  title: string;
  previewText: string;
  categoryLabel: string;
  groupLabel: string;
  author: string;
  tags: TagCompactType[];
  date: string;
  thumbnailUrl: string | null;
  itemViewType: string;
  size?: "lg" | "sm";
  readPermisson: null | RoleType;
}

const BlogItem = ({
  title,
  previewText,
  categoryLabel,
  groupLabel,
  author,
  tags,
  date,
  id,
  thumbnailUrl,
  itemViewType, // thumbnail | list
  size = "sm",
  readPermisson,
}: BlogItemProps) => {
  const { titleStyle, contentStyle, tagWrapperStyle, dateStyle } =
    getBlogItemStyle(size);

  const formattedDate = format(date, "yyyy. MM. dd.");

  return (
    <Link href={"/blog/" + id} className="group">
      {/* IMAGE */}
      <div className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-8 bg-gray-50">
        {thumbnailUrl && <Image src={thumbnailUrl} alt="postImage" fill />}
      </div>

      {/* TITLE */}
      <div className="mt-2.5 flex items-center group-hover:text-gray-500">
        <div className={titleStyle}>{title}</div>
        {readPermisson === null ? (
          <LuMoveRight className="animate-arrow text-gray-200 opacity-0 transition-all duration-500 group-hover:opacity-100" />
        ) : (
          <LuLockKeyhole size={14} />
        )}
      </div>

      {/* CONTENT */}
      <div className={contentStyle}>{previewText}</div>

      <div className="mt-3 flex items-center gap-2 text-xs">
        <div className="flex truncate text-ellipsis font-semibold text-gray-100">
          <ButtonBase onClick={() => {}}>
            <span className="truncate text-ellipsis">{groupLabel}</span>
          </ButtonBase>
          <span>•</span>
          <ButtonBase onClick={() => {}}>
            <span className="truncate text-ellipsis">{categoryLabel}</span>
          </ButtonBase>
        </div>
        <div className="h-2 w-[1px] bg-gray-100" />
        <span className="truncate font-semibold text-gray-100">
          {formattedDate}
        </span>
      </div>

      {/* TAGS */}
      <div className={tagWrapperStyle}>
        {/* {tags.map((tag) => (
          <Tag
            key={tag.id}
            id={tag.id}
            title={tag.title}
            size={size}
            type="button"
            isActivated={false}
          />
        ))} */}
        {[
          { title: "tag1", id: 1 },
          { title: "tag2", id: 2 },
          { title: "tag3", id: 3 },
        ].map((tag) => (
          <Tag
            key={tag.id}
            id={tag.id}
            title={tag.title}
            size={size}
            type="button"
            isActivated={false}
          />
        ))}
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
      tagWrapperStyle = "flex flex-wrap gap-2 mt-1.5";
      dateStyle = "text-sm text-gray-200 mt-1.5";
      tagAndDividerAlignStyle =
        "flex w-full items-center gap-2 transition-all duration-500 mt-4";
      break;

    case "sm":
    default:
      titleStyle = "line-clamp-2 flex-1 flex-nowrap font-medium";
      contentStyle = "line-clamp-1 flex-1 flex-nowrap text-sm text-gray-400";
      tagWrapperStyle = "flex flex-wrap gap-1 mt-1.5";
      dateStyle = "text-xs text-gray-200 mt-1.5";
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
