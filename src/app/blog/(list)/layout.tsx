import SideBar from "@/components/layout/sideBar";
import { LAYOUT_PADDING_TOP } from "@/constants/layout";
import { cn } from "@/lib/utils";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blogPageClass = cn(
    "grid grid-cols-4 gap-x-[1.5vw] px-[10vw]",
    LAYOUT_PADDING_TOP,
  );

  return (
    <section className={blogPageClass}>
      {children}
      <SideBar />
    </section>
  );
}
