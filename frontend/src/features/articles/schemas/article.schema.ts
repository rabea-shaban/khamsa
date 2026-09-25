import { z } from 'zod';
import { ContentStatus } from '@/types/api';

export const articleSeoFormSchema = z.object({
  title: z.string().max(100, 'عنوان الـ SEO يجب ألا يتجاوز 100 حرف').optional().or(z.literal('')),
  description: z.string().max(250, 'وصف الـ SEO يجب ألا يتجاوز 250 حرف').optional().or(z.literal('')),
  keywords: z.array(z.string()).default([]),
  canonicalUrl: z.string().url('يجب أن يكون رابطاً صالحاً').optional().or(z.literal('')),
  ogTitle: z.string().max(100, 'عنوان OpenGraph يجب ألا يتجاوز 100 حرف').optional().or(z.literal('')),
  ogDescription: z.string().max(250, 'وصف OpenGraph يجب ألا يتجاوز 250 حرف').optional().or(z.literal('')),
  ogImage: z.string().url('يجب أن يكون رابط صورة صالح').optional().or(z.literal('')),
});

export const articleFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'عنوان المقال يجب ألا يقل عن 3 أحرف')
    .max(200, 'عنوان المقال يجب ألا يتجاوز 200 حرف'),
  slug: z
    .string()
    .trim()
    .max(200, 'الاسم اللطيف (Slug) يجب ألا يتجاوز 200 حرف')
    .optional()
    .or(z.literal('')),
  excerpt: z
    .string()
    .trim()
    .min(10, 'موجز المقال يجب ألا يقل عن 10 أحرف')
    .max(500, 'موجز المقال يجب ألا يتجاوز 500 حرف'),
  content: z.any().refine(val => {
    if (!val) return false;
    if (typeof val === 'object' && Object.keys(val).length > 0) return true;
    if (typeof val === 'string' && val.trim().length > 0) return true;
    return false;
  }, 'محتوى المقال مطلوب'),
  coverImage: z
    .string()
    .url('رابط صورة الغلاف غير صالح')
    .optional()
    .nullable()
    .or(z.literal('')),
  category: z
    .string()
    .trim()
    .min(2, 'يرجى تحديد تصنيف المقال'),
  tags: z.array(z.string().trim()).default([]),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.DRAFT),
  isFeatured: z.boolean().default(false),
  seo: articleSeoFormSchema.optional(),
});

export type ArticleFormValues = z.infer<typeof articleFormSchema>;
