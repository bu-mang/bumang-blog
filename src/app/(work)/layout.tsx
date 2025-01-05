export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <div className="">{children}</div>
    </section>
  );
}
