import { getAccessTokenFromCookies } from "@/utils/cookies/getAccessTokenFromCookies";
import HeaderInner from "./headerInner";
import { getUserProfile } from "@/api/auth";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { getSerializedCookies } from "@/utils/cookies/getSerializedCookies";

// 메인페이지 헤더 컴포넌트의 서버 레이어
const Header = async () => {
  const cookie = getAccessTokenFromCookies("tokenOnly");
  const cookieHeader = getSerializedCookies();

  // console.log(cookieHeader, "cookieHeadercookieHeader");

  let user;

  try {
    user = await getUserProfile(cookieHeader);
  } catch (error) {
    console.log(error, "error header");
    //
  }

  return <HeaderInner isAuthenticated={!!cookie} />;
};

export default Header;
