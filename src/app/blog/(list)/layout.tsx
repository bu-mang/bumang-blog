import { SideBar } from "@/components/layout";
import {
  LAYOUT_PADDING_ALONGSIDE,
  LAYOUT_PADDING_TOP_WITH_HEIGHT,
} from "@/constants/layout";
import { cn } from "@/utils/cn";

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
        LAYOUT_PADDING_ALONGSIDE,
      )}
    >
      {children}
      <SideBar />
    </section>
  );
}
