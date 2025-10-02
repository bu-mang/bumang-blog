import { cn } from "@/utils/cn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={cn("pt-[24vw] md:pt-[20vw] lg:pt-[16vw]")}>
      {children}
    </section>
  );
}
