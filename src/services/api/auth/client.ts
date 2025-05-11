import { ClientInstance, END_POINTS } from "../..";
import { LoginFormType } from "@/types/schemas";

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
