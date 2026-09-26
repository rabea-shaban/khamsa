import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/images/articles');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}


const covers = [
  {
    file: '01-modern-javascript.svg',
    category: 'JavaScript',
    categoryColor: '#F7DF1E',
    titleAr: 'الدليل الهندسي الشامل لـ JavaScript الحديثة',
    subtitleEn: 'V8 Engine • Event Loop • Memory Heap • Async Internals',
    badge: 'ES6+ & Internals',
    iconSvg: `<rect width="48" height="48" rx="8" fill="#F7DF1E"/><text x="24" y="34" font-size="28" font-weight="900" fill="#000" text-anchor="middle" font-family="monospace">JS</text>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#F7DF1E" stroke-opacity="0.3" stroke-width="2"/>
        <text x="25" y="38" fill="#F7DF1E" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">V8 ENGINE &amp; EVENT LOOP INTERNALS</text>
        
        <!-- Memory Heap & Call Stack -->
        <rect x="25" y="60" width="230" height="150" rx="10" fill="#1b202c" stroke="#2d3748"/>
        <text x="40" y="88" fill="#e2e8f0" font-family="monospace" font-size="13" font-weight="bold">🧠 Memory Heap</text>
        <text x="40" y="115" fill="#94a3b8" font-family="monospace" font-size="11">• Object Allocation</text>
        <text x="40" y="135" fill="#94a3b8" font-family="monospace" font-size="11">• Closures &amp; Lexical Env</text>
        <text x="40" y="155" fill="#ef4444" font-family="monospace" font-size="11">• GC (Mark &amp; Sweep)</text>

        <rect x="275" y="60" width="230" height="150" rx="10" fill="#1b202c" stroke="#2d3748"/>
        <text x="290" y="88" fill="#e2e8f0" font-family="monospace" font-size="13" font-weight="bold">🥞 Call Stack (LIFO)</text>
        <rect x="290" y="105" width="200" height="24" rx="4" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6"/>
        <text x="390" y="121" fill="#60a5fa" font-family="monospace" font-size="10" text-anchor="middle">executeAsyncTask()</text>
        <rect x="290" y="135" width="200" height="24" rx="4" fill="#F7DF1E" fill-opacity="0.1" stroke="#F7DF1E"/>
        <text x="390" y="151" fill="#F7DF1E" font-family="monospace" font-size="10" text-anchor="middle">main() Global Context</text>

        <!-- Event Loop Center -->
        <circle cx="265" cy="275" r="45" fill="#1e293b" stroke="#F7DF1E" stroke-width="3" stroke-dasharray="8 4"/>
        <text x="265" y="272" fill="#F7DF1E" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">EVENT</text>
        <text x="265" y="288" fill="#F7DF1E" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">LOOP</text>

        <!-- Microtasks vs Macrotasks -->
        <rect x="25" y="240" width="180" height="150" rx="10" fill="#1b202c" stroke="#10b981"/>
        <text x="35" y="265" fill="#10b981" font-family="monospace" font-size="12" font-weight="bold">⚡ Microtask Queue</text>
        <text x="35" y="290" fill="#a7f3d0" font-family="monospace" font-size="10">1. Promise.then()</text>
        <text x="35" y="310" fill="#a7f3d0" font-family="monospace" font-size="10">2. queueMicrotask()</text>
        <text x="35" y="330" fill="#a7f3d0" font-family="monospace" font-size="10">3. MutationObserver</text>
        <text x="35" y="355" fill="#34d399" font-family="monospace" font-size="9" font-weight="bold">[ Priority: Immediate ]</text>

        <rect x="325" y="240" width="180" height="150" rx="10" fill="#1b202c" stroke="#f59e0b"/>
        <text x="335" y="265" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold">⏱️ Macrotask Queue</text>
        <text x="335" y="290" fill="#fde68a" font-family="monospace" font-size="10">1. setTimeout / Interval</text>
        <text x="335" y="310" fill="#fde68a" font-family="monospace" font-size="10">2. setImmediate (Node)</text>
        <text x="335" y="330" fill="#fde68a" font-family="monospace" font-size="10">3. I/O &amp; UI Events</text>
        <text x="335" y="355" fill="#fbbf24" font-family="monospace" font-size="9" font-weight="bold">[ Priority: Next Cycle ]</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#f59e0b">async function</span> <span style="color:#60a5fa">processPipeline</span>() {',
      '  <span style="color:#94a3b8">// Microtask runs before Macrotask</span>',
      '  <span style="color:#f59e0b">const</span> data = <span style="color:#f59e0b">await</span> <span style="color:#60a5fa">fetchUser</span>(id);',
      '  queueMicrotask(() =&gt; <span style="color:#60a5fa">syncHeap</span>(data));',
      '  setTimeout(() =&gt; <span style="color:#60a5fa">logMetrics</span>(), <span style="color:#f7df1e">0</span>);',
      '}'
    ]
  },
  {
    file: '02-comprehensive-typescript.svg',
    category: 'TypeScript',
    categoryColor: '#3178C6',
    titleAr: 'الدليل الهندسي الشامل لـ TypeScript',
    subtitleEn: 'Generics • Conditional Types • Mapped Types • Type Safety',
    badge: 'Advanced Type System',
    iconSvg: `<rect width="48" height="48" rx="8" fill="#3178C6"/><text x="24" y="34" font-size="28" font-weight="900" fill="#fff" text-anchor="middle" font-family="monospace">TS</text>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#3178C6" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">TYPE ARCHITECTURE &amp; GENERICS</text>
        
        <!-- Type Pipeline Box -->
        <rect x="25" y="60" width="480" height="100" rx="10" fill="#1b202c" stroke="#2d3748"/>
        <text x="40" y="85" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold">type DeepReadonly&lt;T&gt; = T extends Function ? T :</text>
        <text x="60" y="110" fill="#e2e8f0" font-family="monospace" font-size="12">  T extends object ? { readonly [K in keyof T]: DeepReadonly&lt;T[K]&gt; } : T;</text>
        <text x="40" y="140" fill="#10b981" font-family="monospace" font-size="11">✓ Zero Runtime Overhead  •  ✓ Strict Compile-Time Validation</text>

        <!-- Discriminated Union Grid -->
        <rect x="25" y="180" width="230" height="210" rx="10" fill="#1b202c" stroke="#3178C6"/>
        <text x="40" y="205" fill="#60a5fa" font-family="monospace" font-size="12" font-weight="bold">🛡️ Discriminated Unions</text>
        <rect x="35" y="220" width="210" height="40" rx="6" fill="#1e293b"/>
        <text x="45" y="245" fill="#34d399" font-family="monospace" font-size="10">{ state: 'success', data: T }</text>
        <rect x="35" y="270" width="210" height="40" rx="6" fill="#1e293b"/>
        <text x="45" y="295" fill="#f87171" font-family="monospace" font-size="10">{ state: 'error', error: Error }</text>
        <rect x="35" y="320" width="210" height="40" rx="6" fill="#1e293b"/>
        <text x="45" y="345" fill="#fbbf24" font-family="monospace" font-size="10">{ state: 'loading' }</text>

        <rect x="275" y="180" width="230" height="210" rx="10" fill="#1b202c" stroke="#a855f7"/>
        <text x="290" y="205" fill="#c084fc" font-family="monospace" font-size="12" font-weight="bold">🔮 Advanced Type Helpers</text>
        <text x="290" y="235" fill="#e2e8f0" font-family="monospace" font-size="11">• infer ReturnType&lt;T&gt;</text>
        <text x="290" y="265" fill="#e2e8f0" font-family="monospace" font-size="11">• Extract &amp; Exclude&lt;T, U&gt;</text>
        <text x="290" y="295" fill="#e2e8f0" font-family="monospace" font-size="11">• Template Literal Types</text>
        <text x="290" y="325" fill="#e2e8f0" font-family="monospace" font-size="11">• Satisfies Operator</text>
        <text x="290" y="355" fill="#38bdf8" font-family="monospace" font-size="11">• Type Narrowing (is / in)</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#f59e0b">type</span> <span style="color:#38bdf8">Result</span>&lt;<span style="color:#f43f5e">T</span>&gt; = ',
      '  | { <span style="color:#a855f7">status</span>: <span style="color:#10b981">"ok"</span>; <span style="color:#a855f7">data</span>: <span style="color:#f43f5e">T</span> }',
      '  | { <span style="color:#a855f7">status</span>: <span style="color:#10b981">"err"</span>; <span style="color:#a855f7">message</span>: <span style="color:#38bdf8">string</span> };',
      '',
      '<span style="color:#f59e0b">function</span> <span style="color:#60a5fa">unwrap</span>&lt;<span style="color:#f43f5e">T</span>&gt;(<span style="color:#e2e8f0">res</span>: <span style="color:#38bdf8">Result</span>&lt;<span style="color:#f43f5e">T</span>&gt;): <span style="color:#f43f5e">T</span> {',
      '  <span style="color:#f59e0b">if</span> (res.status === <span style="color:#10b981">"err"</span>) <span style="color:#f59e0b">throw</span> res.message;',
      '  <span style="color:#f59e0b">return</span> res.data; <span style="color:#94a3b8">// 100% Typed!</span>',
      '}'
    ]
  },
  {
    file: '03-react-19-architecture.svg',
    category: 'React 19',
    categoryColor: '#61DAFB',
    titleAr: 'معمارية React 19 والـ Server Components',
    subtitleEn: 'Server Actions • use() Hook • Optimistic UI • Compiler',
    badge: 'Next-Gen React',
    iconSvg: `<rect width="48" height="48" rx="8" fill="#20232a"/><ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke="#61DAFB" stroke-width="2"/><ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke="#61DAFB" stroke-width="2" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke="#61DAFB" stroke-width="2" transform="rotate(120 24 24)"/><circle cx="24" cy="24" r="3" fill="#61DAFB"/>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#61DAFB" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#61DAFB" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">REACT 19 COMPONENT ARCHITECTURE</text>
        
        <!-- Server vs Client Split -->
        <rect x="25" y="60" width="230" height="220" rx="10" fill="#1b202c" stroke="#10b981"/>
        <text x="40" y="85" fill="#10b981" font-family="monospace" font-size="12" font-weight="bold">🖥️ Server Component (RSC)</text>
        <text x="40" y="110" fill="#a7f3d0" font-family="monospace" font-size="10">• 0 KB Client JS Bundle</text>
        <text x="40" y="130" fill="#a7f3d0" font-family="monospace" font-size="10">• Direct Database Access</text>
        <text x="40" y="150" fill="#a7f3d0" font-family="monospace" font-size="10">• Streaming SSR Suspense</text>
        <rect x="35" y="170" width="210" height="40" rx="6" fill="#064e3b"/>
        <text x="45" y="195" fill="#34d399" font-family="monospace" font-size="10">async function Feed() { ... }</text>

        <rect x="275" y="60" width="230" height="220" rx="10" fill="#1b202c" stroke="#38bdf8"/>
        <text x="290" y="85" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold">⚡ Client Component ('use client')</text>
        <text x="290" y="110" fill="#bae6fd" font-family="monospace" font-size="10">• Interactive UI &amp; State</text>
        <text x="290" y="130" fill="#bae6fd" font-family="monospace" font-size="10">• Browser DOM &amp; Effects</text>
        <text x="290" y="150" fill="#bae6fd" font-family="monospace" font-size="10">• useActionState() Hook</text>
        <rect x="285" y="170" width="210" height="40" rx="6" fill="#0c4a6e"/>
        <text x="295" y="195" fill="#7dd3fc" font-family="monospace" font-size="10">const [state, formAction] = ...</text>

        <!-- New Features Bar -->
        <rect x="25" y="300" width="480" height="90" rx="10" fill="#1b202c" stroke="#61DAFB"/>
        <text x="40" y="325" fill="#61DAFB" font-family="monospace" font-size="12" font-weight="bold">🚀 React 19 Core Inventions</text>
        <text x="40" y="350" fill="#e2e8f0" font-family="monospace" font-size="11">✨ use(Promise)  •  ✨ useOptimistic()  •  ✨ React Compiler (Auto-memo)</text>
        <text x="40" y="372" fill="#94a3b8" font-family="monospace" font-size="11">No more manual useMemo / useCallback fatigue!</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#f59e0b">import</span> { useOptimistic } <span style="color:#f59e0b">from</span> <span style="color:#10b981">"react"</span>;',
      '',
      '<span style="color:#f59e0b">function</span> <span style="color:#60a5fa">LikeButton</span>({ <span style="color:#e2e8f0">count</span>, <span style="color:#e2e8f0">onLike</span> }) {',
      '  <span style="color:#f59e0b">const</span> [optCount, setOpt] = <span style="color:#60a5fa">useOptimistic</span>(count, (c) =&gt; c + <span style="color:#f7df1e">1</span>);',
      '  <span style="color:#f59e0b">return</span> &lt;<span style="color:#61dafb">button</span> <span style="color:#a855f7">onClick</span>={() =&gt; { setOpt(); <span style="color:#60a5fa">onLike</span>(); }}&gt;',
      '    👍 {optCount}',
      '  &lt;/<span style="color:#61dafb">button</span>&gt;;',
      '}'
    ]
  },
  {
    file: '04-nextjs-app-router.svg',
    category: 'Next.js 15',
    categoryColor: '#ffffff',
    titleAr: 'دليل Next.js 15 App Router الشامل',
    subtitleEn: 'Server Actions • Parallel Routes • Intercepting • Caching',
    badge: 'Full-Stack Architecture',
    iconSvg: `<circle cx="24" cy="24" r="24" fill="#000"/><text x="24" y="33" font-size="24" font-weight="900" fill="#fff" text-anchor="middle" font-family="monospace">N</text>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#ffffff" stroke-opacity="0.3" stroke-width="2"/>
        <text x="25" y="38" fill="#ffffff" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">NEXT.JS 15 APP ROUTER ARCHITECTURE</text>
        
        <!-- App Router Tree -->
        <rect x="25" y="60" width="230" height="330" rx="10" fill="#1b202c" stroke="#334155"/>
        <text x="40" y="85" fill="#f8fafc" font-family="monospace" font-size="12" font-weight="bold">📁 app/ Directory Tree</text>
        <text x="40" y="115" fill="#94a3b8" font-family="monospace" font-size="11">├── layout.tsx <span style="fill:#10b981">(Root Frame)</span></text>
        <text x="40" y="140" fill="#94a3b8" font-family="monospace" font-size="11">├── page.tsx <span style="fill:#38bdf8">(RSC Home)</span></text>
        <text x="40" y="165" fill="#94a3b8" font-family="monospace" font-size="11">├── loading.tsx <span style="fill:#f59e0b">(Suspense)</span></text>
        <text x="40" y="190" fill="#94a3b8" font-family="monospace" font-size="11">├── error.tsx <span style="fill:#ef4444">(Boundary)</span></text>
        <text x="40" y="215" fill="#94a3b8" font-family="monospace" font-size="11">└── (dashboard)/</text>
        <text x="60" y="240" fill="#94a3b8" font-family="monospace" font-size="11">├── @modal/ <span style="fill:#a855f7">(Parallel)</span></text>
        <text x="60" y="265" fill="#94a3b8" font-family="monospace" font-size="11">└── (..)photo/ <span style="fill:#ec4899">(Intercept)</span></text>

        <!-- Server Actions & Caching -->
        <rect x="275" y="60" width="230" height="155" rx="10" fill="#1b202c" stroke="#10b981"/>
        <text x="290" y="85" fill="#10b981" font-family="monospace" font-size="12" font-weight="bold">⚡ Server Actions</text>
        <text x="290" y="110" fill="#e2e8f0" font-family="monospace" font-size="10">'use server';</text>
        <text x="290" y="130" fill="#a7f3d0" font-family="monospace" font-size="10">• Zero REST boilerplates</text>
        <text x="290" y="150" fill="#a7f3d0" font-family="monospace" font-size="10">• revalidatePath('/feed')</text>
        <text x="290" y="170" fill="#a7f3d0" font-family="monospace" font-size="10">• Type-safe form mutations</text>

        <rect x="275" y="235" width="230" height="155" rx="10" fill="#1b202c" stroke="#f59e0b"/>
        <text x="290" y="260" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold">💾 Caching Pipeline</text>
        <text x="290" y="285" fill="#fde68a" font-family="monospace" font-size="10">• Request Memoization</text>
        <text x="290" y="305" fill="#fde68a" font-family="monospace" font-size="10">• Data Cache (fetch cache)</text>
        <text x="290" y="325" fill="#fde68a" font-family="monospace" font-size="10">• Full Route Cache</text>
        <text x="290" y="345" fill="#fde68a" font-family="monospace" font-size="10">• Router Cache (Client)</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#94a3b8">// Server Action in Next.js 15</span>',
      '<span style="color:#f59e0b">export async function</span> <span style="color:#60a5fa">createPost</span>(<span style="color:#e2e8f0">formData</span>: FormData) {',
      '  <span style="color:#10b981">"use server"</span>;',
      '  <span style="color:#f59e0b">const</span> title = formData.get(<span style="color:#10b981">"title"</span>);',
      '  <span style="color:#f59e0b">await</span> db.post.create({ data: { title } });',
      '  <span style="color:#60a5fa">revalidatePath</span>(<span style="color:#10b981">"/articles"</span>);',
      '}'
    ]
  },
  {
    file: '05-advanced-nodejs.svg',
    category: 'Node.js',
    categoryColor: '#339933',
    titleAr: 'أسرار Node.js المتقدمة: من libuv إلى Streams',
    subtitleEn: 'libuv Thread Pool • Event Loop 6 Phases • Worker Threads',
    badge: 'Backend Internals',
    iconSvg: `<rect width="48" height="48" rx="8" fill="#339933"/><text x="24" y="32" font-size="16" font-weight="900" fill="#fff" text-anchor="middle" font-family="monospace">Node</text>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#339933" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#4ade80" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">NODE.JS RUNTIME: V8 + LIBUV ENGINE</text>
        
        <!-- 6 Phases of Libuv -->
        <rect x="25" y="60" width="230" height="330" rx="10" fill="#1b202c" stroke="#334155"/>
        <text x="40" y="85" fill="#4ade80" font-family="monospace" font-size="12" font-weight="bold">🔄 6 Event Loop Phases</text>
        <rect x="35" y="100" width="210" height="32" rx="6" fill="#1e293b"/>
        <text x="45" y="121" fill="#fde047" font-family="monospace" font-size="10">1. Timers (setTimeout)</text>
        <rect x="35" y="140" width="210" height="32" rx="6" fill="#1e293b"/>
        <text x="45" y="161" fill="#93c5fd" font-family="monospace" font-size="10">2. Pending Callbacks (I/O)</text>
        <rect x="35" y="180" width="210" height="32" rx="6" fill="#1e293b"/>
        <text x="45" y="201" fill="#f472b6" font-family="monospace" font-size="10">3. Idle, Prepare</text>
        <rect x="35" y="220" width="210" height="32" rx="6" fill="#1e293b"/>
        <text x="45" y="241" fill="#34d399" font-family="monospace" font-size="10">4. Poll (Incoming I/O)</text>
        <rect x="35" y="260" width="210" height="32" rx="6" fill="#1e293b"/>
        <text x="45" y="281" fill="#fb923c" font-family="monospace" font-size="10">5. Check (setImmediate)</text>
        <rect x="35" y="300" width="210" height="32" rx="6" fill="#1e293b"/>
        <text x="45" y="321" fill="#f87171" font-family="monospace" font-size="10">6. Close Callbacks</text>

        <!-- Worker Threads & Streams -->
        <rect x="275" y="60" width="230" height="155" rx="10" fill="#1b202c" stroke="#38bdf8"/>
        <text x="290" y="85" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold">🧵 Worker Threads</text>
        <text x="290" y="110" fill="#e2e8f0" font-family="monospace" font-size="10">• CPU-intensive tasks</text>
        <text x="290" y="130" fill="#e2e8f0" font-family="monospace" font-size="10">• SharedArrayBuffer</text>
        <text x="290" y="150" fill="#e2e8f0" font-family="monospace" font-size="10">• No blocking Main Loop</text>
        <text x="290" y="170" fill="#4ade80" font-family="monospace" font-size="10">UV_THREADPOOL_SIZE=4</text>

        <rect x="275" y="235" width="230" height="155" rx="10" fill="#1b202c" stroke="#eab308"/>
        <text x="290" y="260" fill="#eab308" font-family="monospace" font-size="12" font-weight="bold">🌊 Streams &amp; Backpressure</text>
        <text x="290" y="285" fill="#fef08a" font-family="monospace" font-size="10">• Readable / Writable / Duplex</text>
        <text x="290" y="305" fill="#fef08a" font-family="monospace" font-size="10">• pipeline(read, gzip, write)</text>
        <text x="290" y="325" fill="#fef08a" font-family="monospace" font-size="10">• 10GB file in 20MB RAM</text>
        <text x="290" y="345" fill="#4ade80" font-family="monospace" font-size="10">highWaterMark: 64KB</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#f59e0b">import</span> { pipeline } <span style="color:#f59e0b">from</span> <span style="color:#10b981">"node:stream/promises"</span>;',
      '<span style="color:#f59e0b">import</span> fs <span style="color:#f59e0b">from</span> <span style="color:#10b981">"node:fs"</span>;',
      '<span style="color:#f59e0b">import</span> zlib <span style="color:#f59e0b">from</span> <span style="color:#10b981">"node:zlib"</span>;',
      '',
      '<span style="color:#f59e0b">await</span> <span style="color:#60a5fa">pipeline</span>(',
      '  fs.<span style="color:#60a5fa">createReadStream</span>(<span style="color:#10b981">"huge-dataset.csv"</span>),',
      '  zlib.<span style="color:#60a5fa">createGzip</span>(),',
      '  fs.<span style="color:#60a5fa">createWriteStream</span>(<span style="color:#10b981">"dataset.csv.gz"</span>)',
      ');'
    ]
  },
  {
    file: '06-express-clean-architecture.svg',
    category: 'Architecture',
    categoryColor: '#00d26a',
    titleAr: 'معمارية Clean Architecture في تطبيقات Express.js',
    subtitleEn: 'Domain-Driven Design • Use Cases • Repositories • DI',
    badge: 'Enterprise Backend',
    iconSvg: `<rect width="48" height="48" rx="8" fill="#1e293b" stroke="#00d26a" stroke-width="2"/><text x="24" y="32" font-size="14" font-weight="900" fill="#00d26a" text-anchor="middle" font-family="monospace">CLEAN</text>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#00d26a" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#00d26a" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">ONION / CLEAN ARCHITECTURE LAYERS</text>
        
        <!-- Concentric Layers -->
        <rect x="25" y="60" width="480" height="330" rx="10" fill="#0f172a" stroke="#334155"/>
        
        <!-- Frameworks & Drivers -->
        <rect x="40" y="75" width="450" height="60" rx="8" fill="#1e293b" stroke="#64748b"/>
        <text x="55" y="100" fill="#94a3b8" font-family="monospace" font-size="11" font-weight="bold">🌐 Frameworks &amp; Drivers: Express.js Routes / HTTP / Mongoose / Redis</text>
        <text x="55" y="120" fill="#64748b" font-family="monospace" font-size="10">External interfaces and database adapters</text>

        <!-- Interface Adapters -->
        <rect x="60" y="150" width="410" height="60" rx="8" fill="#0f291e" stroke="#10b981"/>
        <text x="75" y="175" fill="#34d399" font-family="monospace" font-size="11" font-weight="bold">🎮 Interface Adapters: Controllers / Presenters / Repositories Impl</text>
        <text x="75" y="195" fill="#6ee7b7" font-family="monospace" font-size="10">Converts data between use cases and web models</text>

        <!-- Use Cases (Application Business Rules) -->
        <rect x="80" y="225" width="370" height="60" rx="8" fill="#1e1b4b" stroke="#818cf8"/>
        <text x="95" y="250" fill="#a5b4fc" font-family="monospace" font-size="11" font-weight="bold">⚙️ Application Business Rules: Use Cases (CreateOrder, AuthUser)</text>
        <text x="95" y="270" fill="#c7d2fe" font-family="monospace" font-size="10">Coordinates the flow of data to and from entities</text>

        <!-- Entities (Enterprise Business Rules) -->
        <rect x="100" y="300" width="330" height="50" rx="8" fill="#3b0764" stroke="#d8b4fe"/>
        <text x="115" y="325" fill="#f0abfc" font-family="monospace" font-size="11" font-weight="bold">💎 Enterprise Entities: Domain Models &amp; Value Objects</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#94a3b8">// Pure Domain Use Case - Zero Express Dependency</span>',
      '<span style="color:#f59e0b">export class</span> <span style="color:#38bdf8">RegisterUserUseCase</span> {',
      '  <span style="color:#f59e0b">constructor</span>(<span style="color:#f59e0b">private</span> <span style="color:#e2e8f0">userRepo</span>: IUserRepository) {}',
      '  <span style="color:#f59e0b">async</span> <span style="color:#60a5fa">execute</span>(<span style="color:#e2e8f0">dto</span>: CreateUserDTO): Promise&lt;User&gt; {',
      '    <span style="color:#f59e0b">const</span> user = User.<span style="color:#60a5fa">create</span>(dto);',
      '    <span style="color:#f59e0b">return</span> <span style="color:#f59e0b">await</span> <span style="color:#f59e0b">this</span>.userRepo.<span style="color:#60a5fa">save</span>(user);',
      '  }',
      '}'
    ]
  },
  {
    file: '07-comprehensive-mongodb.svg',
    category: 'MongoDB',
    categoryColor: '#47A248',
    titleAr: 'دليل MongoDB الشامل: الفهرسة والـ Aggregation',
    subtitleEn: 'Compound Indexes • Aggregation Pipeline • Replica Sets',
    badge: 'NoSQL Database',
    iconSvg: `<path d="M24 4C24 4 10 18 10 28C10 36 16 44 24 44C32 44 38 36 38 28C38 18 24 4 24 4Z" fill="#47A248"/><path d="M24 4V44C32 44 38 36 38 28C38 18 24 4 24 4Z" fill="#3FA037"/>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#47A248" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#4ade80" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">MONGODB AGGREGATION &amp; INDEX TREE</text>
        
        <!-- Aggregation Pipeline Stages -->
        <rect x="25" y="60" width="480" height="170" rx="10" fill="#1b202c" stroke="#2d3748"/>
        <text x="40" y="85" fill="#4ade80" font-family="monospace" font-size="12" font-weight="bold">⚡ Aggregation Pipeline Flow</text>

        <!-- Stage 1: $match -->
        <rect x="40" y="100" width="95" height="60" rx="6" fill="#064e3b" stroke="#10b981"/>
        <text x="87" y="125" fill="#6ee7b7" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">$match</text>
        <text x="87" y="145" fill="#a7f3d0" font-family="monospace" font-size="9" text-anchor="middle">Filter Docs</text>

        <text x="145" y="135" fill="#4ade80" font-family="monospace" font-size="16">➔</text>

        <!-- Stage 2: $group -->
        <rect x="160" y="100" width="95" height="60" rx="6" fill="#1e1b4b" stroke="#818cf8"/>
        <text x="207" y="125" fill="#c7d2fe" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">$group</text>
        <text x="207" y="145" fill="#e0e7ff" font-family="monospace" font-size="9" text-anchor="middle">Accumulate</text>

        <text x="265" y="135" fill="#4ade80" font-family="monospace" font-size="16">➔</text>

        <!-- Stage 3: $project -->
        <rect x="280" y="100" width="95" height="60" rx="6" fill="#451a03" stroke="#f59e0b"/>
        <text x="327" y="125" fill="#fde68a" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">$project</text>
        <text x="327" y="145" fill="#fef3c7" font-family="monospace" font-size="9" text-anchor="middle">Shape Schema</text>

        <text x="385" y="135" fill="#4ade80" font-family="monospace" font-size="16">➔</text>

        <!-- Stage 4: $sort -->
        <rect x="400" y="100" width="95" height="60" rx="6" fill="#4c0519" stroke="#f43f5e"/>
        <text x="447" y="125" fill="#fecdd3" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">$sort</text>
        <text x="447" y="145" fill="#ffe4e6" font-family="monospace" font-size="9" text-anchor="middle">Top Results</text>

        <text x="40" y="200" fill="#38bdf8" font-family="monospace" font-size="11">Execution Plan: IXSCAN (B-Tree) ➔ 0ms In-Memory Stage</text>

        <!-- B-Tree Index Box -->
        <rect x="25" y="245" width="480" height="145" rx="10" fill="#1b202c" stroke="#47A248"/>
        <text x="40" y="270" fill="#4ade80" font-family="monospace" font-size="12" font-weight="bold">🌳 Compound Index Architecture: { status: 1, createdAt: -1 }</text>
        <text x="40" y="295" fill="#e2e8f0" font-family="monospace" font-size="11">• ESR Rule (Equality ➔ Sort ➔ Range)</text>
        <text x="40" y="320" fill="#e2e8f0" font-family="monospace" font-size="11">• Partial &amp; TTL Indexes for Auto-cleanup</text>
        <text x="40" y="345" fill="#34d399" font-family="monospace" font-size="11">• Replica Sets: 1 Primary (Writes) + 2 Secondaries (Reads)</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#94a3b8">// High-Performance MongoDB Aggregation</span>',
      '<span style="color:#f59e0b">await</span> db.orders.<span style="color:#60a5fa">aggregate</span>([',
      '  { <span style="color:#a855f7">$match</span>: { <span style="color:#38bdf8">status</span>: <span style="color:#10b981">"PAID"</span>, <span style="color:#38bdf8">total</span>: { <span style="color:#a855f7">$gte</span>: <span style="color:#f7df1e">100</span> } } },',
      '  { <span style="color:#a855f7">$group</span>: { <span style="color:#38bdf8">_id</span>: <span style="color:#10b981">"$userId"</span>, <span style="color:#38bdf8">totalSpent</span>: { <span style="color:#a855f7">$sum</span>: <span style="color:#10b981">"$total"</span> } } },',
      '  { <span style="color:#a855f7">$sort</span>: { <span style="color:#38bdf8">totalSpent</span>: -<span style="color:#f7df1e">1</span> } },',
      '  { <span style="color:#a855f7">$limit</span>: <span style="color:#f7df1e">10</span> }',
      ']);'
    ]
  },
  {
    file: '08-web-security-owasp.svg',
    category: 'Security',
    categoryColor: '#ef4444',
    titleAr: 'أمان الويب الشامل وحماية تطبيقات الويب (OWASP)',
    subtitleEn: 'XSS • CSRF • SQLi • Rate Limiting • Security Headers',
    badge: 'AppSec & Hardening',
    iconSvg: `<path d="M24 4L6 12V22C6 33 14 43 24 46C34 43 42 33 42 22V12L24 4Z" fill="#ef4444"/><path d="M20 24L24 28L32 18" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#ef4444" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#f87171" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">OWASP TOP 10 DEFENSE ARCHITECTURE</text>
        
        <rect x="25" y="60" width="480" height="95" rx="10" fill="#1b202c" stroke="#dc2626"/>
        <text x="40" y="85" fill="#f87171" font-family="monospace" font-size="12" font-weight="bold">🛡️ Defense in Depth Strategy</text>
        <text x="40" y="110" fill="#e2e8f0" font-family="monospace" font-size="11">• Content Security Policy (CSP) with Nonce</text>
        <text x="40" y="132" fill="#e2e8f0" font-family="monospace" font-size="11">• SameSite=Strict Cookies • CORS Whitelist</text>

        <!-- Security Matrix -->
        <rect x="25" y="170" width="230" height="220" rx="10" fill="#1b202c" stroke="#f59e0b"/>
        <text x="40" y="195" fill="#fbbf24" font-family="monospace" font-size="12" font-weight="bold">🚫 Attack Vectors</text>
        <text x="40" y="225" fill="#fca5a5" font-family="monospace" font-size="11">❌ Stored &amp; Reflected XSS</text>
        <text x="40" y="255" fill="#fca5a5" font-family="monospace" font-size="11">❌ CSRF Request Hijack</text>
        <text x="40" y="285" fill="#fca5a5" font-family="monospace" font-size="11">❌ SQL &amp; NoSQL Injection</text>
        <text x="40" y="315" fill="#fca5a5" font-family="monospace" font-size="11">❌ Broken Object Auth (BOLA)</text>
        <text x="40" y="345" fill="#fca5a5" font-family="monospace" font-size="11">❌ SSRF &amp; Prototype Pollution</text>

        <rect x="275" y="170" width="230" height="220" rx="10" fill="#1b202c" stroke="#10b981"/>
        <text x="290" y="195" fill="#34d399" font-family="monospace" font-size="12" font-weight="bold">✅ Applied Mitigations</text>
        <text x="290" y="225" fill="#86efac" font-family="monospace" font-size="11">✔ DOMPurify &amp; Escaping</text>
        <text x="290" y="255" fill="#86efac" font-family="monospace" font-size="11">✔ CSRF Double-Submit Tokens</text>
        <text x="290" y="285" fill="#86efac" font-family="monospace" font-size="11">✔ Parameterized Prepared Queries</text>
        <text x="290" y="315" fill="#86efac" font-family="monospace" font-size="11">✔ Token Claims Scope Auth</text>
        <text x="290" y="345" fill="#86efac" font-family="monospace" font-size="11">✔ Object.freeze &amp; Input Schemas</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#94a3b8">// Express Security Hardening Stack</span>',
      '<span style="color:#60a5fa">app</span>.<span style="color:#60a5fa">use</span>(helmet({',
      '  <span style="color:#38bdf8">contentSecurityPolicy</span>: {',
      '    <span style="color:#38bdf8">directives</span>: {',
      '      <span style="color:#38bdf8">defaultSrc</span>: [<span style="color:#10b981">"\'self\'"</span>],',
      '      <span style="color:#38bdf8">scriptSrc</span>: [(<span style="color:#e2e8f0">req</span>, <span style="color:#e2e8f0">res</span>) =&gt; <span style="color:#10b981">\`\'nonce-\${res.locals.nonce}\'</span>]</span>',
      '    }',
      '  }',
      '}));'
    ]
  },
  {
    file: '09-auth-jwt-sessions-rbac.svg',
    category: 'Auth & Security',
    categoryColor: '#8b5cf6',
    titleAr: 'أنظمة المصادقة والصلاحيات: JWT و Sessions و RBAC',
    subtitleEn: 'Access Tokens • Refresh Rotation • Permissions • OAuth2',
    badge: 'Identity & Access',
    iconSvg: `<rect width="48" height="48" rx="8" fill="#8b5cf6"/><circle cx="24" cy="20" r="8" fill="none" stroke="#fff" stroke-width="3"/><path d="M12 40C12 33 17 28 24 28C31 28 36 33 36 40" fill="none" stroke="#fff" stroke-width="3"/>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#8b5cf6" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#c084fc" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">JWT ANATOMY &amp; REFRESH ROTATION</text>
        
        <!-- JWT Parts -->
        <rect x="25" y="60" width="480" height="120" rx="10" fill="#1b202c" stroke="#2d3748"/>
        <text x="40" y="85" fill="#f43f5e" font-family="monospace" font-size="12" font-weight="bold">HEADER (Base64Url)</text>
        <text x="40" y="105" fill="#e2e8f0" font-family="monospace" font-size="10">{ "alg": "RS256", "typ": "JWT" }</text>
        <text x="40" y="130" fill="#a855f7" font-family="monospace" font-size="12" font-weight="bold">PAYLOAD (Claims)</text>
        <text x="40" y="150" fill="#e2e8f0" font-family="monospace" font-size="10">{ "sub": "usr_99", "role": "ADMIN", "exp": 1730000000 }</text>

        <!-- RBAC vs Token Rotation -->
        <rect x="25" y="195" width="230" height="195" rx="10" fill="#1b202c" stroke="#38bdf8"/>
        <text x="40" y="220" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold">🔄 Refresh Token Rotation</text>
        <text x="40" y="250" fill="#bae6fd" font-family="monospace" font-size="10">1. Short-lived Access (15m)</text>
        <text x="40" y="275" fill="#bae6fd" font-family="monospace" font-size="10">2. HttpOnly Cookie Refresh</text>
        <text x="40" y="300" fill="#bae6fd" font-family="monospace" font-size="10">3. Invalidate on reuse</text>
        <text x="40" y="325" fill="#10b981" font-family="monospace" font-size="10">✓ Immediate Revocation</text>

        <rect x="275" y="195" width="230" height="195" rx="10" fill="#1b202c" stroke="#ec4899"/>
        <text x="290" y="220" fill="#f472b6" font-family="monospace" font-size="12" font-weight="bold">👑 RBAC Role Hierarchy</text>
        <rect x="285" y="235" width="210" height="30" rx="4" fill="#831843"/>
        <text x="295" y="255" fill="#fbcfe8" font-family="monospace" font-size="10">SUPER_ADMIN (All Permissions)</text>
        <rect x="285" y="275" width="210" height="30" rx="4" fill="#500724"/>
        <text x="295" y="295" fill="#fbcfe8" font-family="monospace" font-size="10">EDITOR (articles:write, read)</text>
        <rect x="285" y="315" width="210" height="30" rx="4" fill="#1e1b4b"/>
        <text x="295" y="335" fill="#c7d2fe" font-family="monospace" font-size="10">MEMBER (articles:read, comment)</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#94a3b8">// Role-Based Access Guard Middleware</span>',
      '<span style="color:#f59e0b">export function</span> <span style="color:#60a5fa">requireRole</span>(...<span style="color:#e2e8f0">allowed</span>: Role[]) {',
      '  <span style="color:#f59e0b">return</span> (<span style="color:#e2e8f0">req</span>, <span style="color:#e2e8f0">res</span>, <span style="color:#e2e8f0">next</span>) =&gt; {',
      '    <span style="color:#f59e0b">if</span> (!allowed.<span style="color:#60a5fa">includes</span>(req.user.role)) {',
      '      <span style="color:#f59e0b">return</span> res.<span style="color:#60a5fa">status</span>(<span style="color:#f7df1e">403</span>).<span style="color:#60a5fa">json</span>({ <span style="color:#38bdf8">error</span>: <span style="color:#10b981">"Forbidden"</span> });',
      '    }',
      '    <span style="color:#60a5fa">next</span>();',
      '  };',
      '}'
    ]
  },
  {
    file: '10-system-design-distributed.svg',
    category: 'Architecture',
    categoryColor: '#0ea5e9',
    titleAr: 'تصميم أنظمة الويب الموزعة (System Design)',
    subtitleEn: 'Load Balancing • Sharding • Replication • Microservices',
    badge: 'Distributed Systems',
    iconSvg: `<rect width="48" height="48" rx="8" fill="#0ea5e9"/><path d="M12 24H20M28 24H36M24 12V20M24 28V36" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="24" r="5" fill="#fff"/>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#0ea5e9" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">HIGH-SCALE SYSTEM DESIGN TOPOLOGY</text>
        
        <!-- Clients -> Nginx Load Balancer -->
        <rect x="25" y="60" width="130" height="50" rx="8" fill="#1e293b" stroke="#64748b"/>
        <text x="90" y="90" fill="#f8fafc" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">📱 Clients (100k rps)</text>

        <text x="170" y="90" fill="#38bdf8" font-family="monospace" font-size="16">➔</text>

        <rect x="200" y="60" width="140" height="50" rx="8" fill="#0369a1" stroke="#38bdf8"/>
        <text x="270" y="90" fill="#ffffff" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">⚖️ Load Balancer</text>

        <text x="355" y="90" fill="#38bdf8" font-family="monospace" font-size="16">➔</text>

        <rect x="375" y="60" width="130" height="50" rx="8" fill="#1e1b4b" stroke="#818cf8"/>
        <text x="440" y="90" fill="#ffffff" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">🚪 API Gateway</text>

        <!-- Microservices Cluster -->
        <rect x="25" y="140" width="480" height="110" rx="10" fill="#1b202c" stroke="#334155"/>
        <text x="40" y="165" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="bold">⚙️ Microservices Cluster (Auto-scaled Pods)</text>
        
        <rect x="40" y="180" width="135" height="50" rx="6" fill="#1e293b" stroke="#38bdf8"/>
        <text x="107" y="210" fill="#bae6fd" font-family="monospace" font-size="10" text-anchor="middle">Auth Service</text>

        <rect x="195" y="180" width="140" height="50" rx="6" fill="#1e293b" stroke="#10b981"/>
        <text x="265" y="210" fill="#a7f3d0" font-family="monospace" font-size="10" text-anchor="middle">Order Service</text>

        <rect x="355" y="180" width="135" height="50" rx="6" fill="#1e293b" stroke="#f59e0b"/>
        <text x="422" y="210" fill="#fde68a" font-family="monospace" font-size="10" text-anchor="middle">Billing Service</text>

        <!-- Data Layer: Redis + DB Shards -->
        <rect x="25" y="270" width="230" height="120" rx="10" fill="#1b202c" stroke="#ef4444"/>
        <text x="40" y="295" fill="#f87171" font-family="monospace" font-size="12" font-weight="bold">⚡ Redis Cluster (Cache)</text>
        <text x="40" y="320" fill="#fca5a5" font-family="monospace" font-size="10">• &lt; 2ms Read Latency</text>
        <text x="40" y="340" fill="#fca5a5" font-family="monospace" font-size="10">• Distributed Rate Limiting</text>
        <text x="40" y="360" fill="#fca5a5" font-family="monospace" font-size="10">• Pub/Sub Event Bus</text>

        <rect x="275" y="270" width="230" height="120" rx="10" fill="#1b202c" stroke="#10b981"/>
        <text x="290" y="295" fill="#34d399" font-family="monospace" font-size="12" font-weight="bold">🗄️ PostgreSQL Sharding</text>
        <text x="290" y="320" fill="#a7f3d0" font-family="monospace" font-size="10">• Master (Write Only)</text>
        <text x="290" y="340" fill="#a7f3d0" font-family="monospace" font-size="10">• 3 Replicas (Read Only)</text>
        <text x="290" y="360" fill="#a7f3d0" font-family="monospace" font-size="10">• Consistent Hashing</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#94a3b8">// Consistent Hashing Ring for Sharding</span>',
      '<span style="color:#f59e0b">export class</span> <span style="color:#38bdf8">HashRing</span> {',
      '  <span style="color:#60a5fa">getNode</span>(<span style="color:#e2e8f0">key</span>: string): DatabaseNode {',
      '    <span style="color:#f59e0b">const</span> hash = <span style="color:#60a5fa">crc32</span>(key);',
      '    <span style="color:#f59e0b">return</span> <span style="color:#f59e0b">this</span>.ring.<span style="color:#60a5fa">findNearest</span>(hash);',
      '  }',
      '}'
    ]
  },
  {
    file: '11-advanced-caching-redis.svg',
    category: 'Redis',
    categoryColor: '#dc2626',
    titleAr: 'الـ Caching المتقدم باستخدام Redis',
    subtitleEn: 'Cache-Aside • Write-Through • Pub/Sub • Hashes',
    badge: 'In-Memory Cache',
    iconSvg: `<rect width="48" height="48" rx="8" fill="#dc2626"/><text x="24" y="32" font-size="14" font-weight="900" fill="#fff" text-anchor="middle" font-family="monospace">REDIS</text>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#dc2626" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#f87171" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">CACHE-ASIDE PATTERN BENCHMARK</text>
        
        <!-- Workflow Diagram -->
        <rect x="25" y="60" width="480" height="150" rx="10" fill="#1b202c" stroke="#2d3748"/>
        
        <rect x="40" y="80" width="120" height="40" rx="6" fill="#1e293b" stroke="#38bdf8"/>
        <text x="100" y="105" fill="#38bdf8" font-family="monospace" font-size="11" text-anchor="middle">1. App GET</text>

        <text x="175" y="105" fill="#f87171" font-family="monospace" font-size="16">➔</text>

        <rect x="200" y="80" width="130" height="40" rx="6" fill="#7f1d1d" stroke="#ef4444"/>
        <text x="265" y="105" fill="#fca5a5" font-family="monospace" font-size="11" text-anchor="middle">2. Redis Cache?</text>

        <text x="345" y="105" fill="#10b981" font-family="monospace" font-size="14">HIT (1ms)</text>

        <rect x="360" y="140" width="130" height="40" rx="6" fill="#064e3b" stroke="#10b981"/>
        <text x="425" y="165" fill="#6ee7b7" font-family="monospace" font-size="11" text-anchor="middle">3. Return Data</text>

        <text x="200" y="165" fill="#fbbf24" font-family="monospace" font-size="11">MISS ➔ Fetch DB (80ms) ➔ SETEX user:10 3600</text>

        <!-- Data Structures -->
        <rect x="25" y="230" width="230" height="160" rx="10" fill="#1b202c" stroke="#dc2626"/>
        <text x="40" y="255" fill="#f87171" font-family="monospace" font-size="12" font-weight="bold">⚡ Data Structures</text>
        <text x="40" y="280" fill="#e2e8f0" font-family="monospace" font-size="10">• HSET user:100 name "Rabea"</text>
        <text x="40" y="305" fill="#e2e8f0" font-family="monospace" font-size="10">• ZADD leaderboard 990 "usr"</text>
        <text x="40" y="330" fill="#e2e8f0" font-family="monospace" font-size="10">• LPUSH task_queue job_id</text>
        <text x="40" y="355" fill="#e2e8f0" font-family="monospace" font-size="10">• SADD online_users "u1"</text>

        <rect x="275" y="230" width="230" height="160" rx="10" fill="#1b202c" stroke="#f59e0b"/>
        <text x="290" y="255" fill="#fbbf24" font-family="monospace" font-size="12" font-weight="bold">🛡️ Cache Pitfalls Solved</text>
        <text x="290" y="280" fill="#fde68a" font-family="monospace" font-size="10">✔ Cache Stampede (Mutex Locks)</text>
        <text x="290" y="305" fill="#fde68a" font-family="monospace" font-size="10">✔ Cache Penetration (Bloom Filter)</text>
        <text x="290" y="330" fill="#fde68a" font-family="monospace" font-size="10">✔ Cache Breakdown (Jitter TTL)</text>
        <text x="290" y="355" fill="#fde68a" font-family="monospace" font-size="10">✔ Redis Sentinel HA &amp; Failover</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#94a3b8">// High-Speed Cache-Aside Helper</span>',
      '<span style="color:#f59e0b">export async function</span> <span style="color:#60a5fa">getOrSetCache</span>&lt;<span style="color:#f43f5e">T</span>&gt;(<span style="color:#e2e8f0">key</span>: string, <span style="color:#e2e8f0">cb</span>: () =&gt; Promise&lt;<span style="color:#f43f5e">T</span>&gt;, <span style="color:#e2e8f0">ttl</span> = <span style="color:#f7df1e">3600</span>) {',
      '  <span style="color:#f59e0b">const</span> cached = <span style="color:#f59e0b">await</span> redis.<span style="color:#60a5fa">get</span>(key);',
      '  <span style="color:#f59e0b">if</span> (cached) <span style="color:#f59e0b">return</span> JSON.<span style="color:#60a5fa">parse</span>(cached);',
      '  <span style="color:#f59e0b">const</span> fresh = <span style="color:#f59e0b">await</span> <span style="color:#60a5fa">cb</span>();',
      '  <span style="color:#f59e0b">await</span> redis.<span style="color:#60a5fa">setex</span>(key, ttl, JSON.<span style="color:#60a5fa">stringify</span>(fresh));',
      '  <span style="color:#f59e0b">return</span> fresh;',
      '}'
    ]
  },
  {
    file: '12-modern-frontend-architecture.svg',
    category: 'Frontend',
    categoryColor: '#3b82f6',
    titleAr: 'هندسة الـ Frontend الحديثة: معمارية إدارة الحالة',
    subtitleEn: 'Zustand • TanStack Query • Server State vs Client State',
    badge: 'State Architecture',
    iconSvg: `<rect width="48" height="48" rx="8" fill="#3b82f6"/><path d="M14 24L24 14L34 24L24 34Z" fill="none" stroke="#fff" stroke-width="3"/><circle cx="24" cy="24" r="4" fill="#fff"/>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#3b82f6" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">SERVER STATE VS CLIENT STATE ARCHITECTURE</text>
        
        <!-- Server State: TanStack Query -->
        <rect x="25" y="60" width="230" height="330" rx="10" fill="#1b202c" stroke="#f59e0b"/>
        <text x="40" y="85" fill="#fbbf24" font-family="monospace" font-size="12" font-weight="bold">🌐 Server State (TanStack Query)</text>
        <text x="40" y="115" fill="#fde68a" font-family="monospace" font-size="10">• Asynchronous Caching</text>
        <text x="40" y="140" fill="#fde68a" font-family="monospace" font-size="10">• Automatic Background Refetch</text>
        <text x="40" y="165" fill="#fde68a" font-family="monospace" font-size="10">• Deduplication of Requests</text>
        <text x="40" y="190" fill="#fde68a" font-family="monospace" font-size="10">• Pagination &amp; Infinite Scroll</text>
        <text x="40" y="215" fill="#fde68a" font-family="monospace" font-size="10">• Garbage Collection (gcTime)</text>
        <rect x="35" y="240" width="210" height="40" rx="6" fill="#451a03"/>
        <text x="45" y="265" fill="#fde68a" font-family="monospace" font-size="10">useQuery({ queryKey: ['user'] })</text>

        <!-- Client State: Zustand -->
        <rect x="275" y="60" width="230" height="330" rx="10" fill="#1b202c" stroke="#8b5cf6"/>
        <text x="290" y="85" fill="#c084fc" font-family="monospace" font-size="12" font-weight="bold">🐻 Client State (Zustand)</text>
        <text x="290" y="115" fill="#e9d5ff" font-family="monospace" font-size="10">• Synchronous Local UI</text>
        <text x="290" y="140" fill="#e9d5ff" font-family="monospace" font-size="10">• Theme / Sidebar Toggle</text>
        <text x="290" y="165" fill="#e9d5ff" font-family="monospace" font-size="10">• Ephemeral Form Modals</text>
        <text x="290" y="190" fill="#e9d5ff" font-family="monospace" font-size="10">• Atomic Selectors (No re-renders)</text>
        <text x="290" y="215" fill="#e9d5ff" font-family="monospace" font-size="10">• Lightweight (~1KB gzipped)</text>
        <rect x="285" y="240" width="210" height="40" rx="6" fill="#3b0764"/>
        <text x="295" y="265" fill="#f0abfc" font-family="monospace" font-size="10">useAppStore(s =&gt; s.theme)</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#94a3b8">// Clean Separation of Concerns</span>',
      '<span style="color:#f59e0b">export function</span> <span style="color:#60a5fa">UserProfile</span>() {',
      '  <span style="color:#94a3b8">// Server state via Query</span>',
      '  <span style="color:#f59e0b">const</span> { data } = <span style="color:#60a5fa">useQuery</span>({ queryKey: [<span style="color:#10b981">"profile"</span>], queryFn: fetchProfile });',
      '  <span style="color:#94a3b8">// UI client state via Zustand</span>',
      '  <span style="color:#f59e0b">const</span> isEditing = <span style="color:#60a5fa">useUIStore</span>((s) =&gt; s.isEditing);',
      '  <span style="color:#f59e0b">return</span> isEditing ? &lt;<span style="color:#38bdf8">EditForm</span> <span style="color:#a855f7">initial</span>={data} /&gt; : &lt;<span style="color:#38bdf8">ViewCard</span> <span style="color:#a855f7">user</span>={data} /&gt;;',
      '}'
    ]
  },
  {
    file: '13-git-github-cicd.svg',
    category: 'DevOps',
    categoryColor: '#F05032',
    titleAr: 'احتراف Git و GitHub Actions وخطوط الـ CI/CD',
    subtitleEn: 'DAG Commits • Interactive Rebase • Workflows • Auto Deploy',
    badge: 'Continuous Delivery',
    iconSvg: `<rect width="48" height="48" rx="8" fill="#F05032"/><circle cx="16" cy="24" r="5" fill="#fff"/><circle cx="32" cy="16" r="5" fill="#fff"/><circle cx="32" cy="32" r="5" fill="#fff"/><path d="M16 24H24M24 24V16H32M24 24V32H32" stroke="#fff" stroke-width="3"/>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#F05032" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#fb923c" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">GIT TREE &amp; GITHUB ACTIONS CI/CD PIPELINE</text>
        
        <!-- CI/CD Pipeline Steps -->
        <rect x="25" y="60" width="480" height="150" rx="10" fill="#1b202c" stroke="#2d3748"/>
        <text x="40" y="85" fill="#fb923c" font-family="monospace" font-size="12" font-weight="bold">🚀 Automated GitHub Actions Pipeline</text>

        <!-- Step 1: Lint -->
        <rect x="40" y="100" width="95" height="50" rx="6" fill="#1e293b" stroke="#38bdf8"/>
        <text x="87" y="125" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">1. ESLint</text>
        <text x="87" y="140" fill="#a7f3d0" font-family="monospace" font-size="9" text-anchor="middle">✓ Passed</text>

        <text x="145" y="130" fill="#fb923c" font-family="monospace" font-size="16">➔</text>

        <!-- Step 2: Test -->
        <rect x="160" y="100" width="95" height="50" rx="6" fill="#1e293b" stroke="#10b981"/>
        <text x="207" y="125" fill="#34d399" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">2. Vitest</text>
        <text x="207" y="140" fill="#a7f3d0" font-family="monospace" font-size="9" text-anchor="middle">✓ 142 Passed</text>

        <text x="265" y="130" fill="#fb923c" font-family="monospace" font-size="16">➔</text>

        <!-- Step 3: Build -->
        <rect x="280" y="100" width="95" height="50" rx="6" fill="#1e293b" stroke="#f59e0b"/>
        <text x="327" y="125" fill="#fbbf24" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">3. Build</text>
        <text x="327" y="140" fill="#fde68a" font-family="monospace" font-size="9" text-anchor="middle">✓ Next.js SSG</text>

        <text x="385" y="130" fill="#fb923c" font-family="monospace" font-size="16">➔</text>

        <!-- Step 4: Deploy -->
        <rect x="400" y="100" width="95" height="50" rx="6" fill="#1e293b" stroke="#a855f7"/>
        <text x="447" y="125" fill="#c084fc" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">4. Deploy</text>
        <text x="447" y="140" fill="#e9d5ff" font-family="monospace" font-size="9" text-anchor="middle">✓ Hostinger Prod</text>

        <text x="40" y="190" fill="#10b981" font-family="monospace" font-size="11">Pipeline duration: 48s • Zero-Downtime Rollout</text>

        <!-- Git Tree Box -->
        <rect x="25" y="225" width="480" height="165" rx="10" fill="#1b202c" stroke="#F05032"/>
        <text x="40" y="250" fill="#fb923c" font-family="monospace" font-size="12" font-weight="bold">🌿 Professional Git Mastery</text>
        <text x="40" y="275" fill="#e2e8f0" font-family="monospace" font-size="11">• git rebase -i HEAD~5 (Squash &amp; Clean History)</text>
        <text x="40" y="300" fill="#e2e8f0" font-family="monospace" font-size="11">• git cherry-pick &amp; git bisect for bug hunting</text>
        <text x="40" y="325" fill="#e2e8f0" font-family="monospace" font-size="11">• Trunk-Based Development with Short-Lived Feature Branches</text>
        <text x="40" y="350" fill="#38bdf8" font-family="monospace" font-size="11">• Semantic Release &amp; Conventional Commits (feat, fix, refactor)</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#94a3b8"># GitHub Actions Workflow (.github/workflows/deploy.yml)</span>',
      '<span style="color:#38bdf8">name</span>: <span style="color:#10b981">CI/CD Production</span>',
      '<span style="color:#38bdf8">on</span>: { <span style="color:#a855f7">push</span>: { <span style="color:#a855f7">branches</span>: [<span style="color:#10b981">main</span>] } }',
      '<span style="color:#38bdf8">jobs</span>:',
      '  <span style="color:#38bdf8">build-and-deploy</span>:',
      '    <span style="color:#38bdf8">runs-on</span>: <span style="color:#10b981">ubuntu-latest</span>',
      '    <span style="color:#38bdf8">steps</span>:',
      '      - <span style="color:#38bdf8">uses</span>: <span style="color:#10b981">actions/checkout@v4</span>',
      '      - <span style="color:#38bdf8">run</span>: <span style="color:#e2e8f0">npm ci &amp;&amp; npm test &amp;&amp; npm run build</span>'
    ]
  },
  {
    file: '14-docker-containerization.svg',
    category: 'DevOps',
    categoryColor: '#2496ED',
    titleAr: 'الدليل العملي لـ Docker و Containerization لمطوري الويب',
    subtitleEn: 'Multi-Stage Builds • Docker Compose • Volumes • Alpine',
    badge: 'Docker & Containers',
    iconSvg: `<path d="M6 24C6 24 10 36 24 36C38 36 42 24 42 24H6Z" fill="#2496ED"/><rect x="12" y="16" width="6" height="6" fill="#2496ED"/><rect x="20" y="16" width="6" height="6" fill="#2496ED"/><rect x="28" y="16" width="6" height="6" fill="#2496ED"/><rect x="20" y="8" width="6" height="6" fill="#2496ED"/><circle cx="36" cy="22" r="2" fill="#fff"/>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#2496ED" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">MULTI-STAGE DOCKERFILE &amp; COMPOSE</text>
        
        <!-- Multi-stage container flow -->
        <rect x="25" y="60" width="230" height="330" rx="10" fill="#1b202c" stroke="#f59e0b"/>
        <text x="40" y="85" fill="#fbbf24" font-family="monospace" font-size="12" font-weight="bold">🏗️ Multi-Stage Optimization</text>
        <rect x="35" y="100" width="210" height="65" rx="6" fill="#451a03"/>
        <text x="45" y="125" fill="#fde68a" font-family="monospace" font-size="10" font-weight="bold">Stage 1: FROM node:20 AS deps</text>
        <text x="45" y="145" fill="#e2e8f0" font-family="monospace" font-size="9">npm ci (Dependencies 800MB)</text>

        <rect x="35" y="175" width="210" height="65" rx="6" fill="#1e1b4b"/>
        <text x="45" y="200" fill="#c7d2fe" font-family="monospace" font-size="10" font-weight="bold">Stage 2: FROM node:20 AS build</text>
        <text x="45" y="220" fill="#e2e8f0" font-family="monospace" font-size="9">npm run build (Transpiling)</text>

        <rect x="35" y="250" width="210" height="65" rx="6" fill="#064e3b"/>
        <text x="45" y="275" fill="#a7f3d0" font-family="monospace" font-size="10" font-weight="bold">Stage 3: FROM alpine:3.19 AS run</text>
        <text x="45" y="295" fill="#34d399" font-family="monospace" font-size="9">Final Size: Only 45MB! ⚡</text>

        <!-- Docker Compose Stack -->
        <rect x="275" y="60" width="230" height="330" rx="10" fill="#1b202c" stroke="#2496ED"/>
        <text x="290" y="85" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold">🐳 Docker Compose Stack</text>
        
        <rect x="285" y="100" width="210" height="65" rx="6" fill="#0c4a6e"/>
        <text x="295" y="125" fill="#7dd3fc" font-family="monospace" font-size="10" font-weight="bold">service: web (Next.js)</text>
        <text x="295" y="145" fill="#e2e8f0" font-family="monospace" font-size="9">ports: ["3000:3000"]</text>

        <rect x="285" y="175" width="210" height="65" rx="6" fill="#7f1d1d"/>
        <text x="295" y="200" fill="#fca5a5" font-family="monospace" font-size="10" font-weight="bold">service: cache (Redis)</text>
        <text x="295" y="220" fill="#e2e8f0" font-family="monospace" font-size="9">ports: ["6379:6379"]</text>

        <rect x="285" y="250" width="210" height="65" rx="6" fill="#1e293b"/>
        <text x="295" y="275" fill="#34d399" font-family="monospace" font-size="10" font-weight="bold">service: db (PostgreSQL 16)</text>
        <text x="295" y="295" fill="#e2e8f0" font-family="monospace" font-size="9">volumes: ["pg_data:/var/lib/data"]</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#94a3b8"># Production Multi-Stage Dockerfile</span>',
      '<span style="color:#f59e0b">FROM</span> node:20-alpine <span style="color:#f59e0b">AS</span> runner',
      '<span style="color:#f59e0b">WORKDIR</span> /app',
      '<span style="color:#f59e0b">ENV</span> NODE_ENV=production',
      '<span style="color:#f59e0b">COPY</span> --from=builder /app/public ./public',
      '<span style="color:#f59e0b">COPY</span> --from=builder /app/.next/standalone ./',
      '<span style="color:#f59e0b">USER</span> node',
      '<span style="color:#f59e0b">CMD</span> [<span style="color:#10b981">"node"</span>, <span style="color:#10b981">"server.js"</span>]'
    ]
  },
  {
    file: '15-web-performance-cwv.svg',
    category: 'Performance',
    categoryColor: '#10b981',
    titleAr: 'الدليل الهندسي لأداء الويب ومؤشرات Core Web Vitals',
    subtitleEn: 'LCP &lt; 2.5s • INP &lt; 200ms • CLS &lt; 0.1 • Bundle Shrink',
    badge: '100% Lighthouse Score',
    iconSvg: `<circle cx="24" cy="24" r="20" fill="#10b981"/><path d="M24 10V24L32 28" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#10b981" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#34d399" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">GOOGLE CORE WEB VITALS METRICS</text>
        
        <!-- 3 Gauge Cards -->
        <rect x="25" y="60" width="150" height="150" rx="10" fill="#064e3b" stroke="#10b981"/>
        <text x="100" y="90" fill="#34d399" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">⚡ LCP</text>
        <text x="100" y="130" fill="#ffffff" font-family="monospace" font-size="28" font-weight="900" text-anchor="middle">1.1s</text>
        <text x="100" y="165" fill="#a7f3d0" font-family="monospace" font-size="10" text-anchor="middle">Target: &lt; 2.5s [GOOD]</text>

        <rect x="190" y="60" width="150" height="150" rx="10" fill="#064e3b" stroke="#10b981"/>
        <text x="265" y="90" fill="#34d399" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">🖱️ INP</text>
        <text x="265" y="130" fill="#ffffff" font-family="monospace" font-size="28" font-weight="900" text-anchor="middle">48ms</text>
        <text x="265" y="165" fill="#a7f3d0" font-family="monospace" font-size="10" text-anchor="middle">Target: &lt; 200ms [GOOD]</text>

        <rect x="355" y="60" width="150" height="150" rx="10" fill="#064e3b" stroke="#10b981"/>
        <text x="430" y="90" fill="#34d399" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">📐 CLS</text>
        <text x="430" y="130" fill="#ffffff" font-family="monospace" font-size="28" font-weight="900" text-anchor="middle">0.01</text>
        <text x="430" y="165" fill="#a7f3d0" font-family="monospace" font-size="10" text-anchor="middle">Target: &lt; 0.1 [GOOD]</text>

        <!-- Optimization Techniques -->
        <rect x="25" y="230" width="480" height="160" rx="10" fill="#1b202c" stroke="#10b981"/>
        <text x="40" y="255" fill="#34d399" font-family="monospace" font-size="12" font-weight="bold">🚀 High-Performance Optimizations</text>
        <text x="40" y="280" fill="#e2e8f0" font-family="monospace" font-size="11">• Fetch Priority: fetchpriority="high" on Hero Images</text>
        <text x="40" y="305" fill="#e2e8f0" font-family="monospace" font-size="11">• AVIF / WebP Next-Gen Image Compression</text>
        <text x="40" y="330" fill="#e2e8f0" font-family="monospace" font-size="11">• Font Subset &amp; CSS content-visibility: auto</text>
        <text x="40" y="355" fill="#38bdf8" font-family="monospace" font-size="11">• Code Splitting &amp; Dynamic Imports (next/dynamic)</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#94a3b8">// Preload Critical Hero Image with Fetch Priority</span>',
      '&lt;<span style="color:#38bdf8">Image</span>',
      '  <span style="color:#a855f7">src</span>={<span style="color:#10b981">"/hero-banner.webp"</span>}',
      '  <span style="color:#a855f7">alt</span>={<span style="color:#10b981">"High Speed Web"</span>}',
      '  <span style="color:#a855f7">priority</span>={<span style="color:#f59e0b">true</span>}',
      '  <span style="color:#a855f7">fetchPriority</span>=<span style="color:#10b981">"high"</span>',
      '  <span style="color:#a855f7">sizes</span>=<span style="color:#10b981">"(max-width: 768px) 100vw, 1200px"</span>',
      '/&gt;'
    ]
  },
  {
    file: '16-software-testing-guide.svg',
    category: 'Testing',
    categoryColor: '#22c55e',
    titleAr: 'دليل اختبار البرمجيات الشامل: Unit و Integration و E2E',
    subtitleEn: 'Vitest • Jest • Playwright • Testing Trophy • Mocking',
    badge: 'Quality Assurance',
    iconSvg: `<rect width="48" height="48" rx="8" fill="#22c55e"/><path d="M14 24L20 30L34 16" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#22c55e" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#4ade80" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">TESTING TROPHY &amp; RUNNER TERMINAL</text>
        
        <!-- Testing Pyramid / Trophy -->
        <rect x="25" y="60" width="230" height="330" rx="10" fill="#1b202c" stroke="#2d3748"/>
        <text x="40" y="85" fill="#4ade80" font-family="monospace" font-size="12" font-weight="bold">🏆 Testing Trophy Ratio</text>
        
        <!-- E2E Top -->
        <polygon points="140,105 180,150 100,150" fill="#ef4444"/>
        <text x="140" y="140" fill="#fff" font-family="monospace" font-size="9" font-weight="bold" text-anchor="middle">E2E (10%)</text>

        <!-- Integration Middle -->
        <polygon points="85,155 195,155 215,220 65,220" fill="#3b82f6"/>
        <text x="140" y="195" fill="#fff" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">Integration (60%)</text>

        <!-- Unit Base -->
        <polygon points="55,225 225,225 240,290 40,290" fill="#22c55e"/>
        <text x="140" y="265" fill="#fff" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">Unit Tests (30%)</text>

        <text x="140" y="335" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">Playwright + Vitest + RTL</text>

        <!-- Terminal Output -->
        <rect x="275" y="60" width="230" height="330" rx="10" fill="#0f172a" stroke="#22c55e"/>
        <text x="290" y="85" fill="#22c55e" font-family="monospace" font-size="12" font-weight="bold">⚡ Vitest Test Runner</text>
        
        <text x="290" y="120" fill="#4ade80" font-family="monospace" font-size="10">✓ auth.service.spec.ts</text>
        <text x="290" y="145" fill="#4ade80" font-family="monospace" font-size="10">✓ payment.pipeline.spec.ts</text>
        <text x="290" y="170" fill="#4ade80" font-family="monospace" font-size="10">✓ rbac.guard.spec.ts</text>
        <text x="290" y="195" fill="#4ade80" font-family="monospace" font-size="10">✓ cart.reducer.spec.ts</text>
        <text x="290" y="220" fill="#4ade80" font-family="monospace" font-size="10">✓ e2e/checkout.spec.ts</text>

        <line x1="290" y1="245" x2="480" y2="245" stroke="#334155"/>
        <text x="290" y="275" fill="#ffffff" font-family="monospace" font-size="11" font-weight="bold">Test Files: 18 passed (18)</text>
        <text x="290" y="300" fill="#22c55e" font-family="monospace" font-size="11" font-weight="bold">Tests:      156 passed (156)</text>
        <text x="290" y="325" fill="#38bdf8" font-family="monospace" font-size="11">Time:       1.42s</text>
        <text x="290" y="350" fill="#a7f3d0" font-family="monospace" font-size="10">Coverage:   96.8% lines</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#f59e0b">import</span> { describe, it, expect } <span style="color:#f59e0b">from</span> <span style="color:#10b981">"vitest"</span>;',
      '',
      '<span style="color:#60a5fa">describe</span>(<span style="color:#10b981">"OrderProcessor"</span>, () =&gt; {',
      '  <span style="color:#60a5fa">it</span>(<span style="color:#10b981">"applies discount and charges successfully"</span>, <span style="color:#f59e0b">async</span> () =&gt; {',
      '    <span style="color:#f59e0b">const</span> order = <span style="color:#f59e0b">await</span> processor.<span style="color:#60a5fa">execute</span>({ total: <span style="color:#f7df1e">200</span>, code: <span style="color:#10b981">"KHAMSA"</span> });',
      '    <span style="color:#60a5fa">expect</span>(order.finalPrice).<span style="color:#60a5fa">toBe</span>(<span style="color:#f7df1e">160</span>);',
      '    <span style="color:#60a5fa">expect</span>(order.status).<span style="color:#60a5fa">toBe</span>(<span style="color:#10b981">"CONFIRMED"</span>);',
      '  });',
      '});'
    ]
  },
  {
    file: '17-graphql-vs-rest.svg',
    category: 'Backend',
    categoryColor: '#e10098',
    titleAr: 'دليل GraphQL مقابل REST APIs: المقارنة المعمارية',
    subtitleEn: 'Over-fetching vs Precise • Schema Resolvers • Apollo Client',
    badge: 'API Architecture',
    iconSvg: `<rect width="48" height="48" rx="8" fill="#141820" stroke="#e10098" stroke-width="2"/><path d="M24 8L38 16V32L24 40L10 32V16L24 8Z" fill="none" stroke="#e10098" stroke-width="3"/><circle cx="24" cy="8" r="3" fill="#e10098"/><circle cx="38" cy="16" r="3" fill="#e10098"/><circle cx="38" cy="32" r="3" fill="#e10098"/><circle cx="24" cy="40" r="3" fill="#e10098"/><circle cx="10" cy="32" r="3" fill="#e10098"/><circle cx="10" cy="16" r="3" fill="#e10098"/>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#e10098" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#f472b6" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">REST APIS VS GRAPHQL BATTLE</text>
        
        <!-- REST Side -->
        <rect x="25" y="60" width="230" height="330" rx="10" fill="#1b202c" stroke="#64748b"/>
        <text x="40" y="85" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="bold">🌐 Traditional REST APIs</text>
        <rect x="35" y="100" width="210" height="45" rx="6" fill="#1e293b"/>
        <text x="45" y="125" fill="#f87171" font-family="monospace" font-size="10">GET /api/users/42</text>
        <rect x="35" y="155" width="210" height="45" rx="6" fill="#1e293b"/>
        <text x="45" y="180" fill="#f87171" font-family="monospace" font-size="10">GET /api/users/42/posts</text>
        <rect x="35" y="210" width="210" height="45" rx="6" fill="#1e293b"/>
        <text x="45" y="235" fill="#f87171" font-family="monospace" font-size="10">GET /api/users/42/followers</text>

        <text x="40" y="285" fill="#ef4444" font-family="monospace" font-size="10">❌ 3 HTTP Network Roundtrips</text>
        <text x="40" y="310" fill="#ef4444" font-family="monospace" font-size="10">❌ Over-fetching unwanted keys</text>
        <text x="40" y="335" fill="#ef4444" font-family="monospace" font-size="10">❌ Rigid endpoint contracts</text>

        <!-- GraphQL Side -->
        <rect x="275" y="60" width="230" height="330" rx="10" fill="#1b202c" stroke="#e10098"/>
        <text x="290" y="85" fill="#f472b6" font-family="monospace" font-size="12" font-weight="bold">🔮 GraphQL Exact Fetch</text>
        
        <rect x="285" y="100" width="210" height="155" rx="6" fill="#380424" stroke="#e10098"/>
        <text x="295" y="125" fill="#fbcfe8" font-family="monospace" font-size="10">POST /graphql</text>
        <text x="295" y="145" fill="#f472b6" font-family="monospace" font-size="9">query {</text>
        <text x="310" y="165" fill="#f472b6" font-family="monospace" font-size="9">  user(id: "42") {</text>
        <text x="325" y="185" fill="#a7f3d0" font-family="monospace" font-size="9">    name, avatar</text>
        <text x="325" y="205" fill="#a7f3d0" font-family="monospace" font-size="9">    posts { title }</text>
        <text x="310" y="225" fill="#f472b6" font-family="monospace" font-size="9">  }</text>
        <text x="295" y="245" fill="#f472b6" font-family="monospace" font-size="9">}</text>

        <text x="290" y="285" fill="#34d399" font-family="monospace" font-size="10">✔ 1 Single HTTP Request</text>
        <text x="290" y="310" fill="#34d399" font-family="monospace" font-size="10">✔ Exact payload, zero waste</text>
        <text x="290" y="335" fill="#34d399" font-family="monospace" font-size="10">✔ Strongly typed Schema</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#f59e0b">const</span> typeDefs = <span style="color:#60a5fa">gql</span>\`',
      '  type <span style="color:#38bdf8">User</span> {',
      '    <span style="color:#a855f7">id</span>: ID!',
      '    <span style="color:#a855f7">name</span>: String!',
      '    <span style="color:#a855f7">articles</span>(limit: Int): [<span style="color:#38bdf8">Article</span>!]!',
      '  }',
      '\`;'
    ]
  },
  {
    file: '18-database-architecture-sql-nosql.svg',
    category: 'Databases',
    categoryColor: '#336791',
    titleAr: 'معمارية قواعد البيانات: SQL (PostgreSQL) مقابل NoSQL',
    subtitleEn: 'ACID vs BASE • Normalization • Relational Joins • Schema',
    badge: 'Database Architecture',
    iconSvg: `<path d="M24 6C14 6 6 10 6 15V33C6 38 14 42 24 42C34 42 42 38 42 33V15C42 10 34 6 24 6Z" fill="#336791"/><ellipse cx="24" cy="15" rx="18" ry="9" fill="#4285F4"/>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#336791" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">RELATIONAL SQL (POSTGRESQL) VS NOSQL</text>
        
        <!-- SQL / PostgreSQL Side -->
        <rect x="25" y="60" width="230" height="330" rx="10" fill="#1b202c" stroke="#336791"/>
        <text x="40" y="85" fill="#60a5fa" font-family="monospace" font-size="12" font-weight="bold">🐘 PostgreSQL (SQL)</text>
        
        <rect x="35" y="105" width="210" height="75" rx="6" fill="#0f2b48"/>
        <text x="45" y="125" fill="#bae6fd" font-family="monospace" font-size="10" font-weight="bold">users TABLE</text>
        <text x="45" y="145" fill="#e2e8f0" font-family="monospace" font-size="9">id (PK) | email | role_id (FK)</text>
        <text x="45" y="165" fill="#34d399" font-family="monospace" font-size="9">✓ Foreign Key Constraint</text>

        <text x="40" y="210" fill="#38bdf8" font-family="monospace" font-size="11">🔒 ACID Guarantees</text>
        <text x="40" y="235" fill="#e2e8f0" font-family="monospace" font-size="10">• Atomicity &amp; Rollbacks</text>
        <text x="40" y="255" fill="#e2e8f0" font-family="monospace" font-size="10">• Strict 3NF Normalization</text>
        <text x="40" y="275" fill="#e2e8f0" font-family="monospace" font-size="10">• Complex JOINs &amp; CTEs</text>
        <text x="40" y="295" fill="#e2e8f0" font-family="monospace" font-size="10">• Financial &amp; ERP systems</text>

        <!-- NoSQL Side -->
        <rect x="275" y="60" width="230" height="330" rx="10" fill="#1b202c" stroke="#10b981"/>
        <text x="290" y="85" fill="#34d399" font-family="monospace" font-size="12" font-weight="bold">🍃 MongoDB (NoSQL)</text>
        
        <rect x="285" y="105" width="210" height="75" rx="6" fill="#064e3b"/>
        <text x="295" y="125" fill="#a7f3d0" font-family="monospace" font-size="10" font-weight="bold">users COLLECTION</text>
        <text x="295" y="145" fill="#e2e8f0" font-family="monospace" font-size="9">{ _id, email, roles: [...] }</text>
        <text x="295" y="165" fill="#a7f3d0" font-family="monospace" font-size="9">✓ Embedded JSON Documents</text>

        <text x="290" y="210" fill="#34d399" font-family="monospace" font-size="11">⚡ BASE Model</text>
        <text x="290" y="235" fill="#e2e8f0" font-family="monospace" font-size="10">• Eventual Consistency</text>
        <text x="290" y="255" fill="#e2e8f0" font-family="monospace" font-size="10">• Dynamic Flexible Schema</text>
        <text x="290" y="275" fill="#e2e8f0" font-family="monospace" font-size="10">• Horizontal Sharding</text>
        <text x="290" y="295" fill="#e2e8f0" font-family="monospace" font-size="10">• Big Data, IoT &amp; Logs</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#94a3b8">-- Relational JOIN vs Embedded Document</span>',
      '<span style="color:#f59e0b">SELECT</span> u.name, o.total, p.status',
      '<span style="color:#f59e0b">FROM</span> users u',
      '<span style="color:#f59e0b">INNER JOIN</span> orders o <span style="color:#f59e0b">ON</span> o.user_id = u.id',
      '<span style="color:#f59e0b">LEFT JOIN</span> payments p <span style="color:#f59e0b">ON</span> p.order_id = o.id',
      '<span style="color:#f59e0b">WHERE</span> u.status = <span style="color:#10b981">\'ACTIVE\'</span>;'
    ]
  },
  {
    file: '19-modern-css-tailwind.svg',
    category: 'CSS & Design',
    categoryColor: '#06B6D4',
    titleAr: 'الدليل العملي لـ Modern CSS و Tailwind CSS',
    subtitleEn: 'Subgrid • Container Queries • :has() • JIT Utility Engine',
    badge: 'Responsive Layouts',
    iconSvg: `<path d="M12 24C14 18 18 16 24 16C30 16 32 20 36 20C39 20 41 18 42 16C40 22 36 24 30 24C24 24 22 20 18 20C15 20 13 22 12 24Z" fill="#06B6D4"/><path d="M6 32C8 26 12 24 18 24C24 24 26 28 30 28C33 28 35 26 36 24C34 30 30 32 24 32C18 32 16 28 12 28C9 28 7 30 6 32Z" fill="#06B6D4"/>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#06B6D4" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#22d3ee" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">CSS GRID &amp; MODERN SELECTOR ENGINE</text>
        
        <!-- Grid Layout Visualizer -->
        <rect x="25" y="60" width="480" height="150" rx="10" fill="#1b202c" stroke="#2d3748"/>
        <text x="40" y="85" fill="#22d3ee" font-family="monospace" font-size="12" font-weight="bold">📐 12-Column Responsive CSS Grid</text>

        <rect x="40" y="100" width="140" height="40" rx="6" fill="#083344" stroke="#06b6d4"/>
        <text x="110" y="125" fill="#67e8f9" font-family="monospace" font-size="10" text-anchor="middle">col-span-4</text>

        <rect x="190" y="100" width="310" height="40" rx="6" fill="#083344" stroke="#06b6d4"/>
        <text x="345" y="125" fill="#67e8f9" font-family="monospace" font-size="10" text-anchor="middle">col-span-8 (Main Content)</text>

        <rect x="40" y="150" width="460" height="40" rx="6" fill="#1e293b" stroke="#64748b"/>
        <text x="270" y="175" fill="#e2e8f0" font-family="monospace" font-size="10" text-anchor="middle">col-span-12 (Full Width Footer)</text>

        <!-- Modern CSS Features -->
        <rect x="25" y="230" width="480" height="160" rx="10" fill="#1b202c" stroke="#06B6D4"/>
        <text x="40" y="255" fill="#22d3ee" font-family="monospace" font-size="12" font-weight="bold">🎨 Modern CSS 2026 Features</text>
        <text x="40" y="280" fill="#e2e8f0" font-family="monospace" font-size="11">• Parent Selector: article:has(&gt; .badge-pro)</text>
        <text x="40" y="305" fill="#e2e8f0" font-family="monospace" font-size="11">• Container Queries: @container (min-width: 400px)</text>
        <text x="40" y="330" fill="#e2e8f0" font-family="monospace" font-size="11">• CSS Nesting Native &amp; Light-Dark() Color Functions</text>
        <text x="40" y="355" fill="#34d399" font-family="monospace" font-size="11">• Tailwind JIT: arbitrary values (bg-[#0a0d14]/80)</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#94a3b8">/* Modern CSS Container Queries &amp; :has() */</span>',
      '<span style="color:#60a5fa">.card-container</span> {',
      '  <span style="color:#38bdf8">container-type</span>: inline-size;',
      '}',
      '<span style="color:#f59e0b">@container</span> (min-width: <span style="color:#f7df1e">500px</span>) {',
      '  <span style="color:#60a5fa">.card</span> { <span style="color:#38bdf8">display</span>: flex; <span style="color:#38bdf8">gap</span>: <span style="color:#f7df1e">1.5rem</span>; }',
      '}'
    ]
  },
  {
    file: '20-clean-code-solid-design-patterns.svg',
    category: 'Clean Code',
    categoryColor: '#eab308',
    titleAr: 'مبادئ Clean Code وأنماط التصميم SOLID',
    subtitleEn: 'Single Responsibility • Open/Closed • Liskov • Factory • DI',
    badge: 'Software Craftsmanship',
    iconSvg: `<rect width="48" height="48" rx="8" fill="#eab308"/><text x="24" y="32" font-size="12" font-weight="900" fill="#000" text-anchor="middle" font-family="monospace">SOLID</text>`,
    diagramSvg: `
      <g transform="translate(600, 110)">
        <rect width="530" height="420" rx="16" fill="#141820" stroke="#eab308" stroke-opacity="0.4" stroke-width="2"/>
        <text x="25" y="38" fill="#facc15" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">S.O.L.I.D DESIGN PRINCIPLES</text>
        
        <!-- 5 Principle Boxes -->
        <rect x="25" y="60" width="480" height="55" rx="8" fill="#1b202c" stroke="#334155"/>
        <text x="40" y="85" fill="#facc15" font-family="monospace" font-size="12" font-weight="bold">[S] Single Responsibility Principle</text>
        <text x="40" y="103" fill="#94a3b8" font-family="monospace" font-size="10">A class should have one, and only one, reason to change.</text>

        <rect x="25" y="125" width="480" height="55" rx="8" fill="#1b202c" stroke="#334155"/>
        <text x="40" y="150" fill="#facc15" font-family="monospace" font-size="12" font-weight="bold">[O] Open/Closed Principle</text>
        <text x="40" y="168" fill="#94a3b8" font-family="monospace" font-size="10">Open for extension, but closed for modification via Polymorphism.</text>

        <rect x="25" y="190" width="480" height="55" rx="8" fill="#1b202c" stroke="#334155"/>
        <text x="40" y="215" fill="#facc15" font-family="monospace" font-size="12" font-weight="bold">[L] Liskov Substitution Principle</text>
        <text x="40" y="233" fill="#94a3b8" font-family="monospace" font-size="10">Subtypes must be substitutable for their base types without errors.</text>

        <rect x="25" y="255" width="480" height="55" rx="8" fill="#1b202c" stroke="#334155"/>
        <text x="40" y="280" fill="#facc15" font-family="monospace" font-size="12" font-weight="bold">[I] Interface Segregation Principle</text>
        <text x="40" y="298" fill="#94a3b8" font-family="monospace" font-size="10">Clients should not be forced to depend upon interfaces they don't use.</text>

        <rect x="25" y="320" width="480" height="55" rx="8" fill="#1b202c" stroke="#334155"/>
        <text x="40" y="345" fill="#facc15" font-family="monospace" font-size="12" font-weight="bold">[D] Dependency Inversion Principle</text>
        <text x="40" y="363" fill="#34d399" font-family="monospace" font-size="10">Depend upon abstractions (interfaces), not concretions.</text>
      </g>
    `,
    codeSnippet: [
      '<span style="color:#94a3b8">// Dependency Inversion &amp; Open-Closed in Action</span>',
      '<span style="color:#f59e0b">interface</span> <span style="color:#38bdf8">PaymentGateway</span> {',
      '  <span style="color:#60a5fa">charge</span>(<span style="color:#e2e8f0">amount</span>: number): Promise&lt;PaymentResult&gt;;',
      '}',
      '<span style="color:#f59e0b">class</span> <span style="color:#38bdf8">CheckoutService</span> {',
      '  <span style="color:#f59e0b">constructor</span>(<span style="color:#f59e0b">private</span> <span style="color:#e2e8f0">gateway</span>: PaymentGateway) {}',
      '}'
    ]
  }
];

function generateSvg(c) {
  const codeLines = c.codeSnippet
    .map((line, i) => `<tspan x="45" dy="${i === 0 ? '0' : '22'}">${line}</tspan>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0d13" />
      <stop offset="50%" stop-color="#11151f" />
      <stop offset="100%" stop-color="#08090d" />
    </linearGradient>
    <linearGradient id="primaryGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c.categoryColor}" stop-opacity="0.15" />
      <stop offset="100%" stop-color="${c.categoryColor}" stop-opacity="0" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
    </pattern>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Glowing background orbs -->
  <circle cx="200" cy="150" r="280" fill="url(#primaryGlow)"/>
  <circle cx="1000" cy="450" r="300" fill="url(#primaryGlow)"/>

  <!-- Left Header Branding -->
  <g transform="translate(60, 50)">
    <!-- Brand Icon -->
    <g transform="translate(0, 0)">
      ${c.iconSvg}
    </g>
    
    <!-- Category Pill -->
    <rect x="65" y="8" width="150" height="32" rx="16" fill="#1e293b" stroke="${c.categoryColor}" stroke-opacity="0.5"/>
    <text x="140" y="29" fill="${c.categoryColor}" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">${c.category}</text>

    <!-- Title Ar -->
    <text x="0" y="100" fill="#f8fafc" font-family="'Cairo', 'Segoe UI', Tahoma, sans-serif" font-size="28" font-weight="900" direction="rtl">
      ${c.titleAr}
    </text>

    <!-- Subtitle En -->
    <text x="0" y="135" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="15" font-weight="600">
      ${c.subtitleEn}
    </text>
  </g>

  <!-- Code Snippet Box (Left Bottom) -->
  <g transform="translate(60, 240)" filter="url(#shadow)">
    <rect width="480" height="290" rx="16" fill="#0c0e14" stroke="#1e293b" stroke-width="2"/>
    
    <!-- Window Controls -->
    <circle cx="25" cy="22" r="6" fill="#ef4444"/>
    <circle cx="45" cy="22" r="6" fill="#f59e0b"/>
    <circle cx="65" cy="22" r="6" fill="#10b981"/>
    
    <!-- File Tab -->
    <rect x="90" y="10" width="160" height="24" rx="4" fill="#1e293b"/>
    <text x="170" y="26" fill="#94a3b8" font-family="monospace" font-size="11" text-anchor="middle">source-code.ts</text>

    <!-- Code Content -->
    <text x="45" y="70" font-family="'Fira Code', Consolas, monospace" font-size="13" fill="#e2e8f0" xml:space="preserve">
      ${codeLines}
    </text>
  </g>

  <!-- Right Side Interactive Diagram -->
  ${c.diagramSvg}

  <!-- Footer Watermark & Platform Logo -->
  <g transform="translate(60, 580)">
    <text x="0" y="0" fill="#64748b" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">
      خمسة برمجة بالبلدي • منصة علوم الحاسب وهندسة البرمجيات
    </text>
  </g>
  <g transform="translate(1000, 560)">
    <rect width="140" height="32" rx="8" fill="#1e293b" stroke="#eab308" stroke-opacity="0.4"/>
    <text x="70" y="21" fill="#eab308" font-family="system-ui, sans-serif" font-size="12" font-weight="900" text-anchor="middle">
      5 بالبلدي • PRO
    </text>
  </g>
</svg>`;
}

for (const c of covers) {
  const filePath = path.join(outDir, c.file);
  const svgContent = generateSvg(c);
  fs.writeFileSync(filePath, svgContent, 'utf-8');
  console.log(`Generated: ${c.file}`);
}

console.log('All 20 authentic covers generated successfully!');
