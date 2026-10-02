import { z } from 'zod';

export const featuredLinkFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'اسم الرابط / الإعلان يجب أن يكون حرفين على الأقل')
    .max(200, 'الاسم لا يمكن أن يتجاوز 200 حرف'),
  image: z
    .string()
    .trim()
    .min(1, 'يرجى رفع صورة للرابط المميز')
    .url('رابط الصورة غير صالح'),
  url: z
    .string()
    .trim()
    .min(1, 'الرابط مطلوب')
    .url('يجب إدخال رابط URL صالح ومكتمل (مثال: https://...)'),
  badge: z.string().trim().max(50).optional(),
  description: z.string().trim().max(300).optional(),
  ctaText: z.string().trim().max(50).optional(),
  order: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true),
});

export type FeaturedLinkFormValues = z.infer<typeof featuredLinkFormSchema>;
