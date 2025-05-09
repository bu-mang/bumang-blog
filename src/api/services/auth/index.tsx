import { UserResponseType } from "@/types/user";
import { END_POINT } from "../..";
import ClientInstance from "../../lib/axios";
import axios from "axios";

// 유저 정보 불러오기 (serverFetch)
export const getUserProfile = async (cookieHeader: string) => {
  const res = await ClientInstance.get<UserResponseType>(
    END_POINT.GET_USER_PROFILE,
    {
      headers: {
        Cookie: cookieHeader,
      },
    },
  );

  return res ?? null;
};

// 엑세스 토큰 재발급 (serverFetch)
export const postRenewAccessToken = async (cookieHeader: string) => {
  const res = await axios.post(
    `http://localhost:3000${END_POINT.POST_RENEW_ACCESS_TOKEN}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    },
  );

  console.log(res.data, "postRenewAccessToken launched?");

  return res.data;
};
