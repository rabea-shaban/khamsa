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
  coverImage: '/images/articles/13-git-github-cicd.svg',
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
  content: `## البنية الداخلية لـ Git: الرسم البياني الموجه (DAG) والكائنات

Git في حقيقته ليس مجرد نظام ملفات، بل هو قاعدة بيانات مفتاح-قيمة (Content-Addressable Database) مبنية من 4 كائنات رئيسية مشفرة بـ SHA-1 Hashes:
1. **Blob (Binary Large Object):** محتوى الملف الفعلي بدون الاسم أو المسار.
2. **Tree:** يمثل المجلد وهيكل الملفات، ويربط أسماء الملفات بالـ Blobs الخاصة بها أو بـ Trees فرعية.
3. **Commit:** نقطة زمنية تشير إلى Tree والـ Parent Commit المباشر، وبيانات المطور (Author & Committer) والرسالة الوصفية.
4. **Annotated Tag:** وسم دائم يشير إلى إصدار معتمد برقم الإصدار وتوقيع المطور (GPG Signature).

\`\`\`text
[ Commit Object ] ──> يشير إلى ──> [ Root Tree Object ]
                                      ├──> [ Blob: package.json ]
                                      └──> [ Sub-Tree: src/ ]
                                                ├──> [ Blob: index.ts ]
                                                └──> [ Blob: app.ts ]
\`\`\`

---

## المعركة الأبدية: Git Merge مقابل Git Rebase

* **Git Merge (الدمج ثلاثي الاتجاهات 3-Way Merge):**
  - يحافظ على التاريخ الزمني كما حدث بالضبط.
  - ينشئ Merge Commit إضافي يربط الفرعين معاً.
  - ممتاز لتوثيق تاريخ دمج الميزات في فروع الإنتاج الرئيسية (Release Branches).
* **Git Rebase (إعادة التأسيس الخطي Linear History):**
  - يعيد كتابة تاريخ الكوميتات بنقلها لتصبح في قمة الفرع الهدف كما لو أنها كُتبت الآن.
  - يمنحك سجلاً خطياً نظيفاً وسهلاً في القراءة والتتبع عبر \`git bisect\` لتحديد مسبب الـ Bug بدقة.
  - **القاعدة الذهبية:** لا تقم بعمل Rebase على أي فرع عام ومشترك بين أعضاء الفريق!

\`\`\`bash
# تنظيف وتوحيد آخر 3 كوميتات في كوميت واحد نظيف قبل فتح الـ PR
git rebase -i HEAD~3

# في الشاشة التفاعلية:
# pick a1b2c3d feat: add user authentication
# squash e4f5g6h fix typo in auth controller
# fixup i7j8k9l remove console.log
\`\`\`

---

## استراتيجيات الفروع: Git Flow مقابل Trunk-Based Development

### 1. Git Flow التقليدي
يعتمد على فروع طويلة الأمد (\`main\`, \`develop\`, \`feature/...\`, \`release/...\`, \`hotfix/...\`). مناسب للبرمجيات التقليدية التي تصدر تحديثات كل عدة أشهر، ولكنه يسبب تعارضات دمج مؤلمة (Merge Hell) في الفرق السريعة.

### 2. Trunk-Based Development الحديث
المعيار المعتمد في كبرى الشركات التقنية مثل Google و Netflix:
* المطورون يدفعون التعديلات الصغيرة مباشرة إلى الـ \`main\` أو عبر فروع قصيرة الأجل (أقل من يومين).
* استخدام **Feature Flags (Feature Toggles)** لإخفاء الميزات غير المكتملة في الإنتاج دون تعطيل النشر المستمر.
* دورات نشر متعددة يومياً (Continuous Deployment) بأمان وثقة.

---

## خط إنتاج واختبار تلقائي عبر GitHub Actions

\`\`\`yaml
# .github/workflows/ci.yml
name: Production Continuous Integration Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  verify:
    name: Code Quality & Security Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js 20 Environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies with Frozen Lockfile
        run: npm ci

      - name: ESLint Static Analysis
        run: npm run lint

      - name: TypeScript Type Checking
        run: npm run type-check

      - name: Automated Unit & Integration Tests
        run: npm test -- --coverage

      - name: Build Production Assets Verification
        run: npm run build
\`\`\`

---

## حل النزاعات وحماية الفروع (Branch Protection Rules)

لضمان سلامة الكود في الإنتاج، يجب تفعيل قواعد حماية الفروع في GitHub:
1. **Require a pull request before merging:** منع الدفع المباشر إلى \`main\`.
2. **Require status checks to pass:** منع الدمج إذا فشل فحص الـ Linter أو الاختبارات الآلية.
3. **Require review from code owners:** اشتراط مراجعة وموافقة مهندس معتمد.

---

## الخلاصة وأفضل الممارسات

* اكتب رسائل Commit معيارية (Conventional Commits: \`feat:\`, \`fix:\`, \`refactor:\`, \`perf:\`).
* لا تدمج كوداً في الإنتاج يدوياً؛ اعتمد دائماً على الـ CI/CD Pipelines الآلية.
* اعتمد على Trunk-Based Development لتسريع وتيرة تسليم البرمجيات.",`,
};
