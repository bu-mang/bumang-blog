import { LAYOUT_PADDING_TOP } from "@/constants/layout";
import { cn } from "@/lib/utils";

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const workPageClass = cn(LAYOUT_PADDING_TOP);

  return (
    <section className={workPageClass}>
      <div className="">{children}</div>
    </section>
  );
}
