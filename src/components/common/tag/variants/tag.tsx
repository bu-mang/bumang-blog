"use client";

import { useQueryParams } from "@/hooks/useQueryParams";
import { TagType } from "@/types";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { LuX as CloseIcon } from "react-icons/lu";

export interface TagProps {
  id: number;
  title: string;

  url?: string;
  onClick?: () => void;
  type?: "link" | "button";
  size?: "sm" | "lg";

  className?: string;
  hasBackground?: boolean;
  fixedBgColor?: "dark" | "lightGray";

  hasXButton?: boolean;
  isActivated?: boolean;
  setIsActivated?: (v?: boolean) => void; // 단순 Label로 쓸 경우 불필요하기 때문에 Optional
}

const Tag = ({
  id,
  title,

  onClick,
  className,

  size = "lg",
  type = "link",

  hasXButton = true,
  hasBackground = true,
  isActivated = false,
  setIsActivated,
}: TagProps) => {
  const { updateArrayQuery } = useQueryParams();
  const router = useRouter();

  const handleClick = () => {
    console.log("onClick");
    if (setIsActivated) setIsActivated();
    if (!onClick) return;
    onClick();
  };

  const tagClass = clsx(
    "flex gap-2 items-center h-fit bg-gray-1 text-gray-200 transition-all truncate shadow-sm",
    {
      // SIZE
      ["rounded-8 px-2 py-1 text-sm"]: size === "lg",
      ["rounded-2 p-1 text-xs"]: size === "sm",

      // BACKGROUND
      ["bg-gray-700 text-white hover:bg-gray-500"]:
        isActivated && !!hasBackground,
      ["text-gray-900"]: isActivated && !hasBackground,

      // ISACTIVE
      ["bg-transparent"]: !hasBackground,
      ["hover:bg-gray-5"]: !!hasBackground,
    },
    className,
  );

  if (type === "link") {
    return (
      <Link
        href={updateArrayQuery("tagIds", `${id}`, "add")}
        className={tagClass}
      >
        <span>{title}</span>
        {isActivated && !!hasBackground && !!hasXButton && (
          <CloseIcon
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push(updateArrayQuery("tagIds", `${id}`, "remove"));
            }}
          />
        )}
      </Link>
    );
  } else {
    // type === "button"
    return (
      <button onClick={handleClick} className={tagClass}>
        {title}
        {isActivated && !!hasBackground && !!hasXButton && <CloseIcon />}
      </button>
    );
  }
};

export default Tag;
