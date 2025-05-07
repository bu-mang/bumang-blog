import { RoleType } from "@/types";
import { END_POINT } from "..";
import API from "../lib/axios";

interface UserProfileProps {
  userId: number;
  email: string;
  role: RoleType;
}

// 유저 정보 불러오기
export const getUserProfile = async (cookieHeader: string) => {
  console.log(cookieHeader, "cookieHeadercookieHeader");

  const res = await API.get<UserProfileProps>(END_POINT.GET_USER_PROFILE, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res ?? null;
};

// 엑세스 토큰 재발급
export const postRenewAccessToken = async (cookieHeader: string) => {
  const res = await API.post<UserProfileProps>(
    END_POINT.POST_RENEW_ACCESS_TOKEN,
    {},
    {
      headers: {
        Cookie: cookieHeader,
      },
    },
  );

  return res ?? null;
};
