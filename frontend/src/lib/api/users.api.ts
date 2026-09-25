import { apiClient } from '../axios/client';
import { ApiResponse, PaginatedResult, User, UserRole } from '@/types/api';

export interface UserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  isActive?: boolean;
  sort?: 'latest' | 'oldest' | 'name_asc' | 'name_desc';
}

export interface UserStats {
  total: number;
  admins: number;
  editors: number;
  active: number;
  inactive: number;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  isActive?: boolean;
  avatar?: string | null;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  role?: UserRole;
  isActive?: boolean;
  avatar?: string | null;
  password?: string;
}

export const usersApi = {
  getUsers: async (params?: UserQueryParams): Promise<ApiResponse<PaginatedResult<User>>> => {
    const res = await apiClient.get<ApiResponse<PaginatedResult<User>>>('/admin/users', {
      params,
    });
    return res.data;
  },

  getUserStats: async (): Promise<ApiResponse<UserStats>> => {
    const res = await apiClient.get<ApiResponse<UserStats>>('/admin/users/stats');
    return res.data;
  },

  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const res = await apiClient.get<ApiResponse<User>>(`/admin/users/${id}`);
    return res.data;
  },

  createUser: async (data: CreateUserPayload): Promise<ApiResponse<User>> => {
    const res = await apiClient.post<ApiResponse<User>>('/admin/users', data);
    return res.data;
  },

  updateUser: async (id: string, data: UpdateUserPayload): Promise<ApiResponse<User>> => {
    const res = await apiClient.patch<ApiResponse<User>>(`/admin/users/${id}`, data);
    return res.data;
  },

  changePassword: async (id: string, password: string): Promise<ApiResponse<User>> => {
    const res = await apiClient.patch<ApiResponse<User>>(`/admin/users/${id}/password`, {
      password,
    });
    return res.data;
  },

  toggleStatus: async (id: string): Promise<ApiResponse<User>> => {
    const res = await apiClient.patch<ApiResponse<User>>(`/admin/users/${id}/status`);
    return res.data;
  },

  deleteUser: async (id: string): Promise<ApiResponse<null>> => {
    const res = await apiClient.delete<ApiResponse<null>>(`/admin/users/${id}`);
    return res.data;
  },
};
