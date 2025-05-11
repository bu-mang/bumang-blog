/**
 * @API_CONSTANTS
 */
// API CONSTANTS

import { END_POINTS } from "../constants/routes/endpoints";

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

export {
  // TANSTACK QUERY
  clientQueryClient,
  ServerQueryHydrateBoundary,

  // CLIENT FETCHING
  ClientInstance,

  // SERVICES
  END_POINTS,
};
