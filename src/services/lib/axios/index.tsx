import { postRenewAccessToken } from "@/services/api/auth";
import axios, { AxiosRequestConfig, isAxiosError } from "axios";

/**
 * @직접_서버호출용
 */
const ClientInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // 또는 고정 URL
  baseURL: "http://localhost:3000", // 또는 고정 URL
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// [직접 서버호츌용] 요청 인터셉터
ClientInstance.interceptors.request.use(
  (config) => {
    console.log(config.headers.Cookie, "cookies!!!!!!");

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
ClientInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error("[Response Error]", error.response?.status);

    // 요청 재시도를 위한 토큰 Map 사용
    const requestId = error.config.url + error.config.method;
    const isRetry = tokenRefreshMap.has(requestId);
    const isRefreshRequest = error.config.url?.includes("/auth/refresh");

    if (error.response?.status === 401 && !isRetry && !isRefreshRequest) {
      try {
        tokenRefreshMap.set(requestId, true);

        console.log(error.config.headers?.Cookie, "Cookie Before Renew Token");

        // 갱신
        await postRenewAccessToken(error.config.headers?.Cookie);
        // const newCookie = cookies()
        //   .getAll()
        //   .map((c) => `${c.name}=${c.value}`)
        //   .join("; ");

        // 재요청
        return ClientInstance(error.config);
      } catch (error) {
        tokenRefreshMap.delete(requestId);
        if (
          isAxiosError(error) &&
          error.response?.data.message === "Invalid Refresh token"
        ) {
          console.log(error.config?.data, "error.config?.data");
          return Promise.reject(error);
        }
      } finally {
        // 재시도 후 Map에서 제거
        tokenRefreshMap.delete(requestId);
      }
    }

    return Promise.reject(error);
  },
);

export default ClientInstance;
