import HeaderInner from "./headerInner";
import { getUserProfile } from "@/services/api/auth";
import { isAxiosError } from "axios";
import { getParsedCookie } from "@/utils/cookies/getCookie";
import { UserResponseType } from "@/types/user";

// 메인페이지 헤더 컴포넌트의 서버 레이어
const Header = async () => {
  const cookie = getParsedCookie("all");
  let user: UserResponseType | null = null;

  try {
    const res = await getUserProfile(cookie ?? "");

    user = res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data, "error header");
    }
    //
  }

  return (
    <HeaderInner isAuthenticated={!!cookie} nickname={user?.nickname ?? "-"} />
  );
};

export default Header;
