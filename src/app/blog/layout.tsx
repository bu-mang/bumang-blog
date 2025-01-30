import FilterBar from "@/components/tabFilterBar";

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <FilterBar />
      <div className="">{children}</div>
    </section>
  );
}
