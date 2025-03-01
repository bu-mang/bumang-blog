import { LAYOUT_PADDING_TOP } from "@/constants/layout";
import { cn } from "@/utils/cn";

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={cn(LAYOUT_PADDING_TOP, "h-fit min-h-full w-full")}>
      <div className="">{children}</div>
    </section>
  );
}
