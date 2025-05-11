"use client";

import { AlignType } from "@/types";
import { cn } from "@/utils/cn";
import React from "react";
import CollapsedTag from "./collapsedTag";

interface TagWrapperProps {
  children: React.ReactNode;

  className?: string;

  as?: "default" | "collapsible";
  collapsePoint?: number;
  align?: AlignType;
}

export const TagWrapper = ({
  children,
  className,
  as = "default",
  collapsePoint = 5,
  align,
}: TagWrapperProps) => {
  const wrapperClass = cn(
    "flex w-full flex-1 flex-wrap gap-2",
    align === "left" && "justify-start",
    align === "center" && "justify-center",
    align === "right" && "justify-end",
    className,
  );

  /**
   * @JUST_WRAPPER
   */
  if (as === "default") {
    return <div className={wrapperClass}>{children}</div>;
  }

  /**
   * @COLLAPSIBLE
   */
  const childrenArray = React.Children.toArray(children); // 배열로 변환

  const collapsedArray = childrenArray.slice(collapsePoint - 1);
  const exposedArray = childrenArray.slice(0, collapsePoint - 1);

  return (
    <div className={wrapperClass}>
      {exposedArray.map((child) => child)}
      {collapsedArray.length > 0 && (
        <CollapsedTag>{...collapsedArray}</CollapsedTag>
      )}
    </div>
  );
};

export default TagWrapper;
