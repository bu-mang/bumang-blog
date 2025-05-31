"use client";

import { LuPlus } from "react-icons/lu";
import Link from "next/link";
import { getButtonColorStyle } from "@/utils/styles/filButtonManager";
import { cn } from "@/utils/cn";
import { useAuthStore } from "@/store/auth";
import { useSearchParams } from "next/navigation";
import { useQueryParams } from "@/hooks/useQueryParams";

interface SectionLabelProps {
  title: string;
  amount?: number;
  isDraggable?: boolean;
  className?: string;
}

const SectionLabel = ({
  title = "PageTitle",
  amount,
  isDraggable = false,
  className,
}: SectionLabelProps) => {
  const { textStyle, fillStyle, flexBoxClass } = getButtonColorStyle("dark");
  const titleClass = cn(
    "col-span-3 mb-5 flex h-10 w-full items-center justify-between font-semibold",
    isDraggable && "pointer-events-none",
    className,
  );
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { updateQuery } = useQueryParams();

  return (
    <div className={titleClass}>
      {/* PAGE Label */}
      <div className="flex items-center gap-2">
        <span className="text-xl">{title}</span>
        <span className="text-sm text-gray-200">{amount}</span>
      </div>

      {/* NEW POST */}
      <div className="flex items-center gap-2">
        <Link href={updateQuery({ view: "thumbnail" })}>
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-5">
            Th
          </div>
        </Link>
        <Link href={updateQuery({ view: "list" })}>
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-5">
            Li
          </div>
        </Link>
        {isAuthenticated && (
          <Link
            href="/blog/edit"
            className={cn(
              flexBoxClass,
              fillStyle,
              !isAuthenticated && "pointer-events-none opacity-20",
            )}
          >
            <LuPlus className={textStyle} />
            <span className={textStyle}>Write</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SectionLabel;
