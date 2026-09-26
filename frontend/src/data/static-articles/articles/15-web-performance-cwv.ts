import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article15: StaticArticle = {
  id: 'static-art-15',
  slug: 'web-performance-core-web-vitals-speed-optimization',
  title: 'تحسين أداء الويب و Core Web Vitals: دليل السرعة وتجربة المستخدم لمعايير Google 2026',
  excerpt: 'الدليل الهندسي للوصول إلى النتيجة الكاملة 100/100 في Google PageSpeed: تحليل وتطوير مؤشرات LCP و INP و CLS، مسار التصيير الحرج (Critical Rendering Path)، تحسين الخطوط والصور، والتخزين المؤقت على الـ Edge.',
  description: 'دليل شامل لتحسين أداء المواقع ومؤشرات Core Web Vitals: تحسين Largest Contentful Paint، تخفيض Interaction to Next Paint، القضاء على Cumulative Layout Shift، وتحسين سرعة التحميل.',
  category: 'Performance',
  tags: ['Performance', 'Core Web Vitals', 'SEO', 'LCP', 'INP', 'CLS', 'Frontend'],
  keywords: ['Core Web Vitals بالعربي', 'تحسين سرعة الموقع', 'تحسين LCP', 'شرح مؤشر INP', 'حل مشكلة CLS', 'Google PageSpeed 100'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-05-05T10:00:00.000Z',
  updatedAt: '2026-09-20T23:00:00.000Z',
  readTimeMinutes: 28,
  coverImage: '/images/articles/15-web-performance-cwv.svg',
  coverAlt: 'تحسين أداء الويب ومؤشرات Core Web Vitals للسرعة القصوى',
  isFeatured: true,
  tableOfContents: [
    { id: 'why-performance-matters', title: 'لماذا الأداء ليس رفاهية بل معيار تصدر في محركات البحث؟', level: 2 },
    { id: 'cwv-trio', title: 'الثلاثي الذهبي لـ Core Web Vitals: LCP و INP و CLS بالتفصيل', level: 2 },
    { id: 'optimizing-lcp', title: 'تحسين Largest Contentful Paint (LCP) لأقل من 1.5 ثانية', level: 2 },
    { id: 'optimizing-inp', title: 'احتراف Interaction to Next Paint (INP) واستجابة الواجهة الفورية', level: 2 },
    { id: 'zero-cls', title: 'الوصول إلى Zero Cumulative Layout Shift (CLS)', level: 2 },
    { id: 'font-asset-strategies', title: 'استراتيجيات الخطوط والصور الحديثة (AVIF و WebP و Subsetting)', level: 2 },
    { id: 'summary', title: 'الخلاصة وقائمة فحص الأداء', level: 2 },
  ],
  faq: [
    {
      question: 'ما هو مؤشر INP (Interaction to Next Paint) ولماذا استبدل FID؟',
      answer: 'يقيس مؤشر INP مدى استجابة الصفحة لجميع تفاعلات المستخدم طوال مدة زيارته (مثل النقرات والضغط على المفاتيح) وليس التفاعل الأول فقط كما كان يفعل FID، مما يعطي صورة واقعية ودقيقة لسلاسة التطبيق.'
    },
    {
      question: 'كيف نتجنب الـ CLS الناتج عن مساحات الإعلانات التفاعلية؟',
      answer: 'بحجز المساحة المخصصة للإعلان مسبقاً في الـ CSS عبر min-height و aspect-ratio محدد، بحيث لا تتحرك عناصر المقال لأعلى أو لأسفل عند انتهاء تحميل الإعلان ورسمه.'
    },
    {
      question: 'ما هو دور fetchpriority="high" في تسريع مؤشر LCP؟',
      answer: 'تخبر المتصفح أن الصورة أو المورد هو العنصر الأهم في الجزء المرئي الأول من الصفحة (Above the fold)، فيقوم المتصفح بطلبه فوراً متجاوزاً بقية الموارد الأقل أهمية.'
    }
  ],
  relatedSlugs: [
    'nextjs-app-router-engineering-guide-production-performance',
    'modern-css-mastery-tailwind-design-systems-responsive-ui',
    'modern-frontend-architecture-state-management-component-design'
  ],
  seo: {
    title: 'تحسين أداء الويب و Core Web Vitals: دليل السرعة الشامل',
    description: 'دليل مهندسي الويب للسرعة القصوى: حلول عملية لـ LCP و INP و CLS، تحسين الصور والخطوط، والوصول إلى 100% في مؤشرات Google.',
    keywords: ['Core Web Vitals', 'Web Performance', 'LCP', 'INP', 'CLS', 'Next.js Performance', 'تحسين محركات البحث'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/web-performance-core-web-vitals-speed-optimization',
  },
  content: `## لماذا الأداء ليس رفاهية بل معيار تصدر في محركات البحث؟

أكدت Google في أحدث خوارزمياتها أن تجربة المستخدم وسرعة الصفحة أصبحت من العوامل المباشرة في تصنيف وترتيب نتائج البحث (Search Ranking). المستخدم لا ينتظر أكثر من ثانيتين لتحميل الموقع، وكل 100 ملي ثانية تأخير تقلل من معدل التحويل (Conversion Rate) بنسبة 7%.

---

## الثلاثي الذهبي لـ Core Web Vitals

1. **LCP (Largest Contentful Paint):** يقيس سرعة تحميل أكبر عنصر مرئي في الشاشة (مثل صورة المقال الرئيسية أو العنوان الكبير). يجب أن يكتمل في **أقل من 2.5 ثانية**، والهدف الممتاز هو **أقل من 1.2 ثانية**.
2. **INP (Interaction to Next Paint):** يقيس استجابة الصفحة للنقرات والتفاعلات طوال مدة زيارة المستخدم. يجب أن يكون **أقل من 200 ملي ثانية**.
3. **CLS (Cumulative Layout Shift):** يقيس الاستقرار البصري للعناصر ومنع تحركها واهتزازها المفاجئ أثناء التحميل. يجب أن يكون **أقل من 0.1**، والمثالي هو **0.00**.

---

## استراتيجية القضاء التام على الـ CLS

يحدث اهتزاز الصفحة (Layout Shift) غالباً بسبب:
* صور وفيديوهات بدون أبعاد محددة في الـ HTML/CSS.
* مساحات إعلانية تفاعلية تظهر فجأة وتدفع المحتوى لأسفل.
* خطوط ويب تتأخر في التحميل مسببة وميض الخط (FOUT).

\`\`\`css
/* حجز مساحات ثابتة للمحتوى والصور والإعلانات */
.ad-slot-container {
  min-height: 250px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  contain: layout;
}

img.responsive-cover {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9; /* يمنع اهتزاز الصفحة إطلاقاً أثناء التحميل */
}
\`\`\`

---

## تسريع الـ LCP وتحسين مسار التصيير الحرج (Critical Rendering Path)

\`\`\`html
<!-- 1. تحميل مسبق لصورة الـ LCP ذات الأولوية القصوى -->
<link rel="preload" fetchpriority="high" as="image" href="/images/hero.webp" type="image/webp">

<!-- 2. الاتصال المسبق بخوادم الخطوط والـ CDN -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
\`\`\`

### تحسين الصور الحديثة:
* استخدم صيغتي **AVIF** و **WebP** اللتين تقدمان ضغطاً أفضل بنسبة 50% مقارنة بـ JPEG مع الحفاظ على نقاء الألوان.
* وفر أحجاماً متجاوبة باستخدام \`srcset\` لتزويد شاشات الهواتف بصور خفيفة ومناسبة لعرض الشاشة.

---

## تقليل زمن الاستجابة INP وحظر المسار الرئيسي

* قسّم المهام الحسابية الطويلة (Long Tasks > 50ms) باستخدام \`scheduler.yield()\` أو \`setTimeout(..., 0)\`.
* تجنب العمليات الحسابية الثقيلة أثناء معالجة أحداث \`scroll\` و \`resize\` واستخدم **Debounce** أو **Throttle**.
* انقل معالجة البيانات والتحليلات إلى **Web Workers** في الخلفية.

---

## الخلاصة وأفضل الممارسات

* استخدم دائماً خطوط النظام أو خطوط مجهزة مسبقاً بـ \`font-display: swap\`.
* حمّل صور الـ Above-the-fold فوراً بـ \`priority\`، والصور الأخرى بـ Lazy Loading.
* قس مؤشراتك الواقعية باستخدام Google Search Console Core Web Vitals Report ومكتبة \`web-vitals\`.",`,
};
