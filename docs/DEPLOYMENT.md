# دليل نشر وإطلاق منصة «خمسة برمجة بالبلدي» على البيئة الإنتاجية
# Production Deployment & Infrastructure Guide

يقدم هذا الدليل المرجع الشامل والخطوات العملية لنشر وإدارة منصة **«خمسة برمجة بالبلدي»** (Khamsa Programming Bel Balady) على الخوادم الإنتاجية.

---

## 1. الهيكلية العامة (System Architecture)

```
                       INTERNET (HTTPS)
                              │
                              ▼
                       Cloudflare (CDN / DNS / DDoS)
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
       Next.js Frontend                Nginx Proxy
       (Vercel / VPS)                  (SSL Termination)
               │                             │
               │                             ▼
               │                      Express REST API
               │                      (Node.js / PM2)
               │                             │
               │                             ▼
               │                       MongoDB Atlas
               │
               ▼
       Cloudflare R2 (S3 API)
       (Media / Images / CDN)
```

---

## 2. المتطلبات الأساسية (Prerequisites)

- **Node.js**: الإصدار `20.x` أو `22.x` LTS.
- **NPM**: الإصدار `10.x` فما فوق.
- **MongoDB Atlas**: قاعدة بيانات سحابية مع Cluster مهيأ ومحمى عبر IP Whitelist.
- **Cloudflare R2**: Bucket لتخزين الصور والوسائط مع Custom Domain للـ CDN (مثل `media.khamsa.dev`).
- **Nginx**: لعمل Reverse Proxy و SSL Termination.
- **PM2**: لإدارة عمليات وتشغيل الـ Node.js Backend في الخلفية مع ميزة الـ Auto-restart.

---

## 3. متغيرات البيئة (Environment Variables)

### أ. الواجهة الأمامية (Frontend - `frontend/.env`)

```env
# رابط الـ API الخلفي شاملاً البادئة
NEXT_PUBLIC_API_URL=https://api.khamsa.dev/api/v1

# الدومين الأساسي للمنصة (للسيو والروابط الأساسية)
NEXT_PUBLIC_SITE_URL=https://khamsa.dev

# نطاق الوسائط والصور السحابية
NEXT_PUBLIC_R2_PUBLIC_URL=https://media.khamsa.dev
```

### ب. الواجهة الخلفية (Backend - `backend/.env`)

```env
NODE_ENV=production
PORT=5000

# الروابط المسموح لها بالاتصال (CORS) مفصولة بفاصلة
CLIENT_URL=https://khamsa.dev,https://www.khamsa.dev

# رابط اتصال MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/khamsa_cms?retryWrites=true&w=majority

# مفاتيح تشفير JWT (يجب ألا تقل عن 32 حرفاً)
JWT_ACCESS_SECRET=your_super_secret_access_key_min_32_chars
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# بيانات اتصال Cloudflare R2
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_cloudflare_access_key_id
R2_SECRET_ACCESS_KEY=your_cloudflare_secret_access_key
R2_BUCKET_NAME=khamsa-media
R2_PUBLIC_URL=https://media.khamsa.dev

# بيانات حساب المشرف الأول (يستخدم فقط عند البذر الأولي npm run seed)
ADMIN_NAME=ربيع شعبان
ADMIN_EMAIL=admin@khamsa.dev
ADMIN_PASSWORD=YourStrongPasswordHere123!
```

---

## 4. إعداد MongoDB Atlas

1. قم بإنشاء Database Cluster جديد على [MongoDB Atlas](https://www.mongodb.com/atlas).
2. في قسم **Database Access**، أنشئ مستخدم جديد بصلاحيات `readWriteAnyDatabase`.
3. في قسم **Network Access**، أضف الـ IP الخاص بخادم الإنتاج (VPS IP).
4. انسخ Connection String وضعها في متغير `MONGODB_URI` بملف `.env`.
5. قم بتشغيل سكريبت البذر الأولي لإنشاء حساب المشرف والإعدادات الافتراضية:
   ```bash
   cd backend
   npm run seed
   ```

---

## 5. إعداد Cloudflare R2

1. توجه إلى لوحة تحكم Cloudflare واختر **R2 Object Storage**.
2. أنشئ Bucket جديد باسم `khamsa-media`.
3. في تبويب **Settings** للـ Bucket، قم بتفعيل **Custom Domains** واربطه بنطاق فرعي مثل `media.khamsa.dev`.
4. أنشئ **API Token** بصلاحيات `Object Read & Write` لـ R2 وانسخ `Access Key ID` و `Secret Access Key` و `Account ID`.
5. ضع هذه القيم في متغيرات `R2_*` بالـ Backend.

---

## 6. نشر الـ Backend باستخدام PM2

1. ادخل إلى مجلد الخادم وقم بتثبيت الحزم وبناء المشروع:
   ```bash
   cd /var/www/khamsa/backend
   npm ci
   npm run build
   ```
2. قم بتشغيل التطبيق عبر ملف `ecosystem.config.js`:
   ```bash
   cd /var/www/khamsa
   pm2 start ecosystem.config.js --only khamsa-backend-api
   pm2 save
   pm2 startup
   ```

---

## 7. نشر الـ Frontend على Vercel أو الخادم الخاص

### الخيار أ: النشر عبر Vercel (الموصى به للواجهة)
1. اربط الـ Repository بحسابك على [Vercel](https://vercel.com).
2. حدد الـ Root Directory إلى `frontend`.
3. اضبط الـ Environment Variables (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_R2_PUBLIC_URL`).
4. اضغط **Deploy**.

### الخيار ب: النشر على VPS عبر PM2
```bash
cd /var/www/khamsa/frontend
npm ci
npm run build
pm2 start ecosystem.config.js --only khamsa-frontend-web
pm2 save
```

---

## 8. إعداد خادم Nginx وشهادات SSL

1. انسخ ملف الإعدادات:
   ```bash
   sudo cp nginx/khamsa.conf /etc/nginx/sites-available/khamsa.conf
   sudo ln -s /etc/nginx/sites-available/khamsa.conf /etc/nginx/sites-enabled/
   ```
2. استخرج شهادة SSL مجانية عبر Certbot:
   ```bash
   sudo certbot --nginx -d khamsa.dev -d www.khamsa.dev -d api.khamsa.dev
   ```
3. اختبر إعدادات Nginx وأعد تشغيله:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## 9. فحص الصحة ومراقبة الأداء (Health Check & Monitoring)

- **API Health Endpoint**:
  ```bash
  curl -I https://api.khamsa.dev/health
  ```
  الاستجابة المتوقعة:
  ```json
  {
    "success": true,
    "data": {
      "environment": "production",
      "database": "connected",
      "timestamp": "2026-09-25T12:00:00.000Z"
    },
    "message": "API is healthy"
  }
  ```

- **سجلات الأخطاء والتشغيل**:
  ```bash
  pm2 logs khamsa-backend-api
  pm2 monit
  ```

---

## 10. خطة التراجع السريع (Rollback Strategy)

في حال حدوث أي طارئ أثناء الترقية أو النشر:
1. ارجع إلى آخر Commit مستقر عبر Git:
   ```bash
   git checkout <last_stable_commit_tag>
   ```
2. أعد بناء وتشغيل التطبيق:
   ```bash
   npm run build
   pm2 restart ecosystem.config.js
   ```
3. استرجع نسخة قاعدة البيانات الاحتياطية (MongoDB Backup) إذا تم إجراء تعديلات غير متوافقة على البيانات.
