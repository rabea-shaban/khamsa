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
  coverImage: '/images/articles/07-comprehensive-mongodb.svg',
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
  content: `## نمذجة البيانات في NoSQL: التضمين مقابل الإشارة

في عالم قواعد البيانات العلائقية (SQL)، يتم دائماً تطبيع الجداول (Normalization). ولكن في **MongoDB**، يتم تصميم المخطط (Schema) بناءً على **كيفية قراءة واستعلام التطبيق للبيانات (Query-Driven Modeling)**.

### متى نستخدم التضمين (Embedding)؟
* علاقة \`1 : 1\` أو \`1 : Few\` (مثل عناوين المستخدم أو إعدادات الحساب).
* عندما تحتاج لقراءة البيانات الفرعية في كل مرة تجلب فيها الوثيقة الرئيسية.

### متى نستخدم الإشارة (Referencing)?
* علاقة \`1 : Millions\` (مثل سجلات الـ Logs أو تفاعلات المنشورات).
* عندما تنمو المصفوفة بلا حدود (Unbounded Array Anti-Pattern).

---

## استراتيجيات الفهرسة: Compound Indexing وقاعدة ESR

الفهرس غير الصحيح إما أن يُهمل من المحرك، أو يتسبب في استهلاك موارد الذاكرة بلا فائدة. القاعدة المعمارية الأساسية هي **قاعدة ESR**:

\`\`\`text
ترتيب حقول الفهرس المركب (Compound Index):
1. Equality  (حقول التطابق التام مثل: status: 'PUBLISHED')
2. Sort      (حقول الترتيب مثل: createdAt: -1)
3. Range     (حقول النطاق مثل: views: { $gt: 100 })
\`\`\`

\`\`\`javascript
// إنشاء الفهرس المثالي للاستعلامات المجمعة
db.articles.createIndex({
  status: 1,      // 1. Equality
  createdAt: -1,  // 2. Sort
  viewsCount: 1   // 3. Range
});
\`\`\`

---

## تشريح خطط التنفيذ عبر \`explain()\`

\`\`\`javascript
// فحص أداء الاستعلام لمعرفة هل يستخدم الفهرس أم يفحص الجدول كاملاً
db.articles.find({ status: 'PUBLISHED' }).sort({ createdAt: -1 }).explain('executionStats');
\`\`\`

* **IXSCAN:** الفهرس يعمل بنجاح والبحث سريع.
* **COLLSCAN:** كارثة أداء! الاستعلام يفحص كل وثائق الجدول بدون فهرس.

---

## احتراف الـ Aggregation Pipeline

الـ **Aggregation Pipeline** هو محرك التحليلات القوي داخل MongoDB؛ حيث تمر البيانات عبر مراحل متتالية:

\`\`\`javascript
// استعلام تقرير: أكثر التصنيفات قراءة في الـ 30 يوماً الماضية
db.articles.aggregate([
  // المرحلة 1: تصفية المقالات المنشورة في آخر 30 يوماً
  {
    $match: {
      status: 'PUBLISHED',
      publishedAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }
  },
  // المرحلة 2: تجميع حسب القسم وحساب الإحصائيات
  {
    $group: {
      _id: '$category',
      totalArticles: { $sum: 1 },
      totalViews: { $sum: '$viewsCount' },
      avgReadTime: { $avg: '$readTimeMinutes' }
    }
  },
  // المرحلة 3: الترتيب حسب إجمالي المشاهدات تنازلياً
  {
    $sort: { totalViews: -1 }
  },
  // المرحلة 4: تنسيق النتائج النهائية
  {
    $project: {
      _id: 0,
      category: '$_id',
      totalArticles: 1,
      totalViews: 1,
      avgReadTime: { $round: ['$avgReadTime', 1] }
    }
  }
]);
\`\`\`

---

## المعاملات البنكية والـ Multi-Document ACID Transactions

منذ الإصدار 4.0، تدعم MongoDB المعاملات الذرية عبر عدة وثائق ومجموعات باستخدام الـ Sessions:

\`\`\`typescript
import mongoose from 'mongoose';

async function transferFunds(fromAccountId: string, toAccountId: string, amount: number) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Account.updateOne({ _id: fromAccountId }, { $inc: { balance: -amount } }, { session });
    await Account.updateOne({ _id: toAccountId }, { $inc: { balance: amount } }, { session });

    await session.commitTransaction();
    console.log('✅ اكتملت المعاملة المالية بنجاح وبأمان ACID تام!');
  } catch (error) {
    await session.abortTransaction();
    console.error('❌ فشلت المعاملة، تم التراجع عن جميع التغييرات:', error);
    throw error;
  } finally {
    session.endSession();
  }
}
\`\`\`

---

## الخلاصة وأفضل الممارسات

* لا تبدأ مشروعك بدون فهارس واضحة للحقول التي تبحث بها وترتب بناءً عليها.
* تجنب المصفوفات غير المحدودة داخل الوثائق.
* راقب أداء الاستعلامات دائماً باستخدام \`.explain('executionStats')\` وتأكد من عدم وجود \`COLLSCAN\`.\`
",`,
};
