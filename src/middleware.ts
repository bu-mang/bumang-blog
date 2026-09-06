import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { END_POINTS } from "./services";

const intlMiddleware = createMiddleware(routing);

// Rate Limiting을 위한 메모리 저장소
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// 차단할 봇 목록 (강화)
const blockedBots = [
  "amazonbot",
  "ahrefsbot",
  "semrushbot",
  "dotbot",
  "mj12bot",
  "blexbot",
  "serpstatbot",
  "python-requests",
  "curl/",
  "wget",
  "scrapy",
  "go-http-client",
  "axios/",
  "postman",
  "petalbot", // Huawei search
  "yandexbot", // Russian search
  "baiduspider", // Chinese search
  "bytespider", // TikTok
  "claudebot", // AI crawler
  "gptbot", // OpenAI crawler
  "anthropic-ai", // Anthropic
  "cohere-ai", // Cohere
  "bytedance", // ByteDance
  "meta-externalagent", // Meta AI
  "applebot-extended", // Apple AI training
  "ccbot", // Common Crawl
  "omgili", // Webhose
  "dataforseo", // DataForSEO
  "zoominfobot", // ZoomInfo
];

// 허용할 검증된 봇 (크롤링 속도 제한만 적용)
const verifiedBots = [
  "googlebot",
  "bingbot",
  "slurp",
  "duckduckbot",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
];

