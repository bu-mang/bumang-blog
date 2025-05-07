import { getAccessTokenFromCookies } from "@/utils/cookies/getAccessTokenFromCookies";
import HeaderInner from "./headerInner";
import { getUserProfile } from "@/api/auth";
import { isAxiosError } from "axios";

// 메인페이지 헤더 컴포넌트의 서버 레이어
const Header = async () => {
  const cookie = getAccessTokenFromCookies("tokenOnly");

  let user;

  try {
    user = await getUserProfile();
  } catch (error) {
    // console.log(error, "error header");

    // 401이면 토큰 제거
    if (isAxiosError(error) && error.response?.status === 401) {
      // const cookieStore = await cookies();
      // cookieStore.delete("accessToken");
    }
  }

  return <HeaderInner isAuthenticated={!!cookie} />;
};

export default Header;
