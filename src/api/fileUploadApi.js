import axios from "axios";
import {
  getAccessToken,
  isTokenExpired,
  clearTokens,
} from "../services/tokenService";
import { refreshToken } from "./endpoints/auth";

const fileUploadApi = axios.create({
  baseURL: "https://bpsp-api-user.bw-group.cc/v1",
  headers: {
    // "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
  withCredentials: true, // IMPORTANT for refresh cookie
});

// REQUEST interceptor
fileUploadApi.interceptors.request.use(async (config) => {
  // Skip auth endpoints
  if (
    config.url.includes("/auth/login") ||
    config.url.includes("/auth/refresh")
  ) {
    return config;
  }

  let token = getAccessToken();

  if (!token || isTokenExpired()) {
    try {
      // console.log("Refreshing access token...");
      const data = await refreshToken();
      token = data.access_token;
    } catch (err) {
      clearTokens();
      window.location.href = `${window.location.origin}/login`;
      return Promise.reject(err);
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE interceptor
fileUploadApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearTokens();
      window.location.href = `${window.location.origin}/login`;
    }
    return Promise.reject(error);
  }
);

export default fileUploadApi;
