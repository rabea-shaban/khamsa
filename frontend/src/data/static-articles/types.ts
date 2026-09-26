export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface ArticleAuthor {
  id?: string;
  name: string;
  email: string;
  role: string;
  bio: string;
  avatar?: string | null;
  aboutUrl: string;
  socials?: {
    github?: string | null;
    linkedin?: string | null;
    youtube?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    tiktok?: string | null;
    website?: string | null;
  };
}

export interface ArticleSEO {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface StaticArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: string;
  tags: string[];
  keywords: string[];
  author: ArticleAuthor;
  publishedAt: string;
  updatedAt: string;
  readTimeMinutes: number;
  coverImage: string;
  coverAlt: string;
  isFeatured?: boolean;
  content: string; // Rich Markdown / HTML with deep educational structure
  tableOfContents?: Array<{
    id: string;
    title: string;
    level: 2 | 3;
  }>;
  faq: ArticleFAQ[];
  relatedSlugs: string[];
  seo: ArticleSEO;
}

export const DEFAULT_AUTHOR: ArticleAuthor = {
  id: '6ab676b7db2a3194c7928d08',
  name: 'ربيع شعبان',
  email: 'r.shaban.2016@gmail.com',
  role: 'Full-Stack Software Engineer & Tech Educator',
  bio: 'مهندس برمجيات متخصص في بناء وتطوير تطبيقات الويب الحديثة والأنظمة السحابية، ومؤسس منصة «خمسة برمجة بالبلدي» لتبسيط علوم الحاسب وهندسة البرمجيات وتقديم المحتوى التقني للمطور العربي بأسلوب عملي وبسيط.',
  avatar: 'https://pub-f9f474a915314796ac71ef9e5b4b78a0.r2.dev/settings/1790342553596-c3b0b3ad4e5a7544e8cfdb149652b335.png',
  aboutUrl: '/about',
  socials: {
    github: 'https://github.com/rabea-shaban',
    linkedin: 'https://linkedin.com/in/rabea-shaban',
    youtube: 'https://youtube.com/@5prog_bldy',
    facebook: 'https://facebook.com/5prog.bldy',
    twitter: 'https://x.com/rabea_shaban',
    tiktok: 'https://tiktok.com/@5prog_bldy',
    website: 'https://khamsa-web.vercel.app',
  },
};
