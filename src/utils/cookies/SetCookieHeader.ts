// utils/cookie-relay.ts
import { cookies } from "next/headers";

/**
 * @서버컴포넌트_전용
 * @Set-Cookie 헤더 문자열을 파싱하여 쿠키 객체 배열로 변환
 */
function parseSetCookieHeader(setCookieHeader: string | null): Array<{
  name: string;
  value: string;
  options: Record<string, string | boolean | number | Date | undefined>;
}> {
  if (!setCookieHeader) return [];

  // 여러 쿠키를 분리 (';' 이후 쉼표로 구분된 새 쿠키 시작)
  const cookieStrings = setCookieHeader.split(/,(?=[^\s,;]+=[^;]+)/);

  return cookieStrings.map((cookieStr) => {
    const parts = cookieStr.split(";").map((p) => p.trim());
    const [nameValuePair, ...attributes] = parts;

    // 이름과 값 분리
    const [name, ...valueParts] = nameValuePair.split("=");
    // 값에도 '='가 포함될 수 있으므로 나머지 부분을 다시 결합
    const value = valueParts.join("=");

    // 쿠키 옵션 파싱
    const options: Record<
      string,
      string | boolean | number | Date | undefined
    > = {};

    attributes.forEach((attr) => {
      if (attr.includes("=")) {
        const [attrName, ...attrValueParts] = attr.split("=");
        // 속성값에도 '='가 포함될 수 있으므로 나머지 부분을 다시 결합
        const attrValue = attrValueParts.join("=");

        const key = attrName.toLowerCase().trim();

        // 특수 속성 처리
        if (key === "max-age") {
          options.maxAge = parseInt(attrValue, 10);
        } else if (key === "expires") {
          options.expires = new Date(attrValue);
        } else {
          options[key] = attrValue;
        }
      } else {
        // 값이 없는 속성 (ex: HttpOnly, Secure)
        options[attr.toLowerCase().trim()] = true;
      }
    });

    return {
      name: name.trim(),
      value,
      options,
    };
  });
}

/**
 * 외부 API 응답의 Set-Cookie 헤더를 브라우저에 그대로 설정하는 함수
 * @param setCookieHeader Set-Cookie 헤더 문자열
 * @returns 설정된 쿠키 개수
 */
export function relaySetCookiesToBrowser(
  setCookieHeader: string | null,
): number {
  if (!setCookieHeader) return 0;

  const parsedCookies = parseSetCookieHeader(setCookieHeader);
  const cookiesAPI = cookies();

  let count = 0;

  parsedCookies.forEach(({ name, value, options }) => {
    try {
      cookiesAPI.set({
        name,
        value,
        // 각 속성을 Next.js cookies API 형식으로 변환
        httpOnly: options.httponly === true,
        secure: options.secure === true,
        sameSite: options.samesite as "strict" | "lax" | "none" | undefined,
        path: options.path as string | undefined,
        domain: options.domain as string | undefined,
        maxAge: options.maxAge as number | undefined,
        expires: options.expires as Date | undefined,
      });
      count++;
    } catch (error) {
      console.error(`쿠키 설정 실패 (${name}):`, error);
    }
  });

  return count;
}
