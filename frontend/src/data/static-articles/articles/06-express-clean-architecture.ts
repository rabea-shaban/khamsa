import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article06: StaticArticle = {
  id: 'static-art-06',
  slug: 'building-production-restful-apis-express-clean-architecture',
  title: 'بناء RESTful APIs احترافية باستخدام Express 5 و Clean Architecture و TypeScript',
  excerpt: 'الدليل العملي لبناء واجهات برمجة تطبيقات (APIs) مؤسسية: هيكلة المشروع بنمط الطبقات (Controllers, Services, Repositories)، معالجة الأخطاء المركزية، التحقق الصارم عبر Zod، وحماية الخادم بـ Rate Limiting و Helmet.',
  description: 'تعلم بناء RESTful APIs احترافية باستخدام Express و Clean Architecture: فصل الاهتمامات، Zod Validation، Centralized Error Handling، و Security Headers لبيئات الإنتاج.',
  category: 'Backend',
  tags: ['Express', 'Node.js', 'Clean Architecture', 'TypeScript', 'REST API', 'Backend'],
  keywords: ['Express.js بالعربي', 'Clean Architecture في Node.js', 'بناء REST API احترافي', 'Zod Validation', 'معالجة الأخطاء في Express', 'أمان الـ API'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-02-25T09:00:00.000Z',
  updatedAt: '2026-09-20T18:00:00.000Z',
  readTimeMinutes: 28,
  coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'بناء RESTful APIs احترافية بنمط Clean Architecture',
  isFeatured: true,
  tableOfContents: [
    { id: 'why-clean-arch', title: 'لماذا تفشل المشاريع بدون معمارية نظيفة؟', level: 2 },
    { id: 'layered-architecture', title: 'نمط الطبقات: Routes و Controllers و Services و Repositories', level: 2 },
    { id: 'validation-zod', title: 'التحقق من المدخلات (Input Validation) باستخدام Zod', level: 2 },
    { id: 'error-handling', title: 'نظام معالجة الأخطاء المركزي (Centralized Error Handling)', level: 2 },
    { id: 'security-pipeline', title: 'خط دفاع الأمان: Helmet و CORS و Rate Limiting', level: 2 },
    { id: 'testing-apis', title: 'اختبار الـ Endpoints تلقائياً باستخدام Supertest', level: 2 },
    { id: 'summary', title: 'الخلاصة وأفضل الممارسات', level: 2 },
  ],
  faq: [
    {
      question: 'ما هي ميزة فصل Service Layer عن Controller في Express؟',
      answer: 'الـ Controller مسؤول فقط عن استقبال طلبات HTTP والتحقق من المدخلات وإرجاع الرد، بينما الـ Service تحتوي على منطق العمل الصافي (Business Logic). هذا يجعل الكود قابلاً للاختبار بسهولة (Unit Testing) دون الحاجة لمحاكاة طلبات HTTP.'
    },
    {
      question: 'كيف نتجنب كتابة try/catch مكررة في كل Controller في Express 5؟',
      answer: 'في Express 5، يتم التقاط الأخطاء غير المتزامنة (Async Errors) المرفوضة في الـ Promises تلقائياً وتمريرها إلى Middleware معالجة الأخطاء دون الحاجة لاستخدام express-async-errors أو try/catch يدوية.'
    },
    {
      question: 'ما هي أهمية استخدام مكتبة Zod في الـ Middleware؟',
      answer: 'تضمن Zod فحص كل البيانات القادمة من العميل (Body, Query, Params) قبل وصولها لمنطق العمل، وإذا كانت البيانات غير مطابقة ترفض الطلب فوراً بكود 400 وتفاصيل خطأ محددة، مع توليد Typescript Types تلقائياً.'
    }
  ],
  relatedSlugs: [
    'advanced-nodejs-engineering-event-loop-streams-workers',
    'comprehensive-mongodb-guide-indexing-aggregation-performance',
    'web-security-developer-guide-owasp-top-10'
  ],
  seo: {
    title: 'بناء RESTful APIs احترافية: Express 5 و Clean Architecture',
    description: 'دليل شامل لبناء APIs احترافية مع Express 5 و TypeScript: هندسة الطبقات، معالجة الأخطاء المركزية، Zod Validation، واختبار البرمجيات.',
    keywords: ['Express', 'Clean Architecture', 'REST API', 'Node.js', 'Zod', 'Backend Engineering'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/building-production-restful-apis-express-clean-architecture',
  },
  content: `## لماذا تفشل المشاريع بدون معمارية نظيفة؟

يبدأ الكثير من مطوري الـ Backend بكتابة كل شيء داخل ملف \`index.js\` أو داخل ملفات الـ Routes: قراءة المدخلات، الاستعلام المباشر من قاعدة البيانات، إرسال الإيميلات، وإرجاع الرد.

مع مرور 6 أشهر ونمو المشروع:
* يصبح التعديل على أي ميزة كابوساً ينذر بانهيار ميزات أخرى.
* يستحيل كتابة اختبارات آلية (Unit Tests).
* يصعب تبديل قاعدة البيانات أو إضافة قنوات جديدة مثل WebSockets.

**Clean Architecture** تعتمد على مبدأ بسيط وحاسم: **فصل الاهتمامات (Separation of Concerns)** واستقلال منطق العمل عن إطار العمل (Framework Independence).

---

## نمط الطبقات: Routes ➔ Controllers ➔ Services ➔ Repositories

\`\`\`text
[ العميل (Client) ]
        │ HTTP Request
        ▼
[ Routes Layer ] ───────> توجيه المسار والتحقق من الأذونات
        │
        ▼
[ Middleware (Zod) ] ───> التحقق الصارم من صحة البيانات
        │
        ▼
[ Controller Layer ] ───> استخراج البيانات وتنسيق رد الـ HTTP
        │
        ▼
[ Service Layer ] ──────> تنفيذ قواعد العمل والمنطق الحسابي (Business Logic)
        │
        ▼
[ Repository Layer ] ───> التعامل المباشر مع قاعدة البيانات (MongoDB / PostgreSQL)
\`\`\`

---

## تطبيق عملي: نظام إنشاء المقالات بهندسة نظيفة

### 1. طبقة التحقق (Zod Schema)

\`\`\`typescript
import { z } from 'zod';

export const CreateArticleSchema = z.object({
  title: z.string().min(5, 'عنوان المقال يجب ألا يقل عن 5 أحرف').max(150),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'الرابط يجب أن يحتوي على أحرف إنجليزية وأرقام وشرطات فقط'),
  content: z.string().min(50, 'المحتوى يجب ألا يقل عن 50 حرفاً'),
  category: z.string().min(2),
  tags: z.array(z.string()).min(1, 'يجب إضافة وسم واحد على الأقل'),
});

export type CreateArticleDto = z.infer<typeof CreateArticleSchema>;
\`\`\`

### 2. طبقة الـ Service (المنطق البرمجي)

\`\`\`typescript
export class ArticleService {
  constructor(private readonly articleRepo: ArticleRepository) {}

  async createArticle(dto: CreateArticleDto, authorId: string) {
    // 1. التحقق من عدم تكرار الـ Slug
    const existing = await this.articleRepo.findBySlug(dto.slug);
    if (existing) {
      throw new ConflictError('هذا الرابط المخصص (Slug) مستخدم بالفعل.');
    }

    // 2. تطبيق منطق العمل (حساب زمن القراءة وتوليد التاريخ)
    const wordsCount = dto.content.split(/\\s+/).length;
    const readTimeMinutes = Math.ceil(wordsCount / 200);

    // 3. الحفظ في قاعدة البيانات
    return this.articleRepo.create({
      ...dto,
      authorId,
      readTimeMinutes,
      status: 'PUBLISHED',
      createdAt: new Date(),
    });
  }
}
\`\`\`

---

## نظام معالجة الأخطاء المركزي (Centralized Error Handler)

بدلاً من التعامل العشوائي مع الأخطاء، نبني فئات مخصصة للأخطاء و Middleware مركزي:

\`\`\`typescript
// errors/AppError.ts
export class AppError extends Error {
  constructor(public statusCode: number, message: string, public errors?: unknown) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'العنصر المطلوب غير موجود') {
    super(404, message);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'تعارض في البيانات') {
    super(409, message);
  }
}

// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'حدث خطأ داخلي في الخادم';

  console.error(\`[\${req.method}] \${req.url} - Error:\`, err);

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: err instanceof AppError ? err.errors : undefined,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
}
\`\`\`

---

## خط دفاع الأمان: Helmet و Rate Limiting و CORS

\`\`\`typescript
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();

// 1. ترويسات الأمان
app.use(helmet());

// 2. قيود الـ CORS المحددة
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'https://khamsa-web.vercel.app',
  credentials: true,
}));

// 3. صد الهجمات عبر Rate Limiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100, // 100 طلب لكل عنوان IP
  message: { success: false, message: 'تجاوزت الحد المسموح من الطلبات، يرجى الانتظار' },
}));
\`\`\`

---

## الخلاصة وأفضل الممارسات

بناء APIs قوية يتطلب الانضباط من اليوم الأول:
* اجعل الـ Controllers نحيفة (Skinny Controllers).
* ضع كل منطق العمل داخل الـ Services.
* لا تثق أبداً في مدخلات المستخدم واستخدم Zod للتحقق.
* وفر معالجة مركزية موحدة لكل الأخطاء لضمان ردود متسقة للـ Frontend.\`
",`,
};
