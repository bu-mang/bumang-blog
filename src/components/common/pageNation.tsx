"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/utils/cn";

interface PagenationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

// TODO: 마크업
export const PagenationFallback = () => {
  return <></>;
};

const Pagenation = ({ totalCount, currentPage, pageSize }: PagenationProps) => {
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const { updateQuery } = useQueryParams();

  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "ellipsis",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    ];
  };

  const pages = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={updateQuery({
              pageIndex: `${Math.max(currentPage - 1, 1)}`,
            })}
            className={cn(
              currentPage === 1 && "pointer-events-none opacity-30",
            )}
          />
        </PaginationItem>

        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {typeof page === "number" ? (
              <PaginationLink
                isActive={page === currentPage}
                href={updateQuery({ pageIndex: `${page}` })}
              >
                {page}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={updateQuery({
              pageIndex: `${Math.min(currentPage + 1, totalPages)}`,
            })}
            className={cn(
              totalPages === currentPage && "pointer-events-none opacity-30",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Pagenation;
