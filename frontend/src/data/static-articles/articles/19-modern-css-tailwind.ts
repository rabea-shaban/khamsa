import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article19: StaticArticle = {
  id: 'static-art-19',
  slug: 'modern-css-mastery-tailwind-design-systems-responsive-ui',
  title: 'إتقان CSS الحديث و Tailwind CSS: بناء الأنظمة التصميمية (Design Systems) والواجهات المتجاوبة الخارقة',
  excerpt: 'الدليل العملي الشامل لمطوري الواجهات: استخدام ميزات CSS الحديثة مثل Container Queries، والـ Subgrid، والـ :has() Selector، وبناء Design Tokens مخصصة، وإتقان الوضع الداكن والـ RTL بسلاسة تامة.',
  description: 'دليل احتراف CSS و Tailwind CSS: شرح Container Queries، :has() selector، بناء Design Systems قابلة للتخصيص، دعم RTL التلقائي، والوضع الليلي Dark Mode.',
  category: 'Frontend',
  tags: ['CSS', 'TailwindCSS', 'Frontend', 'Design Systems', 'Responsive UI', 'Web Design'],
  keywords: ['CSS الحديث بالعربي', 'Tailwind CSS بالعربي', 'شرح Container Queries', 'Design Tokens', 'تصميم واجهات RTL', 'Dark Mode في Tailwind'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-06-15T10:00:00.000Z',
  updatedAt: '2026-09-21T01:00:00.000Z',
  readTimeMinutes: 28,
  coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'إتقان CSS الحديث و Tailwind CSS والأنظمة التصميمية',
  isFeatured: false,
  tableOfContents: [
    { id: 'modern-css-era', title: 'عصر الـ CSS الذهبي: ميزات كانت مستحيلة في الماضي', level: 2 },
    { id: 'container-queries', title: 'الـ Container Queries: التجاوب الحقيقي مع مساحة الحاوية وليس الشاشة', level: 2 },
    { id: 'has-selector', title: 'محدد الـ Parent السحري: محدد :has() وتطبيقاته الثورية', level: 2 },
    { id: 'subgrid-modern-layout', title: 'شبكات CSS Grid المتقدمة وخاصية Subgrid لمحاذاة العناصر المعقدة', level: 2 },
    { id: 'design-tokens-tailwind', title: 'هندسة الـ Design Tokens والمتغيرات اللونية في Tailwind CSS', level: 2 },
    { id: 'rtl-darkmode-mastery', title: 'إتقان الـ RTL التلقائي والـ Dark Mode بدون تكرار الكود عبر Logical Properties', level: 2 },
    { id: 'summary', title: 'الخلاصة وأفضل الممارسات لمطوري الواجهات', level: 2 },
  ],
  faq: [
    {
      question: 'ما هو الفرق بين Media Queries و Container Queries؟',
      answer: 'تقيس Media Queries أبعاد نافذة العرض بالكامل (Viewport)، بينما تقيس Container Queries أبعاد العنصر الأب المحيط بالمكون مباشرة، مما يسمح للمكون بتغيير تصميمه بمرونة سواء وُضع في الشريط الجانبي الضيق أو في وسط الصفحة العريضة.'
    },
    {
      question: 'كيف يغير محدد :has() طريقة كتابة CSS؟',
      answer: 'يعمل :has() كـ "Parent Selector"، حيث يتيح لك تنسيق العنصر الأب بناءً على محتواه أو حالة أبنائه (مثل تغيير خلفية الكارت إذا كان يحتوي على صورة أو إذا كان الـ Checkbox بداخله محدداً) دون الحاجة لكتابة سطر واحد من JavaScript.'
    },
    {
      question: 'كيف نضمن دعم RTL سلس واحترافي في Tailwind CSS؟',
      answer: 'باستخدام الـ Logical Properties الحديثة مثل ps- (Padding Start) و pe- (Padding End) و ms- و me- والخصائص الاتجاهية start- و end- بدلاً من pl- و pr- و left- و right- الثابتة.'
    }
  ],
  relatedSlugs: [
    'modern-frontend-architecture-state-management-component-design',
    'web-performance-core-web-vitals-speed-optimization',
    'react-19-architecture-server-components-advanced-hooks'
  ],
  seo: {
    title: 'إتقان CSS الحديث و Tailwind: الأنظمة التصميمية والـ Responsive UI',
    description: 'دليل متقدم لـ CSS و Tailwind: Container Queries، ومحدد :has()، وهندسة أنظمة التصميم مع دعم RTL والوضع الداكن بأسلوب احترافي.',
    keywords: ['CSS', 'Tailwind CSS', 'Container Queries', 'Has Selector', 'Design Systems', 'RTL Design'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/modern-css-mastery-tailwind-design-systems-responsive-ui',
  },
  content: "## عصر الـ CSS الذهبي: ميزات كانت مستحيلة في الماضي\n\nشهدت معايير CSS الحديثة في السنوات الأخيرة قفزة هندسية هائلة؛ حيث أصبحت المتصفحات تدعم ميزات متقدمة ألغت الحاجة لكتابة كود JavaScript معقد لتنسيق الواجهات:\n\n---\n\n## 1. ثورة الـ Container Queries\n\nبدلاً من ربط شكل المكون بحجم الشاشة بالكامل (`@media`)، تمكننا **Container Queries** من كتابة مكونات تتفاعل مع الحاوية التي توضع بداخلها:\n\n```css\n/* تعريف الحاوية */\n.article-card-wrapper {\n  container-type: inline-size;\n  container-name: card;\n}\n\n/* تنسيق الكارت عندما تكون الحاوية عريضة (> 500px) */\n@container card (min-width: 500px) {\n  .article-card {\n    display: grid;\n    grid-template-columns: 200px 1fr;\n    gap: 1.5rem;\n    padding: 1.5rem;\n  }\n}\n```\n\n---\n\n## 2. الـ Parent Selector الثوري: `:has()`\n\n```css\n/* تلوين حافة الكارت بالذهبي فقط إذا كان يحتوي على Badge مميز */\n.card:has(.gold-badge) {\n  border-color: #ffc107;\n  box-shadow: 0 0 20px rgba(255, 193, 7, 0.15);\n}\n\n/* تعديل خلفية الصفحة عند فتح القائمة المنبثقة لمنع التمرير */\nbody:has(dialog[open]) {\n  overflow: hidden;\n  user-select: none;\n}\n```\n\n---\n\n## 3. شبكات CSS Grid وخاصية Subgrid\n\nخاصية `subgrid` تتيح للعناصر الفرعية أن ترث خطوط الشبكة من العنصر الأب مباشرة، مما يحل مشكلة محاذاة العناوين والأزرار في كروت المقالات ذات الأطوال المختلفة:\n\n```css\n.articles-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n}\n\n.article-card {\n  display: grid;\n  grid-template-rows: subgrid;\n  grid-row: span 4; /* صورة، قسم، عنوان، زر القراءة */\n}\n```\n\n---\n\n## 4. هندسة الـ Design Tokens والمتغيرات اللونية في Tailwind CSS\n\n```css\n@layer base {\n  :root {\n    --background: #050507;\n    --foreground: #f8fafc;\n    --foreground-muted: #94a3b8;\n    --primary: #ffc107;\n    --primary-foreground: #000000;\n    --card: #0d0d12;\n    --border: #1f1f2e;\n    --radius: 1rem;\n  }\n}\n```\n\n---\n\n## 5. إتقان الـ RTL التلقائي والـ Dark Mode بدون تكرار الكود\n\nلضمان دعم اللغتين العربية والإنجليزية دون كتابة كود مكرر، نعتمد على **CSS Logical Properties**:\n* استخدام `ms-` (Margin Start) بدلاً من `ml-` أو `mr-`.\n* استخدام `pe-` (Padding End) بدلاً من `pr-` أو `pl-`.\n* استخدام `text-start` بدلاً من `text-right` الثابتة.\n\n---\n\n## الخلاصة وأفضل الممارسات\n\n* اعتمد على **Logical Properties** لدعم RTL/LTR التلقائي.\n* ابنِ لوحة ألوانك على **CSS Variables** لتبديل الثيمات والوضع الليلي بسلاسة.\n* وظف Container Queries لبناء مكونات مستقلة حقيقية قابلة لإعادة الاستخدام في أي مكان.\n`,\n",
};
