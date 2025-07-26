import { SideBar } from "@/components/layout";
import { LAYOUT_PADDING_TOP_WITH_HEIGHT } from "@/constants/layouts/layout";
import { cn } from "@/utils/cn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "grid h-fit min-h-full grid-cols-4 gap-x-[1.5vw]",
        LAYOUT_PADDING_TOP_WITH_HEIGHT,
        "px-[2vw] md:px-[6vw]",
      )}
    >
      {children}
      <SideBar />
    </section>
  );
}
