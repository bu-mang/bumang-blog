import { LAYOUT_PADDING_TOP } from "@/constants/layout";
import { cn } from "@/utils/cn";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={cn(LAYOUT_PADDING_TOP)}>{children}</section>;
}
