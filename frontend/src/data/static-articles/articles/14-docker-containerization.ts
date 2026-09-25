import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article14: StaticArticle = {
  id: 'static-art-14',
  slug: 'practical-docker-containerization-guide-web-developers',
  title: 'الدليل العملي لـ Docker و Containerization لمطوري الويب: من التطوير المحلي إلى نشر الإنتاج',
  excerpt: 'كل ما يحتاجه مطور الويب لفهم الحاويات (Containers): الفرق بين Docker والأجهزة الافتراضية (VMs)، كتابة Multi-Stage Dockerfiles لتقليص حجم الصور، إدارة البيئات المعقدة عبر Docker Compose، وأمان الحاويات.',
  description: 'دليل عملي لاحتراف Docker في مشاريع الويب: شرح Containers vs VMs، Multi-stage Builds في Node.js و Next.js، Docker Compose للبيئات المحلية، وتأمين الحاويات للإنتاج.',
  category: 'DevOps',
  tags: ['Docker', 'DevOps', 'Containers', 'Node.js', 'Next.js', 'Production'],
  keywords: ['Docker بالعربي', 'شرح Docker لمطوري الويب', 'Docker Compose بالعربي', 'Multi-stage Dockerfile', 'حاويات البرمجيات', 'نشر التطبيقات بـ Docker'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-04-28T09:00:00.000Z',
  updatedAt: '2026-09-20T22:30:00.000Z',
  readTimeMinutes: 26,
  coverImage: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'الدليل العملي لـ Docker و Containerization لمطوري الويب',
  isFeatured: false,
  tableOfContents: [
    { id: 'why-docker', title: 'حل مشكلة «الكود شغال على جهازي ومش شغال على السيرفر!»', level: 2 },
    { id: 'containers-vs-vms', title: 'الحاويات (Containers) مقابل الأجهزة الافتراضية (VMs)', level: 2 },
    { id: 'multistage-dockerfile', title: 'كتابة Multi-Stage Dockerfile احترافي لـ Next.js و Node.js', level: 2 },
    { id: 'docker-compose-dev', title: 'إدارة بيئة التطوير متعددة الخدمات بـ Docker Compose', level: 2 },
    { id: 'docker-security', title: 'قواعد الأمان الأساسية للحاويات (Non-Root User & Minimal Images)', level: 2 },
    { id: 'summary', title: 'الخلاصة وأفضل الممارسات', level: 2 },
  ],
  faq: [
    {
      question: 'لماذا يعتبر نمط Multi-stage Build ضرورياً لصور الإنتاج؟',
      answer: 'لأنه يفصل مرحلة البناء (التي تحتوي على أدوات الترجمة والـ devDependencies الثقيلة) عن صورة الإنتاج النهائية التي تحتوي فقط على الكود المجمع النهائي وبيئة التشغيل، مما يقلص حجم الصورة من 1.2GB إلى أقل من 90MB ويغلق الثغرات الأمنية.'
    },
    {
      question: 'لماذا يجب تجنب تشغيل التطبيقات داخل الـ Container كمستخدم root؟',
      answer: 'لأنه في حال تمكن المهاجم من اختراق التطبيق أو الهروب من الـ Container (Container Escape)، سيحصل على صلاحيات root كاملة على الخادم المضيف نفسه. استخدام مستخدم محدود مثل nodejs يمنع تلك الكارثة.'
    },
    {
      question: 'ما هو الفرق بين Docker Volume و Bind Mount؟',
      answer: 'الـ Volume يدار بالكامل من محرك Docker ويخزن في مسار مخصص معزول وآمن ومثالي لقواعد البيانات في الإنتاج، بينما الـ Bind Mount يربط مجلداً مباشراً من جهازك بالحاوية وهو مثالي للتطوير الحي وتحديث الكود فوراً (Hot Reloading).'
    }
  ],
  relatedSlugs: [
    'professional-git-github-branching-strategies-cicd',
    'system-design-guide-monolith-to-distributed-scale',
    'building-production-restful-apis-express-clean-architecture'
  ],
  seo: {
    title: 'الدليل العملي لـ Docker لمطوري الويب: Containers و Compose',
    description: 'تعلم Docker لمشاريع الويب خطوة بخطوة: كتابة Multi-stage Dockerfile لـ Next.js و Node.js، وضبط Docker Compose مع قواعد البيانات.',
    keywords: ['Docker', 'Containers', 'Docker Compose', 'Multi Stage Build', 'Node.js Docker', 'DevOps'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/practical-docker-containerization-guide-web-developers',
  },
  content: `## حل أزمة «شغال على جهازي ومش شغال على السيرفر!»

في تطوير البرمجيات التقليدي، يقضي المطورون ساعات طويلة في حل مشاكل اختلاف إصدارات Node.js، والمكتبات المفقودة، واختلاف أنظمة التشغيل بين أجهزة التطوير (macOS / Windows) وخوادم الإنتاج (Linux Ubuntu).

تقوم **Docker** بحزم الكود المصدري، وبيئة التشغيل (Runtime)، والمكتبات، وإعدادات النظام، والاعتماديات بالكامل داخل وحدة معزولة وموحدة تسمى **Container**؛ لتعمل بنفس السلوك والدقة على أي جهاز أو خادم سحابي في العالم.

---

## الحاويات (Containers) مقابل الأجهزة الافتراضية (VMs)

| الخاصية | الحاويات (Docker Containers) | الأجهزة الافتراضية (Virtual Machines) |
| :--- | :--- | :--- |
| **المعمارية** | تشارك نواة نظام التشغيل المضيف (Shared OS Kernel) | تتطلب نظام تشغيل ضيف كامل (Guest OS) لكل جهاز |
| **زمن التشغيل** | أجزاء من الثانية (Milliseconds) | دقائق للإقلاع الكامل |
| **استهلاك الموارد** | خفيف جداً (MBs of RAM) | ثقيل جداً (GBs of RAM & CPU) |
| **حجم الصورة** | عشرات الميجابايتات (Alpine) | عشرات الجيجابايتات |

---

## كتابة Multi-Stage Dockerfile احترافي لـ Next.js و Node.js

\`\`\`dockerfile
# 1. مرحلة الاعتماديات (Dependencies Layer)
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2. مرحلة البناء والترجمة (Build Layer)
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# 3. صورة الإنتاج النهائية فائقة الخفة والأمان (Runner Layer)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# تشغيل كـ Non-Root User للأمان الصارم
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
\`\`\`

---

## إدارة البيئات المعقدة عبر Docker Compose

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=development
      - MONGO_URI=mongodb://db:27017/khamsa_cms
      - REDIS_URL=redis://cache:6379
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
      - cache

  db:
    image: mongo:7.0
    restart: always
    ports:
      - '27017:27017'
    volumes:
      - mongo_data:/data/db

  cache:
    image: redis:7.2-alpine
    restart: always
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

volumes:
  mongo_data:
  redis_data:
\`\`\`

---

## قواعد الأمان الخمس الأساسية للحاويات

1. **لا تشغل الحاوية كـ Root أبداً:** استخدم مستخدم مخصص محدود الصلاحيات.
2. **استخدم صور Minimal ومحدثة:** مثل \`node:20-alpine\` لتقليل مساحة الهجوم.
3. **فحص الثغرات الأمنية تلقائياً:** عبر أدوات مثل \`docker scout\` أو \`Trivy\`.
4. **تجنب حفظ أسرار الـ API داخل الـ Dockerfile:** مررها دائماً عبر Environment Variables أثناء التشغيل.
5. **استخدم \`.dockerignore\`:** لمنع نسخ مجلدات \`node_modules\` و \`.git\` إلى سياق البناء.

---

## الخلاصة وأفضل الممارسات

* استخدم دائماً صور **Alpine Linux** لخفة الحجم والأمان.
* افصل مراحل البناء عن التشغيل عبر Multi-stage builds لتقليل حجم الصورة بنسبة 90%.
* شغّل الحاوية دائماً كـ Non-root user لحماية الخادم السحابي من الاختراق.",`,
};
