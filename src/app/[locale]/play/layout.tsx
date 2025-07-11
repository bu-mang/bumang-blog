import { LAYOUT_PADDING_TOP_WITH_HEIGHT } from "@/constants/layouts/layout";
import { cn } from "@/utils/cn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play", // 최종 결과: "회사소개 | 사이트명"
};

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(LAYOUT_PADDING_TOP_WITH_HEIGHT, "h-fit min-h-full w-full")}
    >
      <div className="">{children}</div>
    </section>
  );
}
