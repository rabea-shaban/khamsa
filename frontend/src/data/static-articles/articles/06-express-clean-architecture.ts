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
  coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
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
  content: "\"## لماذا تفشل المشاريع بدون معمارية نظيفة؟\\n\\nيبدأ الكثير من مطوري الـ Backend بكتابة كل شيء داخل ملف `index.js` أو داخل ملفات الـ Routes: قراءة المدخلات، الاستعلام المباشر من قاعدة البيانات، إرسال الإيميلات، وإرجاع الرد.\\n\\nمع مرور 6 أشهر ونمو المشروع:\\n* يصبح التعديل على أي ميزة كابوساً ينذر بانهيار ميزات أخرى.\\n* يستحيل كتابة اختبارات آلية (Unit Tests).\\n* يصعب تبديل قاعدة البيانات أو إضافة قنوات جديدة مثل WebSockets.\\n\\n**Clean Architecture** تعتمد على مبدأ بسيط وحاسم: **فصل الاهتمامات (Separation of Concerns)** واستقلال منطق العمل عن إطار العمل (Framework Independence).\\n\\n---\\n\\n## نمط الطبقات: Routes ➔ Controllers ➔ Services ➔ Repositories\\n\\n```text\\n[ العميل (Client) ]\\n        │ HTTP Request\\n        ▼\\n[ Routes Layer ] ───────> توجيه المسار والتحقق من الأذونات\\n        │\\n        ▼\\n[ Middleware (Zod) ] ───> التحقق الصارم من صحة البيانات\\n        │\\n        ▼\\n[ Controller Layer ] ───> استخراج البيانات وتنسيق رد الـ HTTP\\n        │\\n        ▼\\n[ Service Layer ] ──────> تنفيذ قواعد العمل والمنطق الحسابي (Business Logic)\\n        │\\n        ▼\\n[ Repository Layer ] ───> التعامل المباشر مع قاعدة البيانات (MongoDB / PostgreSQL)\\n```\\n\\n---\\n\\n## تطبيق عملي: نظام إنشاء المقالات بهندسة نظيفة\\n\\n### 1. طبقة التحقق (Zod Schema)\\n\\n```typescript\\nimport { z } from 'zod';\\n\\nexport const CreateArticleSchema = z.object({\\n  title: z.string().min(5, 'عنوان المقال يجب ألا يقل عن 5 أحرف').max(150),\\n  slug: z.string().regex(/^[a-z0-9-]+$/, 'الرابط يجب أن يحتوي على أحرف إنجليزية وأرقام وشرطات فقط'),\\n  content: z.string().min(50, 'المحتوى يجب ألا يقل عن 50 حرفاً'),\\n  category: z.string().min(2),\\n  tags: z.array(z.string()).min(1, 'يجب إضافة وسم واحد على الأقل'),\\n});\\n\\nexport type CreateArticleDto = z.infer<typeof CreateArticleSchema>;\\n```\\n\\n### 2. طبقة الـ Service (المنطق البرمجي)\\n\\n```typescript\\nexport class ArticleService {\\n  constructor(private readonly articleRepo: ArticleRepository) {}\\n\\n  async createArticle(dto: CreateArticleDto, authorId: string) {\\n    // 1. التحقق من عدم تكرار الـ Slug\\n    const existing = await this.articleRepo.findBySlug(dto.slug);\\n    if (existing) {\\n      throw new ConflictError('هذا الرابط المخصص (Slug) مستخدم بالفعل.');\\n    }\\n\\n    // 2. تطبيق منطق العمل (حساب زمن القراءة وتوليد التاريخ)\\n    const wordsCount = dto.content.split(/\\\\s+/).length;\\n    const readTimeMinutes = Math.ceil(wordsCount / 200);\\n\\n    // 3. الحفظ في قاعدة البيانات\\n    return this.articleRepo.create({\\n      ...dto,\\n      authorId,\\n      readTimeMinutes,\\n      status: 'PUBLISHED',\\n      createdAt: new Date(),\\n    });\\n  }\\n}\\n```\\n\\n---\\n\\n## نظام معالجة الأخطاء المركزي (Centralized Error Handler)\\n\\nبدلاً من التعامل العشوائي مع الأخطاء، نبني فئات مخصصة للأخطاء و Middleware مركزي:\\n\\n```typescript\\n// errors/AppError.ts\\nexport class AppError extends Error {\\n  constructor(public statusCode: number, message: string, public errors?: unknown) {\\n    super(message);\\n    Object.setPrototypeOf(this, new.target.prototype);\\n  }\\n}\\n\\nexport class NotFoundError extends AppError {\\n  constructor(message = 'العنصر المطلوب غير موجود') {\\n    super(404, message);\\n  }\\n}\\n\\nexport class ConflictError extends AppError {\\n  constructor(message = 'تعارض في البيانات') {\\n    super(409, message);\\n  }\\n}\\n\\n// middlewares/errorHandler.ts\\nimport { Request, Response, NextFunction } from 'express';\\n\\nexport function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {\\n  const statusCode = err instanceof AppError ? err.statusCode : 500;\\n  const message = err.message || 'حدث خطأ داخلي في الخادم';\\n\\n  console.error(`[${req.method}] ${req.url} - Error:`, err);\\n\\n  res.status(statusCode).json({\\n    success: false,\\n    statusCode,\\n    message,\\n    errors: err instanceof AppError ? err.errors : undefined,\\n    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,\\n  });\\n}\\n```\\n\\n---\\n\\n## خط دفاع الأمان: Helmet و Rate Limiting و CORS\\n\\n```typescript\\nimport express from 'express';\\nimport helmet from 'helmet';\\nimport cors from 'cors';\\nimport rateLimit from 'express-rate-limit';\\n\\nconst app = express();\\n\\n// 1. ترويسات الأمان\\napp.use(helmet());\\n\\n// 2. قيود الـ CORS المحددة\\napp.use(cors({\\n  origin: process.env.CLIENT_ORIGIN || 'https://khamsa-web.vercel.app',\\n  credentials: true,\\n}));\\n\\n// 3. صد الهجمات عبر Rate Limiter\\napp.use(rateLimit({\\n  windowMs: 15 * 60 * 1000, // 15 دقيقة\\n  max: 100, // 100 طلب لكل عنوان IP\\n  message: { success: false, message: 'تجاوزت الحد المسموح من الطلبات، يرجى الانتظار' },\\n}));\\n```\\n\\n---\\n\\n## الخلاصة وأفضل الممارسات\\n\\nبناء APIs قوية يتطلب الانضباط من اليوم الأول:\\n* اجعل الـ Controllers نحيفة (Skinny Controllers).\\n* ضع كل منطق العمل داخل الـ Services.\\n* لا تثق أبداً في مدخلات المستخدم واستخدم Zod للتحقق.\\n* وفر معالجة مركزية موحدة لكل الأخطاء لضمان ردود متسقة للـ Frontend.`\\n\",\n",
};
