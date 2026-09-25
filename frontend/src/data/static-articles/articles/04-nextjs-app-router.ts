import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article04: StaticArticle = {
  id: 'static-art-04',
  slug: 'nextjs-app-router-engineering-guide-production-performance',
  title: 'الدليل الهندسي لـ Next.js 15 و 16: الـ App Router والأداء الأقصى للإنتاج والتخزين المؤقت المتقدم',
  excerpt: 'دليل عملي وتفصيلي لبناء تطبيقات ويب جاهزة للإنتاج باستخدام Next.js App Router: معمارية التخزين المؤقت (Caching Layers)، الـ Server Actions، التوليد الثابت التدريجي (ISR)، تحسين الـ Core Web Vitals، والـ SEO المتقدم.',
  description: 'تعلم أسرار Next.js App Router في الإنتاج: استراتيجيات التخزين المؤقت، ISR، Dynamic vs Static Rendering، Server Actions، وتحسين LCP و CLS لمواقع الملايين.',
  category: 'Next.js',
  tags: ['Next.js', 'React', 'Full-Stack', 'Web Performance', 'SEO', 'App Router'],
  keywords: ['Next.js App Router بالعربي', 'شرح Next.js 15 و 16', 'ISR في Next.js', 'Next.js Caching', 'تحسين أداء Next.js', 'Server Actions'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-02-10T12:00:00.000Z',
  updatedAt: '2026-09-20T17:00:00.000Z',
  readTimeMinutes: 30,
  coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'هندسة Next.js App Router والأداء الأقصى للإنتاج',
  isFeatured: true,
  tableOfContents: [
    { id: 'app-router-anatomy', title: 'تشريح الـ Next.js App Router: كيف يعالج الطلبات وسرعة التحميل؟', level: 2 },
    { id: 'caching-deep-dive', title: 'أعماق منظومة الـ Caching في Next.js: المستويات الأربعة بالتفصيل', level: 2 },
    { id: 'rendering-strategies', title: 'أنماط التصيير: Static (SSG) مقابل Dynamic (SSR) والـ ISR المتقدم', level: 2 },
    { id: 'server-actions-security', title: 'الـ Server Actions وأمان المعاملات والبيانات والتحقق بـ Zod', level: 2 },
    { id: 'metadata-seo-system', title: 'نظام الـ Dynamic Metadata والـ SEO الاحترافي و JSON-LD', level: 2 },
    { id: 'performance-cwv', title: 'تحسين Core Web Vitals مع Next.js (LCP, INP, CLS)', level: 2 },
    { id: 'production-checklist', title: 'قائمة تدقيق الإطلاق للإنتاج (Enterprise Production Checklist)', level: 2 },
    { id: 'summary', title: 'الخلاصة وأفضل الممارسات للمطورين', level: 2 },
  ],
  faq: [
    {
      question: 'ما هو الفرق بين export const dynamic = "force-dynamic" و revalidate = 0؟',
      answer: 'كلاهما يضمن تشغيل الصفحة ديناميكياً عند كل طلب، لكن force-dynamic تلغي التخزين الثابت على مستوى الـ Route بالكامل، بينما revalidate = 0 تحدد زمن صلاحية الكاش بصفر ثانية وتضمن تجاوز كاش الخادم.'
    },
    {
      question: 'كيف يمكن تنفيذ ISR (Incremental Static Regeneration) لمقالات التدوين؟',
      answer: 'باستخدام export const revalidate = 3600 أو تمرير { next: { revalidate: 3600 } } في دالة fetch، مما يجعل الصفحة ثابتة وسريعة جداً ويتم إعادة توليدها في الخلفية مرة كل ساعة عند وصول طلب جديد.'
    },
    {
      question: 'لماذا تعتبر ميزة next/image ضرورية لتحسين مؤشر LCP وتجنب CLS؟',
      answer: 'تقوم مكونة Image بتحويل الصور تلقائياً لصيغ حديثة (WebP / AVIF)، وتوليد أحجام متجاوبة مع الشاشات (srcset)، وحجز المساحة لمنع اهتزاز الصفحة أثناء التحميل (Zero CLS)، مع إمكانية التحميل الكسول (Lazy Loading) الافتراضي.'
    }
  ],
  relatedSlugs: [
    'react-19-architecture-server-components-advanced-hooks',
    'web-performance-core-web-vitals-speed-optimization',
    'clean-software-engineering-solid-principles-design-patterns'
  ],
  seo: {
    title: 'الدليل الهندسي لـ Next.js App Router: Caching و Server Actions و SEO',
    description: 'دليل متكامل لتطوير تطبيقات الإنتاج في Next.js: شرح الـ App Router، مستويات التخزين المؤقت، ISR، والـ Server Actions مع أمثلة كود عملية.',
    keywords: ['Next.js', 'App Router', 'Server Actions', 'Next.js Caching', 'SEO Next.js', 'هندسة الويب'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/nextjs-app-router-engineering-guide-production-performance',
  },
  content: `## تشريح الـ Next.js App Router: كيف يعالج الطلبات؟

يعتمد **Next.js App Router** على هندسة هجينة تجمع بين ميزات الخادم السحابي وإمكانيات المتصفح الحديث. في هذا النموذج، تصبح المكونات افتراضياً **Server Components**، ولا يتم إرسال كود الـ JavaScript الخاص بها إلى المتصفح، مما يقلل من حجم الـ Bundle بنسبة تتراوح بين 30% إلى 70% مقارنة بالـ Pages Router التقليدي.

---

## أعماق منظومة الـ Caching في Next.js: المستويات الأربعة

لفهم Next.js في بيئات الإنتاج، يجب استيعاب مستويات الـ Caching الأربعة وكيف تتفاعل معاً:

\`\`\`text
1. Request Memoization (React) ──> منع تكرار نفس الـ fetch داخل دورة الطلب الواحدة
       │
2. Data Cache (Next.js Server) ──> حفظ نتائج الـ API وطلبات DB عبر الطلبات
       │
3. Full Route Cache (Server)   ──> حفظ HTML و RSC Payload للصفحات الثابتة (SSG/ISR)
       │
4. Router Cache (Client Memory)──> حفظ الصفحات التي زارها المستخدم في المتصفح
\`\`\`

### التحكم الدقيق في Data Cache عبر \`fetch\`:

\`\`\`typescript
// 1. Static Data (يخزن إلى الأبد حتى يتم التحديث اليدوي)
const staticData = await fetch('https://api.khamsa.dev/v1/categories', {
  cache: 'force-cache',
});

// 2. Incremental Static Regeneration (يجدد كل ساعة)
const isrData = await fetch('https://api.khamsa.dev/v1/articles', {
  next: { revalidate: 3600, tags: ['articles-list'] },
});

// 3. Dynamic Real-time Data (بدون تخزين مؤقت نهائياً)
const liveData = await fetch('https://api.khamsa.dev/v1/user/notifications', {
  cache: 'no-store',
});
\`\`\`

---

## أنماط التصيير: Static (SSG) vs Dynamic (SSR) vs ISR

### 1. Static Site Generation (SSG)
الصفحة تُبنى بالكامل أثناء الـ \`next build\` وتُوزع عبر الـ CDN عالمياً، مما يمنحها سرعة فائقة وزمن استجابة أقل من 50ms.

\`\`\`typescript
// src/app/articles/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getAllArticleSlugs, getArticleBySlug } from '@/lib/articles';

// توليد جميع المسارات الثابتة وقت الـ Build
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  return (
    <article className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-extrabold">{article.title}</h1>
      <div className="mt-6 prose dark:prose-invert">{article.content}</div>
    </article>
  );
}
\`\`\`

---

## الـ Server Actions وأمان المعاملات

الـ **Server Actions** تتيح لك استدعاء دوال الخادم مباشرة من داخل مكونات React مع حماية مدمجة ضد الـ CSRF:

\`\`\`typescript
// src/actions/newsletter.ts
'use server';

import { z } from 'zod';
import { revalidateTag } from 'next/cache';

const SubscriberSchema = z.object({
  email: z.string().email('يرجى إدخال بريد إلكتروني صحيح'),
});

export async function subscribeToNewsletter(formData: FormData) {
  const rawEmail = formData.get('email');
  const validation = SubscriberSchema.safeParse({ email: rawEmail });

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message };
  }

  try {
    // حفظ في قاعدة البيانات
    await db.subscriber.create({ data: { email: validation.data.email } });
    
    // تفريغ كاش القائمة البرمجية
    revalidateTag('subscribers-count');

    return { success: true, message: 'تم اشتراكك بنجاح في خمسة برمجة!' };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء التسجيل، حاول ثانية.' };
  }
}
\`\`\`

---

## نظام الـ Dynamic Metadata والـ SEO الاحترافي

توفر Next.js واجهة \`generateMetadata\` لبناء بيانات وصفية ديناميكية لكل صفحة مع خرائط OpenGraph و Twitter Cards و JSON-LD:

\`\`\`typescript
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: 'المقال غير موجود | خمسة برمجة بالبلدي' };
  }

  const siteUrl = 'https://khamsa-web.vercel.app';
  const canonical = \`\\\${siteUrl}/articles/\\\${article.slug}\`;

  return {
    title: \`\\\${article.title} | خمسة برمجة بالبلدي\`,
    description: article.excerpt,
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonical,
      siteName: 'خمسة برمجة بالبلدي',
      type: 'article',
      publishedTime: article.publishedAt,
      images: [{ url: article.coverImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  };
}
\`\`\`

---

## الخلاصة وأفضل الممارسات

Next.js App Router هو المعيار الذهبي لبناء تطبيقات الويب الحديثة. بفصل منطق الخادم عن العميل، والتحكم الواعي بطبقات الكاش، وتطبيق ممارسات الأداء الصارمة، ستحصل على موقع يحقق 100/100 في معايير Google Lighthouse وجاهز لاستقبال ملايين الزيارات.
  \`
",`,
};
