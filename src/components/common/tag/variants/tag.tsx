"use client";

import { TagProps } from "@/types";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { LuX as CloseIcon } from "react-icons/lu";
import { AlignType } from "@/types";

const Tag = ({
  id,
  value,
  label,

  url,
  onClick,
  className,
  size = "lg",
  type = "link",
  hasXButton = true,
  hasBackground = true,
  isActivated = false,
  setIsActivated,
}: TagProps) => {
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
      <Link href={url ?? "#"} className={tagClass}>
        <span>{label}</span>
        {isActivated && !!hasBackground && !!hasXButton && <CloseIcon />}
      </Link>
    );
  }

  if (type === "button") {
    return (
      <button onClick={handleClick} className={tagClass}>
        {label}
        {isActivated && !!hasBackground && !!hasXButton && <CloseIcon />}
      </button>
    );
  }
};

export default Tag;
