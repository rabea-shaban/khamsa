import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article01: StaticArticle = {
  id: 'static-art-01',
  slug: 'modern-javascript-comprehensive-guide-es6-async',
  title: 'الدليل الهندسي الشامل لـ JavaScript الحديثة: من محرك V8 إلى أعماق الـ Event Loop والـ Asynchronous Internals',
  excerpt: 'شرح هندسي معماري مفصل ومبسط بالبلدي لكل ما تحتاجه لاحتراف JavaScript في بيئات الإنتاج: تفكيك محرك V8، الـ Memory Heap، الـ Call Stack، خوارزميات الـ Event Loop، الـ Closures وتجنب Memory Leaks، والبرمجة غير المتزامنة المتقدمة.',
  description: 'تعلم أسرار لغة JavaScript الحديثة من الصفر حتى الاحتراف: شرح Event Loop، Microtasks vs Macrotasks، Closures، Prototypal Inheritance، Promises، وAsync/Await مع أمثلة كود عملية وبحث معماري.',
  category: 'JavaScript',
  tags: ['JavaScript', 'ES6', 'Event Loop', 'Async Programming', 'Web Development', 'Clean Code', 'Performance'],
  keywords: ['JavaScript الحديثة', 'شرح Event Loop باللغة العربية', 'تعلم JavaScript', 'Closures في جافاسكريبت', 'Promises و Async Await', 'محرك V8', 'إدارة الذاكرة في جافاسكريبت'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-09-20T14:30:00.000Z',
  readTimeMinutes: 28,
  coverImage: 'https://images.unsplash.com/photo-1579468118864-ddab3079f04e?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'شرح هندسة لغة JavaScript الحديثة والـ Event Loop',
  isFeatured: true,
  tableOfContents: [
    { id: 'intro', title: 'مقدمة: ما الذي يجعل JavaScript فريدة في عالم البرمجيات؟', level: 2 },
    { id: 'v8-engine', title: 'كيف يقرأ وينفذ المتصفح كود JavaScript؟ (V8 Engine & JIT Compiler)', level: 2 },
    { id: 'callstack-memory', title: 'الذاكرة الداخلية: Memory Heap، Call Stack، ودورة حياة الـ Execution Context', level: 2 },
    { id: 'event-loop', title: 'أسرار الـ Event Loop: الفرق بين Microtasks و Macrotasks و Render Steps', level: 2 },
    { id: 'scope-closures', title: 'الـ Scopes والـ Lexical Environment والـ Closures عملياً مع منع الـ Memory Leaks', level: 2 },
    { id: 'prototypes', title: 'الوراثة في جافاسكريبت: Prototypal Inheritance vs Classes النمطية', level: 2 },
    { id: 'async-evolution', title: 'تطور البرمجة غير المتزامنة: من Callback Hell إلى Promises و Async/Await', level: 2 },
    { id: 'concurrency-patterns', title: 'أنماط التوازي المتقدمة: Promise.allSettled و AbortController و Web Workers', level: 2 },
    { id: 'pitfalls', title: 'أشهر ٥ أخطاء شائعة في JavaScript في بيئات الإنتاج وكيف تتجنبها', level: 2 },
    { id: 'best-practices', title: 'أفضل الممارسات البرمجية (Best Practices) لكتابة كود نظيف وعالي الأداء', level: 2 },
    { id: 'summary', title: 'الخلاصة وخارطة الطريق للمطور المحترف', level: 2 },
  ],
  faq: [
    {
      question: 'لماذا تعتبر JavaScript أحادية المسار (Single-Threaded) ورغم ذلك تعالج آلاف الطلبات في نفس الوقت؟',
      answer: 'لأن JavaScript تنفذ الكود البرمجي الرئيسي على Single Thread داخل الـ Call Stack، بينما تعتمد على Web APIs في المتصفح أو Libuv في Node.js لمعالجة العمليات غير المتزامنة مثل طلبات الشبكة وقراءة الملفات في الخلفية بدون حجب المسار الرئيسي (Non-blocking I/O).'
    },
    {
      question: 'ما هو الفرق العملي بين Microtasks و Macrotasks في الـ Event Loop؟',
      answer: 'الـ Microtasks (مثل وعود Promise.then والـ MutationObserver) لها أولوية قصوى ويتم تفريغ طابورها بالكامل بعد كل مهمة متزامنة مباشرة وقبل رسم الإطار التالي (Render)، بينما الـ Macrotasks (مثل setTimeout و setInterval) تنتظر دورتها التالية في الـ Event Loop.'
    },
    {
      question: 'كيف يتسبب الـ Closure في حدوث تسريب في الذاكرة (Memory Leak)؟',
      answer: 'يحدث تسريب الذاكرة عندما تحتفظ دالة فرعية بمرجع (Reference) لمتغيرات كبيرة الحجم في دالتها الأم بعد انتهاء الحاجة إليها، مما يمنع جامع المهملات (Garbage Collector) من تحرير تلك الذاكرة.'
    },
    {
      question: 'كيف يعمل الـ AbortController لإلغاء طلبات الـ Fetch المعلقة؟',
      answer: 'يقوم AbortController بإنشاء إشارة (signal) يتم تمريرها إلى دالة fetch. عند استدعاء controller.abort()، يتم إلغاء طلب الشبكة فوراً في المتصفح وتحرير الموارد، مما يمنع تعليق الطلبات القديمة عند انتقال المستخدم بين الصفحات.'
    }
  ],
  relatedSlugs: [
    'comprehensive-typescript-guide-types-generics-patterns',
    'react-19-architecture-server-components-advanced-hooks',
    'advanced-nodejs-engineering-event-loop-streams-workers'
  ],
  seo: {
    title: 'الدليل الشامل للـ JavaScript الحديثة: Event Loop و Closures والأداء',
    description: 'شرح هندسي عميق ومبسط باللغة العربية للغة JavaScript: المحرك V8، الـ Event Loop، إدارة الذاكرة، والبرمجة غير المتزامنة مع أمثلة كود حقيقية.',
    keywords: ['JavaScript', 'ES6', 'Event Loop', 'Closures', 'Promises', 'Async Await', 'V8 Engine', 'تعلم البرمجة'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/modern-javascript-comprehensive-guide-es6-async',
  },
  content: `## مقدمة: ما الذي يجعل JavaScript فريدة في عالم البرمجيات؟

تعتبر لغة **JavaScript** اليوم المحرك الرئيسي لشبكة الويب العالمية؛ فهي اللغة الوحيدة التي تنفذ برمجيات الواجهات في متصفحات المليارات، وتدير خوادم الباك إند عبر Node.js و Deno و Bun، وتبني تطبيقات الهاتف وسطح المكتب. ومع هذا الانتشار غير المسبوق، يقع كثير من المطورين في فخ التعامل معها كلغة سطحية معتمدة على النسخ واللصق، متجاهلين العمق الهندسي المذهل الذي يقف وراء محركاتها.

في هذا الدليل الهندسي الموسع في «خمسة برمجة بالبلدي»، سنغوص في المعمارية الداخلية للغة JavaScript: كيف يترجم المحرك كودك إلى نبضات كهربائية في المعالج، كيف يدير الذاكرة، وسر الـ Event Loop الذي يمنح لغة أحادية المسار القدرة على منافسة أعتى اللغات متعددة الخيوط.

---

## كيف يقرأ وينفذ المتصفح كود JavaScript؟ (V8 Engine & JIT Compiler)

عندما ترسل ملف JavaScript عبر الشبكة إلى متصفح مثل Google Chrome أو Microsoft Edge، يستلمه محرك **V8** (المكتوب بلغة ++C) ويمرره عبر سلسلة إنتاج هندسية دقيقة:

\`\`\`text
[ كود JavaScript المصدري ]
            │
            ▼
[ Scanner / Lexer ] ──> يفكك الكود إلى Tokens مجردة
            │
            ▼
[ Parser ] ───────────> يبني شجرة النحو المجردة (Abstract Syntax Tree - AST)
            │
            ▼
[ Ignition Interpreter ] ──> يولد وينفذ Bytecode فورياً وسريعاً
            │
            ▼ (مراقبة الدوال المتكررة Hot Functions)
[ TurboFan Optimizing Compiler ] ──> ينتج Machine Code فائق السرعة للمعالج
\`\`\`

### 1. التحليل اللغوي والمعجمي (Lexical Analysis & Parsing)
يقوم الـ Scanner بتحويل النص البرمجي إلى Tokens (مثل: \`const\`, \`variableName\`, \`=\`, \`function\`). بعد ذلك، يبني الـ Parser شجرة **AST** التي تصف العلاقات المنطقية والـ Scopes والقواعد النحوية للكود. إذا وجد خطأ نحوي، يتوقف المحرك فوراً ويرمي \`SyntaxError\` قبل بدء تشغيل سطر واحد.

### 2. المفسر السريع (Ignition Bytecode Interpreter)
بدلاً من قضاء وقت طويل في تجميع الكود بالكامل، يقوم مفسر Ignition بتحويل شجرة الـ AST إلى **Bytecode** مدمج وسريع، ويبدأ في تنفيذه مباشرة، مما يمنح المستخدمين بداية تشغيل فورية (Fast Startup Time).

### 3. المجمع المحسن الموجه بالأنواع (TurboFan JIT Compiler)
أثناء تشغيل الـ Bytecode، يقوم محرك V8 بجمع معلومات إحصائية (Type Feedback Profiling). إذا لاحظ المحرك أن دالة معينة يتم استدعاؤها آلاف المرات ودائماً تستقبل نفس نوع المعاملات (مثلاً أرقام صحيحة)، يرسلها إلى **TurboFan** ليقوم بتجميعها إلى كود آلة مباشر (Optimized Machine Code).

> **نصيحة هندسية للأداء:** إذا قمت بتغيير نوع المدخلات فجأة (مثلاً تمرير String لدالة اعتادت استقبال Numbers)، يُجبر TurboFan على التراجع الفوري (De-optimization) والعودة إلى المفسر البطيء، مما يسبب هبوطاً مفاجئاً في أداء التطبيق!

---

## الذاكرة الداخلية: Memory Heap، Call Stack، والـ Execution Context

لكي تفهم أين تعيش متغيراتك، يجب أن تفهم الهيكلين الأساسيين للذاكرة في محرك V8:

### 1. الـ Memory Heap (كومة الذاكرة غير المنظمة)
مساحة ذاكرة كبيرة وغير مرتبة، يتم فيها حجز مواقع للكائنات ذات الأحجام الديناميكية مثل: الكائنات (Objects)، المصفوفات (Arrays)، والدوال (Functions). لا يتم الوصول إليها بنظام ترتيبي بل عبر عناوين الذاكرة (Memory References).

### 2. الـ Call Stack (مكدس الاستدعاءات المنظم)
هيكل بيانات يعمل بنظام **LIFO** (Last In, First Out). يتم استخدامه لتتبع الدوال التي يتم تنفيذها حالياً في البرنامج، وتخزين المتغيرات الأولية (Primitives مثل: numbers, booleans, strings).

\`\`\`typescript
interface UserProfile {
  id: string;
  name: string;
}

function calculateScore(base: number, multiplier: number): number {
  const bonus = 10;
  return (base * multiplier) + bonus;
}

function processUser(user: UserProfile): void {
  const finalScore = calculateScore(50, 2);
  console.log(\`المستخدم \\\${user.name} حقق نتيجة: \\\${finalScore}\`);
}

const currentUser: UserProfile = { id: 'usr_1', name: 'ربيع' };
processUser(currentUser);
\`\`\`

### دورة حياة إطار التنفيذ (Execution Context Lifecycle):
1. **Creation Phase (مرحلة الإنشاء والـ Hoisting):** يقوم المحرك بحجز مساحات للمتغيرات والدوال، ويهيئ متغيرات \`var\` بقيمة \`undefined\`، بينما يضع متغيرات \`let\` و \`const\` في منطقة تسمى **Temporal Dead Zone (TDZ)**، ويهيئ تعريفات الدوال بالكامل.
2. **Execution Phase (مرحلة التنفيذ):** يبدأ بتعيين القيم الحقيقية وتنفيذ الأسطر البرمجية سطراً بسطر داخل الـ Call Stack.

---

## أسرار الـ Event Loop: الفرق بين Microtasks و Macrotasks و Render Steps

السر الذي يجعل JavaScript قادرة على معالجة ملايين الطلبات دون أن تتجمد الشاشة هو معمارية **Event Loop**:

\`\`\`text
┌─────────────────────────────────────────────────────────┐
│                       CALL STACK                        │ ──> تنفيذ الكود المتزامن
└────────────────────────────┬────────────────────────────┘
                             │ عندما يفرغ المكدس تماماً (Stack is Empty)
                             ▼
┌─────────────────────────────────────────────────────────┐
│                 MICROTASKS QUEUE (أولوية 1)             │ ──> Promises, queueMicrotask, MutationObserver
└────────────────────────────┬────────────────────────────┘
                             │ يتم تفريغ الطابور كاملاً حتى الصفر!
                             ▼
┌─────────────────────────────────────────────────────────┐
│                     ANIMATION FRAMES                    │ ──> requestAnimationFrame
└────────────────────────────┬────────────────────────────┘
                             │ تحديث شاشة العميل ورسم الـ DOM
                             ▼
┌─────────────────────────────────────────────────────────┐
│                  MACROTASKS QUEUE (أولوية 2)            │ ──> setTimeout, setInterval, I/O Events
└─────────────────────────────────────────────────────────┘
                             │ تنفيذ مهمة واحدة فقط ثم إعادة الدورة
\`\`\`

### تجربة معملية تفكيكية:

\`\`\`javascript
console.log('1. بداية الكود المتزامن');

setTimeout(() => {
  console.log('2. مهلة زمنية (Macrotask 1)');
  Promise.resolve().then(() => {
    console.log('3. وعد متولد داخل المهلة (Microtask داخل Macrotask)');
  });
}, 0);

queueMicrotask(() => {
  console.log('4. ميكرو تاسك مباشر (Microtask 1)');
});

Promise.resolve()
  .then(() => {
    console.log('5. وعد أول (Microtask 2)');
    return 'بيانات إضافية';
  })
  .then((data) => {
    console.log('6. وعد متسلسل (Microtask 3) مع:', data);
  });

console.log('7. نهاية الكود المتزامن');
\`\`\`

**الترتيب الهندسي الدقيق للمخرجات:**
1. \`1. بداية الكود المتزامن\` (من الـ Call Stack مباشرة)
2. \`7. نهاية الكود المتزامن\` (من الـ Call Stack مباشرة)
3. \`4. ميكرو تاسك مباشر\` (أول عنصر في طابور الـ Microtasks)
4. \`5. وعد أول\` (ثاني عنصر في الـ Microtasks)
5. \`6. وعد متسلسل\` (تمت جدولته أثناء تفريغ الـ Microtasks فنفذ فوراً قبل الانتقال للماكرو)
6. \`2. مهلة زمنية\` (انتقل الـ Event Loop لطابور الـ Macrotasks ونفذ أول مهمة)
7. \`3. وعد متولد داخل المهلة\` (أفرغ الـ Microtask المتولد فور انتهاء الـ Macrotask)

---

## الـ Scopes والـ Lexical Environment والـ Closures عملياً

الـ **Closure** هو الرابط السحري الذي يحتفظ به التابع الفرعي ببيئته المعجمية (Lexical Environment) التي نشأ فيها:

### تطبيق عملي متقدم: بناء نظام State Hook مصغر (شبيه بـ React useState)

\`\`\`typescript
const MiniReact = (function () {
  let stateValue: any; // يحتفظ بالحالة في الـ Closure الخاص بالموديول

  return {
    useState<T>(initialValue: T): [T, (newValue: T) => void] {
      if (stateValue === undefined) {
        stateValue = initialValue;
      }

      const setState = (newValue: T) => {
        stateValue = newValue;
        console.log('[MiniReact] تم تحديث الحالة إلى:', stateValue);
      };

      return [stateValue, setState];
    },
  };
})();

// استخدام الـ MiniReact
const [count, setCount] = MiniReact.useState<number>(0);
console.log('القيمة الأولية:', count); // 0
setCount(5); // [MiniReact] تم تحديث الحالة إلى: 5
\`\`\`

### كيفية تجنب الـ Memory Leaks الناتجة عن الـ Closures:
إذا كانت الدالة الخارجية تنشئ مصفوفات ضخمة، واحتفظت الدالة الداخلية بمرجع لدالة ما، فقد تمنع جامع المهملات (Garbage Collector) من تحرير تلك المصفوفة. الحل هو مسح المراجع غير المطلوبة بتعيينها إلى \`null\` عند الانتهاء.

---

## الوراثة في جافاسكريبت: Prototypal Inheritance vs Classes

\`\`\`typescript
// وراثة السلسلة النماذجية Prototype Chain
interface Animal {
  speak: () => string;
}

const animalProto = {
  isAlive: true,
  speak() {
    return 'صوت حيوان عام';
  },
};

const dog = Object.create(animalProto);
dog.breed = 'Golden Retriever';
dog.speak = function () {
  return 'هوهو!';
};

console.log(dog.speak()); // هوهو! (تم العثور عليها في الكائن نفسه)
console.log(dog.isAlive); // true (صعد المحرك في الـ Prototype Chain ووجدها في animalProto)
\`\`\`

---

## أنماط التوازي المتقدمة وإلغاء الطلبات عبر AbortController

\`\`\`typescript
async function fetchWithTimeout(url: string, timeoutMs = 5000): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(\`فشل الطلب: \\\${res.status}\`);
    return await res.json();
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      throw new Error(\`تجاوز الطلب المهلة الزمنية المحددة (\\\${timeoutMs}ms)\`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId); // تنظيف المؤقت لمنع تسريب الموارد
  }
}
\`\`\`

---

## أشهر ٥ أخطاء شائعة في بيئات الإنتاج

1. **إهمال معالجة أخطاء الـ Unhandled Promise Rejections:** دائماً تأكد من وجود \`try/catch\` حول استدعاءات \`await\`، واستمع لحدث \`window.addEventListener('unhandledrejection', ...)\`.
2. **المقارنة غير الصارمة (Loose Equality \`==\`):** تسبب تحويل أنواع غير متوقع وكوارث أمنية.
3. **التعديل المباشر على مصفوفات الـ State (Object Mutation):** يؤدي لعدم استشعار التغييرات في أطر العمل مثل React. دائماً استخدم النسخ غير القابل للتعديل (Immutable Patterns).
4. **تسريبات الـ Event Listeners:** نسيان استدعاء \`removeEventListener\` عند تفكيك المكونات.
5. **استخدام المتغيرات العامة (Global Scope Pollution):** يؤدي لتداخل البيانات بين الجلسات.

---

## الخلاصة وخارطة طريق المطور المحترف

إتقان لغة JavaScript لا يتوقف عند معرفة الصيغ النحوية (Syntax)، بل يبدأ من فهم كيفية تعامل المحرك مع المكدس والذاكرة وإدارة الأحداث. بهذه المعرفة، تصبح قادراً على كتابة برمجيات تتحمل ضغط ملايين الزيارات وتستجيب في أجزاء من الألف من الثانية.
  \`
",`,
};
