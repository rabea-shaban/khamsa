import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article11: StaticArticle = {
  id: 'static-art-11',
  slug: 'advanced-caching-redis-strategies-practical-patterns',
  title: 'الـ Caching المتقدم باستخدام Redis: الاستراتيجيات والتطبيقات العملية والوقاية من الانهيار',
  excerpt: 'الدليل العملي لـ Redis في بيئات الإنتاج: أنماط Cache-Aside و Write-Through، هياكل البيانات المتقدمة (Hashes, Sets, Sorted Sets)، وحل مشاكل Cache Stampede، Cache Penetration، و Cache Avalanche.',
  description: 'دليل احتراف التخزين المؤقت Redis: استراتيجيات Cache-Aside، إدارة الـ TTL، Rate Limiting مع Redis، والوقاية من ظاهرة Cache Stampede في تطبيقات الويب.',
  category: 'Databases',
  tags: ['Redis', 'Caching', 'Performance', 'Backend', 'System Design', 'Databases'],
  keywords: ['Redis بالعربي', 'شرح التخزين المؤقت Caching', 'Cache-Aside Pattern', 'Cache Stampede', 'هياكل بيانات Redis', 'تحسين سرعة السيرفر'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-04-05T10:00:00.000Z',
  updatedAt: '2026-09-20T21:00:00.000Z',
  readTimeMinutes: 26,
  coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'استراتيجيات التخزين المؤقت والـ Caching باستخدام Redis',
  isFeatured: false,
  tableOfContents: [
    { id: 'why-redis', title: 'لماذا Redis أسرع من قواعد البيانات التقليدية بـ 100 ضعف؟', level: 2 },
    { id: 'caching-patterns', title: 'أنماط الـ Caching الأساسية: Cache-Aside و Write-Through و Write-Behind', level: 2 },
    { id: 'data-structures', title: 'هياكل بيانات Redis: متى تستخدم Hashes و Sets و Sorted Sets؟', level: 2 },
    { id: 'cache-disasters', title: 'كوارث الكاش الثلاث: Stampede و Penetration و Avalanche وحلولها', level: 2 },
    { id: 'rate-limiting-redis', title: 'بناء نظام Rate Limiter صارم باستخدام Redis و Sliding Window', level: 2 },
    { id: 'summary', title: 'الخلاصة وأفضل الممارسات', level: 2 },
  ],
  faq: [
    {
      question: 'ما هو الفرق بين نمط Cache-Aside ونمط Write-Through؟',
      answer: 'في Cache-Aside يتحمل التطبيق مسؤولية فحص الكاش وجلب البيانات من قاعدة البيانات عند الـ Cache Miss وتحديث الكاش، بينما في Write-Through يتولى نظام الكاش نفسه كتابة البيانات بالتوازي في الذاكرة وقاعدة البيانات معاً قبل إرجاع النجاح.'
    },
    {
      question: 'كيف نتجنب ظاهرة Cache Avalanche عند انتهاء صلاحية آلاف المفاتيح في نفس اللحظة؟',
      answer: 'بإضافة وقت عشوائي إضافي (Jitter) لكل TTL، مثلاً: TTL = 3600 ثانية + قيمة عشوائية بين 0 إلى 300 ثانية، مما يمنع انتهاء جميع المفاتيح في نفس الثانية وتوزيع الضغط على قاعدة البيانات.'
    },
    {
      question: 'لماذا تعتبر بنية Sorted Sets (ZSET) الخيار المثالي للوحات الصدارة (Leaderboards) والـ Sliding Window؟',
      answer: 'لأنها ترتب العناصر تلقائياً بناءً على Score محدد بزمن تعقيد O(log(N))، مما يسمح بحساب المراتب وحذف السجلات القديمة المنتهية بطلبات ذرية وفائقة السرعة.'
    }
  ],
  relatedSlugs: [
    'system-design-guide-monolith-to-distributed-scale',
    'comprehensive-mongodb-guide-indexing-aggregation-performance',
    'advanced-nodejs-engineering-event-loop-streams-workers'
  ],
  seo: {
    title: 'الـ Caching المتقدم باستخدام Redis: استراتيجيات الإنتاج',
    description: 'دليل هندسي للتخزين المؤقت مع Redis: شرح أنماط Cache-Aside، هياكل البيانات، تجنب Cache Stampede، وبناء Rate Limiter مع أمثلة كود.',
    keywords: ['Redis', 'Caching', 'Cache Aside', 'TTL', 'Rate Limiting', 'Database Optimization'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/advanced-caching-redis-strategies-practical-patterns',
  },
  content: "\"## لماذا Redis أسرع من قواعد البيانات التقليدية بـ 100 ضعف؟\\n\\n**Redis (Remote Dictionary Server)** هي قاعدة بيانات تعمل بالكامل داخل الذاكرة العشوائية (In-Memory Data Store) ذات بنية أحادية المسار (Single-Threaded Event Loop)، مما يمنحها القدرة على معالجة أكثر من 100,000 عملية في الثانية بزمن استجابة أقل من 1 ملي ثانية.\\n\\n---\\n\\n## أنماط الـ Caching الأساسية\\n\\n1. **Cache-Aside (Lazy Loading):** يفحص التطبيق الكاش أولاً، إذا وُجدت البيانات يرجعها (Cache Hit)، وإذا لم توجد (Cache Miss) يجلبها من قاعدة البيانات ويحفظها في الكاش للمرات القادمة.\\n2. **Write-Through:** يكتب التطبيق البيانات في الكاش، والكاش يتولى كتابتها فوراً في قاعدة البيانات بالتوازي.\\n3. **Write-Behind (Write-Back):** يكتب التطبيق في الكاش سريعاً، ويتم تجميع الكتابات وحفظها في قاعدة البيانات في الخلفية بشكل غير متزامن.\\n\\n---\\n\\n## تطبيق نمط Cache-Aside عملياً مع فترات TTL ذكية\\n\\n```typescript\\nimport Redis from 'ioredis';\\n\\nconst redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');\\n\\nexport async function getCachedArticle(slug: string, fetchFromDb: () => Promise<any>) {\\n  const cacheKey = `article:slug:${slug}`;\\n\\n  // 1. فحص الكاش\\n  const cachedData = await redis.get(cacheKey);\\n  if (cachedData) {\\n    return JSON.parse(cachedData); // Cache Hit\\n  }\\n\\n  // 2. Cache Miss: الجلب من قاعدة البيانات\\n  const liveData = await fetchFromDb();\\n  if (!liveData) return null;\\n\\n  // 3. إضافة Jitter لمنع Cache Avalanche\\n  const baseTtlSeconds = 3600; // ساعة\\n  const randomJitter = Math.floor(Math.random() * 300); // 0 إلى 5 دقائق\\n  const finalTtl = baseTtlSeconds + randomJitter;\\n\\n  // 4. الحفظ في Redis مع انتهاء صلاحية\\n  await redis.set(cacheKey, JSON.stringify(liveData), 'EX', finalTtl);\\n\\n  return liveData;\\n}\\n```\\n\\n---\\n\\n## كوارث الكاش الثلاث وحلولها المعمارية\\n\\n* **Cache Stampede (Thundering Herd):** عندما ينتهي مفتاح شهير جداً، فتحاول 10,000 عملية في نفس الجزء من الثانية قراءة قاعدة البيانات. الحل: استخدام **Mutex Locks (Redlock)** أو إعادة تجديد الكاش مبكراً قبل انتهائه (Probabilistic Early Expiration).\\n* **Cache Penetration:** عندما يطلب المهاجم معرفات غير موجودة أصلاً لا في الكاش ولا في الداتا بيز لإرهاق السيرفر. الحل: استخدام **Bloom Filters** أو تخزين القيمة الفارغة `null` في الكاش بـ TTL قصير (60 ثانية).\\n* **Cache Avalanche:** انتهاء صلاحية آلاف المفاتيح في نفس اللحظة مما يؤدي لسقوط قاعدة البيانات. الحل: إضافة وقت عشوائي **Jitter** لكل TTL.\\n\\n---\\n\\n## الخلاصة وأفضل الممارسات\\n\\n* لا تجعل الكاش المصدر الوحيد للبيانات، بل خط دفاع سريع.\\n* ضع دائماً **TTL** لكل مفتاح.\\n* استخدم الـ **Jitter** لتوزيع انتهاء الصلاحية وتفادي الانهيار المتزامن.`\\n\",\n",
};
