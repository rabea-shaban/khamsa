import { Document } from 'mongoose';

export interface ISocialLinks {
  tiktok?: string;
  youtube?: string;
  facebook?: string;
  github?: string;
  linkedin?: string;
  whatsapp?: string;
  email?: string;
  phone?: string;
}

export interface IContactSettings {
  email?: string;
  phone?: string;
  whatsapp?: string;
  contactMessage?: string;
}

export interface IDefaultSeo {
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export interface IHomepageSettings {
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

export interface IHeroContent {
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
}

export interface IAboutContent {
  aboutTitle?: string;
  aboutShortDescription?: string;
  aboutStory?: string;
  aboutMission?: string;
  aboutVision?: string;
  aboutGoal?: string;
  aboutMessage?: string;
}

export interface IFounderSettings {
  founderName?: string;
  founderRole?: string;
  founderBio?: string;
  founderImage?: string;
  founderLinkedIn?: string;
  founderGitHub?: string;
}

export interface IFooterSettings {
  footerDescription?: string;
  footerCopyright?: string;
  footerShowSocials?: boolean;
  footerShowNavigation?: boolean;
}

export interface ISettings {
  siteName: string;
  tagline: string;
  siteDescription: string;
  language: string;
  direction: string;
  timezone: string;
  logo?: string;
  favicon?: string;
  socialLinks: ISocialLinks;
  contact: IContactSettings;
  defaultSeo: IDefaultSeo;
  homepage: IHomepageSettings;
  hero: IHeroContent;
  about: IAboutContent;
  founder: IFounderSettings;
  footer: IFooterSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISettingsDocument extends ISettings, Document {}

export interface UpdateSettingsInput {
  siteName?: string;
  tagline?: string;
  siteDescription?: string;
  language?: string;
  direction?: string;
  timezone?: string;
  logo?: string;
  favicon?: string;
  socialLinks?: ISocialLinks;
  contact?: IContactSettings;
  defaultSeo?: IDefaultSeo;
  homepage?: IHomepageSettings;
  hero?: IHeroContent;
  about?: IAboutContent;
  founder?: IFounderSettings;
  footer?: IFooterSettings;
}
