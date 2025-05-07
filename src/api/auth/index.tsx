import { RoleType } from "@/types";
import { END_POINT } from "..";
import API from "../lib/axios";

interface UserProfileProps {
  userId: number;
  email: string;
  role: RoleType;
}

// 유저 정보 불러오기
export const getUserProfile = async () => {
  const res = await API.get<UserProfileProps>(END_POINT.GET_USER_PROFILE);

  return res ?? null;
};

// 엑세스 토큰 재발급
export const postRenewAccessToken = async () => {
  const res = await API.post<UserProfileProps>(
    END_POINT.POST_RENEW_ACCESS_TOKEN,
  );

  return res ?? null;
};
