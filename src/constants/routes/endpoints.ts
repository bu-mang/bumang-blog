// API END POINT의 분류 팩토리
export const END_POINTS = {
  // AUTH
  POST_LOGIN: "/auth/login",
  POST_LOGOUT: "/auth/logout",
  POST_RENEW_ACCESS_TOKEN: "/auth/refresh",

  // USER
  GET_USER_PROFILE: "/users/me",

  // BLOG
  GET_GROUP_CATEGORY_MENU_TREE: "/categories/groups/menu",
  GET_ALL_TAGS: "/tags",
} as const;
