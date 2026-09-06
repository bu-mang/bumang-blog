// 서버 컴포넌트에서 사용할 기본 fetch 래퍼

import { cookies, headers } from "next/headers";

/**
 * 백엔드로 이어서 넘길 "방문자 신원" 헤더들.
 *
 * SSR에서는 백엔드로 나가는 요청의 출발지가 방문자가 아니라 Next 서버다.
 * 그래서 이 헤더들을 손으로 넘기지 않으면 백엔드의 extractRequestMeta가
 * 방문자 대신 Next 서버를 기록한다 — 감사 로그의 IP·국가·UA가 전부
 * 같은 값으로 굳어버린다(익명 조회 기록을 켜면 특히 치명적이다:
 * 서로 다른 방문자가 IP 하나로 뭉개진다).
 */
const VISITOR_HEADERS = [
  "cf-connecting-ip", // Cloudflare가 붙이는 실제 방문자 IP (백엔드가 최우선으로 읽는다)
  "cf-ipcountry", // 국가 코드
  "x-forwarded-for", // cf 헤더가 없을 때의 폴백 체인
  "user-agent", // 방문자 브라우저 (봇 판별의 유일한 단서)
] as const;

// lib/serverFetch.ts
export default async function serverFetch<T>(
  url: string,
  options: RequestInit & { skipAuth?: boolean } = {},
): Promise<T> {
  const { skipAuth, ...fetchOptions } = options;

  // 헤더 설정
  let headersToUse: Headers;
  if (fetchOptions.headers instanceof Headers) {
    headersToUse = new Headers(fetchOptions.headers);
  } else if (fetchOptions.headers) {
    headersToUse = new Headers(fetchOptions.headers);
  } else {
    headersToUse = new Headers();
  }

  // 방문자 신원 헤더를 그대로 이어 넘긴다(호출부가 명시한 값이 있으면 그쪽 우선).
  // headers()는 요청 스코프 밖(정적 생성 등)에서 던질 수 있으므로 실패해도 그냥 넘어간다.
  try {
    const incoming = headers();
    for (const name of VISITOR_HEADERS) {
      if (headersToUse.has(name)) continue;
      const value = incoming.get(name);
      if (value) headersToUse.set(name, value);
    }
  } catch {
    // 요청 컨텍스트 없음 — 방문자 정보 없이 진행한다.
  }

  // 서버 컴포넌트에서 쿠키 가져오기
  if (!skipAuth) {
    const cookieStore = cookies();

    // 현재 프로젝트에서 사용하는 인증 쿠키 이름만 지정
    const authCookieNames = ["accessToken", "refreshToken"]; // 실제 사용하는 이름으로 변경

    const authCookies = authCookieNames
      .map((name) => {
        const cookie = cookieStore.get(name);
        return cookie ? `${cookie.name}=${cookie.value}` : null;
      })
      .filter(Boolean)
      .join("; ");

    if (authCookies) {
      headersToUse.set("Cookie", authCookies);
    }
  }

  const finalOptions = {
    ...fetchOptions,
    headers: headersToUse,
  };

  // 초기 요청
  let response = await fetch(url, finalOptions);

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = await response.text();
    }

    const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
    (error as any).status = response.status;
    (error as any).statusText = response.statusText;
    (error as any).data = errorData;

    throw error;
  }

  return response.json() as Promise<T>;
}
