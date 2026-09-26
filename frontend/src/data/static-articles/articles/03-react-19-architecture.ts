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
  coverImage: '/images/articles/03-react-19-architecture.svg',
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
  content: `## ثورة React 19: لماذا تغيرت طريقة بناء واجهات المستخدم؟

لسنوات طويلة، كان نموذج عمل **React** مقتصراً على المتصفح (Single Page Application - SPA)، حيث يقوم العميل بتحميل ملف JavaScript ضخم (Bundle)، ثم يبدأ المتصفح في معالجة الكود، وطلب البيانات عبر API، ورسم الواجهة. كان هذا النموذج يتسبب في مشاكل حقيقية تتعلق بـ:
1. بطء مؤشرات الـ Core Web Vitals وخاصة **LCP** و **INP**.
2. صعوبة الـ SEO لمواقع المحتوى والمدونات.
3. التكرار المزعج في كتابة \`useMemo\` و \`useCallback\` لتفادي إعادة الرسم غير المبرر (Re-renders).

مع **React 19**، تغيرت المعادلة بالكامل لتركز على **Server-First Architecture** و **Automated Compilation**.

---

## الـ React Compiler: نهاية عصر Memoization اليدوي

المشكلة الكبرى في React 18 وما قبلها كانت الحفاظ على المراجع (Referential Equality) لتجنب إعادة استدعاء الدوال الحسابية الثقيلة. كان المطور يقضي ساعات طويلة يكتب:

\`\`\`typescript
// ❌ النمط القديم في React 18: مليء بالـ Boilerplate والسهو البشري
const computedValue = useMemo(() => expensiveCalculation(data), [data]);
const handleClick = useCallback(() => doAction(computedValue), [computedValue]);
\`\`\`

مع **React Compiler (المعروف سابقاً بـ React Forget)**، يقوم المترجم أثناء مرحلة البناء بتحليل شجرة المكونات وتغليف كل عملية وحساب ومكون بـ Memoization تلقائي دقيق، مما يضمن أقصى أداء مع كود نقي وبسيط.

---

## تشريح الـ React Server Components (RSC)

الـ **Server Component** هو مكون يتم تنفيذه حصرياً على الخادم، ونتيجته تُرسل إلى المتصفح كـ **Virtual DOM Stream (RSC Payload)** بدون إرسال سطر واحد من كود JavaScript الخاص بالمكون إلى المتصفح!

\`\`\`typescript
// Server Component افتراضي (بدون "use client")
// يمكنه قراءة قاعدة البيانات أو نظام الملفات مباشرة بدون API Routes!
import { db } from '@/lib/db';
import { Suspense } from 'react';
import { SkeletonList } from '@/components/ui/Skeleton';

async function RecentArticlesList() {
  // استعلام مباشر وفائق السرعة من الخادم إلى قاعدة البيانات
  const articles = await db.article.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {articles.map(art => (
        <div key={art.id} className="p-4 rounded-2xl border bg-card">
          <h3 className="font-bold text-lg">{art.title}</h3>
          <p className="text-sm text-foreground-muted mt-1">{art.excerpt}</p>
        </div>
      ))}
    </div>
  );
}

export default function ArticlesSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-black">أحدث المقالات التعليمية</h2>
      <Suspense fallback={<SkeletonList count={6} />}>
        <RecentArticlesList />
      </Suspense>
    </section>
  );
}
\`\`\`

---

## نظام الـ Actions الجديد: useActionState و useOptimistic

يقدم React 19 منظومة موحدة لمعالجة نماذج الويب وتحديث البيانات غير المتزامنة مع دعم التحديث التفاؤلي الفوري:

\`\`\`typescript
'use client';

import { useActionState, useOptimistic, useRef } from 'react';

interface CommentItem {
  id: string;
  author: string;
  content: string;
  isOptimistic?: boolean;
}

export function InteractiveCommentBox({ initialComments }: { initialComments: CommentItem[] }) {
  const formRef = useRef<HTMLFormElement>(null);

  // 1. إدارة التحديث التفاؤلي الفوري في واجهة المستخدم
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    initialComments,
    (state, newText: string) => [
      ...state,
      {
        id: Math.random().toString(),
        author: 'أنت (جاري الحفظ...)',
        content: newText,
        isOptimistic: true,
      },
    ]
  );

  // 2. معالجة الـ Server Action والتحقق من الاستجابة
  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      const text = formData.get('commentText') as string;
      if (!text?.trim()) return { error: 'يرجى كتابة نص التعليق' };

      // تحديث فوري للواجهة
      addOptimisticComment(text);
      formRef.current?.reset();

      // إرسال الطلب الفعلي للخادم
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      return response.json();
    },
    null
  );

  return (
    <div className="space-y-6 p-6 rounded-3xl border bg-card">
      <form ref={formRef} action={formAction} className="space-y-3">
        <textarea
          name="commentText"
          rows={3}
          placeholder="شاركنا رأيك أو استفسارك الهندسي..."
          className="w-full p-4 rounded-2xl border bg-background text-sm"
          required
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs disabled:opacity-50"
        >
          {isPending ? 'جاري الإرسال...' : 'نشر التعليق'}
        </button>
      </form>

      <div className="space-y-3">
        {optimisticComments.map(c => (
          <div
            key={c.id}
            className={\`p-4 rounded-2xl border \\\${
              c.isOptimistic ? 'opacity-50 border-dashed border-primary bg-primary/5' : 'bg-secondary'
            }\`}
          >
            <span className="font-bold text-xs text-foreground block">{c.author}</span>
            <p className="text-xs text-foreground-secondary mt-1">{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

---

## الخلاصة ومستقبل تطوير الـ Frontend

React 19 تمثل النضوج المعماري الكامل للغة الويب الحديثة؛ فالجمع بين الخادم والعميل، والتجميع التلقائي الذكي، ونظام الـ Actions يجعل بناء تطبيقات الويب السريعة والآمنة أسهل وأكثر متعة من أي وقت مضى.
  \`
",`,
};
