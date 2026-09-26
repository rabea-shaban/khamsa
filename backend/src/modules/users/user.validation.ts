import { z } from 'zod';
import { UserRole } from '../../types/common.types';

export const userSocialsSchema = z
  .object({
    github: z.string().trim().url('Invalid GitHub URL').or(z.literal('')).optional().nullable(),
    linkedin: z.string().trim().url('Invalid LinkedIn URL').or(z.literal('')).optional().nullable(),
    youtube: z.string().trim().url('Invalid YouTube URL').or(z.literal('')).optional().nullable(),
    facebook: z.string().trim().url('Invalid Facebook URL').or(z.literal('')).optional().nullable(),
    twitter: z.string().trim().url('Invalid Twitter/X URL').or(z.literal('')).optional().nullable(),
    tiktok: z.string().trim().url('Invalid TikTok URL').or(z.literal('')).optional().nullable(),
    website: z.string().trim().url('Invalid Website URL').or(z.literal('')).optional().nullable(),
  })
  .optional()
  .nullable();

export const createUserSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Invalid email address').toLowerCase(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  role: z.nativeEnum(UserRole).default(UserRole.EDITOR),
  avatar: z.string().url('Avatar must be a valid URL').or(z.literal('')).optional().nullable(),
  bio: z.string().trim().max(1000, 'Bio cannot exceed 1000 characters').optional().nullable(),
  socials: userSocialsSchema,
  isActive: z.boolean().default(true),
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100).optional(),
  email: z.string().trim().email('Invalid email address').toLowerCase().optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .optional(),
  role: z.nativeEnum(UserRole).optional(),
  avatar: z.string().url('Avatar must be a valid URL').or(z.literal('')).optional().nullable(),
  bio: z.string().trim().max(1000, 'Bio cannot exceed 1000 characters').optional().nullable(),
  socials: userSocialsSchema,
  isActive: z.boolean().optional(),
});

export const changeUserPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
  isActive: z.enum(['true', 'false']).transform(val => val === 'true').optional(),
  sort: z.enum(['latest', 'oldest', 'name_asc', 'name_desc']).default('latest').optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type ChangeUserPasswordDto = z.infer<typeof changeUserPasswordSchema>;
export type ListUsersQueryDto = z.infer<typeof listUsersQuerySchema>;
