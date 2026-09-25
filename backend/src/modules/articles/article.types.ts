import { Document, Types } from 'mongoose';
import { ContentStatus } from '../../types/common.types';

export interface IArticleSeo {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface IArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: Record<string, unknown> | string; // Structured JSON from Tiptap / rich text
  coverImage?: string;
  category: string;
  tags: string[];
  author: Types.ObjectId;
  status: ContentStatus;
  seo: IArticleSeo;
  isFeatured?: boolean;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IArticleDocument extends IArticle, Document {
  _id: Types.ObjectId;
}

export interface CreateArticleInput {
  title: string;
  slug?: string;
  excerpt: string;
  content: Record<string, unknown> | string;
  coverImage?: string;
  category: string;
  tags?: string[];
  status?: ContentStatus;
  isFeatured?: boolean;
  seo?: IArticleSeo;
}

export interface UpdateArticleInput {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: Record<string, unknown> | string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  status?: ContentStatus;
  isFeatured?: boolean;
  seo?: IArticleSeo;
}
