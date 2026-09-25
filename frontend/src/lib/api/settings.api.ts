import { apiClient } from '../axios/client';
import { ApiResponse, Settings } from '@/types/api';

export const settingsApi = {
  getPublicSettings: async (): Promise<ApiResponse<Settings>> => {
    const res = await apiClient.get<ApiResponse<Settings>>('/public/settings');
    return res.data;
  },

  getAdminSettings: async (): Promise<ApiResponse<Settings>> => {
    const res = await apiClient.get<ApiResponse<Settings>>('/admin/settings');
    return res.data;
  },

  updateSettings: async (data: Partial<Settings>): Promise<ApiResponse<Settings>> => {
    const res = await apiClient.patch<ApiResponse<Settings>>('/admin/settings', data);
    return res.data;
  },
};
