import { z } from 'zod';
import { UserRole } from '@/types/api';

export const createUserFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'الاسم يجب أن يكون حرفين على الأقل')
      .max(100, 'الاسم لا يمكن أن يتجاوز 100 حرف'),
    email: z
      .string()
      .trim()
      .email('يرجى إدخال بريد إلكتروني صحيح')
      .toLowerCase(),
    password: z
      .string()
      .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
      .regex(/[A-Z]/, 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل (A-Z)')
      .regex(/[a-z]/, 'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل (a-z)')
      .regex(/[0-9]/, 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل (0-9)'),
    confirmPassword: z.string().min(1, 'يرجى تأكيد كلمة المرور'),
    role: z.nativeEnum(UserRole, {
      errorMap: () => ({ message: 'يرجى اختيار دور صحيح (ADMIN أو EDITOR)' }),
    }),
    isActive: z.boolean().default(true),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

export const editUserFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'الاسم يجب أن يكون حرفين على الأقل')
    .max(100, 'الاسم لا يمكن أن يتجاوز 100 حرف'),
  email: z
    .string()
    .trim()
    .email('يرجى إدخال بريد إلكتروني صحيح')
    .toLowerCase(),
  role: z.nativeEnum(UserRole, {
    errorMap: () => ({ message: 'يرجى اختيار دور صحيح' }),
  }),
  isActive: z.boolean().default(true),
});

export const changePasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, 'كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل')
      .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير واحد على الأقل (A-Z)')
      .regex(/[a-z]/, 'يجب أن تحتوي على حرف صغير واحد على الأقل (a-z)')
      .regex(/[0-9]/, 'يجب أن تحتوي على رقم واحد على الأقل (0-9)'),
    confirmPassword: z.string().min(1, 'يرجى تأكيد كلمة المرور الجديدة'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

export type CreateUserFormValues = z.infer<typeof createUserFormSchema>;
export type EditUserFormValues = z.infer<typeof editUserFormSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;
