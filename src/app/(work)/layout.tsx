import { LAYOUT_NAV_HEIGHT_MARGIN } from "../_constants/layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={LAYOUT_NAV_HEIGHT_MARGIN}>
      <div className="">{children}</div>
    </section>
  );
}
