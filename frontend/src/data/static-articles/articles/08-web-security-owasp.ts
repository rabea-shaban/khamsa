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
  coverImage: '/images/articles/08-web-security-owasp.svg',
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
  content: `## عقلية الأمان: مبدأ انعدام الثقة (Zero-Trust Architecture)

القاعدة الذهبية الأولى في أمن تطبيقات الويب هي:
> **«كل مدخل قادم من العميل هو مدخل ضار حتى يثبت العكس بالتنقية والفحص الصارم!»**

الأمان ليس مجرد إضافة Middleware في نهاية المشروع، بل هو فلسفة هندسية مدمجة في كل سطر كود.

---

## ثغرات XSS: أنواعها وطرق الوقاية منها

تسمح ثغرة **Cross-Site Scripting (XSS)** للمهاجم بتنفيذ كود JavaScript خبيث في متصفح الضحية لسرقة بيانات الاعتماد أو التلاعب بالصفحة:

\`\`\`typescript
// ❌ كود خطير: تمرير مدخلات المستخدم مباشرة للـ HTML
<div dangerouslySetInnerHTML={{ __html: userComment }} />

// ✅ كود آمن: استخدام مكتبة تنقية معتمدة مثل DOMPurify
import DOMPurify from 'isomorphic-dompurify';

const safeHtml = DOMPurify.sanitize(userComment, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'code', 'pre'],
  ALLOWED_ATTR: ['href', 'title', 'target'],
});

<div dangerouslySetInnerHTML={{ __html: safeHtml }} />
\`\`\`

---

## ترويسات الأمان الإلزامية و Content Security Policy (CSP)

استخدم **Helmet** لضبط ترويسات HTTP التي تعطل هجمات Clickjacking و XSS والتنصت:

\`\`\`typescript
import helmet from 'helmet';
import express from 'express';

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://pagead2.googlesyndication.com', 'https://www.googletagmanager.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
        frameSrc: ["'self'", 'https://www.youtube.com', 'https://www.tiktok.com'],
        connectSrc: ["'self'", 'https://khamsa-webapi.vercel.app', 'https://www.google-analytics.com'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);
\`\`\`

---

## تشفير كلمات المرور باستخدام Argon2

تجنب خوارزميات MD5 و SHA القديمة؛ واستخدم دائماً **Argon2id**:

\`\`\`typescript
import argon2 from 'argon2';

export async function hashPassword(plainText: string): Promise<string> {
  return argon2.hash(plainText, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16, // 64MB RAM
    timeCost: 3,         // 3 iterations
    parallelism: 1,
  });
}

export async function verifyPassword(hash: string, plainText: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, plainText);
  } catch {
    return false;
  }
}
\`\`\`

---

## الوقاية من هجمات NoSQL Injection

\`\`\`typescript
// ❌ خطير: تمرير مدخلات المستخدم مباشرة إلى استعلام Mongoose
app.post('/login', async (req, res) => {
  // إذا أرسل المهاجم { "username": { "$ne": null }, "password": { "$ne": null } }
  const user = await User.findOne({ username: req.body.username, password: req.body.password });
});

// ✅ آمن: التحقق الصارم من نوع البيانات باستخدام Zod
const LoginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

app.post('/login', async (req, res) => {
  const { username, password } = LoginSchema.parse(req.body);
  const user = await User.findOne({ username: String(username) });
});
\`\`\`

---

## الخلاصة وأفضل الممارسات

* استخدم دائماً HTTPS الإلزامي عبر HSTS.
* خزن Tokens في **HttpOnly, Secure, SameSite=Lax** Cookies.
* نفذ Rate Limiting صارم على مسارات المصادقة وتسجيل الدخول لمنع هجمات الـ Brute Force.\`
",`,
};
