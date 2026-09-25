export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface ArticleAuthor {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  aboutUrl: string;
  socials?: {
    github?: string;
    linkedin?: string;
    youtube?: string;
    facebook?: string;
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
  name: 'ربيع شعبان',
  role: 'Full-Stack Software Engineer & Tech Educator',
  bio: 'مهندس برمجيات متخصص في بناء وتطوير الأنظمة السحابية وتطبيقات الويب الحديثة، ومؤسس منصة «خمسة برمجة بالبلدي» لتبسيط علوم الحاسب وهندسة البرمجيات للمطور العربي.',
  avatar: '/images/author-rabie.png',
  aboutUrl: '/about',
  socials: {
    github: 'https://github.com/rabea-shaban',
    linkedin: 'https://linkedin.com/in/rabea-shaban',
    youtube: 'https://youtube.com/@5prog_bldy',
    facebook: 'https://facebook.com/5prog.bldy',
  },
};
