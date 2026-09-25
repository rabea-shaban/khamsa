import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article03: StaticArticle = {
  id: 'static-art-03',
  slug: 'react-19-architecture-server-components-advanced-hooks',
  title: 'معمارية React 19 الحديثة: دليل المطور الشامل للـ Server Components والـ Actions والـ React Compiler',
  excerpt: 'كل ما تحتاج لمعرفته حول النقلة النوعية في React 19: كيف يعمل الـ React Compiler لإلغاء useMemo و useCallback، وكيف تدمج الـ React Server Components (RSC) مع الـ Client Components، ونظام Actions الجديد.',
  description: 'دليل شامل لاحتراف معمارية React 19: شرح React Server Components، React Compiler، useActionState، useOptimistic، واستراتيجيات إدارة الحالة والأداء في الإنتاج.',
  category: 'React',
  tags: ['React', 'React 19', 'Server Components', 'Next.js', 'Frontend', 'Web Development'],
  keywords: ['React 19 بالعربي', 'شرح React Server Components', 'React Compiler', 'useActionState', 'useOptimistic', 'تعلم React الحديثة'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-02-01T11:00:00.000Z',
  updatedAt: '2026-09-20T16:00:00.000Z',
  readTimeMinutes: 30,
  coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'معمارية React 19 والـ Server Components',
  isFeatured: true,
  tableOfContents: [
    { id: 'react19-revolution', title: 'ثورة React 19: لماذا تغيرت طريقة بناء واجهات المستخدم للأبد؟', level: 2 },
    { id: 'react-compiler', title: 'الـ React Compiler (Forget): التجميع التلقائي ونهاية useMemo و useCallback', level: 2 },
    { id: 'rsc-internals', title: 'تشريح الـ React Server Components (RSC) مقابل Client Components', level: 2 },
    { id: 'actions-forms', title: 'نظام الـ Actions الجديد: useActionState و useFormStatus و useOptimistic', level: 2 },
    { id: 'use-hook', title: 'الـ Hook الجديد: استخدام use() مع الـ Promises والـ Context في أي مكان', level: 2 },
    { id: 'state-patterns', title: 'معمارية إدارة الحالة (State Management) في عصر الـ Server-First Architecture', level: 2 },
    { id: 'perf-best-practices', title: 'أفضل ممارسات تحسين الأداء وتجنب Network Waterfalls في React 19', level: 2 },
    { id: 'summary', title: 'الخلاصة ومستقبل تطوير الـ Frontend', level: 2 },
  ],
  faq: [
    {
      question: 'هل يعني وجود React Compiler أننا لا نحتاج استخدام useMemo أو useCallback مطلقاً؟',
      answer: 'نعم، في المشاريع التي تفعل React Compiler (React Forget)، يقوم المترجم تلقائياً بعمل Auto-memoization للكود وقيم الإرجاع ومكونات JSX بناءً على تحليل شجرة التبعيات أثناء وقت الترجمة، مما يغني عن كتابة تلك الـ Hooks يدوياً إلا في حالات نادرة جداً.'
    },
    {
      question: 'متى يجب أن أضع تعليمة "use client" أعلى الملف في React 19؟',
      answer: 'تُستخدم "use client" فقط عندما يحتاج المكون إلى التفاعل من طرف العميل مثل الـ Event Listeners (onClick، onChange)، أو استخدام State و Effects (useState، useEffect)، أو استخدام واجهات المتصفح المباشرة (localStorage، window).'
    },
    {
      question: 'كيف يحسن useOptimistic تجربة المستخدم في النماذج؟',
      answer: 'يسمح لك useOptimistic بتحديث واجهة المستخدم فوراً بالبيانات المتوقعة قبل وصول استجابة الخادم، وإذا فشلت العملية يقوم المكون بالرجوع للحالة السابقة تلقائياً وبشكل ناعم.'
    }
  ],
  relatedSlugs: [
    'nextjs-app-router-engineering-guide-production-performance',
    'modern-frontend-architecture-state-management-component-design',
    'web-performance-core-web-vitals-speed-optimization'
  ],
  seo: {
    title: 'معمارية React 19: Server Components و React Compiler و Actions',
    description: 'دليل مهندسي الويب لميزات ومعمارية React 19: شرح Server Components، React Compiler، useActionState، واستراتيجيات الأداء العالي مع أمثلة كود حقيقية.',
    keywords: ['React 19', 'Server Components', 'React Compiler', 'useOptimistic', 'React Hooks', 'تطوير الويب'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/react-19-architecture-server-components-advanced-hooks',
  },
  content: "\"\\n## ثورة React 19: لماذا تغيرت طريقة بناء واجهات المستخدم؟\\n\\nلسنوات طويلة، كان نموذج عمل **React** مقتصراً على المتصفح (Single Page Application - SPA)، حيث يقوم العميل بتحميل ملف JavaScript ضخم (Bundle)، ثم يبدأ المتصفح في معالجة الكود، وطلب البيانات عبر API، ورسم الواجهة. كان هذا النموذج يتسبب في مشاكل حقيقية تتعلق بـ:\\n1. بطء مؤشرات الـ Core Web Vitals وخاصة **LCP** و **INP**.\\n2. صعوبة الـ SEO لمواقع المحتوى والمدونات.\\n3. التكرار المزعج في كتابة `useMemo` و `useCallback` لتفادي إعادة الرسم غير المبرر (Re-renders).\\n\\nمع **React 19**، تغيرت المعادلة بالكامل لتركز على **Server-First Architecture** و **Automated Compilation**.\\n\\n---\\n\\n## الـ React Compiler: نهاية عصر Memoization اليدوي\\n\\nالمشكلة الكبرى في React 18 وما قبلها كانت الحفاظ على المراجع (Referential Equality) لتجنب إعادة استدعاء الدوال الحسابية الثقيلة. كان المطور يقضي ساعات طويلة يكتب:\\n\\n```typescript\\n// ❌ النمط القديم في React 18: مليء بالـ Boilerplate والسهو البشري\\nconst computedValue = useMemo(() => expensiveCalculation(data), [data]);\\nconst handleClick = useCallback(() => doAction(computedValue), [computedValue]);\\n```\\n\\nمع **React Compiler (المعروف سابقاً بـ React Forget)**، يقوم المترجم أثناء مرحلة البناء بتحليل شجرة المكونات وتغليف كل عملية وحساب ومكون بـ Memoization تلقائي دقيق، مما يضمن أقصى أداء مع كود نقي وبسيط.\\n\\n---\\n\\n## تشريح الـ React Server Components (RSC)\\n\\nالـ **Server Component** هو مكون يتم تنفيذه حصرياً على الخادم، ونتيجته تُرسل إلى المتصفح كـ **Virtual DOM Stream (RSC Payload)** بدون إرسال سطر واحد من كود JavaScript الخاص بالمكون إلى المتصفح!\\n\\n```typescript\\n// Server Component افتراضي (بدون \"use client\")\\n// يمكنه قراءة قاعدة البيانات أو نظام الملفات مباشرة بدون API Routes!\\nimport { db } from '@/lib/db';\\nimport { Suspense } from 'react';\\nimport { SkeletonList } from '@/components/ui/Skeleton';\\n\\nasync function RecentArticlesList() {\\n  // استعلام مباشر وفائق السرعة من الخادم إلى قاعدة البيانات\\n  const articles = await db.article.findMany({\\n    where: { isPublished: true },\\n    orderBy: { createdAt: 'desc' },\\n    take: 6,\\n  });\\n\\n  return (\\n    <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\\n      {articles.map(art => (\\n        <div key={art.id} className=\"p-4 rounded-2xl border bg-card\">\\n          <h3 className=\"font-bold text-lg\">{art.title}</h3>\\n          <p className=\"text-sm text-foreground-muted mt-1\">{art.excerpt}</p>\\n        </div>\\n      ))}\\n    </div>\\n  );\\n}\\n\\nexport default function ArticlesSection() {\\n  return (\\n    <section className=\"space-y-6\">\\n      <h2 className=\"text-2xl font-black\">أحدث المقالات التعليمية</h2>\\n      <Suspense fallback={<SkeletonList count={6} />}>\\n        <RecentArticlesList />\\n      </Suspense>\\n    </section>\\n  );\\n}\\n```\\n\\n---\\n\\n## نظام الـ Actions الجديد: useActionState و useOptimistic\\n\\nيقدم React 19 منظومة موحدة لمعالجة نماذج الويب وتحديث البيانات غير المتزامنة مع دعم التحديث التفاؤلي الفوري:\\n\\n```typescript\\n'use client';\\n\\nimport { useActionState, useOptimistic, useRef } from 'react';\\n\\ninterface CommentItem {\\n  id: string;\\n  author: string;\\n  content: string;\\n  isOptimistic?: boolean;\\n}\\n\\nexport function InteractiveCommentBox({ initialComments }: { initialComments: CommentItem[] }) {\\n  const formRef = useRef<HTMLFormElement>(null);\\n\\n  // 1. إدارة التحديث التفاؤلي الفوري في واجهة المستخدم\\n  const [optimisticComments, addOptimisticComment] = useOptimistic(\\n    initialComments,\\n    (state, newText: string) => [\\n      ...state,\\n      {\\n        id: Math.random().toString(),\\n        author: 'أنت (جاري الحفظ...)',\\n        content: newText,\\n        isOptimistic: true,\\n      },\\n    ]\\n  );\\n\\n  // 2. معالجة الـ Server Action والتحقق من الاستجابة\\n  const [state, formAction, isPending] = useActionState(\\n    async (_prevState: unknown, formData: FormData) => {\\n      const text = formData.get('commentText') as string;\\n      if (!text?.trim()) return { error: 'يرجى كتابة نص التعليق' };\\n\\n      // تحديث فوري للواجهة\\n      addOptimisticComment(text);\\n      formRef.current?.reset();\\n\\n      // إرسال الطلب الفعلي للخادم\\n      const response = await fetch('/api/comments', {\\n        method: 'POST',\\n        headers: { 'Content-Type': 'application/json' },\\n        body: JSON.stringify({ text }),\\n      });\\n\\n      return response.json();\\n    },\\n    null\\n  );\\n\\n  return (\\n    <div className=\"space-y-6 p-6 rounded-3xl border bg-card\">\\n      <form ref={formRef} action={formAction} className=\"space-y-3\">\\n        <textarea\\n          name=\"commentText\"\\n          rows={3}\\n          placeholder=\"شاركنا رأيك أو استفسارك الهندسي...\"\\n          className=\"w-full p-4 rounded-2xl border bg-background text-sm\"\\n          required\\n        />\\n        <button\\n          type=\"submit\"\\n          disabled={isPending}\\n          className=\"px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs disabled:opacity-50\"\\n        >\\n          {isPending ? 'جاري الإرسال...' : 'نشر التعليق'}\\n        </button>\\n      </form>\\n\\n      <div className=\"space-y-3\">\\n        {optimisticComments.map(c => (\\n          <div\\n            key={c.id}\\n            className={`p-4 rounded-2xl border \\${\\n              c.isOptimistic ? 'opacity-50 border-dashed border-primary bg-primary/5' : 'bg-secondary'\\n            }`}\\n          >\\n            <span className=\"font-bold text-xs text-foreground block\">{c.author}</span>\\n            <p className=\"text-xs text-foreground-secondary mt-1\">{c.content}</p>\\n          </div>\\n        ))}\\n      </div>\\n    </div>\\n  );\\n}\\n```\\n\\n---\\n\\n## الخلاصة ومستقبل تطوير الـ Frontend\\n\\nReact 19 تمثل النضوج المعماري الكامل للغة الويب الحديثة؛ فالجمع بين الخادم والعميل، والتجميع التلقائي الذكي، ونظام الـ Actions يجعل بناء تطبيقات الويب السريعة والآمنة أسهل وأكثر متعة من أي وقت مضى.\\n  `\\n\",\n",
};
