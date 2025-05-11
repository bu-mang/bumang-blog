import HeaderInner from "./headerInner";
import { UserResponseType } from "@/types/user";
import { getCookie } from "@/utils/cookies/getCookie";
import { getUserProfile } from "@/services/api/auth/server";
import { revalidatePath } from "next/cache";

const Header = async () => {
  /**
   * @헤더컴포넌트의_서버레이어
   */
  const cookies = getCookie({ all: true });
  const token = getCookie({ name: "refreshToken" });
  let user: UserResponseType | null = null;

  try {
    // 내부적으로 쿠키 설정도 다 해줌
    const res = await getUserProfile(cookies ?? "");
    console.log(res, "🏅 getUserProfile");
    console.log(token, "🎖️ token");
    console.log(cookies, "🎖️ cookies");

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
