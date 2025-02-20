import SideBar from "@/components/layout/sideBar";
import { LAYOUT_PADDING_TOP } from "@/constants/layout";
import { cn } from "@/utils/cn";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "grid h-fit min-h-full grid-cols-4 gap-x-[1.5vw] px-[10vw]",
        LAYOUT_PADDING_TOP,
      )}
    >
      {children}
      <SideBar />
    </section>
  );
}
