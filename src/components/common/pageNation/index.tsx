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
  let isEllipsisRightOn = true;
  let isEllipsisLeftOn = true;

  /**
   * @페이지_갯수_로직
   */
  const arr = [];
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  for (let j = -2; j <= 2; j++) {
    const temp = currentPage + j;

    // 페이지네이션 버튼이 1보다 작거나 최대치보다 높을 수 없도록 예외처리
    if (temp < 1 || temp > totalPages) continue;

    arr.push(temp);
  }

  const lastArg = arr[arr.length - 1];
  if (arr.length < 5 && lastArg !== totalPages) {
    for (let i = arr.length + 1, j = lastArg + 1; i <= 5; i++, j++) {
      arr.push(j);
    }
  } else if (arr.length < 5 && arr[0] !== 1) {
    for (let i = arr.length, j = arr[0] - 1; i < 5; i++, j--) {
      arr.push(j);
    }
  }
  arr.sort();

  if (arr[0] === 1) {
    isEllipsisLeftOn = false;
  }

  if (arr[arr.length - 1] === totalPages) {
    isEllipsisRightOn = false;
  }

  const { updateQuery } = useQueryParams();

  return (
    <Pagination>
      <PaginationContent>
        {/* 이전페이지 */}
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

        {isEllipsisLeftOn && (
          <PaginationItem>
            <PaginationLink href={updateQuery({ pageIndex: `1` })}>
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {isEllipsisLeftOn && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {arr.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              href={updateQuery({ pageIndex: `${page}` })}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {isEllipsisRightOn && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {isEllipsisRightOn && (
          <PaginationItem>
            <PaginationLink href={updateQuery({ pageIndex: `${totalPages}` })}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* 다음페이지 */}
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
