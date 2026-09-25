import { z } from 'zod';

export const listMediaQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  folder: z.string().optional(),
  mimeType: z.string().optional(),
});

export const presignedUrlSchema = z.object({
  filename: z.string().trim().min(1, 'Filename is required'),
  contentType: z.enum([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
  ]),
  folder: z.enum(['articles', 'videos', 'general', 'settings']).default('general'),
});

export type ListMediaQueryDto = z.infer<typeof listMediaQuerySchema>;
export type PresignedUrlDto = z.infer<typeof presignedUrlSchema>;
