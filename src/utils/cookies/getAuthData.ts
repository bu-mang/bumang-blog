import { getCookie } from "./getCookie";

/**
 * @서버컴포넌트_전용
 * 인증 토큰 쿠키를 추출하는 간편 함수 (getCookie의 래퍼)
 */
export const getAuthToken = (
  type: "accessToken" | "refreshToken" = "accessToken",
  fallback: string | null = null,
): string | null => {
  return getCookie({ name: type, fallback });
};

/**
 * 외부 API 요청을 위한 쿠키 헤더 문자열 생성
 */
export const getApiCookieHeader = (
  cookieNames: string[] = ["accessToken", "refreshToken"],
): string => {
  return getCookie({ all: true, filter: cookieNames }) || "";
};

/**
 * 예시: 특정 인증 관련 쿠키 추출을 위한 조합 함수
 */
export const getAuthData = () => {
  const accessToken = getCookie({ name: "accessToken" });
  const refreshToken = getCookie({ name: "refreshToken" });
  const sessionId = getCookie({ name: "sessionId" });

  return {
    accessToken,
    refreshToken,
    sessionId,
    isLoggedIn: !!accessToken,
  };
};
