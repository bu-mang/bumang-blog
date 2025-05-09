// API END POINT의 분류 팩토리
export const END_POINT = {
  // AUTH
  POST_LOGIN: "/auth/login",
  POST_RENEW_ACCESS_TOKEN: "/auth/refresh",

  // USER
  GET_USER_PROFILE: "/users/me",
} as const;

// API의 분류 팩토리
export const SERVICES = {
  SERVER: {
    //
  },
  CLIENT: {
    //
  },
};
