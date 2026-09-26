import { apiClient } from '../axios/client';
import { ApiResponse } from '@/types/api';

export interface SendContactMessagePayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const contactApi = {
  sendMessage: async (payload: SendContactMessagePayload): Promise<ApiResponse<{ success: boolean; message: string }>> => {
    const res = await apiClient.post<ApiResponse<{ success: boolean; message: string }>>('/public/contact', payload);
    return res.data;
  },
};
