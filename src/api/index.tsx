// TANSTACK QUERY CLIENTS
import {
  clientQueryClient, // CSR fetching
  ServerQueryHydrateBoundary, // SSR Prefetching & Hydrating
} from "./lib/queryClients";

// Axios Instance
import API from "./lib/axios";

const API_ROUTES = {
  POST_LOGIN: "/auth/login",
} as const;

export { clientQueryClient, ServerQueryHydrateBoundary, API, API_ROUTES };
