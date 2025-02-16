import { LAYOUT_PADDING_TOP } from "@/constants/layout";

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={LAYOUT_PADDING_TOP}>
      <div className="">{children}</div>
    </section>
  );
}
