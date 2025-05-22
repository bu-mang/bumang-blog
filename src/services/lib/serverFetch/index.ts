// 서버 컴포넌트에서 사용할 기본 fetch 래퍼
export default async function serverFetch<T>(
  url: string,
  options: RequestInit & { skipAuth?: boolean } = {},
): Promise<T> {
  // skipAuth 옵션 추출 (인증 토큰 포함 여부를 제어)
  const { skipAuth, ...fetchOptions } = options;

  // 사용자 제공 헤더 가져오기 (객체 또는 Headers 인스턴스)
  let headersToUse: Headers;

  if (fetchOptions.headers instanceof Headers) {
    // 사용자가 설정한 헤더가 있고, 이미 Headers의 인스턴스인 경우,
    headersToUse = new Headers(fetchOptions.headers);
  } else if (fetchOptions.headers) {
    // 사용자가 설정한 헤더가 있는 경우,
    headersToUse = new Headers(fetchOptions.headers);
  } else {
    // 사용자가 따로 설정한 헤더가 없는 경우,
    headersToUse = new Headers();
  }

  // cookieStore 가져오기
  // const cookieStore = cookies();

  // /**
  //  * @인증_토큰_설정
  //  */
  // if (!skipAuth) {
  //   // 쿠키 스토어에서 액세스 토큰 가져오기
  //   const accessToken = cookieStore.get("accessToken")?.value;

  //   // 액세스 토큰이 있는 경우에만 설정
  //   if (accessToken) {
  //     // 기존 Cookie 헤더가 있는지 확인
  //     const existingCookie = headersToUse.get("Cookie");

  //     if (existingCookie) {
  //       // 기존 쿠키가 있으면 액세스 토큰 추가
  //       headersToUse.set(
  //         "Cookie",
  //         `${existingCookie}; accessToken=${accessToken}`,
  //       );
  //     } else {
  //       // 기존 쿠키가 없으면 새로 설정
  //       headersToUse.set("Cookie", `accessToken=${accessToken}`);
  //     }
  //   }
  // }

  const finalOptions = { ...fetchOptions, headers: headersToUse };

  finalOptions.credentials = "include";

  /**
   * @초기요청
   */
  let response = await fetch(url, finalOptions);

  // 401 Unauthorized 응답 처리 (토큰 만료)
  if (response.status === 401 && !skipAuth) {
    // 리프레시 토큰으로 새 액세스 토큰 요청
    // const refreshToken = cookieStore.get("refreshToken")?.value;

    console.log("401 Error. It should not be seen in SSR. 🚨");

    // 리프레시 토큰이 없으면 로그인 페이지로 리디렉션
    // 로그인 상태가 완전히 만료되었음을 의미
    // if (!refreshToken) {
    // console.log("refreshToken!");
    // Next.js의 redirect 함수 사용 - 서버 렌더링 중 즉시 리디렉션
    // redirect("/");
    // }
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
