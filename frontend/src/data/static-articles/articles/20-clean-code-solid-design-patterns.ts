import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article20: StaticArticle = {
  id: 'static-art-20',
  slug: 'clean-software-engineering-solid-principles-design-patterns',
  title: 'دليل هندسة البرمجيات النظيفة: مبادئ SOLID وتطبيق أشهر الـ Design Patterns بـ TypeScript',
  excerpt: 'الدليل المعماري المتقدم لكتابة كود نظيف وقابل للتوسع والصيانة: شرح مبادئ SOLID الخمسة بأمثلة كود عملية، وأهم أنماط التصميم الإنشائية والهيكلية والسلوكية (Factory, Singleton, Strategy, Observer, Adapter) في الويب.',
  description: 'دليل شامل لهندسة البرمجيات النظيفة ومبادئ SOLID: شرح Single Responsibility، Open/Closed، Liskov Substitution، Interface Segregation، Dependency Inversion، وأشهر Design Patterns في TypeScript.',
  category: 'Architecture',
  tags: ['Clean Code', 'SOLID Principles', 'Design Patterns', 'TypeScript', 'Software Engineering', 'Architecture'],
  keywords: ['مبادئ SOLID بالعربي', 'Clean Code في البرمجة', 'Design Patterns في TypeScript', 'Strategy Pattern', 'Factory Pattern', 'هندسة البرمجيات'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-06-25T11:00:00.000Z',
  updatedAt: '2026-09-21T01:30:00.000Z',
  readTimeMinutes: 30,
  coverImage: 'https://images.unsplash.com/photo-1516116211227-bbc13f7efc6b?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'هندسة البرمجيات النظيفة ومبادئ SOLID وأنماط التصميم',
  isFeatured: true,
  tableOfContents: [
    { id: 'why-clean-code', title: 'ما هو الكود النظيف؟ ولماذا ندفع ديناً تقنياً (Technical Debt) عندما نهمله؟', level: 2 },
    { id: 'solid-s', title: 'مبدأ المسؤولية الواحدة (Single Responsibility Principle - SRP)', level: 2 },
    { id: 'solid-o', title: 'مبدأ الفتح والإغلاق (Open/Closed Principle - OCP)', level: 2 },
    { id: 'solid-l', title: 'مبدأ استبدال ليسكوف (Liskov Substitution Principle - LSP)', level: 2 },
    { id: 'solid-i', title: 'مبدأ فصل الواجهات (Interface Segregation Principle - ISP)', level: 2 },
    { id: 'solid-d', title: 'مبدأ عكس التبعيات (Dependency Inversion Principle - DIP)', level: 2 },
    { id: 'design-patterns-practical', title: 'أشهر أنماط التصميم العملية: Strategy و Factory و Observer في TypeScript', level: 2 },
    { id: 'summary', title: 'الخلاصة وميثاق مهندس البرمجيات المحترف', level: 2 },
  ],
  faq: [
    {
      question: 'ما هو مبدأ Dependency Inversion (DIP) وكيف يفيدنا في اختبار الكود؟',
      answer: 'ينص DIP على أن الوحدات عالية المستوى يجب ألا تعتمد على وحدات منخفضة المستوى مباشرة بل على تجريدات (Interfaces). هذا يسمح باستبدال قاعدة البيانات الحقيقية أو بوابة الدفع بمحاكيات وهمية (Mocks) أثناء الاختبارات الآلية دون تعديل سطر واحد في منطق العمل.'
    },
    {
      question: 'متى نستخدم Strategy Pattern في مشاريع الويب؟',
      answer: 'عندما يكون لدينا خوارزميات أو طرق معالجة متعددة لنفس العملية (مثل بوابات الدفع: Stripe, PayPal, Fawry أو استراتيجيات تصدير التقارير: PDF, CSV, Excel)، حيث يتيح النمط تبديل الاستراتيجية أثناء وقت التشغيل بسلاسة.'
    },
    {
      question: 'ما هو الفرق بين الكود المعقد والكود النظيف؟',
      answer: 'الكود المعقد يحاول إظهار الذكاء البرمجي بحيل صعبة الفهم، بينما الكود النظيف يقرأ كالنص الأدبي الواضح، بسيط في دواله، معزول في مسؤولياته، ومغطى باختبارات واضحة.'
    }
  ],
  relatedSlugs: [
    'comprehensive-typescript-guide-types-generics-patterns',
    'building-production-restful-apis-express-clean-architecture',
    'system-design-guide-monolith-to-distributed-scale'
  ],
  seo: {
    title: 'دليل هندسة البرمجيات النظيفة: مبادئ SOLID و Design Patterns',
    description: 'شرح معماري لمبادئ SOLID الخمسة وأنماط التصميم (Strategy, Factory, Observer) بأمثلة كود TypeScript عملية من بيئات الإنتاج.',
    keywords: ['SOLID Principles', 'Clean Code', 'Design Patterns', 'TypeScript Architecture', 'Dependency Inversion', 'Strategy Pattern'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/clean-software-engineering-solid-principles-design-patterns',
  },
  content: "\"## ما هو الكود النظيف؟ ولماذا ندفع ديناً تقنياً (Technical Debt) عندما نهمله؟\\n\\nالكود النظيف (Clean Code) ليس كوداً خالياً من الأخطاء فحسب، بل هو كود:\\n1. **سهل القراءة والفهم:** للمطورين الآخرين ولنفسك بعد 6 أشهر.\\n2. **سهل التعديل والتطوير:** إضافة ميزة جديدة لا تكسر ميزات قديمة.\\n3. **سهل الاختبار الآلي:** معزول ومغطى باختبارات وحدة موثوقة.\\n\\nالإهمال في كتابة الكود النظيف يراكم **الدين التقني (Technical Debt)**؛ ومع الوقت يصبح كل تعديل بسيط يستغرق أياماً بدلاً من ساعات.\\n\\n---\\n\\n## مبادئ SOLID الخمسة مع أمثلة TypeScript عملية\\n\\n### 1. Single Responsibility Principle (SRP)\\n> «يجب أن يكون لكل وحدة برمجية أو كلاس سبب واحد فقط للتغيير.»\\nفصل مسؤولية التحقق من البيانات، عن الحفظ في قاعدة البيانات، عن إرسال الإشعارات.\\n\\n### 2. Open/Closed Principle (OCP)\\n> «البرمجيات يجب أن تكون مفتوحة للتوسع (Open for extension)، مغلقة أمام التعديل المباشر (Closed for modification).»\\nإضافة طرق جديدة للدفع أو التقارير عبر إنشاء كلاسات جديدة دون تعديل الكلاس الرئيسي.\\n\\n### 3. Liskov Substitution Principle (LSP)\\n> «الفئات المشتقة يجب أن تكون قابلة للاستبدال بالفئات الأساسية دون الإخلال بصحة وسلوك البرنامج.»\\n\\n### 4. Interface Segregation Principle (ISP)\\n> «لا تجبر العميل على الاعتماد على واجهات تحتوي على دوال لا يستخدمها.»\\nتقسيم الواجهات الكبيرة إلى واجهات صغيرة مركزة ومحددة.\\n\\n### 5. Dependency Inversion Principle (DIP)\\n> «الوحدات عالية المستوى يجب ألا تعتمد على وحدات منخفضة المستوى مباشرة، بل يجب أن يعتمد كلاهما على تجريدات (Interfaces).»\\n\\n---\\n\\n## تطبيق عملي: نمط Strategy Pattern لمعالجة بوابات الدفع\\n\\n```typescript\\n// 1. التجريد (Interface)\\nexport interface PaymentStrategy {\\n  processPayment(amount: number): Promise<{ success: boolean; transactionId: string }>;\\n}\\n\\n// 2. استراتيجيات الدفع المختلفة\\nexport class StripePaymentStrategy implements PaymentStrategy {\\n  async processPayment(amount: number) {\\n    console.log(`معالجة الدفع عبر Stripe لمبلغ ${amount} دولار...`);\\n    return { success: true, transactionId: `str_${Date.now()}` };\\n  }\\n}\\n\\nexport class PayPalPaymentStrategy implements PaymentStrategy {\\n  async processPayment(amount: number) {\\n    console.log(`معالجة الدفع عبر PayPal لمبلغ ${amount} دولار...`);\\n    return { success: true, transactionId: `pal_${Date.now()}` };\\n  }\\n}\\n\\n// 3. السياق (Context) المستقل عن نوع البوابة\\nexport class CheckoutService {\\n  constructor(private strategy: PaymentStrategy) {}\\n\\n  setStrategy(newStrategy: PaymentStrategy) {\\n    this.strategy = newStrategy;\\n  }\\n\\n  async checkout(orderTotal: number) {\\n    return this.strategy.processPayment(orderTotal);\\n  }\\n}\\n```\\n\\n---\\n\\n## نمط Factory Method Pattern لإنشاء الإشعارات\\n\\n```typescript\\nexport interface INotificationService {\\n  send(recipient: string, message: string): Promise<void>;\\n}\\n\\nexport class EmailNotification implements INotificationService {\\n  async send(recipient: string, message: string) {\\n    console.log(`إرسال بريد إلكتروني إلى ${recipient}: ${message}`);\\n  }\\n}\\n\\nexport class SMSNotification implements INotificationService {\\n  async send(recipient: string, message: string) {\\n    console.log(`إرسال رسالة نصية SMS إلى ${recipient}: ${message}`);\\n  }\\n}\\n\\nexport class NotificationFactory {\\n  static create(channel: 'EMAIL' | 'SMS'): INotificationService {\\n    switch (channel) {\\n      case 'EMAIL':\\n        return new EmailNotification();\\n      case 'SMS':\\n        return new SMSNotification();\\n      default:\\n        throw new Error('قناة إشعارات غير مدعومة');\\n    }\\n  }\\n}\\n```\\n\\n---\\n\\n## الخلاصة وميثاق مهندس البرمجيات\\n\\nكتابة الكود النظيف ليست عبئاً إضافياً، بل هي العلامة الفارقة بين المبرمج الهاوي ومهندس البرمجيات المحترف الذي يبني أنظمة تعيش وتنمو لسنوات.\",\n",
};
