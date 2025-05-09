/**
 * @API_CONSTANTS
 */
// API CONSTANTS
import { END_POINT, SERVICES } from "./constants";

/**
 * @LIBRARIES
 */
// TANSTACK QUERY CLIENTS
import {
  clientQueryClient, // CSR fetching
  ServerQueryHydrateBoundary, // SSR Prefetching & Hydrating
} from "./lib/queryClients";

// AXIOS INSTANCE
import ClientInstance from "./lib/axios";

export {
  // react-query
  clientQueryClient,
  ServerQueryHydrateBoundary,
  // client fetching
  ClientInstance,
  // services
  END_POINT,
  SERVICES,
};
