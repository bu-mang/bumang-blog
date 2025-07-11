import {
  LAYOUT_PADDING_ALONGSIDE,
  LAYOUT_PADDING_TOP,
} from "@/constants/layouts/layout";
import { cn } from "@/utils/cn";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "grid h-fit grid-cols-10 gap-x-[1.5vw]",
        LAYOUT_PADDING_TOP,
        LAYOUT_PADDING_ALONGSIDE,
      )}
    >
      {children}
    </section>
  );
}
