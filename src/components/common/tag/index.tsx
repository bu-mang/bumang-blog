"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { LuX as CloseIcon } from "react-icons/lu";

interface TagProps {
  value: string;
  label: string;

  url?: string;
  onClick?: () => void;
  type?: "link" | "button";
  className?: string;
  background?: boolean;
  size?: "sm" | "lg";
}

const Tag = ({
  value,
  label,
  url,
  onClick,
  className,
  type = "link",
  background = true,
  size = "lg",
}: TagProps) => {
  const [isActivated, setIsActivated] = useState(false);

  const handleClick = () => {
    if (!onClick) return;
    setIsActivated((prev) => !prev);
    onClick();
  };

  const tagClass = clsx(
    "flex gap-2 items-center h-fit bg-gray-1 text-gray-200 transition-all truncate",
    {
      // SIZE
      ["rounded-8 px-2 py-1 text-sm"]: size === "lg",
      ["rounded-2 p-1 text-xs"]: size === "sm",

      // BACKGROUND & ISACTIVE
      ["bg-gray-700 text-white hover:bg-gray-500"]: isActivated && !!background,
      ["text-gray-900"]: isActivated && !background,
      ["bg-transparent"]: !background,
      ["hover:bg-gray-5"]: !!background,
    },
    className,
  );

  if (type === "link") {
    return (
      <Link href={url ?? "#"} className={tagClass}>
        <span>{value}</span>
        {isActivated && !!background && <CloseIcon />}
      </Link>
    );
  }

  if (type === "button") {
    return (
      <button onClick={handleClick} className={tagClass}>
        {label}
        {isActivated && !!background && <CloseIcon />}
      </button>
    );
  }
};

export default Tag;
