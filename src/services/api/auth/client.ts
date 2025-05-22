import { LoginFormType } from "@/types/schemas";
import { UserResponseType } from "@/types/user";
import { END_POINTS } from "@/constants/api/endpoints";
import ClientInstance from "@/services/lib/axios";

// 로그인 (Client)
export async function postLogin(formData: LoginFormType) {
  const { username, password } = formData;

  const res = await ClientInstance.post(END_POINTS.POST_LOGIN, {
    email: username,
    password,
  });

  return res.data;
}

// 로그아웃 (Client)
export async function postLogout() {
  const res = await ClientInstance.post(END_POINTS.POST_LOGOUT, {});

  return res.data;
}

// 유저 정보 불러오기 (Client)
export const getUserProfile = async () => {
  const userProfileRes = await ClientInstance.get<UserResponseType>(
    END_POINTS.GET_USER_PROFILE,
  );

  return userProfileRes.data;
};
