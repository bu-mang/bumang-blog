// lib/api/serverApiClient.ts
// 서버 컴포넌트용 API 클라이언트
import { END_POINTS } from "@/services";
import { relaySetCookiesToBrowser } from "@/utils/cookies/SetCookieHeader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// 서버 컴포넌트에서 사용할 기본 fetch 래퍼
export default async function serverFetch<T>(
  url: string,
  options: RequestInit & { skipAuth?: boolean } = {},
): Promise<T> {
  console.log(1, url, "serverFetch");
  // skipAuth 옵션 추출 (인증 토큰 포함 여부를 제어)
  const { skipAuth, ...fetchOptions } = options;

  console.log(2, url, "serverFetch");
  // 사용자 제공 헤더 가져오기 (객체 또는 Headers 인스턴스)
  let headersToUse: Headers;

  console.log(3, url, "serverFetch");
  if (fetchOptions.headers instanceof Headers) {
    // 사용자가 설정한 헤더가 있고, 이미 Headers의 인스턴스인 경우,
    console.log(4, url, "serverFetch");
    headersToUse = new Headers(fetchOptions.headers);
  } else if (fetchOptions.headers) {
    // 사용자가 설정한 헤더가 있는 경우,
    console.log(5, url, "serverFetch");
    headersToUse = new Headers(fetchOptions.headers);
  } else {
    console.log(6, url, "serverFetch");
    // 사용자가 따로 설정한 헤더가 없는 경우,
    headersToUse = new Headers();
  }

  console.log(7, url, "serverFetch");
  // cookieStore 가져오기
  const cookieStore = cookies();

  // 인증 토큰 설정 (skipAuth가 true가 아닌 경우)
  if (!skipAuth) {
    console.log(8, url, "serverFetch");
    // 쿠키 스토어에서 액세스 토큰 가져오기
    const accessToken = cookieStore.get("accessToken")?.value;
    console.log(accessToken, "accessToken");

    // 액세스 토큰이 있는 경우에만 설정
    if (accessToken) {
      console.log(9, url, "serverFetch");
      // 기존 Cookie 헤더가 있는지 확인
      const existingCookie = headersToUse.get("Cookie");

      if (existingCookie) {
        console.log(10, url, "serverFetch");
        // 기존 쿠키가 있으면 액세스 토큰 추가
        headersToUse.set(
          "Cookie",
          `${existingCookie}; accessToken=${accessToken}`,
        );
      } else {
        console.log(11, url, "serverFetch");
        // 기존 쿠키가 없으면 새로 설정
        headersToUse.set("Cookie", `accessToken=${accessToken}`);
      }
    }
  }

  console.log(12, url, "serverFetch");
  // 헤더를 제외한 다른 옵션들을 복사
  const finalOptions = { ...fetchOptions, headers: headersToUse };

  // 쿠키 포함 설정 강제 적용 (사용자가 다른 값을 지정해도 무시)
  finalOptions.credentials = "include";

  // 초기 요청
  let response = await fetch(url, finalOptions);

  // 401 Unauthorized 응답 처리 (토큰 만료)
  if (response.status === 401 && !skipAuth) {
    console.log(13, url, "serverFetch");
    // 리프레시 토큰으로 새 액세스 토큰 요청
    const refreshToken = cookieStore.get("refreshToken")?.value;

    // 리프레시 토큰이 없으면 로그인 페이지로 리디렉션
    // 로그인 상태가 완전히 만료되었음을 의미
    if (!refreshToken) {
      console.log(14, url, "serverFetch");
      // Next.js의 redirect 함수 사용 - 서버 렌더링 중 즉시 리디렉션
      redirect("/");
    }

    console.log(15, url, "serverFetch");
    const refreshResponse = await fetch(
      process.env.LOCAL_HOST + END_POINTS.POST_RENEW_ACCESS_TOKEN,
      {
        method: "POST",
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
        // "include" | "same-origin" | "omit"
        credentials: "include", // axios의 withCredentials: true와 동일
      },
    );

    console.log(16, url, "serverFetch");
    if (!refreshResponse.ok) {
      // 리프레시 실패 시 메인 페이지로 리디렉션
      console.log(17, url, "serverFetch");
      redirect("/");
    }

    console.log(18, url, "serverFetch");
    const setCookieHeader = refreshResponse.headers.get("set-cookie");

    if (!setCookieHeader) {
      console.log(19, url, "serverFetch");
      redirect("/");
    }

    console.log(20, url, "serverFetch");
    // 원래 요청 재시도 (새 쿠키 포함)
    // 사용자 제공 헤더를 유지하면서 새 쿠키 추가
    const retryHeaders = new Headers(headersToUse);
    retryHeaders.set("Cookie", setCookieHeader);

    response = await fetch(url, {
      ...finalOptions,
      headers: retryHeaders,
    });

    if (response.status === 401) {
      console.log(21, url, "serverFetch");
      // 여전히 인증 실패면 루트 페이지로 리디렉션
      redirect("/");
    }
  }

  console.log(22, url, "serverFetch");
  if (!response.ok) {
    console.log(23, url, "serverFetch");
    throw new Error(`API error: ${response.status}`);
  }

  console.log(24, url, "serverFetch");
  const setCookieHeader = response.headers.get("set-cookie");
  console.log(setCookieHeader, "setCookieHeader");
  if (setCookieHeader) {
    console.log(25, url, "serverFetch");
    const cookieCount = relaySetCookiesToBrowser(setCookieHeader);
    if (cookieCount > 0) {
      console.log(26, url, "serverFetch");
      console.debug(`${cookieCount}개의 쿠키가 설정되었습니다.`);
    }
  }

  console.log(27, url, "serverFetch");
  return response.json() as Promise<T>;
}
