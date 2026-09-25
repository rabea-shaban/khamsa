import { apiClient } from '../axios/client';
import { ApiResponse, PaginatedResult, Video, VideoPlatform } from '@/types/api';

export interface VideoQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  platform?: VideoPlatform;
  sort?: 'latest' | 'oldest';
}

export const videosApi = {
  // Public
  getVideos: async (params?: VideoQueryParams): Promise<ApiResponse<PaginatedResult<Video>>> => {
    const res = await apiClient.get<ApiResponse<PaginatedResult<Video>>>('/public/videos', {
      params,
    });
    return res.data;
  },

  getVideoById: async (id: string): Promise<ApiResponse<Video>> => {
    const res = await apiClient.get<ApiResponse<Video>>(`/admin/videos/${id}`);
    return res.data;
  },

  // Admin
  getAdminVideos: async (params?: VideoQueryParams & { status?: string }): Promise<ApiResponse<PaginatedResult<Video>>> => {
    const res = await apiClient.get<ApiResponse<PaginatedResult<Video>>>('/admin/videos', {
      params,
    });
    return res.data;
  },

  createVideo: async (data: Partial<Video>): Promise<ApiResponse<Video>> => {
    const res = await apiClient.post<ApiResponse<Video>>('/admin/videos', data);
    return res.data;
  },

  updateVideo: async (id: string, data: Partial<Video>): Promise<ApiResponse<Video>> => {
    const res = await apiClient.patch<ApiResponse<Video>>(`/admin/videos/${id}`, data);
    return res.data;
  },

  publishVideo: async (id: string): Promise<ApiResponse<Video>> => {
    const res = await apiClient.patch<ApiResponse<Video>>(`/admin/videos/${id}/publish`);
    return res.data;
  },

  unpublishVideo: async (id: string): Promise<ApiResponse<Video>> => {
    const res = await apiClient.patch<ApiResponse<Video>>(`/admin/videos/${id}/unpublish`);
    return res.data;
  },

  deleteVideo: async (id: string): Promise<ApiResponse<null>> => {
    const res = await apiClient.delete<ApiResponse<null>>(`/admin/videos/${id}`);
    return res.data;
  },
};
