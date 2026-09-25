import { z } from 'zod';
import { ContentStatus, VideoPlatform } from '../../types/common.types';

export const isValidPlatformUrl = (platform: VideoPlatform, url: string): boolean => {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '');

    switch (platform) {
      case VideoPlatform.YOUTUBE:
        return (
          host === 'youtube.com' ||
          host === 'm.youtube.com' ||
          host === 'youtu.be'
        );
      case VideoPlatform.TIKTOK:
        return host === 'tiktok.com' || host === 'vt.tiktok.com' || host === 'vm.tiktok.com';
      case VideoPlatform.FACEBOOK:
        return (
          host === 'facebook.com' ||
          host === 'm.facebook.com' ||
          host === 'fb.watch' ||
          host === 'web.facebook.com'
        );
      default:
        return false;
    }
  } catch {
    return false;
  }
};

export const createVideoSchema = z
  .object({
    title: z.string().trim().min(3, 'Title must be at least 3 characters').max(200),
    description: z
      .string()
      .trim()
      .min(5, 'Description must be at least 5 characters')
      .max(2000),
    platform: z.nativeEnum(VideoPlatform),
    url: z.string().url('Must be a valid URL'),
    thumbnail: z.string().url('Thumbnail must be a valid URL').optional().nullable(),
    status: z.nativeEnum(ContentStatus).default(ContentStatus.DRAFT),
  })
  .superRefine((data, ctx) => {
    if (!isValidPlatformUrl(data.platform, data.url)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['url'],
        message: `URL does not match selected platform '${data.platform}'. Expected a valid ${data.platform} URL.`,
      });
    }
  });

export const updateVideoSchema = z
  .object({
    title: z.string().trim().min(3, 'Title must be at least 3 characters').max(200).optional(),
    description: z
      .string()
      .trim()
      .min(5, 'Description must be at least 5 characters')
      .max(2000)
      .optional(),
    platform: z.nativeEnum(VideoPlatform).optional(),
    url: z.string().url('Must be a valid URL').optional(),
    thumbnail: z.string().url('Thumbnail must be a valid URL').optional().nullable(),
    status: z.nativeEnum(ContentStatus).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.platform && data.url && !isValidPlatformUrl(data.platform, data.url)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['url'],
        message: `URL does not match selected platform '${data.platform}'. Expected a valid ${data.platform} URL.`,
      });
    }
  });

export const publicVideoQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(1000).default(10),
  search: z.string().optional(),
  platform: z.nativeEnum(VideoPlatform).optional(),
  sort: z.enum(['latest', 'oldest']).default('latest'),
});

export const adminVideoQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  platform: z.nativeEnum(VideoPlatform).optional(),
  status: z.nativeEnum(ContentStatus).optional(),
  sort: z.enum(['latest', 'oldest']).default('latest'),
});

export type CreateVideoDto = z.infer<typeof createVideoSchema>;
export type UpdateVideoDto = z.infer<typeof updateVideoSchema>;
export type PublicVideoQueryDto = z.infer<typeof publicVideoQuerySchema>;
export type AdminVideoQueryDto = z.infer<typeof adminVideoQuerySchema>;
