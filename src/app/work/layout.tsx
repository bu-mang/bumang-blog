import { LAYOUT_PADDING_TOP_WITH_HEIGHT } from "@/constants/layouts/layout";
import { cn } from "@/utils/cn";

export default function WorkLayout({
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
