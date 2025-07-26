import { cn } from "@/utils/cn";

interface TitleBadgeProps {
  children: React.ReactNode;
  className: string;
}
export default function TitleBadge({ children, className }: TitleBadgeProps) {
  return (
    <div
      className={cn(
        "col-span-8 w-fit animate-tada rounded-full border-2 border-black px-4 py-1 text-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
