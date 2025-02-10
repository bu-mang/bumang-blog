import SideBar from "@/components/sideBar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-4 gap-x-[1.5vw] px-[10vw]">
      {children}
      <SideBar />
    </section>
  );
}
