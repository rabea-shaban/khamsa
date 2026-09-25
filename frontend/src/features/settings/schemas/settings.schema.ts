import { z } from 'zod';

export const socialLinksFormSchema = z.object({
  youtube: z.string().url('رابط YouTube غير صحيح').optional().or(z.literal('')),
  tiktok: z.string().url('رابط TikTok غير صحيح').optional().or(z.literal('')),
  facebook: z.string().url('رابط Facebook غير صحيح').optional().or(z.literal('')),
  github: z.string().url('رابط GitHub غير صحيح').optional().or(z.literal('')),
  linkedin: z.string().url('رابط LinkedIn غير صحيح').optional().or(z.literal('')),
  whatsapp: z.string().optional().or(z.literal('')),
  email: z.string().email('بريد إلكتروني غير صحيح').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
});

export const contactFormSchema = z.object({
  email: z.string().email('بريد إلكتروني غير صحيح').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  whatsapp: z.string().optional().or(z.literal('')),
  contactMessage: z.string().max(1000, 'رسالة التواصل طويلة جداً').optional().or(z.literal('')),
});

export const seoFormSchema = z.object({
  title: z.string().max(100, 'عنوان SEO يجب ألا يتجاوز 100 حرف').optional().or(z.literal('')),
  description: z.string().max(300, 'وصف SEO يجب ألا يتجاوز 300 حرف').optional().or(z.literal('')),
  keywords: z.array(z.string()).optional(),
  ogTitle: z.string().max(100).optional().or(z.literal('')),
  ogDescription: z.string().max(300).optional().or(z.literal('')),
  ogImage: z.string().url('رابط صورة OG غير صحيح').optional().or(z.literal('')),
  canonicalUrl: z.string().url('رابط Canonical غير صحيح').optional().or(z.literal('')),
});

export const homepageFormSchema = z.object({
  showHero: z.boolean().default(true),
  showWhyKhamsa: z.boolean().default(true),
  showPhilosophy: z.boolean().default(true),
  showFounder: z.boolean().default(true),
  showServices: z.boolean().default(true),
  showArticles: z.boolean().default(true),
  showVideos: z.boolean().default(true),
  showSocial: z.boolean().default(true),
  showFinalCTA: z.boolean().default(true),
});

export const heroContentFormSchema = z.object({
  heroTitle: z.string().max(150).optional().or(z.literal('')),
  heroSubtitle: z.string().max(200).optional().or(z.literal('')),
  heroDescription: z.string().max(1000).optional().or(z.literal('')),
  primaryButtonText: z.string().max(50).optional().or(z.literal('')),
  primaryButtonUrl: z.string().max(200).optional().or(z.literal('')),
  secondaryButtonText: z.string().max(50).optional().or(z.literal('')),
  secondaryButtonUrl: z.string().max(200).optional().or(z.literal('')),
});

export const aboutContentFormSchema = z.object({
  aboutTitle: z.string().max(150).optional().or(z.literal('')),
  aboutShortDescription: z.string().max(500).optional().or(z.literal('')),
  aboutStory: z.string().max(3000).optional().or(z.literal('')),
  aboutMission: z.string().max(1000).optional().or(z.literal('')),
  aboutVision: z.string().max(1000).optional().or(z.literal('')),
  aboutGoal: z.string().max(1000).optional().or(z.literal('')),
  aboutMessage: z.string().max(500).optional().or(z.literal('')),
});

export const founderFormSchema = z.object({
  founderName: z.string().max(100).optional().or(z.literal('')),
  founderRole: z.string().max(150).optional().or(z.literal('')),
  founderBio: z.string().max(2000).optional().or(z.literal('')),
  founderImage: z.string().url('رابط صورة المؤسس غير صحيح').optional().or(z.literal('')),
  founderLinkedIn: z.string().url('رابط LinkedIn غير صحيح').optional().or(z.literal('')),
  founderGitHub: z.string().url('رابط GitHub غير صحيح').optional().or(z.literal('')),
});

export const footerFormSchema = z.object({
  footerDescription: z.string().max(500).optional().or(z.literal('')),
  footerCopyright: z.string().max(200).optional().or(z.literal('')),
  footerShowSocials: z.boolean().default(true),
  footerShowNavigation: z.boolean().default(true),
});

export const settingsFormSchema = z.object({
  siteName: z
    .string()
    .trim()
    .min(2, 'اسم المنصة يجب أن يحتوي على حرفين على الأقل')
    .max(100, 'اسم المنصة لا يمكن أن يتجاوز 100 حرف'),
  tagline: z.string().trim().max(200).optional().or(z.literal('')),
  siteDescription: z
    .string()
    .trim()
    .min(5, 'الوصف يجب أن يحتوي على 5 أحرف على الأقل')
    .max(1000, 'الوصف لا يمكن أن يتجاوز 1000 حرف'),
  language: z.string().max(10).default('ar'),
  direction: z.enum(['rtl', 'ltr']).default('rtl'),
  timezone: z.string().max(50).default('Africa/Cairo'),
  logo: z.string().url('رابط الشعار غير صحيح').optional().nullable().or(z.literal('')),
  favicon: z.string().url('رابط الأيقونة المفضلة غير صحيح').optional().nullable().or(z.literal('')),
  socialLinks: socialLinksFormSchema,
  contact: contactFormSchema,
  defaultSeo: seoFormSchema,
  homepage: homepageFormSchema,
  hero: heroContentFormSchema,
  about: aboutContentFormSchema,
  founder: founderFormSchema,
  footer: footerFormSchema,
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
