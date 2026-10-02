import { z } from 'zod';

export const createFeaturedLinkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'العنوان يجب أن يكون حرفين على الأقل')
    .max(200, 'العنوان لا يمكن أن يتجاوز 200 حرف'),
  image: z
    .string()
    .trim()
    .url('رابط الصورة غير صالح'),
  url: z
    .string()
    .trim()
    .url('الرابط يجب أن يكون URL صالحاً ومكتملاً (مثال: https://...)'),
  badge: z.string().trim().max(50).optional(),
  description: z.string().trim().max(300).optional(),
  ctaText: z.string().trim().max(50).optional(),
  order: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const updateFeaturedLinkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'العنوان يجب أن يكون حرفين على الأقل')
    .max(200, 'العنوان لا يمكن أن يتجاوز 200 حرف')
    .optional(),
  image: z
    .string()
    .trim()
    .url('رابط الصورة غير صالح')
    .optional(),
  url: z
    .string()
    .trim()
    .url('الرابط يجب أن يكون URL صالحاً ومكتملاً (مثال: https://...)')
    .optional(),
  badge: z.string().trim().max(50).optional(),
  description: z.string().trim().max(300).optional(),
  ctaText: z.string().trim().max(50).optional(),
  order: z.coerce.number().int().optional(),
  isActive: z.boolean().optional(),
});

export const adminFeaturedLinkQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(50),
  search: z.string().optional(),
  isActive: z.enum(['true', 'false', 'all']).optional(),
  sort: z.enum(['order_asc', 'latest', 'oldest']).default('order_asc'),
});

export type CreateFeaturedLinkDto = z.infer<typeof createFeaturedLinkSchema>;
export type UpdateFeaturedLinkDto = z.infer<typeof updateFeaturedLinkSchema>;
export type AdminFeaturedLinkQueryDto = z.infer<typeof adminFeaturedLinkQuerySchema>;
