import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BackToListProps {
  href: string;
  backToListLabel: string;
}
export default function BackToList({ backToListLabel, href }: BackToListProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center border-t py-10">
      <span className="text-2xl font-medium text-gray-400">
        Thanks for Reading
      </span>
      <Link
        className="group relative z-10 col-span-4 flex translate-y-4 items-center gap-2 text-gray-200 transition-all hover:text-gray-500"
        href={href}
      >
        <ArrowLeft size={14} className="group-hover:animate-arrow-back" />
        <span>{backToListLabel}</span>
      </Link>
    </div>
  );
}
