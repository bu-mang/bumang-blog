import { END_POINTS } from "@/constants/routes/endpoints";
import { UserResponseType } from "@/types/user";
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

// 요청 인터셉터
ClientInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const tokenRefreshMap = new Map<string, boolean>();

// 응답 인터셉터
ClientInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(1, "interceptor response");
    console.error("[Response Error]", error.response?.status);

    const requestId = error.config.url + error.config.method;
    const isRetry = tokenRefreshMap.has(requestId);

    // 토큰 갱신이 필요없는 엔드포인트들
    const excludedPaths = [
      END_POINTS.POST_RENEW_ACCESS_TOKEN,
      END_POINTS.POST_LOGOUT,
    ];

    const isExcludedPath = excludedPaths.some((path) =>
      error.config.url?.includes(path),
    );

    console.log(2, "interceptor response");
    if (error.response?.status === 401 && !isRetry && !isExcludedPath) {
      try {
        console.log(3, "interceptor response");
        tokenRefreshMap.set(requestId, true);

        // 갱신
        await axios.post<UserResponseType>(
          "http://localhost:3000" + END_POINTS.POST_RENEW_ACCESS_TOKEN,
          {},
          {
            withCredentials: true,
          },
        );

        console.log(4, "interceptor response");
        // 재요청
        return ClientInstance(error.config);
      } catch (refreshError) {
        console.log(5, "interceptor response");
        tokenRefreshMap.delete(requestId);

        // refresh token이 만료된 경우
        if (
          isAxiosError(refreshError) &&
          refreshError.response?.data.message === "Invalid Refresh token"
        ) {
          // 로컬 스토리지나 상태 초기화
          // localStorage.removeItem('user');
          // window.location.href = '/login'; // 로그인 페이지로 리다이렉트
          console.log(6, "interceptor response");
          console.log("Refresh token expired, need to login again");
        }

        console.log(7, "interceptor response");
        return Promise.reject(error); // 원래 에러 반환
      }
    }

    console.log(8, "interceptor response");
    return Promise.reject(error);
  },
);

export default ClientInstance;
