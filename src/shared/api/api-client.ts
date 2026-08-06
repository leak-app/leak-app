import { useAuthStore } from '@/entities/auth';
import axios from 'axios';

const baseURL =
  import.meta.env.VITE_BASE_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface PendingRequest {
  resolve: (value: string | null) => void;
  reject: (reason: any) => void;
}

let isRefreshing = false;
let failedQueue: PendingRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Inject JWT header
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle expired tokens
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      const isAuthUrl =
        originalRequest.url?.includes('/auth/sign-in') ||
        originalRequest.url?.includes('/auth/sign-up') ||
        originalRequest.url?.includes('/auth/google-sign-in') ||
        originalRequest.url?.includes('/auth/refresh-token');

      // Do not try to refresh token for credential auth requests
      if (isAuthUrl) {
        return Promise.reject(error.response?.data || error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            },
            reject: (err) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Request new access token using standard axios call to bypass interceptors
        const refreshResponse = await axios.post<{
          data: { accessToken: string };
        }>(`${baseURL}/auth/refresh-token`, {}, { withCredentials: true });

        const newAccessToken = refreshResponse.data.data.accessToken;

        // Set the new access token in our store
        useAuthStore.getState().setAccessToken(newAccessToken);

        // Process any queued requests
        processQueue(null, newAccessToken);

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().logout();
        return Promise.reject(error.response?.data || error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error.response?.data || error);
  }
);
