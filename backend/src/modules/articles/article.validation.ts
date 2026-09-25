import { z } from 'zod';
import { ContentStatus } from '../../types/common.types';

export const articleSeoSchema = z
  .object({
    title: z.string().max(100).optional(),
    description: z.string().max(250).optional(),
    keywords: z.array(z.string()).optional(),
    canonicalUrl: z.string().url('Canonical URL must be a valid URL').optional().or(z.literal('')),
    ogTitle: z.string().max(100).optional(),
    ogDescription: z.string().max(250).optional(),
    ogImage: z.string().url('OG Image must be a valid URL').optional().or(z.literal('')),
  })
  .optional();

export const createArticleSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(200),
  slug: z.string().trim().max(200).optional(),
  excerpt: z.string().trim().min(10, 'Excerpt must be at least 10 characters').max(500),
  content: z.union([z.record(z.any()), z.string().min(1, 'Content cannot be empty')]),
  coverImage: z.string().url('Cover image must be a valid URL').optional().nullable(),
  category: z.string().trim().min(2, 'Category must be at least 2 characters'),
  tags: z.array(z.string().trim()).default([]),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.DRAFT),
  isFeatured: z.boolean().default(false),
  seo: articleSeoSchema,
});

export const updateArticleSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(200).optional(),
  slug: z.string().trim().max(200).optional(),
  excerpt: z.string().trim().min(10, 'Excerpt must be at least 10 characters').max(500).optional(),
  content: z.union([z.record(z.any()), z.string().min(1)]).optional(),
  coverImage: z.string().url('Cover image must be a valid URL').optional().nullable(),
  category: z.string().trim().min(2).optional(),
  tags: z.array(z.string().trim()).optional(),
  status: z.nativeEnum(ContentStatus).optional(),
  isFeatured: z.boolean().optional(),
  seo: articleSeoSchema,
});

export const publicArticleQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
  search: z.string().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  featured: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  sort: z.enum(['latest', 'oldest']).default('latest'),
});

export const adminArticleQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  status: z.nativeEnum(ContentStatus).optional(),
  featured: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  sort: z.enum(['latest', 'oldest']).default('latest'),
});

export type CreateArticleDto = z.infer<typeof createArticleSchema>;
export type UpdateArticleDto = z.infer<typeof updateArticleSchema>;
export type PublicArticleQueryDto = z.infer<typeof publicArticleQuerySchema>;
export type AdminArticleQueryDto = z.infer<typeof adminArticleQuerySchema>;
