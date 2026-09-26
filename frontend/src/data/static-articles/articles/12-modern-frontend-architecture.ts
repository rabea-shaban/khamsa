import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article12: StaticArticle = {
  id: 'static-art-12',
  slug: 'modern-frontend-architecture-state-management-component-design',
  title: 'هندسة الـ Frontend الحديثة: معمارية إدارة الحالة (State Management) وتصميم المكونات المعيارية',
  excerpt: 'الدليل العملي لبناء تطبيقات واجهة مستخدم قابلة للصيانة والتوسع: الفرق الحاسم بين Server State (TanStack Query) و Client State (Zustand)، أنماط Compound Components، والتصميم الموجه للسهولة والوصول (Accessibility).',
  description: 'دليل شامل لهندسة الواجهات الأمامية: مقارنة TanStack Query مقابل Zustand، نمط Compound Components، فصل منطق الأعمال عن العرض، وتصميم مكونات قابلة لإعادة الاستخدام.',
  category: 'Frontend',
  tags: ['Frontend', 'React', 'State Management', 'Architecture', 'Zustand', 'TanStack Query'],
  keywords: ['إدارة الحالة في React', 'Zustand بالعربي', 'TanStack Query بالعربي', 'Compound Components Pattern', 'هندسة الـ Frontend', 'تصميم المكونات'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-04-12T11:00:00.000Z',
  updatedAt: '2026-09-20T21:30:00.000Z',
  readTimeMinutes: 27,
  coverImage: '/images/articles/12-modern-frontend-architecture.svg',
  coverAlt: 'هندسة الواجهات الأمامية وتصميم المكونات وإدارة الحالة',
  isFeatured: false,
  tableOfContents: [
    { id: 'frontend-complexity', title: 'تحديات تعقيد الـ Frontend في التطبيقات الكبيرة', level: 2 },
    { id: 'state-taxonomy', title: 'تصنيف الحالة: Server State مقابل Client State مقابل URL State', level: 2 },
    { id: 'server-state-query', title: 'إدارة Server State باحتراف عبر TanStack Query', level: 2 },
    { id: 'client-state-zustand', title: 'إدارة Client State برقة وخفة عبر Zustand', level: 2 },
    { id: 'compound-components', title: 'نمط الـ Compound Components: بناء مكونات مرنة كـ HTML النقي', level: 2 },
    { id: 'summary', title: 'الخلاصة وأفضل الممارسات', level: 2 },
  ],
  faq: [
    {
      question: 'لماذا يجب التوقف عن تخزين بيانات الـ API داخل Redux أو Context يدوي؟',
      answer: 'لأن بيانات الـ API هي Server State تحتاج لإدارة الكاش، إعادة الجلب في الخلفية (Revalidation)، معالجة حالات التحميل والأخطاء، وتفادي تكرار الطلبات. مكتبات متخصصة مثل TanStack Query تدير كل هذا تلقائياً بسطر واحد.'
    },
    {
      question: 'ما هي ميزة Zustand على Redux Toolkit في إدارة الحالة المحلية؟',
      answer: 'تتميز Zustand بعدم وجود Boilerplate، وحجم كود ضئيل جداً (< 1KB)، وبساطة الخطافات (Hooks)، وعدم الحاجة للف المكونات بـ Context Providers في شجرة الـ DOM.'
    },
    {
      question: 'كيف يساعد نمط Compound Components في جعل الواجهات أكثر مرونة؟',
      answer: 'يسمح للمطور بتركيب عناصر المكون بحرية (مثل Accordion و Accordion.Item و Accordion.Trigger) مع مشاركة الحالة داخلياً عبر Context، مما يمنح مرونة كاملة في التصميم والترتيب دون تضخيم الخصائص (Props Drilling).'
    }
  ],
  relatedSlugs: [
    'react-19-architecture-server-components-advanced-hooks',
    'modern-css-mastery-tailwind-design-systems-responsive-ui',
    'web-performance-core-web-vitals-speed-optimization'
  ],
  seo: {
    title: 'هندسة الـ Frontend الحديثة: إدارة الحالة وتصميم المكونات',
    description: 'دليل احترافي لهندسة الواجهات الأمامية: مقارنة TanStack Query و Zustand، وتطبيق أنماط المكونات المتقدمة في React.',
    keywords: ['Frontend Architecture', 'React', 'Zustand', 'TanStack Query', 'Compound Components', 'State Management'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/modern-frontend-architecture-state-management-component-design',
  },
  content: `## تعقيدات الـ Frontend في التطبيقات المؤسسية

في التطبيقات الضخمة، تصبح إدارة الواجهات الأمامية تحدياً هندسياً معقداً يشمل: مشاركة البيانات بين مكونات متباعدة، الحفاظ على سرعة الاستجابة وتفادي الـ Re-renders غير الضرورية، وتصميم مكونات قابلة للتوسيع وإعادة الاستخدام.

---

## تصنيف الحالة في تطبيقات الويب الحديثة

المعمارية الصحيحة تقسم الحالة إلى 3 أنواع مستقلة تماماً:

1. **Server State:** بيانات قادمة من الخادم غير متزامنة وقابلة للتغيير (تُدار عبر **TanStack Query**).
2. **Client State:** تفاعلات الواجهة فقط مثل: القائمة مفتوحة أم مغلقة، الثيم الداكن (تُدار عبر **Zustand**).
3. **URL State:** الفلاتر، الصفحة الحالية، والبحث (تُدار عبر **Query Parameters** لضمان قابلية المشاركة عبر الروابط).

---

## إدارة الـ Client State بخفة عبر Zustand

\`\`\`typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiPreferencesState {
  theme: 'light' | 'dark' | 'system';
  isSidebarOpen: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
}

export const useUiStore = create<UiPreferencesState>()(
  persist(
    set => ({
      theme: 'dark',
      isSidebarOpen: true,
      setTheme: theme => set({ theme }),
      toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    { name: 'khamsa-ui-preferences' }
  )
);
\`\`\`

---

## نمط الـ Compound Components

يتيح لك هذا النمط بناء مكونات متكاملة مثل الـ Tabs أو الـ Accordion تشارك الحالة داخلياً عبر Context وتمنح المطور مرونة كاملة في التصميم:

\`\`\`typescript
// مكون الـ Tabs بنمط Compound Component
import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext<{ activeTab: string; setActiveTab: (tab: string) => void } | null>(null);

export function Tabs({ defaultTab, children }: { defaultTab: string; children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return <TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>;
}

export function TabTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabTrigger must be used within Tabs');
  const isActive = ctx.activeTab === value;

  return (
    <button
      onClick={() => ctx.setActiveTab(value)}
      className={\`px-4 py-2 font-bold \${isActive ? 'text-primary border-b-2 border-primary' : 'text-muted'}\`}
    >
      {children}
    </button>
  );
}
\`\`\`

---

## الخلاصة وأفضل الممارسات

* استخدم الـ URL لحفظ أي حالة يحتاجها المستخدم عند نسخ الرابط أو الضغط على زر الرجوع.
* اعتمد على TanStack Query لكل طلبات الشبكة والكاش.
* اعتمد على Zustand للحالة المشتركة بين المكونات التفاعلية.\`
",`,
};
