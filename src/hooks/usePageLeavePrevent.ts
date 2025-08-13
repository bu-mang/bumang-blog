import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useModalStore from "@/store/modal";
import CommonModal from "@/components/modal/type/common";
import { useLocale } from "next-intl";
import { PATHNAME } from "@/constants/routes/pathnameRoutes";

interface UsePageLeavePreventOptions {
  /** 페이지 이탈 방지 활성화 여부 */
  enabled: boolean;
  /** 확인 메시지 (기본값 제공) */
  title?: string;
  /** 확인 메시지 (기본값 제공) */
  desc?: string;
  /** 이탈을 허용할 경로들 (예: ['/login', '/logout']) */
  allowedPaths?: string[];
}

/**
 * 페이지 이탈 방지 훅
 * - 브라우저 뒤로가기/앞으로가기 방지
 * - 새로고침 방지
 * - 탭 닫기 방지
 * - Next.js 라우팅 방지
 */
export function usePageLeavePrevent({
  enabled,
  title,
  desc,
  allowedPaths = [],
}: UsePageLeavePreventOptions) {
  const router = useRouter();
  const isPreventingRef = useRef(false);

  const locale = useLocale();

  useEffect(() => {
    if (!enabled) return;

    isPreventingRef.current = true;

    // 1. 브라우저 새로고침, 탭 닫기 방지
    const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
      if (!isPreventingRef.current) return; // undefined 반환이면 unload로 이어짐

      e.preventDefault(); // preventDefault로 인해 unload가 방지됨.
      return "preventLeave"; // 구형브라우저는 꼭 truthy값을 리턴해줘야 방지됨.
    };

    // 2. 브라우저 뒤로가기/앞으로가기 방지
    const handlePopState = (e: PopStateEvent) => {
      if (!isPreventingRef.current) return;

      const confirmLeave = window.confirm(
        locale === "ko"
          ? "정말 페이지를 벗어나시겠습니까? 저장하지 않은 수정 내역은 사라집니다."
          : "Are you sure you want to leave? Unsaved changes will be lost.",
      );

      if (!confirmLeave) {
        // "아니오" 선택 시만 복원
        return;
      }

      router.replace(PATHNAME.BLOG);
    };

    // 이벤트 리스너 등록
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    window.history.pushState(null, "", window.location.href);

    // cleanup
    return () => {
      isPreventingRef.current = false;
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enabled, title, desc, allowedPaths, router]);

  // 수동으로 이탈 방지 해제하는 함수
  const disablePrevent = () => {
    isPreventingRef.current = false;
  };

  // 수동으로 이탈 방지 활성화하는 함수
  const enablePrevent = () => {
    isPreventingRef.current = true;
  };

  return {
    disablePrevent,
    enablePrevent,
    isEnabled: enabled && isPreventingRef.current,
  };
}
