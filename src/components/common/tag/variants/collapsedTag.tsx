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
    "flex gap-2 justify-center items-center h-fit bg-gray-1 text-gray-200 transition-all truncate shadow-sm",
    {
      // SIZE
      ["rounded-lg w-7 h-7 text-2xs"]: size === "lg",
      ["rounded-2 w-7 h-7 text-2xs"]: size === "sm",

      // BACKGROUND
      ["bg-gray-1 text-gray-400 hover:bg-gray-5"]: !!hasBackground,

      // ISACTIVE
      ["bg-transparent"]: !hasBackground,
      ["hover:bg-gray-5"]: !!hasBackground,
    },
    className,
  );

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <ButtonBase className={tagClass}>
          <Ellipsis size={16} />
        </ButtonBase>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <TagWrapper>{children}</TagWrapper>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CollapsedTag;
