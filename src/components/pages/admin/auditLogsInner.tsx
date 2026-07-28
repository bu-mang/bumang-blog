"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, ShieldAlert } from "lucide-react";

import { useAuthStore } from "@/store/auth";
import { getLoginAttempts } from "@/services/api/audit";
import { LoginAttempt } from "@/types/auditLog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PAGE_SIZE = 50;

export default function AdminAuditLogsInner() {
  const user = useAuthStore((s) => s.user);
  const isAuthLoading = useAuthStore((s) => s.isAuthLoading);

  if (isAuthLoading) return <FullPageLoader />;
  if (user?.role !== "host") return <Forbidden />;

  return <HostView />;
}

function FullPageLoader() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-24">
      <Skeleton className="mb-4 h-8 w-48" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

function Forbidden() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 text-center">
      <h1 className="mb-3 text-2xl font-semibold">403</h1>
      <p className="text-gray-500">HOST만 접근할 수 있는 페이지입니다.</p>
    </div>
  );
}

function HostView() {
  const [pageIndex, setPageIndex] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["login-attempts", pageIndex],
    queryFn: () => getLoginAttempts(pageIndex, PAGE_SIZE),
    placeholderData: (prev) => prev, // 페이지 이동 시 이전 데이터 유지(깜빡임 방지)
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-24">
      <div className="mb-1 flex items-center gap-2">
        <ShieldAlert size={22} />
        <h1 className="text-3xl font-semibold">로그인 감사 로그</h1>
      </div>
      <p className="mb-6 text-sm text-gray-400">
        로그인 시도(성공·실패)를 최근 1,000건까지 기록합니다. 위치는 IP 기반
        추정이라 대략적입니다.
      </p>

      <div className="rounded-lg border border-gray-100 dark:border-gray-800">
        {isLoading ? (
          <div className="p-4">
            <Skeleton className="h-64 w-full" />
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-400">
            아직 기록된 로그인 시도가 없습니다.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">시각</TableHead>
                <TableHead>결과</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>위치 (대략)</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>기기</TableHead>
                <TableHead>사유</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((row) => (
                <AttemptRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* PAGINATION */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-400">
          총 {total.toLocaleString("ko-KR")}건 · {pageIndex} / {totalPages}{" "}
          페이지
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={pageIndex <= 1}
            onClick={() => setPageIndex((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft size={14} className="mr-1" />
            이전
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={pageIndex >= totalPages}
            onClick={() => setPageIndex((p) => Math.min(totalPages, p + 1))}
          >
            다음
            <ChevronRight size={14} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

const FAILURE_LABEL: Record<string, string> = {
  user_not_found: "계정 없음",
  password_mismatch: "비번 불일치",
};

function AttemptRow({ row }: { row: LoginAttempt }) {
  const when = new Date(row.createdAt).toLocaleString("ko-KR", {
    dateStyle: "short",
    timeStyle: "medium",
  });

  const location =
    [row.country, row.city].filter(Boolean).join(" · ") || "—";

  return (
    <TableRow>
      <TableCell className="whitespace-nowrap text-gray-500">{when}</TableCell>
      <TableCell>
        {row.success ? (
          <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
            성공
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">
            실패
          </span>
        )}
      </TableCell>
      <TableCell className="max-w-[180px] truncate" title={row.email}>
        {row.email}
      </TableCell>
      <TableCell className="whitespace-nowrap">{location}</TableCell>
      <TableCell className="whitespace-nowrap text-gray-500">
        {row.ip ?? "—"}
      </TableCell>
      <TableCell
        className="max-w-[220px] truncate text-gray-500"
        title={row.userAgent ?? undefined}
      >
        {row.userAgent ?? "—"}
      </TableCell>
      <TableCell className="whitespace-nowrap text-gray-500">
        {row.failureReason ? (FAILURE_LABEL[row.failureReason] ?? row.failureReason) : "—"}
      </TableCell>
    </TableRow>
  );
}
