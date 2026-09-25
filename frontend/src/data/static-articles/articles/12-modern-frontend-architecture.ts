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
  coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
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
  content: "\"## تعقيدات الـ Frontend في التطبيقات المؤسسية\\n\\nفي التطبيقات الضخمة، تصبح إدارة الواجهات الأمامية تحدياً هندسياً معقداً يشمل: مشاركة البيانات بين مكونات متباعدة، الحفاظ على سرعة الاستجابة وتفادي الـ Re-renders غير الضرورية، وتصميم مكونات قابلة للتوسيع وإعادة الاستخدام.\\n\\n---\\n\\n## تصنيف الحالة في تطبيقات الويب الحديثة\\n\\nالمعمارية الصحيحة تقسم الحالة إلى 3 أنواع مستقلة تماماً:\\n\\n1. **Server State:** بيانات قادمة من الخادم غير متزامنة وقابلة للتغيير (تُدار عبر **TanStack Query**).\\n2. **Client State:** تفاعلات الواجهة فقط مثل: القائمة مفتوحة أم مغلقة، الثيم الداكن (تُدار عبر **Zustand**).\\n3. **URL State:** الفلاتر، الصفحة الحالية، والبحث (تُدار عبر **Query Parameters** لضمان قابلية المشاركة عبر الروابط).\\n\\n---\\n\\n## إدارة الـ Client State بخفة عبر Zustand\\n\\n```typescript\\nimport { create } from 'zustand';\\nimport { persist } from 'zustand/middleware';\\n\\ninterface UiPreferencesState {\\n  theme: 'light' | 'dark' | 'system';\\n  isSidebarOpen: boolean;\\n  setTheme: (theme: 'light' | 'dark' | 'system') => void;\\n  toggleSidebar: () => void;\\n}\\n\\nexport const useUiStore = create<UiPreferencesState>()(\\n  persist(\\n    set => ({\\n      theme: 'dark',\\n      isSidebarOpen: true,\\n      setTheme: theme => set({ theme }),\\n      toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),\\n    }),\\n    { name: 'khamsa-ui-preferences' }\\n  )\\n);\\n```\\n\\n---\\n\\n## نمط الـ Compound Components\\n\\nيتيح لك هذا النمط بناء مكونات متكاملة مثل الـ Tabs أو الـ Accordion تشارك الحالة داخلياً عبر Context وتمنح المطور مرونة كاملة في التصميم:\\n\\n```typescript\\n// مكون الـ Tabs بنمط Compound Component\\nimport React, { createContext, useContext, useState } from 'react';\\n\\nconst TabsContext = createContext<{ activeTab: string; setActiveTab: (tab: string) => void } | null>(null);\\n\\nexport function Tabs({ defaultTab, children }: { defaultTab: string; children: React.ReactNode }) {\\n  const [activeTab, setActiveTab] = useState(defaultTab);\\n  return <TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>;\\n}\\n\\nexport function TabTrigger({ value, children }: { value: string; children: React.ReactNode }) {\\n  const ctx = useContext(TabsContext);\\n  if (!ctx) throw new Error('TabTrigger must be used within Tabs');\\n  const isActive = ctx.activeTab === value;\\n\\n  return (\\n    <button\\n      onClick={() => ctx.setActiveTab(value)}\\n      className={`px-4 py-2 font-bold ${isActive ? 'text-primary border-b-2 border-primary' : 'text-muted'}`}\\n    >\\n      {children}\\n    </button>\\n  );\\n}\\n```\\n\\n---\\n\\n## الخلاصة وأفضل الممارسات\\n\\n* استخدم الـ URL لحفظ أي حالة يحتاجها المستخدم عند نسخ الرابط أو الضغط على زر الرجوع.\\n* اعتمد على TanStack Query لكل طلبات الشبكة والكاش.\\n* اعتمد على Zustand للحالة المشتركة بين المكونات التفاعلية.`\\n\",\n",
};
