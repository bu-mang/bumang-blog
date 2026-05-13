import { END_POINTS } from "@/constants/api/endpoints";
import { UserResponseType } from "@/types/user";
import axios from "axios";

const ClientInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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

// 동시에 여러 요청이 401을 받아도 토큰 갱신은 한 번만 (single-flight)
let refreshPromise: Promise<unknown> | null = null;

// 응답 인터셉터
ClientInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (error.config._retry) {
      console.log("토큰 갱신 후에도 401 에러 - 로그인 필요");
      window.location.href = "/";
      return Promise.reject(error);
    }

    try {
      // 재시도 플래그 설정
      error.config._retry = true;

      // 토큰 갱신 - 일반 axios 사용. 진행 중인 갱신이 있으면 그것을 공유한다.
      if (!refreshPromise) {
        refreshPromise = axios
          .post<UserResponseType>(
            (process.env.NEXT_PUBLIC_API_BASE_URL as string) +
              END_POINTS.POST_RENEW_ACCESS_TOKEN,
            {},
            {
              withCredentials: true,
              timeout: 10000,
            },
          )
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;

      return ClientInstance(error.config);
    } catch (refreshError) {
      console.log("토큰 갱신 실패");

      return Promise.reject(error);
    }
  },
);

export default ClientInstance;
