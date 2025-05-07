import { postRenewAccessToken } from "@/api/auth";
import axios, { AxiosRequestConfig, isAxiosError } from "axios";

/**
 * @API_ROUTES_경유용
 */
export const API_ROUTES = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

/**
 * @직접_서버호출용
 */
const API = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // 또는 고정 URL
  baseURL: "http://localhost:3000", // 또는 고정 URL
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// [직접 서버호츌용] 요청 인터셉터
API.interceptors.request.use(
  (config) => {
    // const { accessToken } = useAuthStore.getState();

    // if (typeof accessToken === "string" && accessToken !== "") {
    //   config.headers.Authorization = `Bearer ${accessToken}`;
    //   console.log(accessToken, "accessToken");
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
const tokenRefreshMap = new Map<string, boolean>();

// 응답 인터셉터
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error("[Response Error]", error.response?.status);

    // 요청 재시도를 위한 토큰 Map 사용
    const requestId = error.config.url + error.config.method;
    const isRetry = tokenRefreshMap.has(requestId);

    if (error.response?.status === 401 && !isRetry) {
      try {
        tokenRefreshMap.set(requestId, true);
        const newAccessToken = await postRenewAccessToken();
        console.log(newAccessToken, "newAccessToken?");
        // 새 토큰으로 Authorization 헤더 갱신
        const newRequest = {
          ...error.config,
          headers: {
            ...error.config.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        };

        // 재요청
        return API(newRequest);
      } catch (error) {
        tokenRefreshMap.delete(requestId);
        if (isAxiosError(error) && error.response?.status === 401) {
          console.log("a");
          return Promise.reject(error);
        }
      } finally {
        // 재시도 후 Map에서 제거
        setTimeout(() => {
          tokenRefreshMap.delete(requestId);
        }, 1000);
      }
    }

    return Promise.reject(error);
  },
);

export default API;
