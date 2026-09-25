import { apiClient } from '../axios/client';
import { ApiResponse, PaginatedResult, Article } from '@/types/api';

export interface ArticleQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
  sort?: 'latest' | 'oldest';
  featured?: boolean;
}

function sanitizeArticlePayload(data: Partial<Article>): Partial<Article> {
  const payload = { ...data };

  // If coverImage is empty string, convert to null so backend validator accepts it
  if (payload.coverImage === '') {
    payload.coverImage = null;
  }

  // Sanitize SEO object
  if (payload.seo) {
    payload.seo = {
      title: payload.seo.title || undefined,
      description: payload.seo.description || undefined,
      keywords: Array.isArray(payload.seo.keywords) ? payload.seo.keywords : [],
      canonicalUrl: payload.seo.canonicalUrl || '',
      ogTitle: payload.seo.ogTitle || undefined,
      ogDescription: payload.seo.ogDescription || undefined,
      ogImage: payload.seo.ogImage || '',
    };
  }

  // If slug is empty or whitespace only, omit it so backend generates from title
  if (payload.slug && payload.slug.trim() === '') {
    delete payload.slug;
  }

  return payload;
}

export const articlesApi = {
  // Public
  getArticles: async (params?: ArticleQueryParams): Promise<ApiResponse<PaginatedResult<Article>>> => {
    const res = await apiClient.get<ApiResponse<PaginatedResult<Article>>>('/public/articles', {
      params,
    });
    return res.data;
  },

  getArticleBySlug: async (slug: string): Promise<ApiResponse<Article>> => {
    const res = await apiClient.get<ApiResponse<Article>>(`/public/articles/${slug}`);
    return res.data;
  },

  // Admin
  getAdminArticles: async (params?: ArticleQueryParams & { status?: string }): Promise<ApiResponse<PaginatedResult<Article>>> => {
    const res = await apiClient.get<ApiResponse<PaginatedResult<Article>>>('/admin/articles', {
      params,
    });
    return res.data;
  },

  getArticleById: async (id: string): Promise<ApiResponse<Article>> => {
    const res = await apiClient.get<ApiResponse<Article>>(`/admin/articles/${id}`);
    return res.data;
  },

  createArticle: async (data: Partial<Article>): Promise<ApiResponse<Article>> => {
    const sanitized = sanitizeArticlePayload(data);
    const res = await apiClient.post<ApiResponse<Article>>('/admin/articles', sanitized);
    return res.data;
  },

  updateArticle: async (id: string, data: Partial<Article>): Promise<ApiResponse<Article>> => {
    const sanitized = sanitizeArticlePayload(data);
    const res = await apiClient.patch<ApiResponse<Article>>(`/admin/articles/${id}`, sanitized);
    return res.data;
  },

  publishArticle: async (id: string): Promise<ApiResponse<Article>> => {
    const res = await apiClient.patch<ApiResponse<Article>>(`/admin/articles/${id}/publish`);
    return res.data;
  },

  unpublishArticle: async (id: string): Promise<ApiResponse<Article>> => {
    const res = await apiClient.patch<ApiResponse<Article>>(`/admin/articles/${id}/unpublish`);
    return res.data;
  },

  deleteArticle: async (id: string): Promise<ApiResponse<null>> => {
    const res = await apiClient.delete<ApiResponse<null>>(`/admin/articles/${id}`);
    return res.data;
  },
};

