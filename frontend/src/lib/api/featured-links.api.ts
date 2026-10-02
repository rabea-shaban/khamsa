import { apiClient } from '../axios/client';
import {
  ApiResponse,
  PaginatedResult,
  FeaturedLink,
  CreateFeaturedLinkInput,
  UpdateFeaturedLinkInput,
} from '@/types/api';

export interface AdminFeaturedLinkQuery {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean | string;
  sort?: 'order_asc' | 'latest' | 'oldest';
}

export const featuredLinksApi = {
  /**
   * Public: Fetch all active featured links (sorted by order ASC)
   */
  getPublicFeaturedLinks: async (): Promise<ApiResponse<FeaturedLink[]>> => {
    const res = await apiClient.get<ApiResponse<FeaturedLink[]>>('/public/featured-links');
    return res.data;
  },

  /**
   * Admin: Fetch all featured links (with filtering/pagination)
   */
  getAdminFeaturedLinks: async (
    params?: AdminFeaturedLinkQuery,
  ): Promise<ApiResponse<PaginatedResult<FeaturedLink>>> => {
    const res = await apiClient.get<ApiResponse<PaginatedResult<FeaturedLink>>>(
      '/admin/featured-links',
      { params },
    );
    return res.data;
  },

  /**
   * Admin: Get single featured link by ID
   */
  getFeaturedLinkById: async (id: string): Promise<ApiResponse<FeaturedLink>> => {
    const res = await apiClient.get<ApiResponse<FeaturedLink>>(`/admin/featured-links/${id}`);
    return res.data;
  },

  /**
   * Admin: Create a new featured link
   */
  createFeaturedLink: async (
    data: CreateFeaturedLinkInput,
  ): Promise<ApiResponse<FeaturedLink>> => {
    const res = await apiClient.post<ApiResponse<FeaturedLink>>('/admin/featured-links', data);
    return res.data;
  },

  /**
   * Admin: Update an existing featured link
   */
  updateFeaturedLink: async (
    id: string,
    data: UpdateFeaturedLinkInput,
  ): Promise<ApiResponse<FeaturedLink>> => {
    const res = await apiClient.patch<ApiResponse<FeaturedLink>>(
      `/admin/featured-links/${id}`,
      data,
    );
    return res.data;
  },

  /**
   * Admin: Toggle active status
   */
  toggleActive: async (id: string): Promise<ApiResponse<FeaturedLink>> => {
    const res = await apiClient.patch<ApiResponse<FeaturedLink>>(
      `/admin/featured-links/${id}/toggle-active`,
    );
    return res.data;
  },

  /**
   * Admin: Delete a featured link
   */
  deleteFeaturedLink: async (id: string): Promise<ApiResponse<null>> => {
    const res = await apiClient.delete<ApiResponse<null>>(`/admin/featured-links/${id}`);
    return res.data;
  },
};
