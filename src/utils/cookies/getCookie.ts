// utils/cookie-utils.ts
import { cookies } from "next/headers";

/**
 * 서버 컴포넌트에서 쿠키를 안전하게 추출하는 유틸리티 함수
 *
 * @서버컴포넌트_전용
 * @param options 쿠키 추출 옵션
 * @returns 요청한 쿠키 값 또는 쿠키 문자열
 */
export const getCookie = (
  options: {
    name?: string; // 특정 쿠키 이름 (기본값: undefined)
    fallback?: string | null; // 쿠키가 없을 때 반환할 값 (기본값: null)
    all?: boolean; // 모든 쿠키를 문자열로 반환할지 여부 (기본값: false)
    filter?: string[]; // 'all' 사용 시 포함할 쿠키 이름 필터 (기본값: undefined)
    decode?: boolean; // 쿠키 값을 디코딩할지 여부 (기본값: false)
    includeExpired?: boolean; // 만료된 토큰도 포함할지 여부
  } = {},
): string | null => {
  const {
    name = "accessToken",
    fallback = null,
    all = false,
    filter,
    decode = false,
    includeExpired = true, // 기본적으로 만료된 것도 포함
  } = options;

  try {
    const cookieStore = cookies();

    // 모든 쿠키 반환 요청 시
    if (all) {
      let allCookies = cookieStore.getAll();

      // 필터가 제공된 경우 특정 쿠키만 포함
      if (filter && Array.isArray(filter) && filter.length > 0) {
        allCookies = allCookies.filter((cookie) =>
          filter.includes(cookie.name),
        );
      }

      // 쿠키 형식의 문자열로 변환
      return allCookies
        .map(({ name, value }) => {
          const cookieValue = decode ? decodeURIComponent(value) : value;
          return `${name}=${cookieValue}`;
        })
        .join("; ");
    }

    // 특정 쿠키 반환
    const cookie = cookieStore.get(name);

    if (!cookie) {
      return fallback;
    }

    return decode ? decodeURIComponent(cookie.value) : cookie.value;
  } catch (error) {
    console.error(`쿠키 추출 오류 (${name || "all"}):`, error);
    return fallback;
  }
};
