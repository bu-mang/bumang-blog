"use client";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import clsx from "clsx";
import { Ellipsis } from "lucide-react";
import { ButtonBase } from "../../button";
import { cn } from "@/utils/cn";
import TagWrapper from "./tagWrapper";
import React from "react";

interface CollapsibleTagProps {
  children: React.ReactNode;

  size?: "sm" | "lg";
  className?: string;
  hasBackground?: boolean;
  fixedBgColor?: "dark" | "lightGray";
}

const CollapsedTag = ({
  children,

  className,
  size = "lg",
  hasBackground = true,
}: CollapsibleTagProps) => {
  const tagClass = cn(
    "flex gap-2 justify-center items-center h-fit text-gray-200 transition-all truncate shadow-sm border hover:bg-gray-1",
    {
      // SIZE
      ["rounded-lg w-7 h-7 text-xs"]: size === "lg",
      ["rounded-3xs w-7 h-7 text-xs"]: size === "sm",
    },
    className,
  );

  const childrenLenfth = React.Children.toArray(children).length;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <ButtonBase className={tagClass}>
          {/* <Ellipsis size={16} /> */}+ {childrenLenfth}
        </ButtonBase>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <TagWrapper>{children}</TagWrapper>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CollapsedTag;
