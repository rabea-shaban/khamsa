import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article18: StaticArticle = {
  id: 'static-art-18',
  slug: 'database-architecture-sql-postgresql-vs-nosql-mongodb',
  title: 'معمارية قواعد البيانات: SQL (PostgreSQL) مقابل NoSQL (MongoDB) - كيف تختار الأنسب لمشروعك؟',
  excerpt: 'المقارنة المعمارية الحاسمة بين قواعد البيانات العلائقية والوثائقية: مبادئ ACID مقابل BASE، قواعد الـ Normalization مقابل Denormalization، أنوع الفهارس (B-Tree vs GIN)، ونمط Polyglot Persistence الحديث.',
  description: 'دليل اختيار وتصميم قواعد البيانات: مقارنة شاملة بين PostgreSQL و MongoDB، متى تستخدم العلاقات Transactions ومتى تختار مرونة NoSQL مع أمثلة حقيقية.',
  category: 'Databases',
  tags: ['Databases', 'PostgreSQL', 'MongoDB', 'SQL', 'NoSQL', 'Database Architecture'],
  keywords: ['SQL مقابل NoSQL', 'PostgreSQL بالعربي', 'مقارنة MongoDB و Postgres', 'ACID Transactions', 'تصميم قواعد البيانات', 'Polyglot Persistence'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-06-05T10:00:00.000Z',
  updatedAt: '2026-09-21T00:30:00.000Z',
  readTimeMinutes: 28,
  coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'معمارية قواعد البيانات SQL مقابل NoSQL',
  isFeatured: false,
  tableOfContents: [
    { id: 'foundations-acid-base', title: 'الأسس النظرية: ضمانات ACID مقابل فلسفة BASE', level: 2 },
    { id: 'relational-modeling', title: 'النمذجة العلائقية: التطبيع (1NF إلى 3NF) والقيود الصارمة', level: 2 },
    { id: 'document-flexibility', title: 'المرونة الوثائقية: التضمين والتوسع الأفقي في NoSQL', level: 2 },
    { id: 'indexing-internals', title: 'محركات الفهرسة: B-Tree و Hash و GIN (للبحث في JSON)', level: 2 },
    { id: 'polyglot-persistence', title: 'نمط الـ Polyglot Persistence: لماذا تستخدم أكثر من قاعدة بيانات؟', level: 2 },
    { id: 'decision-matrix', title: 'جدول المقارنة ومعايير الاختيار الدقيقة', level: 2 },
    { id: 'summary', title: 'الخلاصة وتوصيات المهندسين', level: 2 },
  ],
  faq: [
    {
      question: 'ما هي معايير ACID ولماذا هي مهمة في المعاملات المالية؟',
      answer: 'تتكون ACID من: Atomicity (الذرية - الكل أو لا شيء)، Consistency (الاتساق - الحفاظ على القيود)، Isolation (العزل - عدم تداخل المعاملات المتزامنة)، و Durability (الديمومة - بقاء التغييرات حتى عند انقطاع الكهرباء)، وهي ضرورية لضمان عدم ضياع الأموال أو الحسابات.'
    },
    {
      question: 'هل تدعم PostgreSQL معالجة بيانات JSON بنفس كفاءة NoSQL؟',
      answer: 'نعم، عبر نوع البيانات JSONB مع فهارس GIN، تستطيع PostgreSQL تخزين واستعلام وثائق JSON بسرعة فائقة مع الحفاظ على القوة العلائقية والـ ACID Transactions في نفس الوقت.'
    },
    {
      question: 'ما هو نمط Polyglot Persistence؟',
      answer: 'هو تصميم معماري يستخدم فيه التطبيق أنواعاً مختلفة من قواعد البيانات حسب نوع المهمة؛ مثلاً: PostgreSQL للبيانات المالية والمستخدمين، Redis للتخزين المؤقت والجلسات، MongoDB للوثائق والمحتوى المرن، و Elasticsearch للبحث النصي الكامل.'
    }
  ],
  relatedSlugs: [
    'comprehensive-mongodb-guide-indexing-aggregation-performance',
    'advanced-caching-redis-strategies-practical-patterns',
    'system-design-guide-monolith-to-distributed-scale'
  ],
  seo: {
    title: 'معمارية قواعد البيانات: PostgreSQL مقابل MongoDB',
    description: 'مقارنة معمارية شاملة بين SQL و NoSQL: متى تختار Postgres ومتى تعتمد على MongoDB؟ شرح ACID، الفهارس، و Polyglot Persistence.',
    keywords: ['PostgreSQL', 'MongoDB', 'SQL', 'NoSQL', 'ACID', 'JSONB', 'قواعد البيانات'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/database-architecture-sql-postgresql-vs-nosql-mongodb',
  },
  content: "\"## الأسس النظرية: ضمانات ACID مقابل فلسفة BASE\\n\\n* **قواعد بيانات SQL (مثل PostgreSQL):** تركز على نموذج **ACID** (Atomicity, Consistency, Isolation, Durability) والاتساق الصارم الفوري (Strong Consistency).\\n* **قواعد بيانات NoSQL (مثل MongoDB):** تركز على نموذج **BASE** (Basically Available, Soft state, Eventual consistency) والتوسع الأفقي السلس ومرونة الوثائق.\\n\\n---\\n\\n## مصفوفة المقارنة المعمارية الشاملة\\n\\n| الخاصية | PostgreSQL (SQL) | MongoDB (NoSQL) |\\n| :--- | :--- | :--- |\\n| **المخطط (Schema)** | صارم وثابت (Strict Table Schema) | ديناميكي ومرن (Flexible Documents) |\\n| **العلاقات والربط** | JOINs فائقة الكفاءة والموثوقية | $lookup تجميعي أو تطبيقي |\\n| **التوسع الأفقي** | يتطلب أدوات إضافية (Citus) | Sharding مدمج في أصل النظام |\\n| **الاستعلامات المعقدة** | SQL المعياري و CTEs و Window Functions | Aggregation Pipeline |\\n| **أفضل استخدام** | أنظمة التجارة، الحسابات المالية، ERP | أنظمة إدارة المحتوى، التحليلات، تطبيقات التدوين |\\n\\n---\\n\\n## النمذجة العلائقية وقواعد التطبيع (Normalization)\\n\\nفي PostgreSQL، نقوم بتفكيك البيانات إلى جداول مستقلة وتطبيق قواعد التطبيع (1NF إلى 3NF) لمنع تكرار البيانات وضمان سلامة المراجع عبر المفاتيح الأجنبية (Foreign Keys):\\n\\n```sql\\n-- إنشاء جدول المقالات مع القيود الصارمة\\nCREATE TABLE articles (\\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\\n    title VARCHAR(255) NOT NULL,\\n    slug VARCHAR(255) UNIQUE NOT NULL,\\n    content TEXT NOT NULL,\\n    author_id UUID REFERENCES authors(id) ON DELETE CASCADE,\\n    published_at TIMESTAMPTZ,\\n    created_at TIMESTAMPTZ DEFAULT NOW()\\n);\\n\\n-- إنشاء فهرس فريد وسريع للبحث\\nCREATE INDEX idx_articles_slug ON articles(slug);\\nCREATE INDEX idx_articles_published ON articles(published_at DESC) WHERE published_at IS NOT NULL;\\n```\\n\\n---\\n\\n## نمط Polyglot Persistence الحديث\\n\\nفي الأنظمة السحابية المعاصرة، لا نختار قاعدة بيانات واحدة لكل شيء، بل نوظف كل قاعدة بيانات في نقطة قوتها:\\n* **PostgreSQL:** لإدارة المستخدمين، الاشتراكات، والفواتير والمدفوعات لضمان معايير ACID.\\n* **MongoDB:** لإدارة محتوى المقالات والصفحات الغنية بهياكل وثائقية مرنة.\\n* **Redis:** للتخزين المؤقت (Caching)، إدارة الجلسات، وحسابات الـ Rate Limiting.\\n* **Elasticsearch:** لمحرك البحث الذكي في النصوص العربية والتحليلات الضخمة.\\n\\n---\\n\\n## الخلاصة وأفضل الممارسات\\n\\nلا توجد قاعدة بيانات واحدة تصلح لكل المهام. اختر **PostgreSQL** عندما تحتاج علاقات معقدة وضمانات مالية صارمة، واختر **MongoDB** لمرونة الوثائق وسرعة تطوير واجهات المحتوى.\",\n",
};
