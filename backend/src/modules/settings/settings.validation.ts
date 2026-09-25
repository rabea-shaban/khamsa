import { z } from 'zod';

export const socialLinksSchema = z
  .object({
    tiktok: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    youtube: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    facebook: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    github: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    linkedin: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    whatsapp: z.string().optional().or(z.literal('')),
    email: z.string().email('Must be a valid email').optional().or(z.literal('')),
    phone: z.string().optional().or(z.literal('')),
  })
  .optional();

export const contactSchema = z
  .object({
    email: z.string().email('Must be a valid email').optional().or(z.literal('')),
    phone: z.string().optional().or(z.literal('')),
    whatsapp: z.string().optional().or(z.literal('')),
    contactMessage: z.string().max(1000).optional().or(z.literal('')),
  })
  .optional();

export const defaultSeoSchema = z
  .object({
    title: z.string().max(100).optional(),
    description: z.string().max(300).optional(),
    keywords: z.array(z.string()).optional(),
    ogTitle: z.string().max(100).optional().or(z.literal('')),
    ogDescription: z.string().max(300).optional().or(z.literal('')),
    ogImage: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    canonicalUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  })
  .optional();

export const homepageSchema = z
  .object({
    showHero: z.boolean().optional(),
    showWhyKhamsa: z.boolean().optional(),
    showPhilosophy: z.boolean().optional(),
    showFounder: z.boolean().optional(),
    showServices: z.boolean().optional(),
    showArticles: z.boolean().optional(),
    showVideos: z.boolean().optional(),
    showSocial: z.boolean().optional(),
    showFinalCTA: z.boolean().optional(),
  })
  .optional();

export const heroContentSchema = z
  .object({
    heroTitle: z.string().max(150).optional(),
    heroSubtitle: z.string().max(200).optional(),
    heroDescription: z.string().max(1000).optional(),
    primaryButtonText: z.string().max(50).optional(),
    primaryButtonUrl: z.string().max(200).optional(),
    secondaryButtonText: z.string().max(50).optional(),
    secondaryButtonUrl: z.string().max(200).optional(),
  })
  .optional();

export const aboutContentSchema = z
  .object({
    aboutTitle: z.string().max(150).optional(),
    aboutShortDescription: z.string().max(500).optional(),
    aboutStory: z.string().max(3000).optional(),
    aboutMission: z.string().max(1000).optional(),
    aboutVision: z.string().max(1000).optional(),
    aboutGoal: z.string().max(1000).optional(),
    aboutMessage: z.string().max(500).optional(),
  })
  .optional();

export const founderSchema = z
  .object({
    founderName: z.string().max(100).optional(),
    founderRole: z.string().max(150).optional(),
    founderBio: z.string().max(2000).optional(),
    founderImage: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    founderLinkedIn: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    founderGitHub: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  })
  .optional();

export const footerSchema = z
  .object({
    footerDescription: z.string().max(500).optional(),
    footerCopyright: z.string().max(200).optional(),
    footerShowSocials: z.boolean().optional(),
    footerShowNavigation: z.boolean().optional(),
  })
  .optional();

export const updateSettingsSchema = z.object({
  siteName: z.string().trim().min(2, 'Site name must be at least 2 characters').max(100).optional(),
  tagline: z.string().trim().max(200).optional(),
  siteDescription: z
    .string()
    .trim()
    .min(5, 'Site description must be at least 5 characters')
    .max(1000)
    .optional(),
  language: z.string().max(10).optional(),
  direction: z.enum(['rtl', 'ltr']).optional(),
  timezone: z.string().max(50).optional(),
  logo: z.string().url('Logo must be a valid URL').optional().nullable(),
  favicon: z.string().url('Favicon must be a valid URL').optional().nullable(),
  socialLinks: socialLinksSchema,
  contact: contactSchema,
  defaultSeo: defaultSeoSchema,
  homepage: homepageSchema,
  hero: heroContentSchema,
  about: aboutContentSchema,
  founder: founderSchema,
  footer: footerSchema,
});

export type UpdateSettingsDto = z.infer<typeof updateSettingsSchema>;
