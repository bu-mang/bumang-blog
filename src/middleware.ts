import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from 'jose';

// export default createMiddleware(routing);

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // 토큰이 있으면 검증하고 필요시 재발급
  if (accessToken || refreshToken) {
    // try {
    //   // 액세스 토큰 검증 시도
    //   if (accessToken) {
    //     await jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_SECRET!));
    //     // 토큰이 유효하면 그냥 진행
    //   }
    // } catch (error) {
    //   // 액세스 토큰이 만료되었고 리프레시 토큰이 있으면 재발급 시도
    //   if (refreshToken) {
    //     try {
    //       // 리프레시 토큰 검증
    //       const { payload } = await jwtVerify(
    //         refreshToken,
    //         new TextEncoder().encode(process.env.REFRESH_SECRET!)
    //       );
    //       // 새 액세스 토큰 생성
    //       const newAccessToken = await new SignJWT({
    //         userId: payload.userId,
    //         email: payload.email
    //       })
    //         .setProtectedHeader({ alg: 'HS256' })
    //         .setExpirationTime('15m')
    //         .sign(new TextEncoder().encode(process.env.JWT_SECRET!));
    //       // next-intl 미들웨어 실행
    //       const response = intlMiddleware(request);
    //       // 새 토큰을 쿠키에 설정하고 응답 반환
    //       response.cookies.set('accessToken', newAccessToken, {
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV === 'production',
    //         sameSite: 'strict',
    //         maxAge: 15 * 60 // 15분
    //       });
    //       return response;
    //     } catch (refreshError) {
    //       // 리프레시 토큰도 만료됐으면 토큰들 삭제하고 진행
    //       const response = intlMiddleware(request);
    //       response.cookies.delete('accessToken');
    //       response.cookies.delete('refreshToken');
    //       return response;
    //     }
    //   }
    // }
  }

  // 토큰이 없거나 검증 완료 후 그대로 진행
  return intlMiddleware(request);
}

export const config = {
  // API 경로 제외하고 모든 경로에 적용
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
