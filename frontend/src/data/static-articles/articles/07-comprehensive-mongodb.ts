import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article07: StaticArticle = {
  id: 'static-art-07',
  slug: 'comprehensive-mongodb-guide-indexing-aggregation-performance',
  title: 'دليل MongoDB الشامل: الفهرسة (Indexing) والـ Aggregation Pipeline وتحسين الأداء للأنظمة الضخمة',
  excerpt: 'دليل مهندسي البيانات وقواعد البيانات لـ MongoDB: كيف تختار الفهارس الصحيحة (Compound & Partial Indexes)، قراءة الـ Execution Plans، بناء خطوط تجميع متقدمة (Aggregation Pipelines)، وتجنب الأخطاء القاتلة في نمذجة البيانات.',
  description: 'تعلم أسرار أداء MongoDB: الفهرسة المتقدمة، Aggregation Pipeline، تحليل Execution Plans عبر explain()، واستراتيجيات التوسع ونمذجة الوثائق للإنتاج.',
  category: 'Databases',
  tags: ['MongoDB', 'NoSQL', 'Database Design', 'Indexing', 'Aggregation', 'Performance'],
  keywords: ['MongoDB بالعربي', 'شرح الفهرسة في MongoDB', 'Aggregation Pipeline', 'تحسين أداء MongoDB', 'Mongoose', 'قواعد بيانات NoSQL'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-03-05T10:00:00.000Z',
  updatedAt: '2026-09-20T19:00:00.000Z',
  readTimeMinutes: 27,
  coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'هندسة قواعد بيانات MongoDB والفهرسة والـ Aggregation',
  isFeatured: true,
  tableOfContents: [
    { id: 'data-modeling', title: 'نمذجة البيانات في NoSQL: التضمين (Embedding) مقابل الإشارة (Referencing)', level: 2 },
    { id: 'indexing-strategies', title: 'استراتيجيات الفهرسة (Indexing): Compound و Partial و Text Indexes', level: 2 },
    { id: 'explain-plans', title: 'تشريح خطط التنفيذ عبر explain() والـ Winning Plan', level: 2 },
    { id: 'aggregation-pipeline', title: 'احتراف الـ Aggregation Pipeline خطوة بخطوة', level: 2 },
    { id: 'transactions-acid', title: 'المعاملات البنكية والـ Multi-Document ACID Transactions', level: 2 },
    { id: 'performance-pitfalls', title: 'أشهر ٥ أخطاء أداء في MongoDB وكيف تتجنبها', level: 2 },
    { id: 'summary', title: 'الخلاصة وأفضل الممارسات', level: 2 },
  ],
  faq: [
    {
      question: 'متى يجب علي تضمين البيانات (Embedding) ومتى يجب ربطها بالإشارة (Referencing)؟',
      answer: 'استخدم التضمين (Embedding) عندما تكون العلاقة One-to-Few والبيانات تُقرأ معاً دائماً ولا تتغير باستمرار. استخدم الإشارة (Referencing) في علاقات One-to-Many الكبيرة أو Many-to-Many وعندما يتكرر تحديث البيانات بشكل مستقل لتجنب تجاوز حد حجم الوثيقة (16MB).'
    },
    {
      question: 'ما هي قاعدة الـ ESR Rule في بناء الـ Compound Indexes؟',
      answer: 'قاعدة ESR ترتب حقول الفهرس كالتالي: أولاً حقول المطابقة التامة Equality (E)، ثم حقول الترتيب Sort (S)، وأخيراً حقول النطاق Range (R مثل $gt و $lt). هذه القاعدة تضمن أعلى كفاءة للفهرس بدون الحاجة لترتيب النتائج في الذاكرة.'
    },
    {
      question: 'كيف نتأكد أن الاستعلام يستخدم الفهرس ولا يقوم بـ COLLSCAN؟',
      answer: 'عن طريق تشغيل .explain("executionStats") وفحص حقل stage. إذا كان IXSCAN فهذا يعني استخدام الفهرس بنجاح، أما إذا كان COLLSCAN فمعناه أن قاعدة البيانات تفحص كل وثائق الـ Collection مما يسبب بطئاً شديداً.'
    }
  ],
  relatedSlugs: [
    'database-architecture-sql-postgresql-vs-nosql-mongodb',
    'building-production-restful-apis-express-clean-architecture',
    'advanced-caching-redis-strategies-practical-patterns'
  ],
  seo: {
    title: 'دليل MongoDB الشامل: الفهرسة و Aggregation Pipeline والأداء',
    description: 'دليل احترافي لـ MongoDB: نمذجة البيانات، الفهرسة المتقدمة، Aggregation Pipeline، وتفادي الـ COLLSCAN مع أمثلة عملية.',
    keywords: ['MongoDB', 'Indexing', 'Aggregation Pipeline', 'NoSQL', 'Database Optimization', 'هندسة البيانات'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/comprehensive-mongodb-guide-indexing-aggregation-performance',
  },
  content: "\"## نمذجة البيانات في NoSQL: التضمين مقابل الإشارة\\n\\nفي عالم قواعد البيانات العلائقية (SQL)، يتم دائماً تطبيع الجداول (Normalization). ولكن في **MongoDB**، يتم تصميم المخطط (Schema) بناءً على **كيفية قراءة واستعلام التطبيق للبيانات (Query-Driven Modeling)**.\\n\\n### متى نستخدم التضمين (Embedding)؟\\n* علاقة `1 : 1` أو `1 : Few` (مثل عناوين المستخدم أو إعدادات الحساب).\\n* عندما تحتاج لقراءة البيانات الفرعية في كل مرة تجلب فيها الوثيقة الرئيسية.\\n\\n### متى نستخدم الإشارة (Referencing)?\\n* علاقة `1 : Millions` (مثل سجلات الـ Logs أو تفاعلات المنشورات).\\n* عندما تنمو المصفوفة بلا حدود (Unbounded Array Anti-Pattern).\\n\\n---\\n\\n## استراتيجيات الفهرسة: Compound Indexing وقاعدة ESR\\n\\nالفهرس غير الصحيح إما أن يُهمل من المحرك، أو يتسبب في استهلاك موارد الذاكرة بلا فائدة. القاعدة المعمارية الأساسية هي **قاعدة ESR**:\\n\\n```text\\nترتيب حقول الفهرس المركب (Compound Index):\\n1. Equality  (حقول التطابق التام مثل: status: 'PUBLISHED')\\n2. Sort      (حقول الترتيب مثل: createdAt: -1)\\n3. Range     (حقول النطاق مثل: views: { $gt: 100 })\\n```\\n\\n```javascript\\n// إنشاء الفهرس المثالي للاستعلامات المجمعة\\ndb.articles.createIndex({\\n  status: 1,      // 1. Equality\\n  createdAt: -1,  // 2. Sort\\n  viewsCount: 1   // 3. Range\\n});\\n```\\n\\n---\\n\\n## تشريح خطط التنفيذ عبر `explain()`\\n\\n```javascript\\n// فحص أداء الاستعلام لمعرفة هل يستخدم الفهرس أم يفحص الجدول كاملاً\\ndb.articles.find({ status: 'PUBLISHED' }).sort({ createdAt: -1 }).explain('executionStats');\\n```\\n\\n* **IXSCAN:** الفهرس يعمل بنجاح والبحث سريع.\\n* **COLLSCAN:** كارثة أداء! الاستعلام يفحص كل وثائق الجدول بدون فهرس.\\n\\n---\\n\\n## احتراف الـ Aggregation Pipeline\\n\\nالـ **Aggregation Pipeline** هو محرك التحليلات القوي داخل MongoDB؛ حيث تمر البيانات عبر مراحل متتالية:\\n\\n```javascript\\n// استعلام تقرير: أكثر التصنيفات قراءة في الـ 30 يوماً الماضية\\ndb.articles.aggregate([\\n  // المرحلة 1: تصفية المقالات المنشورة في آخر 30 يوماً\\n  {\\n    $match: {\\n      status: 'PUBLISHED',\\n      publishedAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }\\n    }\\n  },\\n  // المرحلة 2: تجميع حسب القسم وحساب الإحصائيات\\n  {\\n    $group: {\\n      _id: '$category',\\n      totalArticles: { $sum: 1 },\\n      totalViews: { $sum: '$viewsCount' },\\n      avgReadTime: { $avg: '$readTimeMinutes' }\\n    }\\n  },\\n  // المرحلة 3: الترتيب حسب إجمالي المشاهدات تنازلياً\\n  {\\n    $sort: { totalViews: -1 }\\n  },\\n  // المرحلة 4: تنسيق النتائج النهائية\\n  {\\n    $project: {\\n      _id: 0,\\n      category: '$_id',\\n      totalArticles: 1,\\n      totalViews: 1,\\n      avgReadTime: { $round: ['$avgReadTime', 1] }\\n    }\\n  }\\n]);\\n```\\n\\n---\\n\\n## المعاملات البنكية والـ Multi-Document ACID Transactions\\n\\nمنذ الإصدار 4.0، تدعم MongoDB المعاملات الذرية عبر عدة وثائق ومجموعات باستخدام الـ Sessions:\\n\\n```typescript\\nimport mongoose from 'mongoose';\\n\\nasync function transferFunds(fromAccountId: string, toAccountId: string, amount: number) {\\n  const session = await mongoose.startSession();\\n  session.startTransaction();\\n\\n  try {\\n    await Account.updateOne({ _id: fromAccountId }, { $inc: { balance: -amount } }, { session });\\n    await Account.updateOne({ _id: toAccountId }, { $inc: { balance: amount } }, { session });\\n\\n    await session.commitTransaction();\\n    console.log('✅ اكتملت المعاملة المالية بنجاح وبأمان ACID تام!');\\n  } catch (error) {\\n    await session.abortTransaction();\\n    console.error('❌ فشلت المعاملة، تم التراجع عن جميع التغييرات:', error);\\n    throw error;\\n  } finally {\\n    session.endSession();\\n  }\\n}\\n```\\n\\n---\\n\\n## الخلاصة وأفضل الممارسات\\n\\n* لا تبدأ مشروعك بدون فهارس واضحة للحقول التي تبحث بها وترتب بناءً عليها.\\n* تجنب المصفوفات غير المحدودة داخل الوثائق.\\n* راقب أداء الاستعلامات دائماً باستخدام `.explain('executionStats')` وتأكد من عدم وجود `COLLSCAN`.`\\n\",\n",
};
