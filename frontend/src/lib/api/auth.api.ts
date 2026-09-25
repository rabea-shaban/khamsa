import { apiClient } from '../axios/client';
import { ApiResponse, User } from '@/types/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponseData {
  user: User;
  accessToken: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponseData>> => {
    const res = await apiClient.post<ApiResponse<AuthResponseData>>('/auth/login', credentials);
    return res.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const res = await apiClient.post<ApiResponse<null>>('/auth/logout');
    return res.data;
  },

  refresh: async (): Promise<ApiResponse<AuthResponseData>> => {
    const res = await apiClient.post<ApiResponse<AuthResponseData>>('/auth/refresh');
    return res.data;
  },

  me: async (): Promise<ApiResponse<User>> => {
    const res = await apiClient.get<ApiResponse<User>>('/auth/me');
    return res.data;
  },
};
