import { SERVICES } from "@/services";
import HeaderInner from "./headerInner";
import { UserResponseType } from "@/types/user";
import { getCookie } from "@/utils/cookies/getCookie";

// 메인페이지 헤더 컴포넌트의 서버 레이어
const Header = async () => {
  const cookies = getCookie({ all: true });
  const token = getCookie({ name: "accessToken" });
  let user: UserResponseType | null = null;

  try {
    // 내부적으로 쿠키 설정도 다 해줌
    const res = await SERVICES.SERVER.getUserProfile(cookies ?? "");
    console.log(res, "res");

    user = res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message, "error message");
    }
  }

  return (
    <HeaderInner isAuthenticated={!!token} nickname={user?.nickname ?? "-"} />
  );
};

export default Header;
