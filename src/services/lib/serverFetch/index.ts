// lib/api/serverApiClient.ts
// 서버 컴포넌트용 API 클라이언트
import { END_POINT } from "@/services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// 서버 컴포넌트에서 사용할 기본 fetch 래퍼
export async function serverFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  // 쿠키 스토어에서 액세스 토큰 가져오기
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // 기본 헤더 설정 - Headers는 웹 API의 표준 객체
  // new Headers()로 헤더 객체 생성 (브라우저와 Node.js 환경 모두에서 사용 가능)
  const headers = new Headers(options.headers || {});
  // 액세스 토큰이 있으면 쿠키 헤더에 추가
  if (accessToken) {
    // 서버 간 요청에서는 쿠키를 직접 설정해야 함
    headers.set("Cookie", `accessToken=${accessToken}`);
  }

  // 초기 요청
  let response = await fetch(url, {
    ...options,
    headers,
    credentials: "include", // 쿠키 포함
  });

  // 401 Unauthorized 응답 처리 (토큰 만료)
  if (response.status === 401) {
    // 리프레시 토큰으로 새 액세스 토큰 요청
    // 리프레시 토큰도 쿠키 스토어에서 가져옴
    const refreshToken = cookieStore.get("refreshToken")?.value;

    // 리프레시 토큰이 없으면 로그인 페이지로 리디렉션
    // 로그인 상태가 완전히 만료되었음을 의미
    if (!refreshToken) {
      // Next.js의 redirect 함수 사용 - 서버 렌더링 중 즉시 리디렉션
      redirect("/");
    }

    const refreshResponse = await fetch(
      process.env.LOCAL_HOST + END_POINT.POST_RENEW_ACCESS_TOKEN,
      {
        method: "POST",
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
        credentials: "include",
      },
    );

    if (!refreshResponse.ok) {
      // 리프레시 실패 시 메인 페이지로 리디렉션
      redirect("/");
    }

    // 응답 헤더에서 새로 설정된 쿠키 가져오기
    const cookies = refreshResponse.headers.get("set-cookie");

    if (!cookies) {
      redirect("/");
    }

    // 원래 요청 재시도 (새 쿠키 포함)
    response = await fetch(url, {
      ...options,
      headers: {
        ...Object.fromEntries(headers.entries()),
        Cookie: cookies,
      },
      credentials: "include",
    });

    if (response.status === 401) {
      // 여전히 인증 실패면 로그인 페이지로 리디렉션
      redirect("/login");
    }
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
