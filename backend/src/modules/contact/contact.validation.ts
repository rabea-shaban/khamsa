import { z } from 'zod';

export const sendContactMessageSchema = z.object({
  name: z.string().trim().min(2, 'الاسم يجب أن يكون حرفين على الأقل').max(100),
  email: z.string().trim().email('يرجى إدخال بريد إلكتروني صحيح').toLowerCase(),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
  subject: z.string().trim().min(2, 'الموضوع مطلوب').max(200),
  message: z.string().trim().min(5, 'نص الرسالة يجب أن يكون 5 أحرف على الأقل').max(5000),
});
