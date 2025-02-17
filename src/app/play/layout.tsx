export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-fit min-h-full w-full">
      <div className="">{children}</div>
    </section>
  );
}
