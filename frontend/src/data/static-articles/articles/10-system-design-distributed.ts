import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article10: StaticArticle = {
  id: 'static-art-10',
  slug: 'system-design-guide-monolith-to-distributed-scale',
  title: 'تصميم أنظمة الويب الموزعة (System Design): من تطبيق أحادي (Monolith) إلى خدمة ملايين المستخدمين',
  excerpt: 'الدليل الهندسي لتصميم البنى التحتية واسعة النطاق: موازنة الأحمال (Load Balancing)، تقسيم وتكرار قواعد البيانات (Sharding & Replication)، الطوابير غير المتزامنة (Message Queues)، ونظرية CAP Theorem.',
  description: 'دليل تصميم الأنظمة وتوسيع التطبيقات System Design: التوسع الأفقي مقابل الرأسي، Load Balancers، Database Sharding، Message Brokers (Kafka / RabbitMQ)، ومعمارية Microservices.',
  category: 'Architecture',
  tags: ['System Design', 'Architecture', 'Microservices', 'Scalability', 'Backend', 'DevOps'],
  keywords: ['System Design بالعربي', 'تصميم الأنظمة الموزعة', 'موازنة الأحمال Load Balancer', 'Database Sharding', 'Message Queues', 'CAP Theorem'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-03-28T09:00:00.000Z',
  updatedAt: '2026-09-20T20:30:00.000Z',
  readTimeMinutes: 32,
  coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'تصميم أنظمة الويب الموزعة والتوسع للملايين System Design',
  isFeatured: true,
  tableOfContents: [
    { id: 'scale-types', title: 'التوسع الرأسي (Vertical) مقابل التوسع الأفقي (Horizontal)', level: 2 },
    { id: 'load-balancers', title: 'موازنات الأحمال (Load Balancers): خوارزميات التوزيع ومستويات L4 vs L7', level: 2 },
    { id: 'database-scaling', title: 'توسيع قواعد البيانات: Read Replicas والـ Sharding والـ Partitioning', level: 2 },
    { id: 'caching-layers', title: 'طبقات التخزين المؤقت الموزعة (CDN و Redis Distributed Caching)', level: 2 },
    { id: 'async-message-queues', title: 'المعالجة غير المتزامنة وطوابير الرسائل (RabbitMQ و Apache Kafka)', level: 2 },
    { id: 'cap-theorem', title: 'نظرية CAP Theorem: الموازنة بين Consistency و Availability و Partition Tolerance', level: 2 },
    { id: 'monolith-vs-microservices', title: 'متى تنتقل من Monolith إلى Microservices؟ ولماذا تفشل معظم الفرق؟', level: 2 },
    { id: 'summary', title: 'الخلاصة وخارطة طريق مهندس النظم', level: 2 },
  ],
  faq: [
    {
      question: 'ما هي خوارزمية موازنة الأحمال الأنسب لتطبيقات الويب ذات الجلسات المتغيرة؟',
      answer: 'الخوارزمية الأكثر استخداماً هي Least Connections أو Weighted Least Connections، حيث توجه الطلب الجديد للخادم الذي يحتوي على أقل عدد من الاتصالات النشطة، مما يمنع إرهاق خادم واحد بالطلبات الثقيلة.'
    },
    {
      question: 'ما هو الفرق بين Database Replication و Database Sharding؟',
      answer: 'في الـ Replication (النسخ الاحتياطي للقراءة)، تحتوي كل نسخة على 100% من البيانات لتوزيع استعلامات القراءة فقط، بينما في الـ Sharding (التجزئة الأفقية)، يتم تقسيم قاعدة البيانات نفسها وتوزيع أجزاء مختلفة من البيانات عبر خوادم متعددة بناءً على Shard Key.'
    },
    {
      question: 'لماذا تبدأ الشركات الناجحة بـ Modular Monolith بدلاً من الـ Microservices؟',
      answer: 'لأن الـ Microservices تضيف تعقيدات هائلة في الشبكة والمراقبة والـ Distributed Transactions وعمليات النشر. البدء بـ Modular Monolith نظيف ومفصول الطبقات يعطي سرعة تطوير فائقة، ويمكن فصل الخدمات بسهولة لاحقاً عند الحاجة الفعلية للتوسع.'
    }
  ],
  relatedSlugs: [
    'advanced-caching-redis-strategies-practical-patterns',
    'comprehensive-mongodb-guide-indexing-aggregation-performance',
    'building-production-restful-apis-express-clean-architecture'
  ],
  seo: {
    title: 'تصميم أنظمة الويب الموزعة: دليل System Design من الصفر للملايين',
    description: 'دليل شامل لـ System Design: موازنة الأحمال، تقسيم قواعد البيانات، طوابير الرسائل، ومقارنة Monolith vs Microservices مع رسوم توضيحية.',
    keywords: ['System Design', 'Scalability', 'Load Balancer', 'Microservices', 'Sharding', 'CAP Theorem', 'معمارية النظم'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/system-design-guide-monolith-to-distributed-scale',
  },
  content: "\"## التوسع الرأسي مقابل التوسع الأفقي\\n\\nعندما يواجه موقعك ملايين الطلبات المتزامنة، يكون لديك خياران هندسيان:\\n1. **Vertical Scaling (Scaling Up):** زيادة إمكانيات الخادم نفسه (CPU, RAM, NVMe). سهل التطبيق لكنه محدود بأعلى مواصفات في السوق وباهظ التكلفة ويمثل نقطة فشل وحيدة (Single Point of Failure).\\n2. **Horizontal Scaling (Scaling Out):** إضافة عشرات الخوادم الصغيرة خلف موازن أحمال (Load Balancer). يوفر مرونة لا نهائية وموثوقية عالية (High Availability).\\n\\n---\\n\\n## تشريح البنية التحتية الموزعة الحديثة\\n\\n```text\\n[ المستخدمين حول العالم ]\\n           │\\n           ▼\\n[ Anycast DNS + CDN (Cloudflare) ] ──> يقدم الملفات الثابتة والصور ويصد هجمات DDoS\\n           │\\n           ▼\\n[ Load Balancer (Nginx / ALB) ] ───> يوزع طلبات الـ HTTP/HTTPS ديناميكياً\\n     ┌─────┴─────────────────┐\\n     ▼                       ▼\\n[ App Server 1 ]       [ App Server 2 ] ──> معالجة بدون حالة (Stateless)\\n     │                       │\\n     ├───────────────────────┤\\n     ▼                       ▼\\n[ Distributed Redis Cache ]  [ Message Queue (RabbitMQ) ]\\n     │                       │\\n     ▼                       ▼\\n[ Primary Database (Write) ] [ Background Workers (Tasks) ]\\n     │\\n     ▼\\n[ Read Replicas (Read-Only 1 & 2) ]\\n```\\n\\n---\\n\\n## نظرية CAP Theorem\\n\\nفي أي نظام موزع، تنص نظرية **CAP Theorem** على أنه يستحيل تحقيق الخصائص الثلاث معاً في وجود عطل بالشبكة (Network Partition):\\n\\n* **Consistency (الاتساق):** كل قراءة تحصل على أحدث كتابة أو تفشل.\\n* **Availability (التوفر):** كل طلب يحصل على رد غير خطأ بدون ضمان أنه الأحدث.\\n* **Partition Tolerance (تحمل انقطاع الشبكة):** استمرار عمل النظام حتى لو انقطع الاتصال بين الخوادم.\\n\\nفي الأنظمة الواقعية، الـ Partition Tolerance حتمي الحدوث؛ لذلك عليك الاختيار بين:\\n* **CP Systems (الاتساق على حساب التوفر):** مثل الأنظمة المصرفية وحجز التذاكر.\\n* **AP Systems (التوفر على حساب الاتساق الفوري):** مثل شبكات التواصل الاجتماعي وخلاصات الأخبار (Eventual Consistency).\\n\\n---\\n\\n## استراتيجيات Database Sharding\\n\\nعندما يتجاوز حجم قاعدة البيانات سعة القرص لخادم واحد، نقوم بتقسيم البيانات بناءً على **Shard Key**:\\n* **Range-Based Sharding:** تقسيم المستخدمين حسب أول حرف من الاسم أو تاريخ الإنشاء.\\n* **Hash-Based Sharding:** تطبيق دالة Hash على الـ User ID لتوزيع الحمل بالتساوي التام عبر الـ Shards.\\n\\n---\\n\\n## الخلاصة وأفضل الممارسات\\n\\n* اجعل خوادم التطبيق دائمًا **Stateless** بحيث يمكن إضافة أو إزالة خوادم في ثوانٍ.\\n* استخدم الـ Caching في كل طبقة (Client, CDN, Server, Database).\\n* افصل المهام الطويلة (إرسال الإيميلات، معالجة الفيديو) إلى طوابير رسائل وخلفيات عمل (Workers).`\\n\",\n",
};
