import { LAYOUT_PADDING_TOP } from "@/constants/layout";
import { cn } from "@/lib/utils";

export default function WorkLayout({
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
