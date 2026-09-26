// ============================================
// Core API Enums
// ============================================
export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
}

export enum ContentStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export enum VideoPlatform {
  TIKTOK = 'TIKTOK',
  YOUTUBE = 'YOUTUBE',
  FACEBOOK = 'FACEBOOK',
}

// ============================================
// Response & Pagination Types
// ============================================
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  errors?: Array<{ field?: string; message: string }>;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{ field?: string; message: string }>;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: Pagination;
}

// ============================================
// Domain Entities
// ============================================
export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string | null;
  bio?: string | null;
  isActive: boolean;
  lastLoginAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleSeo {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: Record<string, unknown> | string; // Tiptap structured JSON or HTML string
  coverImage?: string | null;
  category: string;
  tags: string[];
  author: {
    _id: string;
    name: string;
    email?: string;
    avatar?: string | null;
    bio?: string | null;
  };
  status: ContentStatus;
  isFeatured?: boolean;
  seo?: ArticleSeo;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  _id: string;
  title: string;
  description: string;
  platform: VideoPlatform;
  url: string;
  thumbnail?: string | null;
  status: ContentStatus;
  author: {
    _id: string;
    name: string;
    email?: string;
    avatar?: string | null;
    bio?: string | null;
  };
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  _id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  width?: number | null;
  height?: number | null;
  url: string;
  key: string;
  uploadedBy: {
    _id: string;
    name: string;
    avatar?: string | null;
  };
  createdAt: string;
}

export interface SocialLinks {
  tiktok?: string;
  youtube?: string;
  facebook?: string;
  github?: string;
  linkedin?: string;
  whatsapp?: string;
  email?: string;
  phone?: string;
}

export interface ContactSettings {
  email?: string;
  phone?: string;
  whatsapp?: string;
  contactMessage?: string;
}

export interface DefaultSeo {
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export interface HomepageSettings {
  showHero?: boolean;
  showWhyKhamsa?: boolean;
  showPhilosophy?: boolean;
  showFounder?: boolean;
  showServices?: boolean;
  showArticles?: boolean;
  showVideos?: boolean;
  showSocial?: boolean;
  showFinalCTA?: boolean;
}

export interface HeroContent {
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
}

export interface AboutContent {
  aboutTitle?: string;
  aboutShortDescription?: string;
  aboutStory?: string;
  aboutMission?: string;
  aboutVision?: string;
  aboutGoal?: string;
  aboutMessage?: string;
}

export interface FounderSettings {
  founderName?: string;
  founderRole?: string;
  founderBio?: string;
  founderImage?: string;
  founderLinkedIn?: string;
  founderGitHub?: string;
}

export interface FooterSettings {
  footerDescription?: string;
  footerCopyright?: string;
  footerShowSocials?: boolean;
  footerShowNavigation?: boolean;
}

export interface Settings {
  _id?: string;
  siteName: string;
  tagline: string;
  siteDescription: string;
  language: string;
  direction: string;
  timezone: string;
  logo?: string | null;
  favicon?: string | null;
  socialLinks: SocialLinks;
  contact: ContactSettings;
  defaultSeo: DefaultSeo;
  homepage: HomepageSettings;
  hero: HeroContent;
  about: AboutContent;
  founder: FounderSettings;
  footer: FooterSettings;
  createdAt?: string;
  updatedAt?: string;
}
