import { LAYOUT_PADDING_TOP_WITH_HEIGHT } from "@/constants/layouts/layout";
import { cn } from "@/utils/cn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={cn(LAYOUT_PADDING_TOP_WITH_HEIGHT)}>{children}</section>
  );
}
