# خمسة برمجة بالبلدي — خادم الـ API وإدارة المحتوى (Backend Core) ⚙️

> **سيرفر RESTful API قوي وآمن مبني بـ Node.js، Express 5، و TypeScript مدعوم بـ MongoDB Atlas والتخزين السحابي للوسائط.**

---

[![Express.js](https://img.shields.io/badge/Express.js-5.2-lightgrey?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)
[![Vitest](https://img.shields.io/badge/Vitest-3.0-FCC72B?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![Zod](https://img.shields.io/badge/Zod-3.24-3068B7?style=for-the-badge&logo=zod)](https://zod.dev/)

---

## 🏗️ التصميم الموديولي (Modular Architecture)

الباك إند مبني بهيكل نظيف ومقسم إلى وحدات مستقلة (Feature-based Modules):

```text
backend/src/
├── config/             # إعدادات البيئة (Env Zod validation)، الداتابيز، والـ S3 Client
├── middlewares/        # التحقق من الجلسات (Auth)، حماية الأدوار (Roles)، والـ Error Handler
├── modules/
│   ├── auth/           # تسجيل الدخول، إنشاء الجلسات، التحديث، وتسجيل الخروج
│   ├── users/          # إدارة المشرفين والمحررين، الصلاحيات، وتغيير كلمات السر
│   ├── articles/       # إدارة المقالات، المسودات، التصنيفات، وتوليد الـ Slugs
│   ├── videos/         # إدارة الفيديوهات التفاعلية والتضمين وروابط السوشيال
│   ├── media/          # معالجة الصور، التحويل لـ WebP، والرفع السحابي
│   ├── settings/       # إعدادات المنصة، الهوية البصرية، والفوتر والمؤسس
│   └── backup/         # خدمة النسخ الاحتياطي السحابي التلقائي والجدولة
│
├── routes/             # تجميع وتوزيع مسارات الـ Public والـ Admin
├── scripts/            # سكربتات الصيانة والـ Seed والـ Backup والـ Restore
├── server.ts           # نقطة انطلاق السيرفر والجدولة الآلية والإغلاق الآمن (Graceful Shutdown)
└── utils/              # الردود القياسية (ApiResponse) والـ Async Handler
```

---

## 🔒 معايير الأمان والحماية (Security Features)

- **HTTPOnly Cookies**: حماية التوكنات (`accessToken` و `refreshToken`) من هجمات XSS.
- **Role-Based Access Control (RBAC)**:
  - `ADMIN`: تحكم كامل في المستخدمين، الإعدادات، النسخ الاحتياطي، وحذف المحتوى.
  - `EDITOR`: تحرير وإدارة المقالات والفيديوهات والوسائط بدون صلاحيات الإدارة الحساسة.
- **Rate Limiting**: منع هجمات حجب الخدمة (DDoS) والتخمين على مسارات المصادقة.
- **Input Validation**: التحقق الإلزامي من صحة جميع المدخلات عبر **Zod Schemas**.
- **CORS Whitelist**: تقييد الوصول فقط للنطاقات المعتمدة للمنصة.
- **Helmet Headers**: تفعيل ترويسات الأمان القياسية في جميع الردود.

---

## ⚙️ ملف البيئة (Environment Variables)

أنشئ ملف `.env` في مجلد `backend`:

```env
# Server
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# Database (MongoDB Atlas)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/khamsa_cms?retryWrites=true&w=majority

# JWT Secrets (32+ characters)
JWT_ACCESS_SECRET=your_jwt_access_super_secret_key_32_chars_min!
JWT_REFRESH_SECRET=your_jwt_refresh_super_secret_key_32_chars_min!
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Cloud Storage (S3 / R2 Compatible)
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=khamsa-cms
R2_PUBLIC_URL=https://your-public-cdn-url.dev

# Initial Admin Seeding
ADMIN_NAME=Khamsa Admin
ADMIN_EMAIL=admin@khamsa.dev
ADMIN_PASSWORD=AdminPassword123!
```

---

## 💾 نظام النسخ الاحتياطي التلقائي (Automated Backups)

- **الجدولة الآلية**: السيرفر مدمج به مجدول يقوم بعمل نسخة احتياطية مشفرة ومضغوطة بصيغة `GZIP (.json.gz)` كل 24 ساعة ويرفعها للتخزين السحابي.
- **الأوامر اليدوية**:
  ```bash
  # أخذ نسخة احتياطية فورية ورفعها سحابياً ومحلياً
  npm run backup

  # استرجاع أحدث نسخة احتياطية إلى قاعدة البيانات
  npm run restore

  # استرجاع ملف محدد
  npm run restore -- backups/khamsa-backup-YYYY-MM-DD.json.gz
  ```

---

## 📡 مسارات الـ API الأساسية (API Endpoints Reference)

### 1. المصادقة العامة (`/api/v1/auth`):
- `POST /login` — تسجيل دخول المستخدم.
- `GET /me` — جلب بيانات المستخدم الحالي.
- `POST /refresh` — تجديد الـ Access Token.
- `POST /logout` — إنهاء الجلسة ومسح الـ Cookies.

### 2. المحتوى العام (`/api/v1/public`):
- `GET /articles` — تصفح المقالات المنشورة مع البحث والفلترة.
- `GET /articles/:slug` — قراءة مقال كامل ومحتواه.
- `GET /videos` — تصفح الفيديوهات المنشورة حسب المنصة.
- `GET /settings` — جلب إعدادات المنصة والهوية البصرية.

### 3. إدارة النظام (`/api/v1/admin`):
- `GET, POST /articles` — إدارة وإنشاء المقالات.
- `GET, POST /videos` — إدارة وإنشاء الفيديوهات.
- `GET, POST, DELETE /media` — إدارة ومكتبة الوسائط.
- `GET, PATCH /settings` — تخصيص الهوية والإعدادات.
- `GET, POST /users` — إدارة حسابات المشرفين والمحررين (`ADMIN` فقط).
- `GET, POST /backups` — إدارة وسجل النسخ الاحتياطي (`ADMIN` فقط).

---

## 🧪 حزمة الاختبارات (Testing Suite)

يحتوي المشروع على حزمة اختبارات تكاملية متطورة تغطي كافة المسارات والحالات باستخدام **Vitest** و **MongoDB Memory Server**:

```bash
# تشغيل جميع الاختبارات (19/19 Tests)
npm test

# تشغيل الاختبارات في وضع المراقبة (Watch Mode)
npm run test:watch
```
