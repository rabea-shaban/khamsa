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
  content: "\"## حل أزمة «شغال على جهازي ومش شغال على السيرفر!»\\n\\nفي تطوير البرمجيات التقليدي، يقضي المطورون ساعات طويلة في حل مشاكل اختلاف إصدارات Node.js، والمكتبات المفقودة، واختلاف أنظمة التشغيل بين أجهزة التطوير (macOS / Windows) وخوادم الإنتاج (Linux Ubuntu).\\n\\nتقوم **Docker** بحزم الكود المصدري، وبيئة التشغيل (Runtime)، والمكتبات، وإعدادات النظام، والاعتماديات بالكامل داخل وحدة معزولة وموحدة تسمى **Container**؛ لتعمل بنفس السلوك والدقة على أي جهاز أو خادم سحابي في العالم.\\n\\n---\\n\\n## الحاويات (Containers) مقابل الأجهزة الافتراضية (VMs)\\n\\n| الخاصية | الحاويات (Docker Containers) | الأجهزة الافتراضية (Virtual Machines) |\\n| :--- | :--- | :--- |\\n| **المعمارية** | تشارك نواة نظام التشغيل المضيف (Shared OS Kernel) | تتطلب نظام تشغيل ضيف كامل (Guest OS) لكل جهاز |\\n| **زمن التشغيل** | أجزاء من الثانية (Milliseconds) | دقائق للإقلاع الكامل |\\n| **استهلاك الموارد** | خفيف جداً (MBs of RAM) | ثقيل جداً (GBs of RAM & CPU) |\\n| **حجم الصورة** | عشرات الميجابايتات (Alpine) | عشرات الجيجابايتات |\\n\\n---\\n\\n## كتابة Multi-Stage Dockerfile احترافي لـ Next.js و Node.js\\n\\n```dockerfile\\n# 1. مرحلة الاعتماديات (Dependencies Layer)\\nFROM node:20-alpine AS deps\\nRUN apk add --no-cache libc6-compat\\nWORKDIR /app\\nCOPY package.json package-lock.json ./\\nRUN npm ci\\n\\n# 2. مرحلة البناء والترجمة (Build Layer)\\nFROM node:20-alpine AS builder\\nWORKDIR /app\\nCOPY --from=deps /app/node_modules ./node_modules\\nCOPY . .\\nENV NEXT_TELEMETRY_DISABLED 1\\nRUN npm run build\\n\\n# 3. صورة الإنتاج النهائية فائقة الخفة والأمان (Runner Layer)\\nFROM node:20-alpine AS runner\\nWORKDIR /app\\nENV NODE_ENV production\\nENV NEXT_TELEMETRY_DISABLED 1\\n\\n# تشغيل كـ Non-Root User للأمان الصارم\\nRUN addgroup --system --gid 1001 nodejs\\nRUN adduser --system --uid 1001 nextjs\\n\\nCOPY --from=builder /app/public ./public\\nCOPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./\\nCOPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static\\n\\nUSER nextjs\\nEXPOSE 3000\\nENV PORT 3000\\nENV HOSTNAME \"0.0.0.0\"\\n\\nCMD [\"node\", \"server.js\"]\\n```\\n\\n---\\n\\n## إدارة البيئات المعقدة عبر Docker Compose\\n\\n```yaml\\n# docker-compose.yml\\nversion: '3.8'\\n\\nservices:\\n  app:\\n    build:\\n      context: .\\n      dockerfile: Dockerfile\\n    ports:\\n      - '3000:3000'\\n    environment:\\n      - NODE_ENV=development\\n      - MONGO_URI=mongodb://db:27017/khamsa_cms\\n      - REDIS_URL=redis://cache:6379\\n    volumes:\\n      - .:/app\\n      - /app/node_modules\\n    depends_on:\\n      - db\\n      - cache\\n\\n  db:\\n    image: mongo:7.0\\n    restart: always\\n    ports:\\n      - '27017:27017'\\n    volumes:\\n      - mongo_data:/data/db\\n\\n  cache:\\n    image: redis:7.2-alpine\\n    restart: always\\n    ports:\\n      - '6379:6379'\\n    volumes:\\n      - redis_data:/data\\n\\nvolumes:\\n  mongo_data:\\n  redis_data:\\n```\\n\\n---\\n\\n## قواعد الأمان الخمس الأساسية للحاويات\\n\\n1. **لا تشغل الحاوية كـ Root أبداً:** استخدم مستخدم مخصص محدود الصلاحيات.\\n2. **استخدم صور Minimal ومحدثة:** مثل `node:20-alpine` لتقليل مساحة الهجوم.\\n3. **فحص الثغرات الأمنية تلقائياً:** عبر أدوات مثل `docker scout` أو `Trivy`.\\n4. **تجنب حفظ أسرار الـ API داخل الـ Dockerfile:** مررها دائماً عبر Environment Variables أثناء التشغيل.\\n5. **استخدم `.dockerignore`:** لمنع نسخ مجلدات `node_modules` و `.git` إلى سياق البناء.\\n\\n---\\n\\n## الخلاصة وأفضل الممارسات\\n\\n* استخدم دائماً صور **Alpine Linux** لخفة الحجم والأمان.\\n* افصل مراحل البناء عن التشغيل عبر Multi-stage builds لتقليل حجم الصورة بنسبة 90%.\\n* شغّل الحاوية دائماً كـ Non-root user لحماية الخادم السحابي من الاختراق.\",\n",
};
