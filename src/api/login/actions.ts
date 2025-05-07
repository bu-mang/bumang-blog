"use server";

// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import API from "../lib/axios";
import { END_POINT } from "..";
import { cookies } from "next/headers";

export async function postLoginAction(formData: FormData) {
  const email = (formData.get("username") as string).trim();
  const password = (formData.get("password") as string).trim();

  try {
    // Axios 서버 패칭...
    const res = await API.post(END_POINT.POST_LOGIN, {
      email,
      password,
    });

    // 성공 시 res에서 Set-Cookie 헤더 수동 추출
    const setCookieHeader = res.headers["set-cookie"]; // string | string[] | undefined
    if (setCookieHeader && Array.isArray(setCookieHeader)) {
      const accessTokenCookie = setCookieHeader.find((cookieStr) =>
        cookieStr.startsWith("accessToken="),
      );
      const refreshTokenCookie = setCookieHeader.find((cookieStr) =>
        cookieStr.startsWith("refreshToken="),
      );

      console.log(setCookieHeader, "setCookieHeader");

      console.log(refreshTokenCookie, "refreshTokenCookie");

      if (accessTokenCookie && refreshTokenCookie) {
        const accessTokenValue = accessTokenCookie.split(";")[0].split("=")[1];
        cookies().set("accessToken", accessTokenValue, {
          httpOnly: true,
          path: "/",
        });
        const refreshTokenValue = accessTokenCookie.split(";")[0].split("=")[1];
        cookies().set("refreshToken", refreshTokenValue, {
          httpOnly: true,
          path: "/",
        });
      }
    }

    // 성공 시 redirect
    if (res.status === 204) {
      redirect("/");
    }
  } catch (err) {
    throw err;
  }
}
