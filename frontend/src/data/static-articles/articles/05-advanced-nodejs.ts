import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article05: StaticArticle = {
  id: 'static-art-05',
  slug: 'advanced-nodejs-engineering-event-loop-streams-workers',
  title: 'هندسة Node.js المتقدمة: الـ Event Loop، والـ Streams، والـ Worker Threads، وإدارة الذاكرة',
  excerpt: 'دليل مهندسي الـ Backend المتقدم لفهم محرك Node.js ومكتبة Libuv: كيف تعمل مراحل الـ Event Loop الست، وكيف تعالج ملفات الجيجابايت بكفاءة عبر Streams، وتفادي حجب الـ Main Thread باستخدام Worker Threads.',
  description: 'دليل شامل لاحتراف Node.js المتقدم في الإنتاج: شرح مراحل Event Loop الستة، Libuv، Buffer والتدفقات Streams، إدارة الذاكرة، وWorker Threads مع أمثلة كود.',
  category: 'Node.js',
  tags: ['Node.js', 'Backend', 'Event Loop', 'Streams', 'Concurrency', 'Performance'],
  keywords: ['Node.js بالعربي', 'شرح Event Loop في Node.js', 'Libuv', 'Node.js Streams', 'Worker Threads', 'معمارية الـ Backend'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-02-18T10:00:00.000Z',
  updatedAt: '2026-09-20T17:30:00.000Z',
  readTimeMinutes: 27,
  coverImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'هندسة Node.js والـ Event Loop والـ Streams',
  isFeatured: true,
  tableOfContents: [
    { id: 'nodejs-architecture', title: 'المعمارية الداخلية لـ Node.js: محرك V8 ومكتبة Libuv', level: 2 },
    { id: 'event-loop-phases', title: 'مراحل الـ Event Loop الستة بالتفصيل الدقيق', level: 2 },
    { id: 'streams-deep-dive', title: 'احتراف الـ Streams: معالجة البيانات الضخمة بدون استهلاك الذاكرة', level: 2 },
    { id: 'backpressure', title: 'إدارة الـ Backpressure وحماية الخادم من الانهيار', level: 2 },
    { id: 'concurrency-workers', title: 'المعالجة المتوازية: Cluster Module مقابل Worker Threads', level: 2 },
    { id: 'memory-leaks', title: 'كشف وإصلاح تسريبات الذاكرة (Memory Leaks Profiling)', level: 2 },
    { id: 'production-tips', title: 'أفضل الممارسات لتشغيل تطبيقات Node.js في الإنتاج', level: 2 },
    { id: 'summary', title: 'الخلاصة وخاتمة المقال', level: 2 },
  ],
  faq: [
    {
      question: 'ما هي المراحل الستة للـ Event Loop في Node.js بترتيب تنفيذها؟',
      answer: 'المراحل هي: 1. Timers (تنفيذ callbacks الخاصة بـ setTimeout و setInterval)، 2. Pending Callbacks (عمليات I/O المؤجلة)، 3. Idle, Prepare (استخدام داخلي)، 4. Poll (جلب واستقبال أحداث I/O الجديدة)، 5. Check (تنفيذ setImmediate)، 6. Close Callbacks (إغلاق المقابس socket.on("close")).'
    },
    {
      question: 'متى نفضل استخدام Worker Threads بدلاً من الـ Cluster Module؟',
      answer: 'نستخدم Worker Threads عندما يكون لدينا عمليات حسابية معقدة تستهلك المعالج (CPU-intensive tasks) مثل تشفير الملفات، معالجة الصور، أو خوارزميات الذكاء الاصطناعي مع مشاركة الذاكرة عبر SharedArrayBuffer، بينما يُستخدم Cluster لمضاعفة عمليات الخادم عبر عدة Cores لمعالجة طلبات الشبكة (I/O).'
    },
    {
      question: 'كيف تحل Streams مشكلة استهلاك الذاكرة عند قراءة ملفات كبيرة؟',
      answer: 'بدلاً من تحميل الملف بالكامل في الـ RAM دفعة واحدة (عبر fs.readFile)، تقوم الـ Streams بقراءة ومعالجة البيانات على هيئة أجزاء صغيرة (Chunks) بحجم 64KB افتراضياً، وتمريرها فوراً، مما يبقي استهلاك الذاكرة ثابتاً وضئيلاً جداً بغض النظر عن حجم الملف.'
    }
  ],
  relatedSlugs: [
    'modern-javascript-comprehensive-guide-es6-async',
    'building-production-restful-apis-express-clean-architecture',
    'system-design-guide-monolith-to-distributed-scale'
  ],
  seo: {
    title: 'هندسة Node.js المتقدمة: Event Loop و Streams و Worker Threads',
    description: 'شرح هندسي معماري لـ Node.js: تفكيك مكتبة Libuv، ومراحل الـ Event Loop، وهندسة الـ Streams والـ Backpressure مع تطبيقات عملية.',
    keywords: ['Node.js', 'Libuv', 'Event Loop', 'Node Streams', 'Worker Threads', 'Backend Architecture'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/advanced-nodejs-engineering-event-loop-streams-workers',
  },
  content: "\"## المعمارية الداخلية لـ Node.js: محرك V8 ومكتبة Libuv\\n\\nكثير من المطورين يعتقدون أن **Node.js** هي مجرد بيئة تشغيل لجافاسكريبت، لكن الحقيقة المعمارية أنها نظام هجين قوي مبني من:\\n* **V8 Engine (C++):** مسؤول عن ترجمة وتنفيذ كود JavaScript وإدارة الذاكرة والـ Garbage Collection.\\n* **Libuv (C Library):** القلب النابض لـ Node.js؛ وهي المسؤولة عن توفير الـ Event Loop، ومسارات العمل الموازية في الـ Thread Pool (4 Threads افتراضياً قابلة للزيادة عبر UV_THREADPOOL_SIZE)، والتعامل مع استدعاءات نظام التشغيل غير المحجوبة (Asynchronous Non-blocking I/O).\\n\\n```text\\n┌─────────────────────────────────────────────────────────────┐\\n│                    JavaScript Application                   │\\n├──────────────────────────────┬──────────────────────────────┤\\n│       V8 Engine (JS)         │     Node.js Core (C++/JS)    │\\n├──────────────────────────────┴──────────────────────────────┤\\n│                  LIBUV (Event Loop & Thread Pool)           │\\n├──────────────────────────────┬──────────────────────────────┤\\n│     Operating System APIs    │        Hardware & CPU        │\\n└──────────────────────────────┴──────────────────────────────┘\\n```\\n\\n---\\n\\n## مراحل الـ Event Loop الستة بالتفصيل الدقيق\\n\\nفي كل دورة (Tick) يقوم بها الـ Event Loop، يمر بالمراحل التالية بدقة متناهية:\\n\\n1. **Timers Phase:** تفحص المؤقتات التي انتهت مهلتها (`setTimeout` و `setInterval`).\\n2. **Pending Callbacks:** تنفذ استدعاءات أخطاء النظام المؤجلة مثل `ECONNREFUSED`.\\n3. **Idle, Prepare:** عمليات تهيئة وتحسين داخلية لمحرك Node.js.\\n4. **Poll Phase:** المرحلة الأهم؛ حيث ينتظر المحرك أحداث الشبكة والملفات الجديدة وينفذ الاستدعاءات المرتبطة بها.\\n5. **Check Phase:** مخصصة حصرياً لتنفيذ استدعاءات `setImmediate()`.\\n6. **Close Callbacks:** تنفذ أحداث الإغلاق مثل `socket.on('close')`.\\n\\n> **ملاحظة ذهبية:** دالة `process.nextTick()` ووعود `Promise.then()` ليست جزءاً من الـ Event Loop التقليدي؛ بل يتم تفريغ طابورهما فوراً بعد انتهاء العملية الحالية وقبل الانتقال للمرحلة التالية مباشرة!\\n\\n---\\n\\n## احتراف الـ Streams: معالجة الملفات الضخمة\\n\\nعندما تريد معالجة ملف بحجم 5GB، فإن استخدام `fs.readFile` سيؤدي حتماً إلى خطأ `JavaScript heap out of memory`. الحل الهندسي الصحيح هو استخدام **Pipeline Streams**:\\n\\n```typescript\\nimport createReadStream from 'node:fs';\\nimport createWriteStream from 'node:fs';\\nimport { pipeline } from 'node:stream/promises';\\nimport { createGzip } from 'node:zlib';\\n\\nasync function compressLargeLogFile(inputPath: string, outputPath: string): Promise<void> {\\n  console.log('بدء ضغط السجلات الضخمة عبر Pipeline Streams...');\\n\\n  try {\\n    await pipeline(\\n      createReadStream.createReadStream(inputPath, { highWaterMark: 64 * 1024 }), // قراءة أجزاء 64KB\\n      createGzip(), // ضغط مباشر أثناء التدفق\\n      createWriteStream.createWriteStream(outputPath) // كتابة فورية على القرص\\n    );\\n\\n    console.log('✅ اكتملت عملية الضغط بنجاح مع استهلاك ذاكرة لم يتجاوز 30MB!');\\n  } catch (error) {\\n    console.error('❌ فشل تدفق البيانات:', error);\\n    throw error;\\n  }\\n}\\n```\\n\\n---\\n\\n## المعالجة المتوازية: Worker Threads للعمليات الحسابية الثقيلة\\n\\nإذا كنت بحاجة لتشفير ملفات أو حسابات إحصائية ضخمة، استخدم **Worker Threads** لمنع تجمد الخادم:\\n\\n```typescript\\n// main-server.ts\\nimport { Worker } from 'node:worker_threads';\\nimport express from 'express';\\n\\nconst app = express();\\n\\nfunction runHeavyWorker(data: number[]): Promise<number> {\\n  return new Promise((resolve, reject) => {\\n    const worker = new Worker('./dist/workers/calc-worker.js', {\\n      workerData: data,\\n    });\\n    worker.on('message', resolve);\\n    worker.on('error', reject);\\n    worker.on('exit', code => {\\n      if (code !== 0) reject(new Error(`توقف الـ Worker بكود: ${code}`));\\n    });\\n  });\\n}\\n\\napp.get('/compute', async (req, res) => {\\n  const dataset = Array.from({ length: 5_000_000 }, () => Math.random());\\n  // تنفيذ الحسابات على مسار معالج منفصل تماماً\\n  const result = await runHeavyWorker(dataset);\\n  res.json({ success: true, result });\\n});\\n```\\n\\n---\\n\\n## كشف وإصلاح تسريبات الذاكرة (Memory Profiling)\\n\\nتحدث تسريبات الذاكرة في Node.js نتيجة الاحتفاظ بمتغيرات عامة أو Event Listeners غير مفككة. استخدم الأمر `--inspect` و Chrome DevTools لأخذ Heap Snapshots ومقارنتها عبر الزمن للعثور على الكائنات التي لا تُحذف.\\n\\n---\\n\\n## الخلاصة وأفضل الممارسات\\n\\nNode.js أداة معمارية جبارة عندما تُستخدم بطريقتها الصحيحة:\\n* لا تحجب الـ Event Loop بأي عملية متزامنة (`fs.readFileSync`).\\n* استخدم Streams دائماً مع البيانات المتدفقة والملفات.\\n* وظف Worker Threads للعمليات الحسابية الثقيلة.\\n* راقب استهلاك الـ Heap Memory ومؤشر Event Loop Lag في بيئات الإنتاج.`\\n\",\n",
};
