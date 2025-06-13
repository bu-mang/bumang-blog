"use client";

import { ButtonBase, Tag } from "@/components/common";
import CustomNotification from "@/components/common/customNotification";
import { Skeleton } from "@/components/ui/skeleton";
import { PATHNAME } from "@/constants/routes";
import { RoleType } from "@/types";
import { TagCompactType } from "@/types/tag";
import { useCheckPermission } from "@/utils/canReadArticle";
import { cn } from "@/utils/cn";
import { getThumbnailByGroup } from "@/utils/getThumnailByGroup";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { LuLockKeyhole, LuMoveRight } from "react-icons/lu";
import { toast } from "react-toastify";

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
  itemViewType: "thumbnail" | "list";
  size?: "lg" | "sm";
  readPermisson: null | RoleType;
}

export function BlogItemFallback() {
  return (
    <div className="group">
      {/* IMAGE */}
      <div className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-8">
        <Skeleton className="h-full w-full" />
      </div>

      {/* TITLE */}
      <div className="mb-1 mt-2.5 flex items-center gap-1 group-hover:text-gray-500">
        {/* <div className={titleStyle}>{title}</div> */}
        <Skeleton className="h-6 w-full" />

        <Skeleton className="h-6 w-6" />
      </div>

      {/* CONTENT */}
      <Skeleton className="h-6 w-full" />

      {/* GROUP & CATEGORY & DATE */}
      <div className="mb-3 mt-2 flex items-center gap-2">
        <div className="flex gap-1">
          <Skeleton className="h-6 w-10" />
          <Skeleton className="h-6 w-10" />
        </div>
        <div className="h-2 w-[1px] bg-gray-100" />
        <Skeleton className="h-6 w-full" />
      </div>

      {/* TAGS */}
      <div className="flex gap-1">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
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
  const titleStyle = "line-clamp-2 flex-1 flex-nowrap font-medium";
  const contentStyle = "line-clamp-1 flex-1 flex-nowrap text-sm text-gray-400";
  const tagWrapperStyle = "flex flex-wrap gap-1 mt-1.5";
  const formattedDate = format(date, "yyyy. MM. dd.");

  // 권한 체크 및 네비게이팅 막기
  const isAuthorized = useCheckPermission(readPermisson);
  const router = useRouter();

  const handleNavigate: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!isAuthorized) {
      e.preventDefault();

      // toast.error("로그인이 필요합니다.");
      // toast.error("Login Needed");
      toast(CustomNotification, {
        data: {
          title: "Oh Snap! It's Private.",
          content: "You need Login.",
          onClick: () => router.push(PATHNAME.LOGIN),
          buttonText: "Go to Login",
        },
        ariaLabel: "You need Login.",
        autoClose: 5000, // false에서 숫자로 변경
      });
      return;
    }
  };

  switch (itemViewType) {
    case "list":
      return (
        <Link
          href={"/blog/" + id}
          className="group flex items-center justify-between gap-6 py-8 lg:gap-28"
          onClick={handleNavigate}
        >
          <div className="flex-1">
            {/* TITLE */}
            <div className="mb-2 mt-2.5 flex items-center text-2xl font-semibold group-hover:text-gray-500">
              <div className={titleStyle}>{title}</div>
              {!readPermisson ? (
                <LuMoveRight className="animate-arrow text-gray-200 opacity-0 transition-all duration-500 group-hover:opacity-100" />
              ) : (
                <LuLockKeyhole size={14} />
              )}
            </div>

            {/* CONTENT */}
            <div className={cn(contentStyle, "line-clamp-2 text-base")}>
              {previewText}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex truncate text-ellipsis text-sm font-semibold text-gray-100">
                <ButtonBase
                // onClick={() => router.push(PATHNAME.BLOG + `${}`)}
                >
                  <span className="truncate text-ellipsis">{groupLabel}</span>
                </ButtonBase>
                <span>•</span>
                <ButtonBase onClick={() => {}}>
                  <span className="truncate text-ellipsis">
                    {categoryLabel}
                  </span>
                </ButtonBase>
              </div>
              <div className="h-2 w-[1px] bg-gray-100" />
              <span className="truncate text-sm font-semibold text-gray-100">
                {formattedDate}
              </span>
            </div>

            {/* TAGS */}
            <div className={cn(tagWrapperStyle, "mt-4 gap-2")}>
              {tags?.map((tag) => (
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
          </div>

          {/* IMAGE */}
          <div className="relative h-[135px] w-full max-w-[240px] shrink-0 cursor-pointer overflow-hidden rounded-8 bg-gray-50">
            <Image
              src={thumbnailUrl || getThumbnailByGroup(groupLabel)}
              alt="postImage"
              className="object-cover"
              fill
            />
          </div>
        </Link>
      );

    case "thumbnail":
    default:
      return (
        <Link href={"/blog/" + id} className="group" onClick={handleNavigate}>
          {/* IMAGE */}
          <div className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-8 bg-gray-50">
            <Image
              src={thumbnailUrl || getThumbnailByGroup(groupLabel)}
              alt="postImage"
              className="object-cover object-top transition-all group-hover:scale-110"
              fill
            />
          </div>

          {/* TITLE */}
          <div className="mt-2.5 flex items-center group-hover:text-gray-500">
            <div className={titleStyle}>{title}</div>
            {!readPermisson ? (
              <LuMoveRight className="animate-arrow text-gray-200 opacity-0 transition-all duration-500 group-hover:opacity-100" />
            ) : (
              <LuLockKeyhole size={14} />
            )}
          </div>

          {/* CONTENT */}
          <div className={contentStyle}>{previewText}</div>

          {/* GROUP & CATEGORY & DATE */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex truncate text-ellipsis text-xs font-semibold text-gray-100">
              <ButtonBase onClick={() => {}}>
                <span className="truncate text-ellipsis">{groupLabel}</span>
              </ButtonBase>
              <span>•</span>
              <ButtonBase onClick={() => {}}>
                <span className="truncate text-ellipsis">{categoryLabel}</span>
              </ButtonBase>
            </div>
            <div className="h-2 w-[1px] bg-gray-100" />
            <span className="truncate text-xs font-semibold text-gray-100">
              {formattedDate}
            </span>
          </div>

          {/* TAGS */}
          <div className={tagWrapperStyle}>
            {tags?.map((tag) => (
              <Tag
                key={tag.id}
                id={tag.id}
                title={tag.title}
                size={size}
                type="button"
                isActivated={false}
                className="pointer-events-none"
              />
            ))}
          </div>
        </Link>
      );
  }
};

export default BlogItem;
