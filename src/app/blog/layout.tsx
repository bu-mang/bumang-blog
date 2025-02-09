import SideBar from "@/components/sideBar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-4 gap-x-[1.5vw] px-[3vw]">
      {children}
      <SideBar />
    </section>
  );
}
