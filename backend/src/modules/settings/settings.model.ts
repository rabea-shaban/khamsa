import { Schema, model } from 'mongoose';
import { ISettingsDocument } from './settings.types';

const socialLinksSchema = new Schema(
  {
    tiktok: { type: String, trim: true, default: '' },
    youtube: { type: String, trim: true, default: '' },
    facebook: { type: String, trim: true, default: '' },
    github: { type: String, trim: true, default: '' },
    linkedin: { type: String, trim: true, default: '' },
    whatsapp: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
  },
  { _id: false },
);

const contactSchema = new Schema(
  {
    email: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    whatsapp: { type: String, trim: true, default: '' },
    contactMessage: { type: String, trim: true, default: '' },
  },
  { _id: false },
);

const defaultSeoSchema = new Schema(
  {
    title: { type: String, trim: true, default: 'خمسة برمجة بالبلدي' },
    description: {
      type: String,
      trim: true,
      default: 'منصة خمسة برمجة بالبلدي للمقالات البرمجية والفيديوهات التعليمية المبسطة',
    },
    keywords: {
      type: [String],
      default: ['برمجة', 'javascript', 'typescript', 'web development', 'خمسة برمجة'],
    },
    ogTitle: { type: String, trim: true, default: '' },
    ogDescription: { type: String, trim: true, default: '' },
    ogImage: { type: String, trim: true, default: '' },
    canonicalUrl: { type: String, trim: true, default: '' },
  },
  { _id: false },
);

const homepageSchema = new Schema(
  {
    showHero: { type: Boolean, default: true },
    showWhyKhamsa: { type: Boolean, default: true },
    showPhilosophy: { type: Boolean, default: true },
    showFounder: { type: Boolean, default: true },
    showServices: { type: Boolean, default: true },
    showArticles: { type: Boolean, default: true },
    showVideos: { type: Boolean, default: true },
    showSocial: { type: Boolean, default: true },
    showFinalCTA: { type: Boolean, default: true },
  },
  { _id: false },
);

const heroContentSchema = new Schema(
  {
    heroTitle: { type: String, trim: true, default: 'خمسة برمجة بالبلدي' },
    heroSubtitle: { type: String, trim: true, default: 'افهمها بالبلدي.. اكتبها بالكود.' },
    heroDescription: {
      type: String,
      trim: true,
      default:
        'منصة عربية لتبسيط البرمجة والتكنولوجيا، نشرح فيها الفكرة قبل الكود، ونحوّل المفاهيم المعقدة إلى محتوى واضح وعملي يساعدك تتعلم وتطبّق وتطوّر نفسك.',
    },
    primaryButtonText: { type: String, trim: true, default: 'اكتشف المقالات' },
    primaryButtonUrl: { type: String, trim: true, default: '/articles' },
    secondaryButtonText: { type: String, trim: true, default: 'شاهد المحتوى' },
    secondaryButtonUrl: { type: String, trim: true, default: '/videos' },
  },
  { _id: false },
);

const aboutContentSchema = new Schema(
  {
    aboutTitle: { type: String, trim: true, default: 'من نحن؟' },
    aboutShortDescription: {
      type: String,
      trim: true,
      default: 'بدأت بفكرة بسيطة... إن البرمجة ممكن تتفهم بشكل أبسط.',
    },
    aboutStory: {
      type: String,
      trim: true,
      default:
        'ليه ناس كتير عندها الرغبة الحقيقية تتعلم البرمجة، لكن أول ما تبدأ تواجه مصطلحات معقدة وشروحات طويلة ومحتوى مش مناسب لطريقة تفكيرها؟ من هنا بدأت الفكرة: ليه ما نشرحش البرمجة بطريقة بسيطة، من غير ما نبسطها لدرجة تفقد قيمتها وعمقها الهندسي؟',
    },
    aboutMission: {
      type: String,
      trim: true,
      default: 'تقديم محتوى تقني عربي عالي الجودة يركز على الفهم العميق للأساسيات قبل كتابة الكود.',
    },
    aboutVision: {
      type: String,
      trim: true,
      default:
        'بناء جيل من المطورين العرب يمتلكون عقلية التفكير الهندسي السليم والقدرة على حل المشكلات.',
    },
    aboutGoal: {
      type: String,
      trim: true,
      default:
        'مساعدة كل مبرمج عربي على الانتقال من مرحلة الحفظ والتقليد إلى مرحلة الفهم والابتكار.',
    },
    aboutMessage: {
      type: String,
      trim: true,
      default: '«مش هنخلي البرمجة سهلة... هنخلي فهمها أسهل.»',
    },
  },
  { _id: false },
);

const founderSchema = new Schema(
  {
    founderName: { type: String, trim: true, default: 'ربيع شعبان' },
    founderRole: {
      type: String,
      trim: true,
      default: 'Full Stack Software Engineer & Content Creator',
    },
    founderBio: {
      type: String,
      trim: true,
      default:
        'مهندس برمجيات ومطور شغوف بتبسيط مفاهيم البرمجة وهندسة البرمجيات باللغة العربية بأسلوب عملي يركز على الفهم والتطبيق.',
    },
    founderImage: { type: String, trim: true, default: '' },
    founderLinkedIn: { type: String, trim: true, default: 'https://linkedin.com' },
    founderGitHub: { type: String, trim: true, default: 'https://github.com' },
  },
  { _id: false },
);

const footerSchema = new Schema(
  {
    footerDescription: {
      type: String,
      trim: true,
      default: 'افهمها بالبلدي.. اكتبها بالكود. منصة عربية لتبسيط علوم الحاسب وهندسة البرمجيات.',
    },
    footerCopyright: {
      type: String,
      trim: true,
      default: '© 2026 خمسة برمجة بالبلدي. جميع الحقوق محفوظة.',
    },
    footerShowSocials: { type: Boolean, default: true },
    footerShowNavigation: { type: Boolean, default: true },
  },
  { _id: false },
);

const settingsSchema = new Schema<ISettingsDocument>(
  {
    siteName: {
      type: String,
      required: [true, 'Site name is required'],
      trim: true,
      default: 'خمسة برمجة بالبلدي',
    },
    tagline: {
      type: String,
      trim: true,
      default: 'افهمها بالبلدي.. اكتبها بالكود.',
    },
    siteDescription: {
      type: String,
      required: [true, 'Site description is required'],
      trim: true,
      default: 'منصة المحتوى التقني والبرمجي باللغة العربية البسيطة',
    },
    language: {
      type: String,
      trim: true,
      default: 'ar',
    },
    direction: {
      type: String,
      trim: true,
      default: 'rtl',
    },
    timezone: {
      type: String,
      trim: true,
      default: 'Africa/Cairo',
    },
    logo: {
      type: String,
      trim: true,
      default: null,
    },
    favicon: {
      type: String,
      trim: true,
      default: null,
    },
    socialLinks: {
      type: socialLinksSchema,
      default: () => ({}),
    },
    contact: {
      type: contactSchema,
      default: () => ({}),
    },
    defaultSeo: {
      type: defaultSeoSchema,
      default: () => ({}),
    },
    homepage: {
      type: homepageSchema,
      default: () => ({}),
    },
    hero: {
      type: heroContentSchema,
      default: () => ({}),
    },
    about: {
      type: aboutContentSchema,
      default: () => ({}),
    },
    founder: {
      type: founderSchema,
      default: () => ({}),
    },
    footer: {
      type: footerSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        delete ret['__v'];
        return ret;
      },
    },
  },
);

export const Settings = model<ISettingsDocument>('Settings', settingsSchema);
