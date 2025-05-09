/**
 * @API_CONSTANTS
 */
// API CONSTANTS
import { SERVICES } from "./api";
import { END_POINT } from "./api/endpoint";

/**
 * @LIBRARIES
 */
// TANSTACK QUERY CLIENTS
import {
  clientQueryClient, // CSR fetching
  ServerQueryHydrateBoundary, // SSR Prefetching & Hydrating
} from "./lib/queryClients";

// CLIENT FETCHING (AXIOS_INSTANCE)
import ClientInstance from "./lib/axios";
// SERVER FETCING (SERVERFETCH)
import serverFetch from "./lib/serverFetch";

export {
  // TANSTACK QUERY
  clientQueryClient,
  ServerQueryHydrateBoundary,

  // CLIENT FETCHING
  ClientInstance,
  serverFetch,

  // SERVICES
  END_POINT,
  SERVICES,
};
