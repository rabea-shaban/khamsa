# خمسة برمجة بالبلدي | Khamsa Platform 🚀

> **«افهمها بالبلدي.. اكتبها بالكود»**
> منصة تقنية عربية متكاملة لتبسيط علوم الحاسب، البرمجة، وهندسة البرمجيات بأسلوب عملي وشروحات مفهومة.

---

[![Next.js](https://img.shields.io/badge/Next.js-16.3.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.2-lightgrey?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-3.0-FCC72B?style=for-the-badge&logo=vitest)](https://vitest.dev/)

---

## 📑 هيكل المشروع (Monorepo Architecture)

المشروع مبني كـ Monorepo احترافي يتكون من الواجهة الأمامية والباك إند:

```text
khamsa/
├── frontend/             # تطبيق Next.js 16 (App Router + Turbopack + TailwindCSS)
│   ├── src/
│   │   ├── app/          # الصفحات العامة + لوحة التحكم المركزية (Dashboard)
│   │   ├── components/   # المكونات المشتركة وعناصر التصميم والواجهة
│   │   ├── features/     # الوحدات الموديلية (Articles, Videos, Media, Settings, Users, Auth)
│   │   ├── lib/          # عملاء الـ API والـ Axios Interceptors والمساعدات
│   │   └── providers/    # موفرو الحالة والسمات (Theme, Query, Auth)
│   └── package.json
│
├── backend/              # سيرفر Express.js 5 + TypeScript + MongoDB Atlas
│   ├── src/
│   │   ├── config/       # إعدادات البيئة، الداتابيز، والتخزين السحابي
│   │   ├── middlewares/  # وسائط الحماية والمصادقة وتحديد الأدوار
│   │   ├── modules/      # وحدات الأعمال (Auth, Users, Articles, Videos, Media, Settings, Backup)
│   │   ├── scripts/      # سكربتات التهيئة الأولية (Seed) والنسخ الاحتياطي (Backup & Restore)
│   │   └── utils/        # معالجة الأخطاء، الردود الموحدة، والترقيم
│   ├── tests/            # حزمة اختبارات التكامل الشاملة (Vitest + Supertest)
│   └── package.json
│
├── nginx/                # ملفات إعداد وتوجيه Nginx العكسي
├── docker-compose.yml    # إعدادات تشغيل الحاويات بالكامل
├── ecosystem.config.js   # إعدادات إدارة العمليات عبر PM2
└── package.json          # أوامر Monorepo الموحدة
```

---

## ✨ المميزات الرئيسية للمنصة (Core Features)

### 1. الموقع العام (Public Web Platform):
- **تجربة مستخدم راقية (UI/UX)**: مبنية بالهوية البصرية للمنصة بالأسود الداكن (`#050507`) والذهبي (`#FFC107`) مع خط **Cairo**.
- **دعم كامل للعربية والـ RTL**: مع دعم التبديل السلس بين أوضاع المظهر (Dark / Light / System).
- **محرك تصفح متقدم**: فلترة فورية، بحث لحظي، وتصنيفات للمقالات والفيديوهات.
- **تضمين تفاعلي للفيديوهات**: مشغل ذكي متجاوب لفيديوهات YouTube و TikTok و Facebook.
- **تهيئة محركات البحث (SEO & OpenGraph)**: مع توليد ديناميكي لـ `sitemap.xml` و `robots.txt` ووسوم **JSON-LD Schema.org**.

### 2. لوحة التحكم المركزية (Admin Dashboard):
- **إدارة المحتوى والمقالات (Articles CMS)**: محرر نصوص غني ومتقدم (Tiptap) مع دعم كتابة وتنسيق الأكواد، رفع الصور، وإدارة وسوم السيو.
- **إدارة الفيديوهات والسوشيال (Social Videos)**: دعم الكشف التلقائي عن المنصات، جلب الصور المصغرة، والتحكم بحالة النشر (مسودة / منشور).
- **مكتبة الوسائط السحابية (Media Library)**: رفع وإدارة الصور مع معالجة وتحويل تلقائي للـ WebP والتخزين السحابي الفوري.
- **إدارة المستخدمين والأدوار (Users & Roles)**: نظام صلاحيات متقدم (`ADMIN` / `EDITOR`) مع تأمين حسابات المشرفين وحماية الحساب الأخير.
- **إدارة الهوية وإعدادات المنصة (Platform Settings)**: تخصيص الشعار، أيقونة الموقع (Favicon)، بيانات المؤسس، ونصوص الموقع وروابط السوشيال لحظياً.
- **النسخ الاحتياطي السحابي التلقائي (Automated Cloud Backups)**: جدولة يومية تلقائية كل 24 ساعة، مع إمكانية إنشاء النسخ واسترجاعها بضغطة زر.

---

## ⚡ التشغيل السريع محلياً (Quick Start)

### المتطلبات الأساسية:
- Node.js `>= 20.0.0`
- npm `>= 9.0.0`
- حساب MongoDB Atlas (أو خادم MongoDB محلي)

### 1. تثبيت الاعتمادات:
```bash
# تثبيت كافة حزم المشروع
npm run install:all
```

### 2. إعداد ملفات البيئة:
- انسخ ملفات البيئة التوضيحية وعدل القيم:
```bash
# الباك إند
cp backend/.env.example backend/.env

# الواجهة الأمامية
cp frontend/.env.example frontend/.env.local
```

### 3. ملء البيانات الأولية (Seed Database):
```bash
npm --prefix backend run seed
```

### 4. تشغيل المشروع بالكامل:
```bash
# تشغيل الفرونت إند والباك إند معاً في وضع التطوير
npm run dev
```

- الواجهة الأمامية تعمل على: [http://localhost:3000](http://localhost:3000)
- لوحة الإدارة تعمل على: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- الباك إند API يعمل على: [http://localhost:5000/api/v1](http://localhost:5000/api/v1)

---

## 🔒 الأمان والمصادقة (Security & Best Practices)

- **JWT Authentication**: توكنات قصيرة الأجل مع Refresh Tokens داخل **HTTPOnly & Secure Cookies**.
- **Role-Based Access Control**: حماية مسارات الـ Admin والـ Editor بشكل منفصل.
- **Rate Limiting & Helmet**: حماية ضد هجمات Brute Force وهجمات تكرار الطلبات.
- **Strict Data Validation**: تحقق دقيق وشامل من جميع المدخلات باستخدام مكتبة **Zod**.
- **Clean Git Workflow**: عزل تام لكافة ملفات المفاتيح والـ `.env` عن المستودع.

---

## 🧪 الفحص والاختبارات (Testing & Quality)

```bash
# تشغيل اختبارات الباك إند الشاملة (19/19 اختبار تكاملي)
npm run test

# فحص كود الواجهة الأمامية (Linter)
npm run lint

# بناء الواجهة الأمامية للإنتاج (Production Build)
npm run build
```

---

## 📦 روابط التوثيق التفصيلية:
- 📖 [توثيق الواجهة الأمامية بالتفصيل (Frontend README)](./frontend/README.md)
- ⚙️ [توثيق الباك إند والـ APIs بالتفصيل (Backend README)](./backend/README.md)

---

## 👨‍💻 فريق العمل والتطوير

تم التطوير بكل فخر لمنصة **خمسة برمجة بالبلدي** بواسطة **ربيع شعبان** (Rabie Shaban).

© 2026 خمسة برمجة بالبلدي (Khamsa Programming). جميع الحقوق محفوظة.
