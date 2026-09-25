import { Article, ContentStatus, ArticleSeo, PaginatedResult } from '@/types/api';

export type { Article, ContentStatus, ArticleSeo, PaginatedResult };

export interface ArticleFormData {
  title: string;
  slug?: string;
  excerpt: string;
  content: Record<string, unknown> | string;
  coverImage?: string | null;
  category: string;
  tags: string[];
  status: ContentStatus;
  isFeatured?: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonicalUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };
}

export interface ArticleFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
  status?: ContentStatus;
  sort?: 'latest' | 'oldest';
}
