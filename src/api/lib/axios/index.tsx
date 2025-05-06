import { useAuthStore } from "@/store/auth";
import axios from "axios";

const API = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // 또는 고정 URL
  baseURL: "http://localhost:3000", // 또는 고정 URL
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
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

// 응답 인터셉터
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("[Response Error]", error.response?.status);
    return Promise.reject(error);
  },
);

export default API;
