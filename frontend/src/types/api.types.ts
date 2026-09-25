export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: Array<{ field?: string; message: string }>;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: Pagination;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR';
  avatar?: string;
  isActive: boolean;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: Record<string, unknown> | string;
  coverImage?: string;
  category: string;
  tags: string[];
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };
  status: 'DRAFT' | 'PUBLISHED';
  isFeatured?: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  _id: string;
  title: string;
  description: string;
  platform: 'YOUTUBE' | 'TIKTOK' | 'FACEBOOK';
  url: string;
  thumbnail?: string;
  status: 'DRAFT' | 'PUBLISHED';
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };
  publishedAt?: string;
  createdAt: string;
}

export interface Settings {
  siteName: string;
  siteDescription: string;
  logo?: string;
  favicon?: string;
  socialLinks: {
    tiktok?: string;
    youtube?: string;
    facebook?: string;
    github?: string;
  };
  defaultSeo: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
}
