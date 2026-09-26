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
  coverImage: '/images/articles/16-software-testing-guide.svg',
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
  content: `## لماذا نختبر؟ اقتصاديات البرمجيات وتكلفة الأخطاء

في دورة حياة هندسة البرمجيات، تتضاعف تكلفة إصلاح الخطأ البرمجي (Bug) بـ 10 أضعاف في كل مرحلة ينتقل فيها الكود:
* اكتشاف الخطأ أثناء كتابة الكود = 5 دقائق وتكلفة صفرية.
* اكتشاف الخطأ في اختبار الـ CI = ساعة واحدة.
* اكتشاف الخطأ في الإنتاج بعد إطلاقه للمستخدمين = خسائر مالية، تعطل في الخدمة، وتراجع في سمعة الشركة.

الاختبارات الآلية ليست رفاهية تضيع الوقت، بل هي **شبكة الأمان** التي تسمح لك بتطوير ميزات جديدة ونشرها يومياً بثقة تامة.

---

## هرم الاختبارات (Testing Pyramid)

\`\`\`text
         /\\
        /  \\     E2E Tests (Playwright) ──> قليل، بطيء، مكلف، يختبر تدفق المستخدم بالكامل
       /────\\
      /      \\   Integration Tests (Supertest) ──> يختبر تكامل الـ APIs مع قواعد البيانات
     /────────\\
    /          \\ Unit Tests (Vitest) ──> كثير، سريع جداً، رخيص، يختبر الدوال الصافية
   /────────────\\
\`\`\`

---

## 1. اختبارات الوحدة (Unit Testing) بـ Vitest

\`\`\`typescript
// src/utils/reading-time.test.ts
import { describe, it, expect } from 'vitest';
import { calculateReadingTime } from './reading-time';

describe('calculateReadingTime()', () => {
  it('يجب أن يرجع دقيقة واحدة للمحتوى القصير أقل من 200 كلمة', () => {
    const text = 'هذا مقال تقني قصير يشرح مفهوم البرمجة باللغة العربية.';
    expect(calculateReadingTime(text)).toBe(1);
  });

  it('يجب أن يحسب الوقت بدقة للمقالات الطويلة', () => {
    const longText = Array(600).fill('كلمة').join(' ');
    expect(calculateReadingTime(longText)).toBe(3);
  });

  it('يجب أن يتعامل مع النصوص الفارغة دون أخطاء', () => {
    expect(calculateReadingTime('')).toBe(1);
  });
});
\`\`\`

---

## 2. اختبارات التكامل (Integration Testing) للـ APIs بـ Supertest

\`\`\`typescript
// tests/articles.integration.test.ts
import request from 'supertest';
import { app } from '../src/app';

describe('Integration: Articles API Pipeline', () => {
  it('GET /api/v1/public/articles - يجب أن يرجع المقالات المنشورة بحالة 200', async () => {
    const res = await request(app)
      .get('/api/v1/public/articles?limit=5')
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data.items)).toBe(true);
    expect(res.body.data.items.length).toBeLessThanOrEqual(5);
  });

  it('POST /api/v1/admin/articles - يجب أن يرفض الطلب غير المصرح بحالة 401', async () => {
    const res = await request(app)
      .post('/api/v1/admin/articles')
      .send({ title: 'مقال بدون مصادقة' })
      .expect(401);

    expect(res.body.success).toBe(false);
  });
});
\`\`\`

---

## 3. اختبارات النهاية إلى النهاية (E2E) باستخدام Playwright

\`\`\`typescript
// tests/e2e/article-reading.spec.ts
import { test, expect } from '@playwright/test';

test('يجب أن يستطيع الزائر تصفح المقال والوصول لقسم الأسئلة الشائعة', async ({ page }) => {
  await page.goto('/articles');

  // البحث عن أول مقال والضغط عليه
  const firstArticle = page.locator('article h3 a').first();
  const titleText = await firstArticle.innerText();
  await firstArticle.click();

  // التحقق من عنوان الصفحة والـ H1
  await expect(page).toHaveURL(/\\/articles\\/.+/);
  await expect(page.locator('h1')).toContainText(titleText);

  // التحقق من وجود صندوق الكاتب
  await expect(page.locator('text=ربيع شعبان')).toBeVisible();
});
\`\`\`

---

## الخلاصة وأفضل الممارسات

* اكتب اختبارات للمسارات الحرجة ومنطق الأعمال أولاً.
* لا تختبر تفاصيل التنفيذ الداخلي (Implementation Details) بل اختبر السلوك والمخرجات.
* أدرج تشغيل الاختبارات في خطوط الـ CI/CD قبل كل عملية نشر لمنع وصول أي كود معطوب للإنتاج.",`,
};
