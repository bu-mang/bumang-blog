// 서버 컴포넌트에서 사용할 기본 fetch 래퍼

import { cookies } from "next/headers";

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
