import { LAYOUT_PADDING_TOP } from "@/constants/layout";
import { cn } from "@/lib/utils";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={LAYOUT_PADDING_TOP}>{children}</section>;
}
