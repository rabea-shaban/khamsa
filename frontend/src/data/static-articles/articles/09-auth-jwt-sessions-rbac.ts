import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article09: StaticArticle = {
  id: 'static-art-09',
  slug: 'authentication-authorization-jwt-sessions-oauth2-rbac',
  title: 'دليل مصادقة وتفويض المستخدمين: JWT مقابل Sessions و OAuth 2.0 والـ RBAC للأنظمة المؤسسية',
  excerpt: 'المقارنة المعمارية والتطبيق العملي لأنظمة الـ Authentication والـ Authorization: متى تستخدم Stateful Sessions ومتى تختار Stateless JWT؟ وكيف تطبق تدوير الرموز (Refresh Token Rotation) ونظام صلاحيات الأدوار (RBAC).',
  description: 'دليل شامل لأنظمة المصادقة والتفويض في الويب: مقارنة Sessions vs JWT، تدوير Refresh Tokens، OAuth 2.0، وتطبيق Role-Based Access Control في Node.js و React.',
  category: 'Security',
  tags: ['Authentication', 'JWT', 'OAuth2', 'RBAC', 'Backend', 'Security'],
  keywords: ['شرح JWT بالعربي', 'Sessions مقابل JWT', 'OAuth 2.0 بالعربي', 'نظام الصلاحيات RBAC', 'تدوير Refresh Tokens', 'أمان تسجيل الدخول'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-03-20T10:00:00.000Z',
  updatedAt: '2026-09-20T20:00:00.000Z',
  readTimeMinutes: 28,
  coverImage: 'https://images.unsplash.com/photo-1618060932014-4deda4932554?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'هندسة نظم المصادقة والتفويض و JWT و RBAC',
  isFeatured: true,
  tableOfContents: [
    { id: 'auth-vs-authz', title: 'الفرق الجوهري: Authentication مقابل Authorization', level: 2 },
    { id: 'sessions-vs-jwt', title: 'المعركة الكبرى: Stateful Sessions مقابل Stateless JWTs', level: 2 },
    { id: 'jwt-anatomy', title: 'تشريح الـ JWT: ترويسة (Header) وحمولة (Payload) وتوقيع (Signature)', level: 2 },
    { id: 'token-rotation', title: 'استراتيجية تدوير الرموز الآمنة (Refresh Token Rotation)', level: 2 },
    { id: 'rbac-system', title: 'بناء نظام صلاحيات الأدوار (RBAC) باستخدام TypeScript و Middleware', level: 2 },
    { id: 'oauth2-basics', title: 'فهم بروتوكول OAuth 2.0 و OpenID Connect في 5 دقائق', level: 2 },
    { id: 'security-mistakes', title: 'أخطر أخطاء المصادقة التي تقع فيها المشاريع الناشئة', level: 2 },
    { id: 'summary', title: 'الخلاصة وأفضل الممارسات للإنتاج', level: 2 },
  ],
  faq: [
    {
      question: 'أين يجب تخزين الـ Access Token و Refresh Token في المتصفح؟',
      answer: 'أكثر الطرق أماناً هي تخزين الـ Refresh Token داخل كوكيز بخواص HttpOnly و Secure و SameSite لمنع وصول كود JavaScript إليها ضد هجمات XSS، مع الاحتفاظ بالـ Access Token قصير الأجل (15 دقيقة) في ذاكرة التطبيق (In-Memory State).'
    },
    {
      question: 'كيف يمكن إبطال (Revoke) الـ JWT قبل انتهاء صلاحيته؟',
      answer: 'بما أن الـ JWT بدون حالة (Stateless)، لا يمكن إبطاله محلياً إلا عبر: 1. تقليل عمره الزمني لأقصى حد (5-15 دقيقة)، 2. استخدام قائمة سوداء (Blacklist / Blocklist) سريعة في Redis، أو 3. تغيير رمز التوقيع السري الخاص بالمستخدم (Token Version) في قاعدة البيانات عند تسجيل الخروج.'
    },
    {
      question: 'ما هو الـ RBAC (Role-Based Access Control)؟',
      answer: 'هو نموذج لإدارة الأذونات يعتمد على إسناد صلاحيات محددة لأدوار عامة (مثل ADMIN، EDITOR، VIEWER)، ثم ربط المستخدم بتلك الأدوار، مما يسهل إدارة صلاحيات آلاف المستخدمين بشكل منظم ومرن.'
    }
  ],
  relatedSlugs: [
    'web-security-developer-guide-owasp-top-10',
    'building-production-restful-apis-express-clean-architecture',
    'advanced-caching-redis-strategies-practical-patterns'
  ],
  seo: {
    title: 'دليل المصادقة والتفويض الشامل: JWT و Sessions و RBAC',
    description: 'شرح هندسي متكامل للمصادقة والتفويض: تدوير Refresh Tokens، مقارنة Sessions vs JWT، بروتوكول OAuth 2.0، ونظام RBAC مع أمثلة كود.',
    keywords: ['Authentication', 'JWT', 'Sessions', 'RBAC', 'OAuth2', 'أمان الويب', 'Node.js Auth'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/authentication-authorization-jwt-sessions-oauth2-rbac',
  },
  content: "\"## الفرق الجوهري: Authentication مقابل Authorization\\n\\n* **Authentication (المصادقة - من أنت؟):** عملية إثبات هوية المستخدم (عبر البريد وكلمة المرور، أو OTP، أو تسجيل الدخول بجوجل).\\n* **Authorization (التفويض - ماذا يحق لك أن تفعل؟):** فحص الصلاحيات لمعرفة هل يحق لهذا المستخدم تعديل هذا المقال أو حذف هذا المستخدم.\\n\\n---\\n\\n## تشريح الـ JSON Web Token (JWT)\\n\\nالـ JWT يتكون من ثلاثة أجزاء مفصولة بنقاط:\\n\\n```text\\n[ Header (الخوارزمية) ] . [ Payload (بيانات الهوية والصلاحيات) ] . [ Signature (التوقيع الرقمي) ]\\n```\\n\\n> **تحذير أمني خطير:** البيانات داخل الـ Payload **ليست مشفرة**؛ بل هي مجرد ترميز Base64Url! يمكن لأي شخص فكها وقراءتها. التوقيع وظيفته فقط إثبات أن البيانات لم يتم التلاعب بها من طرف ثالث.\\n\\n---\\n\\n## استراتيجية تدوير الرموز (Refresh Token Rotation)\\n\\nلتحقيق التوازن بين الأمان العالي وتجربة المستخدم السلسة، نستخدم رمزين:\\n1. **Access Token:** عمره قصير جداً (15 دقيقة)، يُستخدم لطلب الـ APIs.\\n2. **Refresh Token:** عمره أطول (7 أيام)، يُخزن في HttpOnly Cookie ويُستخدم لطلب Access Token جديد عند انتهاء صلاحيته. في كل مرة يُستخدم فيها الـ Refresh Token، يتم حذفه فوراً وتوليد Refresh Token جديد بالكامل (Token Rotation). إذا حاول مهاجم استخدام الـ Token القديم مرة ثانية، يقوم الخادم بحظر جميع الجلسات المرتبطة فوراً كإجراء أمني!\\n\\n```typescript\\n// تطبيق الـ Auth Middleware ونظام الصلاحيات RBAC في Express\\nimport { Request, Response, NextFunction } from 'express';\\nimport jwt from 'jsonwebtoken';\\n\\nexport type UserRole = 'ADMIN' | 'EDITOR' | 'USER';\\n\\nexport interface AuthPayload {\\n  userId: string;\\n  role: UserRole;\\n  email: string;\\n}\\n\\nexport function authenticate(req: Request, res: Response, next: NextFunction) {\\n  const authHeader = req.headers.authorization;\\n  if (!authHeader?.startsWith('Bearer ')) {\\n    return res.status(401).json({ success: false, message: 'مطلوب تسجيل الدخول للمتابعة' });\\n  }\\n\\n  const token = authHeader.split(' ')[1];\\n\\n  try {\\n    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as AuthPayload;\\n    (req as any).user = decoded;\\n    next();\\n  } catch (error) {\\n    return res.status(401).json({ success: false, message: 'انتهت صلاحية الجلسة، يرجى التحديث' });\\n  }\\n}\\n\\n// Middleware للتحقق من الأدوار (RBAC)\\nexport function requireRoles(...allowedRoles: UserRole[]) {\\n  return (req: Request, res: Response, next: NextFunction) => {\\n    const user = (req as any).user as AuthPayload | undefined;\\n\\n    if (!user || !allowedRoles.includes(user.role)) {\\n      return res.status(403).json({\\n        success: false,\\n        message: 'ليس لديك الصلاحيات الكافية لتنفيذ هذا الإجراء',\\n      });\\n    }\\n\\n    next();\\n  };\\n}\\n```\\n\\n---\\n\\n## الخلاصة وأفضل الممارسات\\n\\n* لا تخزن البيانات الحساسة (مثل كلمات المرور أو أرقام البطاقات) داخل الـ JWT Payload.\\n* استخدم دائماً HTTPS لحماية الـ Tokens أثناء النقل عبر الشبكة.\\n* طبق تدوير الـ Refresh Tokens ونظام الـ RBAC للتحكم الدقيق في صلاحيات المستخدمين.`\\n\",\n",
};
