"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, ShieldAlert } from "lucide-react";

import { useAuthStore } from "@/store/auth";
import { getContentViews, getLoginAttempts } from "@/services/api/audit";
import { ContentView, LoginAttempt } from "@/types/auditLog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PAGE_SIZE = 50;

type TabKey = "login" | "content";

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
  const [tab, setTab] = useState<TabKey>("login");

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-24">
      <div className="mb-1 flex items-center gap-2">
        <ShieldAlert size={22} />
        <h1 className="text-3xl font-semibold">감사 로그</h1>
      </div>
      <p className="mb-6 text-sm text-gray-400">
        위치는 IP 기반 추정이라 대략적입니다.
      </p>

      {/* TABS */}
      <div className="mb-4 flex gap-1 border-b border-gray-100 dark:border-gray-800">
        <TabButton active={tab === "login"} onClick={() => setTab("login")}>
          로그인 시도
        </TabButton>
        <TabButton active={tab === "content"} onClick={() => setTab("content")}>
          콘텐츠 조회
        </TabButton>
      </div>

      {tab === "login" ? <LoginAttemptsPanel /> : <ContentViewsPanel />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100"
          : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
      )}
    >
      {children}
    </button>
  );
}

/**
 * LOGIN ATTEMPTS
 */
function LoginAttemptsPanel() {
  const [pageIndex, setPageIndex] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["login-attempts", pageIndex],
    queryFn: () => getLoginAttempts(pageIndex, PAGE_SIZE),
    placeholderData: (prev) => prev, // 페이지 이동 시 이전 데이터 유지(깜빡임 방지)
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  return (
    <>
      <p className="mb-3 text-sm text-gray-400">
        로그인 시도(성공·실패)를 최근 1,000건까지 기록합니다.
      </p>
      <Panel
        isLoading={isLoading}
        isEmpty={items.length === 0}
        emptyText="아직 기록된 로그인 시도가 없습니다."
      >
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
      </Panel>
      <Pagination
        total={total}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
    </>
  );
}

const FAILURE_LABEL: Record<string, string> = {
  user_not_found: "계정 없음",
  password_mismatch: "비번 불일치",
};

function AttemptRow({ row }: { row: LoginAttempt }) {
  return (
    <TableRow>
      <TableCell className="whitespace-nowrap text-gray-500">
        {formatWhen(row.createdAt)}
      </TableCell>
      <TableCell>
        {row.success ? <Badge tone="green">성공</Badge> : <Badge tone="red">실패</Badge>}
      </TableCell>
      <TableCell className="max-w-[180px] truncate" title={row.email}>
        {row.email}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {formatLocation(row.country, row.city)}
      </TableCell>
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

/**
 * CONTENT VIEWS
 */
function ContentViewsPanel() {
  const [pageIndex, setPageIndex] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["content-views", pageIndex],
    queryFn: () => getContentViews(pageIndex, PAGE_SIZE),
    placeholderData: (prev) => prev,
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  return (
    <>
      <p className="mb-3 text-sm text-gray-400">
        글 상세 조회를 기록합니다. 익명 방문자는 IP로 구분하며, 같은 IP가 같은
        글을 10분 안에 다시 열면 한 줄로 접힙니다. 크롤러는 제외. 보존 기간은
        730일(최대 300만 건).
      </p>
      <Panel
        isLoading={isLoading}
        isEmpty={items.length === 0}
        emptyText="아직 기록된 콘텐츠 조회가 없습니다."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">시각</TableHead>
              <TableHead>결과</TableHead>
              <TableHead>유저</TableHead>
              <TableHead>글</TableHead>
              <TableHead className="whitespace-nowrap">가려진 블록</TableHead>
              <TableHead>위치 (대략)</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>기기</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((row) => (
              <ContentViewRow key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </Panel>
      <Pagination
        total={total}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
    </>
  );
}

/**
 * 익명 방문자 표기. 이메일이 없으니 IP를 붙여 사람을 구분한다 — "익명"만 찍히면
 * 같은 사람의 연속 조회인지 다른 방문자들인지 표에서 알 수 없다.
 */
function AnonymousUser({ ip }: { ip: string | null }) {
  return (
    <>
      익명
      {ip && <span className="ml-1 text-gray-400">({ip})</span>}
    </>
  );
}

function ContentViewRow({ row }: { row: ContentView }) {
  // denied면 제목이 없다(권한이 없어 글을 읽지 못했으므로) — 글 번호로 대체한다.
  const postLabel = row.postTitle ?? `#${row.postId}`;

  return (
    <TableRow>
      <TableCell className="whitespace-nowrap text-gray-500">
        {formatWhen(row.createdAt)}
      </TableCell>
      <TableCell>
        {row.denied ? <Badge tone="red">차단</Badge> : <Badge tone="green">열람</Badge>}
      </TableCell>
      <TableCell
        className="max-w-[180px] truncate"
        title={
          row.userEmail ??
          (row.userId === null
            ? `비로그인 방문자 (IP ${row.ip ?? "미상"})`
            : `userId ${row.userId}`)
        }
      >
        {row.userEmail ??
          (row.userId === null ? (
            <AnonymousUser ip={row.ip} />
          ) : (
            `#${row.userId}`
          ))}
      </TableCell>
      <TableCell className="max-w-[240px] truncate" title={postLabel}>
        {postLabel}
      </TableCell>
      <TableCell className="whitespace-nowrap text-gray-500">
        {row.maskedBlockCount > 0 ? `${row.maskedBlockCount}개` : "—"}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {formatLocation(row.country, row.city)}
      </TableCell>
      <TableCell className="whitespace-nowrap text-gray-500">
        {row.ip ?? "—"}
      </TableCell>
      <TableCell
        className="max-w-[200px] truncate text-gray-500"
        title={row.userAgent ?? undefined}
      >
        {row.userAgent ?? "—"}
      </TableCell>
    </TableRow>
  );
}

/**
 * SHARED
 */
function Panel({
  isLoading,
  isEmpty,
  emptyText,
  children,
}: {
  isLoading: boolean;
  isEmpty: boolean;
  emptyText: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-800">
      {isLoading ? (
        <div className="p-4">
          <Skeleton className="h-64 w-full" />
        </div>
      ) : isEmpty ? (
        <div className="p-12 text-center text-sm text-gray-400">{emptyText}</div>
      ) : (
        children
      )}
    </div>
  );
}

function Pagination({
  total,
  pageIndex,
  setPageIndex,
}: {
  total: number;
  pageIndex: number;
  setPageIndex: (fn: (p: number) => number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mt-4 flex items-center justify-between">
      <span className="text-sm text-gray-400">
        총 {total.toLocaleString("ko-KR")}건 · {pageIndex} / {totalPages} 페이지
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
  );
}

function Badge({
  tone,
  children,
}: {
  tone: "green" | "red";
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium",
        tone === "green"
          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
          : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
      )}
    >
      {children}
    </span>
  );
}

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    dateStyle: "short",
    timeStyle: "medium",
  });
}

function formatLocation(country: string | null, city: string | null) {
  return [country, city].filter(Boolean).join(" · ") || "—";
}
