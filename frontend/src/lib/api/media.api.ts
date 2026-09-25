import { apiClient } from '../axios/client';
import { ApiResponse, PaginatedResult, Media } from '@/types/api';

export interface PresignedUrlPayload {
  filename: string;
  contentType: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif';
  folder?: 'articles' | 'videos' | 'general' | 'settings';
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  publicUrl: string;
  key: string;
  filename: string;
}

export const mediaApi = {
  getMediaList: async (params?: { page?: number; limit?: number; folder?: string; mimeType?: string }): Promise<ApiResponse<PaginatedResult<Media>>> => {
    const res = await apiClient.get<ApiResponse<PaginatedResult<Media>>>('/admin/media', {
      params,
    });
    return res.data;
  },

  uploadFile: async (formData: FormData): Promise<ApiResponse<Media>> => {
    const res = await apiClient.post<ApiResponse<Media>>('/admin/media', formData);
    return res.data;
  },

  getPresignedUrl: async (payload: PresignedUrlPayload): Promise<ApiResponse<PresignedUrlResponse>> => {
    const res = await apiClient.post<ApiResponse<PresignedUrlResponse>>('/admin/media/presigned-url', payload);
    return res.data;
  },

  deleteMedia: async (id: string): Promise<ApiResponse<null>> => {
    const res = await apiClient.delete<ApiResponse<null>>(`/admin/media/${id}`);
    return res.data;
  },
};
