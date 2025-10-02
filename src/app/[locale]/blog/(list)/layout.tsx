import { SideBar } from "@/components/layout";
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
        "pt-[24vw] md:pt-[20vw] lg:pt-[16vw]",
        "px-[2vw] md:px-[6vw]",
      )}
    >
      {children}
      <SideBar />
    </section>
  );
}
