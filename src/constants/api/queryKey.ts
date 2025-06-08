export const QUERY_KEY = {
  // USER
  GET_USER_PROFILE: ["GET_USER_PROFILE"],

  // BLOG_DETAIL
  GET_RELATED_POSTS: (id: number | string) => ["RELATED_POSTS", id],
  GET_ADJACENT_POSTS: (id: number | string) => ["ADJACENT_POSTS", id],
} as const;
