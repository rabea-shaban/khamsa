import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article13: StaticArticle = {
  id: 'static-art-13',
  slug: 'professional-git-github-branching-strategies-cicd',
  title: 'دليل Git و GitHub الاحترافي: استراتيجيات الـ Branching، والـ Rebase التفاعلي، وخطوط الـ CI/CD',
  excerpt: 'الدليل الهندسي للتحكم في الإصدارات لفرق العمل: فهم بنية Git الداخلية (DAG, Blobs, Trees)، استراتيجيات Trunk-Based Development vs Git Flow، حل النزاعات باحتراف، وأتمتة الاختبارات والنشر عبر GitHub Actions.',
  description: 'دليل احترافي لـ Git و GitHub: فهم المعمارية الداخلية، Rebase vs Merge، إدارة الفروع في الفرق الكبيرة، وبناء خطوط أنابيب CI/CD تلقائية للنشر السحابي.',
  category: 'DevOps',
  tags: ['Git', 'GitHub', 'CI/CD', 'DevOps', 'Workflow', 'Clean Code'],
  keywords: ['Git بالعربي', 'شرح Git Rebase', 'Trunk Based Development', 'GitHub Actions بالعربي', 'حل تعارضات Git', 'CI/CD Pipelines'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-04-20T10:00:00.000Z',
  updatedAt: '2026-09-20T22:00:00.000Z',
  readTimeMinutes: 25,
  coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'دليل Git و GitHub الاحترافي واستراتيجيات الـ CI/CD',
  isFeatured: false,
  tableOfContents: [
    { id: 'git-internals', title: 'البنية الداخلية لـ Git: الرسم البياني الموجه (DAG) والكائنات', level: 2 },
    { id: 'merge-vs-rebase', title: 'المعركة الأبدية: Git Merge مقابل Git Rebase وسجل التغييرات النظيف', level: 2 },
    { id: 'branching-strategies', title: 'استراتيجيات الفروع: Git Flow التقليدي مقابل Trunk-Based Development الحديث', level: 2 },
    { id: 'interactive-rebase', title: 'احتراف الـ Interactive Rebase (Squash, Fixup, Reorder)', level: 2 },
    { id: 'github-actions-cicd', title: 'بناء خط إنتاج ونشر تلقائي (CI/CD Pipeline) متكامل بـ GitHub Actions', level: 2 },
    { id: 'summary', title: 'الخلاصة وأفضل الممارسات', level: 2 },
  ],
  faq: [
    {
      question: 'متى يجب علي تجنب استخدام Git Rebase؟',
      answer: 'القاعدة الذهبية في Git: لا تقم بعمل Rebase على أي فرع عام ومشترك بين أعضاء الفريق (مثل main أو dev)، لأن الـ Rebase يعيد كتابة تاريخ الـ Commits ويغير الـ Hashes، مما يسبب مشاكل وفوضى لبقية المطورين.'
    },
    {
      question: 'ما هي ميزة Trunk-Based Development لفرق التطوير السريعة؟',
      answer: 'تعتمد على دمج التعديلات الصغيرة باستمرار في الفرع الرئيسي (main) يومياً مع استخدام Feature Flags، مما يقضي على كوابيس Merge Hell ويقلل الفجوة بين الكود المحلي وكود الإنتاج.'
    },
    {
      question: 'كيف تحمي خطوط الـ CI/CD فرع الإنتاج من الأكواد المعطوبة؟',
      answer: 'من خلال Branch Protection Rules تمنع دمج أي Pull Request إلا بعد اجتياز فحص الـ Linter، وفحص الـ TypeScript، وتشغيل الـ Automated Tests، والحصول على موافقة مراجع الكود (Code Review).'
    }
  ],
  relatedSlugs: [
    'practical-docker-containerization-guide-web-developers',
    'complete-software-testing-guide-unit-integration-e2e',
    'clean-software-engineering-solid-principles-design-patterns'
  ],
  seo: {
    title: 'دليل Git و GitHub الاحترافي: Rebase و Branching و CI/CD',
    description: 'تعلم أسرار Git المتقدمة لفرق العمل: Rebase تفاعلي، استراتيجيات الفروع الحديثة، وأتمتة النشر السحابي مع GitHub Actions.',
    keywords: ['Git', 'GitHub', 'CI/CD', 'Git Rebase', 'Trunk Based Development', 'GitHub Actions'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/professional-git-github-branching-strategies-cicd',
  },
  content: "\"## البنية الداخلية لـ Git: الرسم البياني الموجه (DAG) والكائنات\\n\\nGit في حقيقته ليس مجرد نظام ملفات، بل هو قاعدة بيانات مفتاح-قيمة (Content-Addressable Database) مبنية من 4 كائنات رئيسية مشفرة بـ SHA-1 Hashes:\\n1. **Blob (Binary Large Object):** محتوى الملف الفعلي بدون الاسم أو المسار.\\n2. **Tree:** يمثل المجلد وهيكل الملفات، ويربط أسماء الملفات بالـ Blobs الخاصة بها أو بـ Trees فرعية.\\n3. **Commit:** نقطة زمنية تشير إلى Tree والـ Parent Commit المباشر، وبيانات المطور (Author & Committer) والرسالة الوصفية.\\n4. **Annotated Tag:** وسم دائم يشير إلى إصدار معتمد برقم الإصدار وتوقيع المطور (GPG Signature).\\n\\n```text\\n[ Commit Object ] ──> يشير إلى ──> [ Root Tree Object ]\\n                                      ├──> [ Blob: package.json ]\\n                                      └──> [ Sub-Tree: src/ ]\\n                                                ├──> [ Blob: index.ts ]\\n                                                └──> [ Blob: app.ts ]\\n```\\n\\n---\\n\\n## المعركة الأبدية: Git Merge مقابل Git Rebase\\n\\n* **Git Merge (الدمج ثلاثي الاتجاهات 3-Way Merge):**\\n  - يحافظ على التاريخ الزمني كما حدث بالضبط.\\n  - ينشئ Merge Commit إضافي يربط الفرعين معاً.\\n  - ممتاز لتوثيق تاريخ دمج الميزات في فروع الإنتاج الرئيسية (Release Branches).\\n* **Git Rebase (إعادة التأسيس الخطي Linear History):**\\n  - يعيد كتابة تاريخ الكوميتات بنقلها لتصبح في قمة الفرع الهدف كما لو أنها كُتبت الآن.\\n  - يمنحك سجلاً خطياً نظيفاً وسهلاً في القراءة والتتبع عبر `git bisect` لتحديد مسبب الـ Bug بدقة.\\n  - **القاعدة الذهبية:** لا تقم بعمل Rebase على أي فرع عام ومشترك بين أعضاء الفريق!\\n\\n```bash\\n# تنظيف وتوحيد آخر 3 كوميتات في كوميت واحد نظيف قبل فتح الـ PR\\ngit rebase -i HEAD~3\\n\\n# في الشاشة التفاعلية:\\n# pick a1b2c3d feat: add user authentication\\n# squash e4f5g6h fix typo in auth controller\\n# fixup i7j8k9l remove console.log\\n```\\n\\n---\\n\\n## استراتيجيات الفروع: Git Flow مقابل Trunk-Based Development\\n\\n### 1. Git Flow التقليدي\\nيعتمد على فروع طويلة الأمد (`main`, `develop`, `feature/...`, `release/...`, `hotfix/...`). مناسب للبرمجيات التقليدية التي تصدر تحديثات كل عدة أشهر، ولكنه يسبب تعارضات دمج مؤلمة (Merge Hell) في الفرق السريعة.\\n\\n### 2. Trunk-Based Development الحديث\\nالمعيار المعتمد في كبرى الشركات التقنية مثل Google و Netflix:\\n* المطورون يدفعون التعديلات الصغيرة مباشرة إلى الـ `main` أو عبر فروع قصيرة الأجل (أقل من يومين).\\n* استخدام **Feature Flags (Feature Toggles)** لإخفاء الميزات غير المكتملة في الإنتاج دون تعطيل النشر المستمر.\\n* دورات نشر متعددة يومياً (Continuous Deployment) بأمان وثقة.\\n\\n---\\n\\n## خط إنتاج واختبار تلقائي عبر GitHub Actions\\n\\n```yaml\\n# .github/workflows/ci.yml\\nname: Production Continuous Integration Pipeline\\n\\non:\\n  push:\\n    branches: [main]\\n  pull_request:\\n    branches: [main]\\n\\njobs:\\n  verify:\\n    name: Code Quality & Security Check\\n    runs-on: ubuntu-latest\\n    steps:\\n      - name: Checkout Code\\n        uses: actions/checkout@v4\\n        with:\\n          fetch-depth: 0\\n\\n      - name: Setup Node.js 20 Environment\\n        uses: actions/setup-node@v4\\n        with:\\n          node-version: 20\\n          cache: 'npm'\\n\\n      - name: Install Dependencies with Frozen Lockfile\\n        run: npm ci\\n\\n      - name: ESLint Static Analysis\\n        run: npm run lint\\n\\n      - name: TypeScript Type Checking\\n        run: npm run type-check\\n\\n      - name: Automated Unit & Integration Tests\\n        run: npm test -- --coverage\\n\\n      - name: Build Production Assets Verification\\n        run: npm run build\\n```\\n\\n---\\n\\n## حل النزاعات وحماية الفروع (Branch Protection Rules)\\n\\nلضمان سلامة الكود في الإنتاج، يجب تفعيل قواعد حماية الفروع في GitHub:\\n1. **Require a pull request before merging:** منع الدفع المباشر إلى `main`.\\n2. **Require status checks to pass:** منع الدمج إذا فشل فحص الـ Linter أو الاختبارات الآلية.\\n3. **Require review from code owners:** اشتراط مراجعة وموافقة مهندس معتمد.\\n\\n---\\n\\n## الخلاصة وأفضل الممارسات\\n\\n* اكتب رسائل Commit معيارية (Conventional Commits: `feat:`, `fix:`, `refactor:`, `perf:`).\\n* لا تدمج كوداً في الإنتاج يدوياً؛ اعتمد دائماً على الـ CI/CD Pipelines الآلية.\\n* اعتمد على Trunk-Based Development لتسريع وتيرة تسليم البرمجيات.\",\n",
};
