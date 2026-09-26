import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article02: StaticArticle = {
  id: 'static-art-02',
  slug: 'comprehensive-typescript-guide-types-generics-patterns',
  title: 'الدليل الهندسي الشامل لـ TypeScript: من الأساسيات إلى الـ Generics والـ Conditional Types والأنماط المتقدمة',
  excerpt: 'تعلم كيف تحول مشروعك من كود غير آمن إلى نظام برمجي فائق الاستقرار باستخدام TypeScript: شرح مفصل للـ Generics، Mapped Types، Discriminated Unions، Utility Types، والـ Type Guards مع تطبيقات عملية من بيئات الإنتاج.',
  description: 'دليل شامل لاحتراف لغة TypeScript في بيئات الإنتاج: شرح Generics، Conditional Types، Template Literal Types، Type Narrowing، وهندسة الأنواع المتقدمة مع أمثلة كود.',
  category: 'TypeScript',
  tags: ['TypeScript', 'JavaScript', 'Type Safety', 'Generics', 'Web Development', 'Design Patterns'],
  keywords: ['TypeScript بالعربي', 'شرح Generics في تايب سكريبت', 'Advanced TypeScript', 'Utility Types', 'تعلم TypeScript للمبتدئين والمحترفين', 'Type Narrowing'],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-01-22T10:00:00.000Z',
  updatedAt: '2026-09-20T15:00:00.000Z',
  readTimeMinutes: 30,
  coverImage: '/images/articles/02-comprehensive-typescript.jpg',
  coverAlt: 'هندسة الأنواع والأنماط المتقدمة في TypeScript',
  isFeatured: true,
  tableOfContents: [
    { id: 'why-typescript', title: 'لماذا نحتاج TypeScript ولماذا ليست مجرد قيود كتابية؟', level: 2 },
    { id: 'type-system', title: 'فهم نظام الأنواع: Structural Typing مقابل Nominal Typing', level: 2 },
    { id: 'generics', title: 'احتراف الـ Generics: كتابة كود مرن وقابل لإعادة الاستخدام مع Type Constraints', level: 2 },
    { id: 'type-narrowing', title: 'الـ Type Narrowing والـ Discriminated Unions لإلغاء الحالات المستحيلة', level: 2 },
    { id: 'utility-types', title: 'أسرار الـ Utility Types المدمجة: Partial, Pick, Omit, Record, Readonly', level: 2 },
    { id: 'advanced-types', title: 'الأنواع المتقدمة: Mapped Types و Conditional Types و Infer Keyword', level: 2 },
    { id: 'template-literals', title: 'الـ Template Literal Types واستخداماتها في الـ Route Paths والـ Event Handlers', level: 2 },
    { id: 'runtime-validation', title: 'سد الفجوة بين وقت الترجمة والتشغيل: استخدام Zod مع TypeScript', level: 2 },
    { id: 'strict-config', title: 'إعدادات tsconfig.json الصارمة لبيئات الإنتاج (Enterprise-grade)', level: 2 },
    { id: 'common-mistakes', title: 'أخطر الأخطاء الشائعة في TypeScript وكيفية تجنبها عملياً', level: 2 },
    { id: 'summary', title: 'الخلاصة ومبادئ المطور المحترف', level: 2 },
  ],
  faq: [
    {
      question: 'ما الفرق بين interface و type alias ومتى أستخدم كلاً منهما؟',
      answer: 'الـ interface مثالي لتعريف هياكل الكائنات (Objects) وقابل للدمج التلقائي (Declaration Merging) والتوسيع عبر extends، بينما الـ type alias أكثر مرونة في تعريف الـ Unions، Primitives، Tuples، والـ Mapped Types المتقدمة.'
    },
    {
      question: 'لماذا يجب تجنب استخدام type any تماماً في مشاريع الإنتاج؟',
      answer: 'استخدام any يعطل محرك فحص الأنواع (Type Checker) تماماً ويفقدك ميزة الأمان وسرعة الإكمال التلقائي، ويسمح بتمرير أخطاء كارثية إلى وقت التشغيل (Runtime Errors). البديل الصحيح هو استخدام unknown مع الـ Type Narrowing.'
    },
    {
      question: 'ما هي الـ Discriminated Unions ولماذا هي أفضل طريقة لتمثيل الحالات (State)؟',
      answer: 'هي نمط في TypeScript يعتمد على وجود خاصية مشتركة ذات قيمة ثابتة (Literal Type) مثل kind أو status داخل عدة أنواع مختلفة، مما يسمح للمترجم بمعرفة النوع الدقيق وحقوله داخل عبارات switch أو if تلقائياً.'
    },
    {
      question: 'كيف نتحقق من صحة بيانات الـ JSON القادمة من الـ API أثناء وقت التشغيل (Runtime)؟',
      answer: 'بما أن أنواع TypeScript تُحذف بالكامل بعد التجميع (Type Erasure)، نستخدم مكتبات التحقق من المخططات أثناء التشغيل مثل Zod أو Valibot لفحص البيانات القادمة من الـ API وتوليد أنواع TypeScript المتطابقة معها تلقائياً عبر z.infer.'
    }
  ],
  relatedSlugs: [
    'modern-javascript-comprehensive-guide-es6-async',
    'react-19-architecture-server-components-advanced-hooks',
    'clean-software-engineering-solid-principles-design-patterns'
  ],
  seo: {
    title: 'الدليل الهندسي الشامل لـ TypeScript: Generics و Advanced Types',
    description: 'تعلم أسرار لغة TypeScript الحديثة: Generics، Mapped Types، Discriminated Unions، Utility Types، وإعدادات الإنتاج الصارمة مع أمثلة كود.',
    keywords: ['TypeScript', 'Generics', 'Type Safety', 'Advanced Types', 'TypeScript بالعربي', 'هندسة البرمجيات'],
    canonicalUrl: 'https://khamsa-web.vercel.app/articles/comprehensive-typescript-guide-types-generics-patterns',
  },
  content: `## لماذا نحتاج TypeScript ولماذا ليست مجرد قيود كتابية؟

في المراحل الأولى لأي مشروع برمجي، قد تبدو لغة **JavaScript** البسيطة سريعة ومغرية؛ فأنت تكتب المتغيرات مباشرة وتختبر التطبيق في ثوانٍ. ولكن مع توسع المشروع، وزيادة أسطر الكود عن 10,000 سطر، ودخول أكثر من مطور في الفريق، تبدأ الفوضى المعمارية بالظهور:
* أخطاء الـ \`Cannot read properties of undefined\` التي تظهر فجأة في بيئة الإنتاج أمام المستخدمين.
* الخوف الشديد من إعادة هيكلة الكود (Refactoring) لأنك لا تدري ما الذي قد ينكسر في ملفات أخرى.
* قضاء ساعات طويلة في قراءة كود قديم لمعرفة نوع البيانات التي تستقبلها دالة معينة.

هنا يأتي دور **TypeScript**: فهي ليست مجرد أداة لإضافة الأنواع، بل هي **عقد هندسي صارم (Type Contract)**، وأداة توثيق حية تفاعلية، وخط دفاع أول يمنع أكثر من 60% من أخطاء الـ Runtime قبل أن يُترجم كودك إلى JavaScript أصلاً!

---

## فهم نظام الأنواع: Structural Typing مقابل Nominal Typing

في لغات مثل Java أو #C، يعتمد نظام الأنواع على **Nominal Typing**؛ أي أن الكائن يجب أن يكون صراحة مشتقاً من الكلاس المسمى لكي يُقبل.

أما **TypeScript**، فهي تعتمد على **Structural Typing** (نظام الأنواع الهيكلي):
المترجم لا يهتم باسم الكائن أو الـ Interface، بل ينظر فقط إلى **شكله الداخلي وحقوله**:

\`\`\`typescript
interface Point2D {
  x: number;
  y: number;
}

interface Coordinate {
  x: number;
  y: number;
}

function renderPoint(point: Point2D): void {
  console.log(\`الإحداثيات: X=\\\${point.x}, Y=\\\${point.y}\`);
}

const mapCoord: Coordinate = { x: 100, y: 250 };

// ✅ يعمل بنجاح تام لأن Coordinate و Point2D متطابقان هيكلياً في الخصائص والأنواع!
renderPoint(mapCoord);

// كائن إضافي يحتوي على حقل z زائد
const point3D = { x: 10, y: 20, z: 30 };
renderPoint(point3D); // ✅ مسموح لأن point3D يحتوي على x و y المطلوبين على الأقل
\`\`\`

---

## احتراف الـ Generics: كتابة كود مرن وقابل لإعادة الاستخدام

الـ **Generics** هي الميزة الأقوى في TypeScript؛ فهي تتيح لك كتابة دوال، وكلاسات، وواجهات برمجية تعمل مع أي نوع بيانات مع الحفاظ التام على الأمان وفحص الأنواع دون التضحية بـ \`any\`.

### بناء Generic Repository Pattern موحد لقواعد البيانات:

\`\`\`typescript
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRepository<T extends BaseEntity> {
  findById(id: string): Promise<T | null>;
  findAll(filter?: Partial<T>): Promise<T[]>;
  create(item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

// كيان المقالات
export interface ArticleEntity extends BaseEntity {
  title: string;
  slug: string;
  content: string;
  viewsCount: number;
  isPublished: boolean;
}

// تطبيق الـ Repository للمقالات مع الـ Type Safety التام
export class ArticleRepository implements IRepository<ArticleEntity> {
  private items: ArticleEntity[] = [];

  async findById(id: string): Promise<ArticleEntity | null> {
    return this.items.find(item => item.id === id) || null;
  }

  async findAll(filter?: Partial<ArticleEntity>): Promise<ArticleEntity[]> {
    if (!filter) return this.items;
    return this.items.filter(item => {
      return Object.entries(filter).every(([key, value]) => (item as any)[key] === value);
    });
  }

  async create(data: Omit<ArticleEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ArticleEntity> {
    const newArticle: ArticleEntity = {
      ...data,
      id: \`art_\\\${Date.now()}\`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.items.push(newArticle);
    return newArticle;
  }

  async update(id: string, updateData: Partial<ArticleEntity>): Promise<ArticleEntity | null> {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) return null;

    this.items[index] = {
      ...this.items[index],
      ...updateData,
      updatedAt: new Date(),
    };
    return this.items[index];
  }

  async delete(id: string): Promise<boolean> {
    const initialLen = this.items.length;
    this.items = this.items.filter(i => i.id !== id);
    return this.items.length < initialLen;
  }
}
\`\`\`

---

## الـ Type Narrowing والـ Discriminated Unions

عند التعامل مع طلبات الشبكة، تقع الكثير من التطبيقات في أخطاء عندما تكون الحالة غير متسقة. الـ **Discriminated Unions** تحل المشكلة جذرياً:

\`\`\`typescript
type NetworkResult<TData> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: TData; latencyMs: number }
  | { status: 'error'; error: Error; statusCode: number };

function handleApiResponse<T>(response: NetworkResult<T>): string {
  switch (response.status) {
    case 'idle':
      return 'في انتظار بدء الطلب...';
    case 'loading':
      return 'جاري جلب البيانات من الخادم...';
    case 'success':
      // المترجم يعرف أن response.data موجود حصرياً هنا وبدون الحاجة لـ Type Casting
      return \`تم النجاح في \\\${response.latencyMs}ms! البيانات جاهزة.\`;
    case 'error':
      // المترجم يعرف أن response.error و response.statusCode متاحان هنا فقط
      return \`فشل الطلب [HTTP \\\${response.statusCode}]: \\\${response.error.message}\`;
  }
}
\`\`\`

---

## أسرار الـ Utility Types: Partial, Pick, Omit, Record

\`\`\`typescript
interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'USER';
  passwordHash: string;
  isVerified: boolean;
}

// 1. Omit: استبعاد الحقول الحساسة لإنشاء DTO عام
type PublicUserDto = Omit<UserAccount, 'passwordHash'>;

// 2. Pick: اختيار حقول محددة لبطاقة العرض المصغرة
type UserHeaderSummary = Pick<UserAccount, 'id' | 'name' | 'role'>;

// 3. Partial: لتحديث الملف الشخصي حيث تكون كل الحقول اختيارية
type UpdateProfilePayload = Partial<Pick<UserAccount, 'name' | 'email'>>;

// 4. Record: لتعريف خريطة الأذونات
type PermissionMap = Record<UserAccount['role'], string[]>;

const permissions: PermissionMap = {
  ADMIN: ['MANAGE_USERS', 'PUBLISH_ARTICLES', 'DELETE_MEDIA'],
  EDITOR: ['WRITE_ARTICLES', 'EDIT_ARTICLES'],
  USER: ['READ_ARTICLES', 'POST_COMMENTS'],
};
\`\`\`

---

## سد الفجوة بين وقت الترجمة ووقت التشغيل (Zod + TypeScript)

بما أن TypeScript تُحذف بالكامل عند بناء الكود (Compile Time only)، فإن فحص البيانات الخارجية القادمة من نماذج المستخدم أو الـ APIs يتطلب مكتبة Schema Validation مثل **Zod**:

\`\`\`typescript
import { z } from 'zod';

export const UserRegistrationSchema = z.object({
  name: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  email: z.string().email('صيغة البريد الإلكتروني غير صحيحة'),
  password: z.string().min(8, 'كلمة المرور يجب ألا تقل عن 8 خانات'),
  age: z.number().int().min(16, 'العمر يجب أن يكون 16 سنة فما فوق').optional(),
});

// استخراج نوع TypeScript تلقائياً من الـ Schema بدون تكرار الكود!
export type UserRegistrationInput = z.infer<typeof UserRegistrationSchema>;

export function registerUser(input: unknown): UserRegistrationInput {
  // يفحص البيانات أثناء التشغيل ويرمي أخطاء واضحة إذا كانت غير مطابقة
  return UserRegistrationSchema.parse(input);
}
\`\`\`

---

## إعدادات tsconfig.json الصارمة لبيئات الإنتاج (Enterprise)

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
\`\`\`

---

## الخلاصة ومبادئ المطور المحترف

TypeScript ليست عبئاً كتابياً، بل هي التأمين الشامل لكودك البرمجي. عندما تتقن الـ Generics، والـ Discriminated Unions، والتكامل مع Zod، ستكتب شفرات برمجية ذات موثوقية لا تلين، وسرعة تطوير تضاعف إنتاجيتك في مشاريع الإنتاج الحقيقية.
  \`
",`,
};
