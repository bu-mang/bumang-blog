"use server";

// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import API from "../lib/axios";
import { API_ROUTES } from "..";
import { cookies } from "next/headers";

export async function postLoginAction(formData: FormData) {
  const email = (formData.get("username") as string).trim();
  const password = formData.get("password") as string;

  try {
    // Axios 서버 패칭...
    const res = await API.post(API_ROUTES.POST_LOGIN, {
      email,
      password,
    });

    // ✅ Nest의 Set-Cookie 헤더 수동 추출
    const setCookieHeader = res.headers["set-cookie"]; // string | string[] | undefined

    if (setCookieHeader && Array.isArray(setCookieHeader)) {
      const accessTokenCookie = setCookieHeader.find((cookieStr) =>
        cookieStr.startsWith("accessToken="),
      );

      if (accessTokenCookie) {
        const tokenValue = accessTokenCookie.split(";")[0].split("=")[1];
        cookies().set("accessToken", tokenValue, {
          httpOnly: true,
          path: "/",
        });
      }
    }

    // 성공 시
    if (res.status === 204) {
      redirect("/");
    }
  } catch (err) {
    throw err;
  }
}
