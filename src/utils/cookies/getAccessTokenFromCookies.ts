import { cookies } from "next/headers";

/**
 * @토큰반환_유틸함수
 * ssr 전용
 */
export const getAccessTokenFromCookies = (
  type: "tokenOnly" | "forApiRequest" = "tokenOnly",
) => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value || null;

  if (!token) return {};

  if (type === "tokenOnly") {
    return token;
  } else {
    return `accessToken=${token}`;
  }
};
