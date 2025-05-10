import { getUserProfile } from "./auth";
import { postLogin } from "./login";

// API의 분류 팩토리
export const SERVICES = {
  SERVER: {
    getUserProfile,
  },
  CLIENT: {
    postLogin,
  },
};
