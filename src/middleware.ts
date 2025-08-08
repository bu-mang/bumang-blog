import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
import { END_POINTS } from "./services";

// export default createMiddleware(routing);

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // 토큰이 있으면 검증하고 필요시 재발급
  if (accessToken || refreshToken) {
    try {
      // 액세스 토큰 검증 시도
      if (accessToken) {
        await jwtVerify(
          accessToken,
          new TextEncoder().encode(process.env.JWT_SECRET!),
        );
        // 토큰이 유효하면 그냥 진행
      }
    } catch (error) {
      // 액세스 토큰이 만료되었고 리프레시 토큰이 있으면 재발급 시도
      if (refreshToken) {
        try {
          // API 서버에서 토큰 재발급 요청
          const apiBaseUrl =
            process.env.NODE_ENV === "production"
              ? process.env.NEXT_PUBLIC_API_BASE_URL
              : process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;

          const refreshResponse = await fetch(
            `${apiBaseUrl}${END_POINTS.POST_RENEW_ACCESS_TOKEN}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Cookie: `refreshToken=${refreshToken}`, // 리프레시 토큰을 쿠키로 전달
              },
              credentials: "include",
            },
          );

          if (refreshResponse.ok) {
            // Set-Cookie 헤더에서 새로운 accessToken 추출
            const setCookieHeader = refreshResponse.headers.get("set-cookie");

            if (setCookieHeader) {
              // next-intl 미들웨어 실행
              const response = intlMiddleware(request);

              // API 서버에서 받은 Set-Cookie 헤더를 그대로 전달
              response.headers.set("set-cookie", setCookieHeader);

              return response;
            } else {
              // Set-Cookie 헤더가 없으면 응답에서 직접 토큰 파싱 시도
              const data = await refreshResponse.json();

              if (data.accessToken) {
                const response = intlMiddleware(request);

                // 새 토큰을 쿠키에 설정
                response.cookies.set("accessToken", data.accessToken, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "lax",
                  path: "/",
                  maxAge: 15 * 60, // 15분
                });

                return response;
              }
            }
          }

          // 토큰 재발급 실패 시 토큰들 삭제
          console.log("토큰 재발급 실패");
          const response = intlMiddleware(request);
          response.cookies.delete("accessToken");
          response.cookies.delete("refreshToken");
          return response;
        } catch (refreshError) {
          // 리프레시 토큰도 만료됐으면 토큰들 삭제하고 진행
          const response = intlMiddleware(request);
          response.cookies.delete("accessToken");
          response.cookies.delete("refreshToken");
          return response;
        }
      }
    }
  }

  // 토큰이 없거나 검증 완료 후 그대로 진행
  return intlMiddleware(request);
}

export const config = {
  // API 경로 제외하고 모든 경로에 적용
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
