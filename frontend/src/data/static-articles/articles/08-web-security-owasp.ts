import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article08: StaticArticle = {
  id: 'static-art-08',
  slug: 'web-security-developer-guide-owasp-top-10',
  title: 'أمان تطبيقات الويب (Web Security): دليل المطور الشامل للحماية من ثغرات الـ OWASP Top 10',
  excerpt: 'الدليل العملي لحماية مواقع وتطبيقات الويب من الاختراق: شرح ثغرات XSS، و CSRF، وحقن قواعد البيانات SQL/NoSQL Injection، وتطبيق ترويسات الأمان (Security Headers و CSP)، وتشفير كلمات المرور بـ Argon2 و bcrypt.',
  description: 'دليل شامل لأمان الويب والـ OWASP Top 10: كيفية حماية تطبيقات Node.js و React من ثغرات XSS، CSRF، NoSQL Injection، وضبط Content Security Policy والتشفير الحديث.',
  category: 'Security',
  tags: ['Web Security', 'OWASP', 'Cybersecurity', 'Cryptography', 'Backend', 'Full-Stack'],
  keywords: ['أمان تطبيقات الويب', 'ثغرات OWASP بالعربي', 'حماية من XSS', 'حماية من CSRF', 'Content Security Policy', 'تشفير كلمات المرور'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-03-12T11:00:00.000Z',
  updatedAt: '2026-09-20T19:30:00.000Z',
  readTimeMinutes: 30,
  coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'أمان تطبيقات الويب والحماية من ثغرات OWASP',
  isFeatured: true,
  tableOfContents: [
    { id: 'security-mindset', title: 'عقلية الأمان: مبدأ انعدام الثقة (Zero-Trust Architecture)', level: 2 },
    { id: 'xss-defense', title: 'ثغرات XSS: أنواعها وطرق الوقاية منها في الـ Frontend والـ Backend', level: 2 },
    { id: 'csrf-protection', title: 'ثغرات CSRF وكيف تحمي منها ملفات تعريف الارتباط (SameSite Cookies)', level: 2 },
    { id: 'injection-defense', title: 'حقن الأوامر وقواعد البيانات (SQL & NoSQL Injections)', level: 2 },
    { id: 'security-headers', title: 'ترويسات الأمان الإلزامية: CSP و HSTS و X-Frame-Options', level: 2 },
    { id: 'password-hashing', title: 'تشفير كلمات المرور والبيانات الحساسة (Argon2 vs bcrypt)', level: 2 },
    { id: 'rate-limiting-dos', title: 'صد هجمات حجب الخدمة والتخمين (Rate Limiting & Brute Force)', level: 2 },
    { id: 'summary', title: 'قائمة تدقيق الأمان الختامية (Security Checklist)', level: 2 },
  ],
  faq: [
    {
      question: 'لماذا لا تكفي React وحدها لحمايتي من ثغرات XSS؟',
      answer: 'تقوم React بهروب (Escape) النصوص تلقائياً في JSX، لكن الثغرات تظل ممكنة إذا استخدمت dangerouslySetInnerHTML، أو مررت روابط ملوثة بـ javascript: في خاصية href، أو قمت بقراءة وتنفيذ نصوص المستخدم في eval.'
    },
    {
      question: 'ما هي ميزة SameSite=Strict في الـ Cookies؟',
      answer: 'تمنع ميزة SameSite=Strict إرسال الكوكي مع أي طلب قادم من موقع خارجي (Third-party context)، مما يقضي تماماً على هجمات الـ CSRF (Cross-Site Request Forgery) دون الحاجة لرموز تحقق إضافية.'
    },
    {
      question: 'لماذا يعتبر خوارزمية Argon2id الخيار الأفضل حالياً لتشفير كلمات المرور؟',
      answer: 'فازت Argon2 بمسابقة Password Hashing Competition الدولية لأنها مصممة هندسياً لمقاومة الهجمات القائمة على العتاد الموازي (ASIC و GPUs) عبر التحكم في استهلاك الذاكرة (Memory-Hard) وعدد الدورات الزمنية.'
    }
  ],
  relatedSlugs: [
    'authentication-authorization-jwt-sessions-oauth2-rbac',
    'building-production-restful-apis-express-clean-architecture',
    'comprehensive-mongodb-guide-indexing-aggregation-performance'
  ],
  seo: {
    title: 'أمان تطبيقات الويب: دليل الحماية الشامل ضد OWASP Top 10',
    description: 'تعلم تأمين تطبيقاتك ضد أشرس هجمات الويب: حماية من XSS، CSRF، NoSQL Injection، إعدادات CSP، وتشفير كلمات المرور بأحدث المعايير الدولية.',
    keywords: ['Web Security', 'OWASP Top 10', 'XSS', 'CSRF', 'NoSQL Injection', 'CSP', 'Argon2', 'أمن المعلومات'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/web-security-developer-guide-owasp-top-10',
  },
  content: "\"## عقلية الأمان: مبدأ انعدام الثقة (Zero-Trust Architecture)\\n\\nالقاعدة الذهبية الأولى في أمن تطبيقات الويب هي:\\n> **«كل مدخل قادم من العميل هو مدخل ضار حتى يثبت العكس بالتنقية والفحص الصارم!»**\\n\\nالأمان ليس مجرد إضافة Middleware في نهاية المشروع، بل هو فلسفة هندسية مدمجة في كل سطر كود.\\n\\n---\\n\\n## ثغرات XSS: أنواعها وطرق الوقاية منها\\n\\nتسمح ثغرة **Cross-Site Scripting (XSS)** للمهاجم بتنفيذ كود JavaScript خبيث في متصفح الضحية لسرقة بيانات الاعتماد أو التلاعب بالصفحة:\\n\\n```typescript\\n// ❌ كود خطير: تمرير مدخلات المستخدم مباشرة للـ HTML\\n<div dangerouslySetInnerHTML={{ __html: userComment }} />\\n\\n// ✅ كود آمن: استخدام مكتبة تنقية معتمدة مثل DOMPurify\\nimport DOMPurify from 'isomorphic-dompurify';\\n\\nconst safeHtml = DOMPurify.sanitize(userComment, {\\n  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'code', 'pre'],\\n  ALLOWED_ATTR: ['href', 'title', 'target'],\\n});\\n\\n<div dangerouslySetInnerHTML={{ __html: safeHtml }} />\\n```\\n\\n---\\n\\n## ترويسات الأمان الإلزامية و Content Security Policy (CSP)\\n\\nاستخدم **Helmet** لضبط ترويسات HTTP التي تعطل هجمات Clickjacking و XSS والتنصت:\\n\\n```typescript\\nimport helmet from 'helmet';\\nimport express from 'express';\\n\\nconst app = express();\\n\\napp.use(\\n  helmet({\\n    contentSecurityPolicy: {\\n      directives: {\\n        defaultSrc: [\"'self'\"],\\n        scriptSrc: [\"'self'\", 'https://pagead2.googlesyndication.com', 'https://www.googletagmanager.com'],\\n        styleSrc: [\"'self'\", \"'unsafe-inline'\", 'https://fonts.googleapis.com'],\\n        fontSrc: [\"'self'\", 'https://fonts.gstatic.com'],\\n        imgSrc: [\"'self'\", 'data:', 'https:', 'blob:'],\\n        frameSrc: [\"'self'\", 'https://www.youtube.com', 'https://www.tiktok.com'],\\n        connectSrc: [\"'self'\", 'https://khamsa-webapi.vercel.app', 'https://www.google-analytics.com'],\\n        objectSrc: [\"'none'\"],\\n        upgradeInsecureRequests: [],\\n      },\\n    },\\n    crossOriginEmbedderPolicy: false,\\n    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },\\n  })\\n);\\n```\\n\\n---\\n\\n## تشفير كلمات المرور باستخدام Argon2\\n\\nتجنب خوارزميات MD5 و SHA القديمة؛ واستخدم دائماً **Argon2id**:\\n\\n```typescript\\nimport argon2 from 'argon2';\\n\\nexport async function hashPassword(plainText: string): Promise<string> {\\n  return argon2.hash(plainText, {\\n    type: argon2.argon2id,\\n    memoryCost: 2 ** 16, // 64MB RAM\\n    timeCost: 3,         // 3 iterations\\n    parallelism: 1,\\n  });\\n}\\n\\nexport async function verifyPassword(hash: string, plainText: string): Promise<boolean> {\\n  try {\\n    return await argon2.verify(hash, plainText);\\n  } catch {\\n    return false;\\n  }\\n}\\n```\\n\\n---\\n\\n## الوقاية من هجمات NoSQL Injection\\n\\n```typescript\\n// ❌ خطير: تمرير مدخلات المستخدم مباشرة إلى استعلام Mongoose\\napp.post('/login', async (req, res) => {\\n  // إذا أرسل المهاجم { \"username\": { \"$ne\": null }, \"password\": { \"$ne\": null } }\\n  const user = await User.findOne({ username: req.body.username, password: req.body.password });\\n});\\n\\n// ✅ آمن: التحقق الصارم من نوع البيانات باستخدام Zod\\nconst LoginSchema = z.object({\\n  username: z.string().min(3),\\n  password: z.string().min(8),\\n});\\n\\napp.post('/login', async (req, res) => {\\n  const { username, password } = LoginSchema.parse(req.body);\\n  const user = await User.findOne({ username: String(username) });\\n});\\n```\\n\\n---\\n\\n## الخلاصة وأفضل الممارسات\\n\\n* استخدم دائماً HTTPS الإلزامي عبر HSTS.\\n* خزن Tokens في **HttpOnly, Secure, SameSite=Lax** Cookies.\\n* نفذ Rate Limiting صارم على مسارات المصادقة وتسجيل الدخول لمنع هجمات الـ Brute Force.`\\n\",\n",
};
