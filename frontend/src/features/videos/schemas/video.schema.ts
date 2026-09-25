import { z } from 'zod';
import { ContentStatus, VideoPlatform } from '@/types/api';
import { isValidPlatformUrl } from '../utils/detectVideoPlatform';

export const videoFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, 'عنوان الفيديو يجب ألا يقل عن 3 أحرف')
      .max(200, 'عنوان الفيديو لا يمكن أن يتجاوز 200 حرف'),
    description: z
      .string()
      .trim()
      .min(5, 'وصف الفيديو يجب ألا يقل عن 5 أحرف')
      .max(2000, 'وصف الفيديو لا يمكن أن يتجاوز 2000 حرف'),
    platform: z.nativeEnum(VideoPlatform, {
      errorMap: () => ({ message: 'يرجى اختيار المنصة' }),
    }),
    url: z
      .string()
      .trim()
      .min(1, 'رابط الفيديو مطلوب')
      .url('يرجى إدخال رابط URL صحيح'),
    thumbnail: z
      .string()
      .trim()
      .url('رابط الصورة المصغرة غير صحيح')
      .optional()
      .nullable()
      .or(z.literal('')),
    status: z.nativeEnum(ContentStatus).default(ContentStatus.DRAFT),
  })
  .superRefine((data, ctx) => {
    if (data.platform && data.url) {
      if (!isValidPlatformUrl(data.platform, data.url)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['url'],
          message: `رابط الفيديو غير متطابق مع منصة ${data.platform}. يرجى إدخال رابط صالح للمنصة المختارة.`,
        });
      }
    }
  });

export type VideoFormValues = z.infer<typeof videoFormSchema>;
