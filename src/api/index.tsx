// TANSTACK QUERY CLIENTS
import {
  clientQueryClient, // CSR fetching
  ServerQueryHydrateBoundary, // SSR Prefetching & Hydrating
} from "./lib/queryClients";

// Axios Instance
import API from "./lib/axios";

const END_POINT = {
  // AUTH
  POST_LOGIN: "/auth/login",
  POST_RENEW_ACCESS_TOKEN: "/auth/refresh",

  // USER
  GET_USER_PROFILE: "/users/me",
} as const;

export { clientQueryClient, ServerQueryHydrateBoundary, API, END_POINT };
