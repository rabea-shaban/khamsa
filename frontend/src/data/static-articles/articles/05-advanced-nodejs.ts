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
  coverImage: '/images/articles/05-advanced-nodejs.svg',
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
  content: `## المعمارية الداخلية لـ Node.js: محرك V8 ومكتبة Libuv

كثير من المطورين يعتقدون أن **Node.js** هي مجرد بيئة تشغيل لجافاسكريبت، لكن الحقيقة المعمارية أنها نظام هجين قوي مبني من:
* **V8 Engine (C++):** مسؤول عن ترجمة وتنفيذ كود JavaScript وإدارة الذاكرة والـ Garbage Collection.
* **Libuv (C Library):** القلب النابض لـ Node.js؛ وهي المسؤولة عن توفير الـ Event Loop، ومسارات العمل الموازية في الـ Thread Pool (4 Threads افتراضياً قابلة للزيادة عبر UV_THREADPOOL_SIZE)، والتعامل مع استدعاءات نظام التشغيل غير المحجوبة (Asynchronous Non-blocking I/O).

\`\`\`text
┌─────────────────────────────────────────────────────────────┐
│                    JavaScript Application                   │
├──────────────────────────────┬──────────────────────────────┤
│       V8 Engine (JS)         │     Node.js Core (C++/JS)    │
├──────────────────────────────┴──────────────────────────────┤
│                  LIBUV (Event Loop & Thread Pool)           │
├──────────────────────────────┬──────────────────────────────┤
│     Operating System APIs    │        Hardware & CPU        │
└──────────────────────────────┴──────────────────────────────┘
\`\`\`

---

## مراحل الـ Event Loop الستة بالتفصيل الدقيق

في كل دورة (Tick) يقوم بها الـ Event Loop، يمر بالمراحل التالية بدقة متناهية:

1. **Timers Phase:** تفحص المؤقتات التي انتهت مهلتها (\`setTimeout\` و \`setInterval\`).
2. **Pending Callbacks:** تنفذ استدعاءات أخطاء النظام المؤجلة مثل \`ECONNREFUSED\`.
3. **Idle, Prepare:** عمليات تهيئة وتحسين داخلية لمحرك Node.js.
4. **Poll Phase:** المرحلة الأهم؛ حيث ينتظر المحرك أحداث الشبكة والملفات الجديدة وينفذ الاستدعاءات المرتبطة بها.
5. **Check Phase:** مخصصة حصرياً لتنفيذ استدعاءات \`setImmediate()\`.
6. **Close Callbacks:** تنفذ أحداث الإغلاق مثل \`socket.on('close')\`.

> **ملاحظة ذهبية:** دالة \`process.nextTick()\` ووعود \`Promise.then()\` ليست جزءاً من الـ Event Loop التقليدي؛ بل يتم تفريغ طابورهما فوراً بعد انتهاء العملية الحالية وقبل الانتقال للمرحلة التالية مباشرة!

---

## احتراف الـ Streams: معالجة الملفات الضخمة

عندما تريد معالجة ملف بحجم 5GB، فإن استخدام \`fs.readFile\` سيؤدي حتماً إلى خطأ \`JavaScript heap out of memory\`. الحل الهندسي الصحيح هو استخدام **Pipeline Streams**:

\`\`\`typescript
import createReadStream from 'node:fs';
import createWriteStream from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

async function compressLargeLogFile(inputPath: string, outputPath: string): Promise<void> {
  console.log('بدء ضغط السجلات الضخمة عبر Pipeline Streams...');

  try {
    await pipeline(
      createReadStream.createReadStream(inputPath, { highWaterMark: 64 * 1024 }), // قراءة أجزاء 64KB
      createGzip(), // ضغط مباشر أثناء التدفق
      createWriteStream.createWriteStream(outputPath) // كتابة فورية على القرص
    );

    console.log('✅ اكتملت عملية الضغط بنجاح مع استهلاك ذاكرة لم يتجاوز 30MB!');
  } catch (error) {
    console.error('❌ فشل تدفق البيانات:', error);
    throw error;
  }
}
\`\`\`

---

## المعالجة المتوازية: Worker Threads للعمليات الحسابية الثقيلة

إذا كنت بحاجة لتشفير ملفات أو حسابات إحصائية ضخمة، استخدم **Worker Threads** لمنع تجمد الخادم:

\`\`\`typescript
// main-server.ts
import { Worker } from 'node:worker_threads';
import express from 'express';

const app = express();

function runHeavyWorker(data: number[]): Promise<number> {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./dist/workers/calc-worker.js', {
      workerData: data,
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', code => {
      if (code !== 0) reject(new Error(\`توقف الـ Worker بكود: \${code}\`));
    });
  });
}

app.get('/compute', async (req, res) => {
  const dataset = Array.from({ length: 5_000_000 }, () => Math.random());
  // تنفيذ الحسابات على مسار معالج منفصل تماماً
  const result = await runHeavyWorker(dataset);
  res.json({ success: true, result });
});
\`\`\`

---

## كشف وإصلاح تسريبات الذاكرة (Memory Profiling)

تحدث تسريبات الذاكرة في Node.js نتيجة الاحتفاظ بمتغيرات عامة أو Event Listeners غير مفككة. استخدم الأمر \`--inspect\` و Chrome DevTools لأخذ Heap Snapshots ومقارنتها عبر الزمن للعثور على الكائنات التي لا تُحذف.

---

## الخلاصة وأفضل الممارسات

Node.js أداة معمارية جبارة عندما تُستخدم بطريقتها الصحيحة:
* لا تحجب الـ Event Loop بأي عملية متزامنة (\`fs.readFileSync\`).
* استخدم Streams دائماً مع البيانات المتدفقة والملفات.
* وظف Worker Threads للعمليات الحسابية الثقيلة.
* راقب استهلاك الـ Heap Memory ومؤشر Event Loop Lag في بيئات الإنتاج.\`
",`,
};
