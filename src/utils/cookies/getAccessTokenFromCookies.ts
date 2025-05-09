import { cookies } from "next/headers";

/**
 * @토큰반환_유틸함수
 * ssr 전용
 */
export const getParsedCookie = (
  type: "accessToken" | "refreshToken" | "all" = "accessToken",
) => {
  const cookieStore = cookies();
  if (type === "all") {
    return cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");
  } else {
    const token = cookieStore.get(type)?.value || null;
    return token;
  }
};
