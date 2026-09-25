import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article16: StaticArticle = {
  id: 'static-art-16',
  slug: 'complete-software-testing-guide-unit-integration-e2e',
  title: 'دليل اختبار البرمجيات الشامل: Unit و Integration و E2E Testing لمطوري الويب المحترفين',
  excerpt: 'الدليل الهندسي لبناء أنظمة موثوقة بنسبة 100%: هرم الاختبارات (Testing Pyramid)، كتابة اختبارات الوحدة باستخدام Vitest و Jest، اختبار واجهات الـ API بـ Supertest، واختبار الواجهات والمكونات بـ React Testing Library و Playwright.',
  description: 'دليل متكامل لاختبار تطبيقات الويب: هرم الاختبارات، Unit Testing، Integration Testing لـ Express و Next.js، وEnd-to-End Testing باستخدام Playwright مع أمثلة كود عملية.',
  category: 'Testing',
  tags: ['Testing', 'Unit Testing', 'Integration Testing', 'E2E', 'Jest', 'Playwright', 'Vitest'],
  keywords: ['اختبار البرمجيات بالعربي', 'Unit Testing في JavaScript', 'شرح Playwright', 'React Testing Library', 'هرم الاختبارات Testing Pyramid', 'Vitest بالعربي'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-05-15T11:00:00.000Z',
  updatedAt: '2026-09-20T23:30:00.000Z',
  readTimeMinutes: 28,
  coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'دليل اختبار البرمجيات الشامل Unit و Integration و E2E',
  isFeatured: false,
  tableOfContents: [
    { id: 'why-test', title: 'لماذا نختبر؟ اقتصاديات البرمجيات وتكلفة الأخطاء', level: 2 },
    { id: 'testing-pyramid', title: 'هرم الاختبارات (Testing Pyramid): التوزيع الصحيح للجهد والوقت', level: 2 },
    { id: 'unit-testing-vitest', title: 'اختبارات الوحدة (Unit Testing) باستخدام Vitest و Mocking', level: 2 },
    { id: 'integration-testing-api', title: 'اختبارات التكامل (Integration Testing) للـ APIs وقواعد البيانات', level: 2 },
    { id: 'react-testing-library', title: 'اختبار مكونات React كما يراها المستخدم الفعلي', level: 2 },
    { id: 'e2e-playwright', title: 'اختبارات النهاية إلى النهاية (E2E) باستخدام Playwright', level: 2 },
    { id: 'summary', title: 'الخلاصة وخارطة طريق الاختبارات', level: 2 },
  ],
  faq: [
    {
      question: 'ما هي النسبة المثالية لتغطية الكود بالاختبارات (Code Coverage)؟',
      answer: 'النسبة المثالية العملية تتراوح بين 75% إلى 85% مع التركيز على المسارات الحرجة في منطق الأعمال (Business Logic) وعمليات الدفع والمصادقة، حيث أن محاولة الوصول لـ 100% غير واقعية وتستهلك جهداً مبالغاً فيه في اختبار واجهات لا تتطلب ذلك.'
    },
    {
      question: 'لماذا يفضل استخدام Vitest على Jest في المشاريع الحديثة؟',
      answer: 'يعتمد Vitest على محرك Vite الفائق السرعة ويدعم TypeScript و ESM و JSX تلقائياً بدون إعدادات معقدة ويشارك نفس التكوين مع أدوات البناء، بالإضافة إلى سرعته المضاعفة في وضع الـ Watch Mode.'
    },
    {
      question: 'ما هو المبدأ الأساسي في React Testing Library؟',
      answer: '«كلما كانت اختباراتك تشبه الطريقة التي يستخدم بها المستخدم برنامجك، كلما زادت ثقتك في الكود». لذلك يتم البحث عن العناصر بواسطة الدور (getByRole) والنص الظاهر بدلاً من أسماء الكلاسات أو الـ State الداخلية للمكون.'
    }
  ],
  relatedSlugs: [
    'building-production-restful-apis-express-clean-architecture',
    'react-19-architecture-server-components-advanced-hooks',
    'clean-software-engineering-solid-principles-design-patterns'
  ],
  seo: {
    title: 'دليل اختبار البرمجيات الشامل: Unit و Integration و E2E',
    description: 'دليل شامل لاختبار تطبيقات الويب: Vitest، Supertest، React Testing Library، و Playwright مع كود تطبيقي وأفضل الممارسات.',
    keywords: ['Software Testing', 'Unit Testing', 'Integration Testing', 'Playwright', 'Vitest', 'Jest', 'React Testing'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/complete-software-testing-guide-unit-integration-e2e',
  },
  content: "\"## لماذا نختبر؟ اقتصاديات البرمجيات وتكلفة الأخطاء\\n\\nفي دورة حياة هندسة البرمجيات، تتضاعف تكلفة إصلاح الخطأ البرمجي (Bug) بـ 10 أضعاف في كل مرحلة ينتقل فيها الكود:\\n* اكتشاف الخطأ أثناء كتابة الكود = 5 دقائق وتكلفة صفرية.\\n* اكتشاف الخطأ في اختبار الـ CI = ساعة واحدة.\\n* اكتشاف الخطأ في الإنتاج بعد إطلاقه للمستخدمين = خسائر مالية، تعطل في الخدمة، وتراجع في سمعة الشركة.\\n\\nالاختبارات الآلية ليست رفاهية تضيع الوقت، بل هي **شبكة الأمان** التي تسمح لك بتطوير ميزات جديدة ونشرها يومياً بثقة تامة.\\n\\n---\\n\\n## هرم الاختبارات (Testing Pyramid)\\n\\n```text\\n         /\\\\\\n        /  \\\\     E2E Tests (Playwright) ──> قليل، بطيء، مكلف، يختبر تدفق المستخدم بالكامل\\n       /────\\\\\\n      /      \\\\   Integration Tests (Supertest) ──> يختبر تكامل الـ APIs مع قواعد البيانات\\n     /────────\\\\\\n    /          \\\\ Unit Tests (Vitest) ──> كثير، سريع جداً، رخيص، يختبر الدوال الصافية\\n   /────────────\\\\\\n```\\n\\n---\\n\\n## 1. اختبارات الوحدة (Unit Testing) بـ Vitest\\n\\n```typescript\\n// src/utils/reading-time.test.ts\\nimport { describe, it, expect } from 'vitest';\\nimport { calculateReadingTime } from './reading-time';\\n\\ndescribe('calculateReadingTime()', () => {\\n  it('يجب أن يرجع دقيقة واحدة للمحتوى القصير أقل من 200 كلمة', () => {\\n    const text = 'هذا مقال تقني قصير يشرح مفهوم البرمجة باللغة العربية.';\\n    expect(calculateReadingTime(text)).toBe(1);\\n  });\\n\\n  it('يجب أن يحسب الوقت بدقة للمقالات الطويلة', () => {\\n    const longText = Array(600).fill('كلمة').join(' ');\\n    expect(calculateReadingTime(longText)).toBe(3);\\n  });\\n\\n  it('يجب أن يتعامل مع النصوص الفارغة دون أخطاء', () => {\\n    expect(calculateReadingTime('')).toBe(1);\\n  });\\n});\\n```\\n\\n---\\n\\n## 2. اختبارات التكامل (Integration Testing) للـ APIs بـ Supertest\\n\\n```typescript\\n// tests/articles.integration.test.ts\\nimport request from 'supertest';\\nimport { app } from '../src/app';\\n\\ndescribe('Integration: Articles API Pipeline', () => {\\n  it('GET /api/v1/public/articles - يجب أن يرجع المقالات المنشورة بحالة 200', async () => {\\n    const res = await request(app)\\n      .get('/api/v1/public/articles?limit=5')\\n      .expect(200);\\n\\n    expect(res.body.success).toBe(true);\\n    expect(Array.isArray(res.body.data.items)).toBe(true);\\n    expect(res.body.data.items.length).toBeLessThanOrEqual(5);\\n  });\\n\\n  it('POST /api/v1/admin/articles - يجب أن يرفض الطلب غير المصرح بحالة 401', async () => {\\n    const res = await request(app)\\n      .post('/api/v1/admin/articles')\\n      .send({ title: 'مقال بدون مصادقة' })\\n      .expect(401);\\n\\n    expect(res.body.success).toBe(false);\\n  });\\n});\\n```\\n\\n---\\n\\n## 3. اختبارات النهاية إلى النهاية (E2E) باستخدام Playwright\\n\\n```typescript\\n// tests/e2e/article-reading.spec.ts\\nimport { test, expect } from '@playwright/test';\\n\\ntest('يجب أن يستطيع الزائر تصفح المقال والوصول لقسم الأسئلة الشائعة', async ({ page }) => {\\n  await page.goto('/articles');\\n\\n  // البحث عن أول مقال والضغط عليه\\n  const firstArticle = page.locator('article h3 a').first();\\n  const titleText = await firstArticle.innerText();\\n  await firstArticle.click();\\n\\n  // التحقق من عنوان الصفحة والـ H1\\n  await expect(page).toHaveURL(/\\\\/articles\\\\/.+/);\\n  await expect(page.locator('h1')).toContainText(titleText);\\n\\n  // التحقق من وجود صندوق الكاتب\\n  await expect(page.locator('text=ربيع شعبان')).toBeVisible();\\n});\\n```\\n\\n---\\n\\n## الخلاصة وأفضل الممارسات\\n\\n* اكتب اختبارات للمسارات الحرجة ومنطق الأعمال أولاً.\\n* لا تختبر تفاصيل التنفيذ الداخلي (Implementation Details) بل اختبر السلوك والمخرجات.\\n* أدرج تشغيل الاختبارات في خطوط الـ CI/CD قبل كل عملية نشر لمنع وصول أي كود معطوب للإنتاج.\",\n",
};
