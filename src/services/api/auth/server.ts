import { END_POINTS } from "@/constants/routes/endpoints";
import serverFetch from "@/services/lib/serverFetch";
import { UserResponseType } from "@/types/user";

// 유저 정보 불러오기 (serverFetch)
export const getUserProfile = async (Cookie: string) => {
  const userProfileRes = await serverFetch<UserResponseType>(
    process.env.SERVER_LOCAL_HOST + END_POINTS.GET_USER_PROFILE,
    {
      headers: {
        Cookie,
      },
    },
  );

  return userProfileRes ?? null;
};
