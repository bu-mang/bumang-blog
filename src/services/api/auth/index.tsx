import { UserResponseType } from "@/types/user";
import { END_POINT, serverFetch } from "../..";

// 유저 정보 불러오기 (serverFetch)
export const getUserProfile = async () => {
  const userProfileRes = await serverFetch<UserResponseType>(
    process.env.LOCAL_HOST + END_POINT.GET_USER_PROFILE,
  );

  return userProfileRes ?? null;
};

// 엑세스 토큰 재발급 (client)
// export const postRenewAccessToken = async (cookieHeader: string) => {
//   const userProfileRes = await serverFetch<UserResponseType>(
//     process.env.LOCAL_HOST + END_POINT.POST_RENEW_ACCESS_TOKEN,
//     {
//       method: "POST",
//     },
//   );

//   // const res = await axios.post(
//   //   `http://localhost:3000${END_POINT.POST_RENEW_ACCESS_TOKEN}`,
//   //   {},
//   //   {
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //       Cookie: cookieHeader,
//   //     },
//   //   },
//   // );

//   // console.log(res.data, "postRenewAccessToken launched?");

//   return res.data;
// };

// 엑세스 토큰 재발급 server용은 따로 만들지 않음. serverFetch에 포함.
