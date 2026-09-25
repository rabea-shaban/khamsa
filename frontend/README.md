# خمسة برمجة بالبلدي — تطبيق الواجهة الأمامية (Frontend App) 💻

> **تطبيق ويب حديث وسريع مبني بأحدث معايير Next.js 16 و React 19 لدعم المحتوى التقني والبرمجي باللغة العربية.**

---

[![Next.js](https://img.shields.io/badge/Next.js-16.3.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/docs/architecture/turbopack)

---

## 🎨 الهوية البصرية ونظام التصميم (Design System)

- **الخط الأساسي**: خط **Cairo** العربي المتناسق لكافة العناوين والنصوص.
- **لوحة الألوان المعتمدة**:
  - **الأسود الفاخر (Deep Black)**: `#050507` (الخلفية الداكنة الأساسية).
  - **الذهبي المميز (Brand Gold)**: `#FFC107` (لون الشعار والأزرار البارزة).
  - **الرمادي المساند**: درجات مدروسة لتباين فائق وسهولة في القراءة.
- **دعم كامل للاتجاه (RTL Support)**: جميع العناصر والقوائم مبنية أصلياً باتجاه اليمين لليسار.
- **نظام المظهر (Theme System)**: يدعم الداكن (Dark)، الفاتح (Light)، والمزامنة مع نظام التشغيل (System).
- **أيقونات متناسقة**: استخدام حصري لحزمة **Lucide React**.

---

## 🗂️ هيكل المجلدات والملفات (Directory Structure)

```text
frontend/src/
├── app/                      # مسارات Next.js App Router
│   ├── (public)/             # الصفحات العامة (الرئيسية، المقالات، الفيديوهات، من نحن)
│   ├── (dashboard)/          # لوحة التحكم المركزية والإدارة
│   ├── layout.tsx            # التخطيط الجذري والـ SEO الديناميكي والـ JSON-LD
│   └── globals.css           # المتغيرات الأساسية ورموز الألوان
│
├── components/               # المكونات القابلة لإعادة الاستخدام
│   ├── layout/               # Header, Footer, Sidebar, Navigation
│   ├── sections/             # أقسام الصفحة الرئيسية (Hero, Founder, Philosophy, etc.)
│   ├── shared/               # الشعار الديناميكي (Logo), Favicon Updater, TiptapRenderer
│   └── ui/                   # عناصر الواجهة (Button, Card, Input, Modal, Badge, etc.)
│
├── features/                 # الوحدات الوظيفية الموديلية
│   ├── articles/             # إدارة المقالات ومحرر Tiptap والـ Form
│   ├── auth/                 # سياق المصادقة وتسجيل الدخول وحفظ الجلسة
│   ├── media/                # مكتبة الوسائط ونافذة رفع الصور
│   ├── settings/             # تبويبات إعدادات المنصة والنسخ الاحتياطي
│   ├── users/                # إدارة المستخدمين، الأدوار، وتغيير كلمات المرور
│   └── videos/               # إدارة وتضمين مشغلات الفيديو التفاعلية
│
├── lib/                      # الاتصال بالخادم والمساعدات
│   ├── api/                  # عملاء API المتخصصة لكل موديول
│   ├── axios/client.ts       # إعدادات Axios مع Interceptors والتحديث التلقائي للتوكن
│   └── utils/                # دوال مساعدة للتنسيق والـ ClassNames
│
├── providers/                # موفرو الحالة (ThemeProvider, QueryProvider, AuthProvider)
└── types/                    # تعريفات TypeScript العامة لواجهات الـ API
```

---

## ⚙️ متغيرات البيئة (Environment Variables)

أنشئ ملف `.env.local` في مجلد `frontend` بالقيم التالية:

```env
# رابط الباك إند API (مع مسار /api/v1)
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# رابط الموقع العام المستخدم في الـ SEO والروابط الكنسية (Canonical URLs)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🚀 أوامر التطوير والتشغيل (Scripts)

```bash
# تشغيل خادم التطوير مع Turbopack فائق السرعة
npm run dev

# فحص كود المشروع والتأكد من معايير ESLint
npm run lint

# بناء نسخة الإنتاج المحسنة (Production Build)
npm run build

# تشغيل خادم الإنتاج محلياً
npm run start
```

---

## 🔍 تحسين محركات البحث والـ Performance (SEO & Speed)

1. **Dynamic Metadata & OG Images**: يتم جلب إعدادات السيو، الوصف، وصورة المشاركة مباشرة من قاعدة البيانات.
2. **Dynamic Favicon Sync**: تتغير أيقونة التاب في المتصفح لحظياً بمجرد تحديثها من لوحة الإدارة.
3. **Structured Data (JSON-LD)**: توليد وسوم `Organization` و `WebSite` لتعريف محركات البحث بالهوية الرسمية.
4. **Sitemap & Robots**: توليد آلي متجدد لمسارات الموقع عبر `sitemap.xml` و `robots.txt`.
5. **Incremental Static Regeneration (ISR)**: إعادة التحقق والتحديث اللحظي لصفحات المحتوى كل 60 ثانية.