// Rate Limiting (사용 한도) 적용 함수
function applyRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): NextResponse | null {
  const now = Date.now();

  if (!requestCounts.has(key)) {
    requestCounts.set(key, { count: 1, resetTime: now + windowMs });
    return null;
  }

  const record = requestCounts.get(key)!;

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return null;
  }

  record.count++;

  if (record.count > limit) {
    console.log(
      `[RATE_LIMIT] Exceeded: ${key} (${record.count}/${limit} requests)`,
    );
    return new NextResponse("Too Many Requests. Please Try Later.", {
      status: 429,
      headers: {
        "Retry-After": String(Math.ceil((record.resetTime - now) / 1000)),
      },
    });
  }

  // 90% 도달 시 경고 로그
  if (record.count === Math.floor(limit * 0.9)) {
    console.log(
      `[RATE_LIMIT] Warning: ${key} approaching limit (${record.count}/${limit})`,
    );
  }

  // 메모리 정리 (1000개 초과 시)
  if (requestCounts.size > 1000) {
    const cutoff = now - windowMs;
    for (const [k, v] of requestCounts.entries()) {
      if (v.resetTime < cutoff) {
        requestCounts.delete(k);
      }
    }
  }

  return null;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 리소스는 Rate Limit 건너뛰기
  const staticExtensions = [
    ".js",
    ".css",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".ico",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
    ".webp",
    ".mp4",
    ".webm",
  ];

  if (staticExtensions.some((ext) => pathname.endsWith(ext))) {
    return intlMiddleware(request);
  }

  // CloudFront를 사용하는 경우 X-Forwarded-For에서 실제 클라이언트 IP 추출
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor
    ? forwardedFor.split(",")[0].trim() // 첫 번째 IP만 사용
    : request.ip || "unknown";

  const userAgent = request.headers.get("user-agent") || "";
  const userAgentLower = userAgent.toLowerCase();
  // 1. 악성 봇 차단
  const isBlockedBot = blockedBots.some((bot) => userAgentLower.includes(bot));

  if (isBlockedBot) {
    console.log(`[BLOCKED] Bot: ${userAgent} from ${ip}`);
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 2. User Agent가 없거나 너무 짧으면 차단
  if (!userAgent || userAgent.length < 10) {
    console.log(`[BLOCKED] Suspicious: Empty/short UA from ${ip}`);
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 3. Rate Limiting 적용 (프로덕션 환경만)
  if (process.env.NODE_ENV === "production") {
    const isVerifiedBot = verifiedBots.some((bot) =>
      userAgentLower.includes(bot),
    );

    let rateLimitResponse: NextResponse | null;

    if (isVerifiedBot) {
      // 검증된 봇: 1분에 200회
      rateLimitResponse = applyRateLimit(ip, 200, 60000);
    } else {
      // 일반 사용자: 1분에 300회
      rateLimitResponse = applyRateLimit(ip, 300, 60000);
    }

    if (rateLimitResponse) {
      return rateLimitResponse;
    }
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET!);

  // ------------------ 토큰 검증 · 재발급 ------------------
  // 보호 경로 인가보다 먼저 한다. 그래야 access 토큰이 만료됐어도 refresh 토큰이 살아 있으면
  // /admin·/blog/edit가 로그인 페이지로 튕기지 않는다.
  //
  // 재발급에 성공하면 새 토큰을 (1) 브라우저에 Set-Cookie로 내려주는 것에 더해
  // (2) **지금 처리 중인 요청의 쿠키에도 바꿔 끼운다**. (2)가 없으면 이번 SSR은 만료된
  // 토큰으로 진행돼 백엔드가 익명 취급하고, 한 시간 만에 처음 여는 페이지가 로그아웃된 것처럼
  // 깜빡였다가 다음 이동부터 정상이 되는 현상이 생긴다. next-intl 미들웨어는 request.headers를
  // 복사해 넘기므로(NextResponse.rewrite({ request: { headers } })) 여기서 바꾼 cookie 헤더가
  // 서버 컴포넌트의 cookies()까지 그대로 전달된다.
  let effectiveAccessToken = accessToken;
  let refreshedSetCookie: string | null = null;
  let shouldClearAuthCookies = false;

  if (accessToken || refreshToken) {
    let accessTokenValid = false;
    if (accessToken) {
      try {
        await jwtVerify(accessToken, jwtSecret);
        accessTokenValid = true;
      } catch {
        // 만료/위조 — 아래에서 refresh 시도
      }
    }

    if (!accessTokenValid && refreshToken) {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
          // 백엔드는 새 accessToken을 Set-Cookie로만 내려준다(본문엔 없음).
          const setCookieHeader = refreshResponse.headers.get("set-cookie");
          const newAccessToken = setCookieHeader?.match(
            /(?:^|,\s*)accessToken=([^;]+)/,
          )?.[1];

          if (setCookieHeader && newAccessToken) {
            refreshedSetCookie = setCookieHeader;
            effectiveAccessToken = newAccessToken;
            // 이번 요청의 cookie 헤더를 새 토큰으로 갱신 → 이어지는 SSR이 곧바로 인증 상태
            request.cookies.set("accessToken", newAccessToken);
          } else {
            console.log("토큰 재발급 응답에 accessToken 쿠키가 없음 — 이번 요청은 만료 토큰으로 진행");
          }
        } else if (refreshResponse.status === 401) {
          // 쿠키를 지우는 건 백엔드가 리프레시 토큰을 명시적으로 거부(401)했을 때뿐이다.
          // 500·502·503·429 같은 응답은 "토큰이 무효하다"가 아니라 "서버에 문제가 있다"라서,
          // 여기서 30일짜리 리프레시 토큰을 버리면 배포 중 컨테이너 교체·nginx 재시작·
          // 레이트리밋에 걸린 것만으로 로그아웃된다(2026-09-06 잦은 로그아웃의 원인 중 하나).
          console.log("토큰 재발급 거부(401) — 쿠키 삭제");
          shouldClearAuthCookies = true;
          effectiveAccessToken = undefined;
        } else {
          console.log(
            `토큰 재발급 실패(HTTP ${refreshResponse.status}) — 서버 문제로 보고 쿠키 유지`,
          );
        }
      } catch (refreshError) {
        // fetch 자체가 실패(연결 거부·타임아웃 등)한 경우도 토큰 무효가 아니다. 쿠키 유지.
        console.log("토큰 재발급 요청 실패(네트워크) — 쿠키 유지", refreshError);
      }
    }
  }

  // 위에서 정한 토큰 상태를 최종 응답에 반영한다(일반 진행·리다이렉트 공통).
  const finalize = (response: NextResponse) => {
    if (refreshedSetCookie) {
      // API 서버에서 받은 Set-Cookie 헤더를 그대로 전달
      response.headers.set("set-cookie", refreshedSetCookie);
    }
    if (shouldClearAuthCookies) {
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
    }
    return response;
  };

  // ------------------ 보호 경로 서버측 인가 ------------------
  // 백엔드 API 가드가 데이터 변경의 실제 경계지만, 보호 페이지 자체의 노출도 서버에서 차단한다.
  {
    const locale =
      pathname.match(/^\/(ko|en)(?=\/|$)/)?.[1] ?? routing.defaultLocale;
    const pathWithoutLocale = pathname.replace(/^\/(ko|en)(?=\/|$)/, "") || "/";
    const isAdminPath =
      pathWithoutLocale === "/admin" ||
      pathWithoutLocale.startsWith("/admin/");
    const isEditPath =
      pathWithoutLocale === "/blog/edit" ||
      pathWithoutLocale.startsWith("/blog/edit");

    if (isAdminPath || isEditPath) {
      let role: string | null = null;
      if (effectiveAccessToken) {
        try {
          const { payload } = await jwtVerify(effectiveAccessToken, jwtSecret);
          role = (payload.role as string) ?? null;
        } catch {
          // 재발급까지 실패한 만료/위조 토큰: 미인증으로 처리
          role = null;
        }
      }

      // 미인증 → 로그인으로
      if (!role) {
        return finalize(
          NextResponse.redirect(new URL(`/${locale}/login`, request.url)),
        );
      }
      // /admin은 host 전용 (그 외 역할은 홈으로)
      if (isAdminPath && role !== "host") {
        return finalize(
          NextResponse.redirect(new URL(`/${locale}`, request.url)),
        );
      }
      // /blog/edit는 인증된 사용자면 역할 무관 통과
    }
  }

  return finalize(intlMiddleware(request));
}

export const config = {
  // API 경로 제외하고 모든 경로에 적용
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
