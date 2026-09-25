import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Info,
  HelpCircle,
  Lightbulb,
  Target,
  Compass,
  Send,
  Workflow,
  Rocket,
  CheckCircle2,
  Code2,
  Users,
  BookOpen,
  Video,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SocialLinks } from '@/components/shared/SocialLinks';
import { settingsApi } from '@/lib/api/settings.api';
import { Settings } from '@/types/api';

export const metadata: Metadata = {
  title: 'من نحن | خمسة برمجة بالبلدي',
  description:
    'تعرف على قصة، ورؤية، ورسالة، وفلسفة منصة خمسة برمجة بالبلدي ومؤسسها ربيع شعبان لتبسيط علوم البرمجة للمطور العربي.',
};

export default async function AboutPage() {
  let settings: Settings | null = null;
  try {
    const res = await settingsApi.getPublicSettings();
    settings = res.data;
  } catch {
    // Fallback gracefully
  }

  const about = settings?.about;
  const founder = settings?.founder;
  const founderName = founder?.founderName || 'ربيع شعبان';
  const founderRole = founder?.founderRole || 'Full Stack Software Engineer';

  const aboutHeroTitle = about?.aboutTitle || 'من نحن؟';
  const aboutHeroSub = about?.aboutShortDescription || 'بدأت بفكرة بسيطة... إن البرمجة ممكن تتفهم بشكل أبسط.';
  const aboutStory =
    about?.aboutStory ||
    'ليه ناس كتير عندها الرغبة الحقيقية تتعلم البرمجة، لكن أول ما تبدأ تواجه مصطلحات معقدة وشروحات طويلة ومحتوى مش مناسب لطريقة تفكيرها؟ من هنا بدأت الفكرة: ليه ما نشرحش البرمجة بطريقة بسيطة، من غير ما نبسطها لدرجة تفقد قيمتها وعمقها الهندسي؟ ومن هذا المنطلق انطلقت خمسة برمجة بالبلدي.';

  const visionStages = [
    {
      num: '01',
      title: 'أنا لسه هبدأ برمجة',
      desc: 'تأسيس منطق التفكير البرمجي وفهم علوم الحاسب بدون خوف من المصطلحات المعقدة.',
    },
    {
      num: '02',
      title: 'أنا بعمل أول مشروع',
      desc: 'تطبيق عملي على هيكلة الكود وربط الـ Frontend بالـ Backend وقواعد البيانات.',
    },
    {
      num: '03',
      title: 'أنا بدور على شغل',
      desc: 'فهم معايير السوق الحقيقية، والـ Best Practices، والـ Clean Code، وأسئلة المقابلات.',
    },
    {
      num: '04',
      title: 'أنا Developer وعايز أطور مستوايا',
      desc: 'شروحات عميقة في الـ Architecture، والـ System Design، وتحسين الأداء وقابلية التوسع.',
    },
  ];

  const philosophySteps = [
    { title: 'افهم', desc: 'استوعب المشكلة وليه الحل ده هو الأنسب.' },
    { title: 'جرّب', desc: 'افتح الـ VS Code واكتب الكود بيدك.' },
    { title: 'اخطئ', desc: 'الأخطاء والـ Bugs هي بداية التعلم الحقيقي.' },
    { title: 'أصلح', desc: 'اقرأ رسالة الخطأ وافهم سببها وحلها.' },
    { title: 'طوّر', desc: 'حسّن الكود وخلي الحل أكثر كفاءة.' },
    { title: 'كرر', desc: 'ابني عادة التعلم المستمر وتحدي النفس.' },
  ];

  const techStack = ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'System Design'];

  return (
    <div className="max-w-5xl mx-auto space-y-24 py-8 sm:py-12">
      {/* 1. Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/25 text-xs font-bold shadow-xs">
          <Info className="h-3.5 w-3.5" />
          <span>هوية المنصة وفلسفتها</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
          {aboutHeroTitle}
        </h1>

        <p className="text-xl sm:text-2xl font-bold text-primary">
          {aboutHeroSub}
        </p>

        <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed font-normal">
          نحن <strong className="text-foreground font-bold">«{settings?.siteName || 'خمسة برمجة بالبلدي'}»</strong>. منصة تقنية عربية
          بدأت بفكرة وسؤال: <strong className="text-foreground">ماذا لو أصبحت البرمجة أسهل في الفهم؟</strong> ومن
          خلال المحتوى العربي، نحاول تقديم البرمجة والتكنولوجيا بصورة عملية وبسيطة وقريبة من المطور العربي.
        </p>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-card text-sm sm:text-base font-semibold text-foreground">
          «نحن لا نعدك بأن الطريق سيكون سهلًا.. لكننا نريد أن نجعل <span className="text-primary font-bold">فهم الطريق أسهل.</span>»
        </div>
      </section>

      {/* 2. The Story (قصتنا) */}
      <section className="rounded-3xl border border-border bg-card p-8 sm:p-12 space-y-6 shadow-card relative overflow-hidden">
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-primary font-bold text-xs">
            <HelpCircle className="h-4 w-4" />
            <span>قصتنا</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            القصة بدأت من سؤال
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-foreground-secondary leading-relaxed font-normal">
            <p>{aboutStory}</p>
          </div>
        </div>
      </section>

      {/* 3. Why The Name (ليه اسمها خمسة برمجة بالبلدي؟) */}
      <section className="rounded-3xl border border-border bg-card p-8 sm:p-12 space-y-6 shadow-card">
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-primary font-bold text-xs">
            <Lightbulb className="h-4 w-4" />
            <span>الهوية والاسم</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            ليه اسمها &quot;خمسة برمجة بالبلدي&quot;؟
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-foreground-secondary leading-relaxed font-normal">
            <p>
              الاسم مش مجرد اسم تجاري أو Brand معمول وخلاص؛ ده تلخيص لمنهج كامل في التعلم.
            </p>
            <p>
              <strong className="text-primary font-bold">«برمجة بالبلدي»</strong> معناها إننا بنتكلم عن البرمجة بلغة بسيطة ومباشرة ومن واقع حياتنا اليومية، عشان نقرب أعقد المفاهيم المعمارية (APIs, Caching, Databases, Clean Architecture) بدون مصطلحات معقدة تشتت المتعلم، مع الحفاظ الكامل على العمق الهندسي.
            </p>
            <p>
              أما <strong className="text-primary font-bold">«خمسة»</strong> فهي فلسفة تقديم المعلومة؛ لأن كل فكرة برمجية كبيرة نقدر نفككها لـ ٥ أجزاء مركزة:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 py-2 text-center">
              <div className="p-3 rounded-xl bg-secondary border border-border">
                <span className="font-mono font-bold text-primary block">٥ دقائق</span>
                <span className="text-[11px] text-foreground-muted">لكل كبسولة</span>
              </div>
              <div className="p-3 rounded-xl bg-secondary border border-border">
                <span className="font-mono font-bold text-primary block">٥ مفاهيم</span>
                <span className="text-[11px] text-foreground-muted">لتأسيس الأساس</span>
              </div>
              <div className="p-3 rounded-xl bg-secondary border border-border">
                <span className="font-mono font-bold text-primary block">٥ خطوات</span>
                <span className="text-[11px] text-foreground-muted">لبناء المشروع</span>
              </div>
              <div className="p-3 rounded-xl bg-secondary border border-border">
                <span className="font-mono font-bold text-primary block">٥ أخطاء</span>
                <span className="text-[11px] text-foreground-muted">لتجنبها</span>
              </div>
              <div className="p-3 rounded-xl bg-secondary border border-border">
                <span className="font-mono font-bold text-primary block">٥ حلول</span>
                <span className="text-[11px] text-foreground-muted">معمارية نظيفة</span>
              </div>
            </div>

            <p>
              إحنا مش عايزين اسم المنصة يكون مجرد اسم تقني تقليدي ومكرر.. إحنا عايزين اسم لما تسمعه تفتكره، وتثق في معلومته، وتطبقه بإيدك على طول:
            </p>
            <div className="p-4 rounded-xl bg-secondary border border-border text-center font-black text-lg sm:text-xl text-primary">
              خمسة برمجة بالبلدي — نفهم البرمجة بالبلدي، ونبنيها صح.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Founder Story (مين صاحب الفكرة؟) */}
      <section className="rounded-3xl border border-border bg-card p-8 sm:p-12 space-y-8 shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <div className="flex items-center gap-2 text-primary font-bold text-xs">
              <Code2 className="h-4 w-4" />
              <span>فريق العمل والتأسيس</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              مين صاحب فكرة خمسة؟
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-foreground-secondary leading-relaxed font-normal">
              <p>
                صاحب فكرة ومؤسس المنصة هو <strong className="text-primary font-bold">ربيع شعبان</strong>، مهندس
                برمجيات ومطور Full Stack متخصص في بناء وتطوير تطبيقات الويب الحديثة والأنظمة السحابية.
              </p>
              <p>
                بدأت الفكرة من تجربة حقيقية مع البرمجة والتعلم، ومن ملاحظة إن ناس كتير عندها الرغبة تتعلم، لكن
                بتقف قدام نفس الحاجز:
              </p>
              <blockquote className="p-4 rounded-xl bg-secondary/60 border-r-4 border-primary text-foreground font-medium text-sm leading-relaxed">
                «المحتوى موجود على الإنترنت... لكن طريقة الوصول إليه وفهمه بدون تعقيد هي المشكلة الحقيقية.»
              </blockquote>
              <p>
                الفكرة مش إن المنصة تكون مجرد صفحة بتنشر محتوى برمجي وخلاص.. الفكرة إنها مع الوقت تكون{' '}
                <strong className="text-foreground">مجتمع ومصدر عربي للمحتوى البرمجي المفيد والعملي.</strong>
              </p>
            </div>

            {/* Tech Stack Chips */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-foreground-muted block mb-2">
                التقنيات الأساسية:
              </span>
              <div className="flex flex-wrap gap-2" dir="ltr">
                {techStack.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-xl bg-secondary border border-border text-xs font-mono font-semibold text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs rounded-2xl border border-border bg-secondary/40 p-6 text-center space-y-4 shadow-subtle">
              {founder?.founderImage ? (
                <div className="relative mx-auto w-24 h-24 rounded-3xl overflow-hidden border-2 border-primary shadow-card">
                  <img
                    src={founder.founderImage}
                    alt={founderName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative mx-auto w-24 h-24 rounded-3xl bg-primary text-primary-foreground flex items-center justify-center font-black text-4xl shadow-card">
                  <span>٥</span>
                  <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-card border border-border text-primary">
                    <Code2 className="h-4 w-4" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <h3 className="text-lg font-black text-foreground">{founderName}</h3>
                <p className="text-xs font-mono text-primary font-semibold" dir="ltr">
                  {founderRole}
                </p>
                <p className="text-xs text-foreground-muted pt-1">
                  مؤسس {settings?.siteName || 'خمسة برمجة بالبلدي'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Goal & Mission (هدفنا ورسالتنا) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Goal Card */}
        <Card hoverEffect className="p-8 space-y-4 bg-card border border-border">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-black text-foreground">هدف خمسة</h3>
          <p className="text-sm text-foreground-secondary leading-relaxed font-normal">
            هدفنا الأساسي هو <strong className="text-foreground font-bold">تبسيط رحلة تعلم البرمجة للمحتوى العربي</strong>.
          </p>
          <div className="space-y-2 text-xs text-foreground-muted pt-2 border-t border-border">
            <p className="flex items-center gap-2 text-foreground font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              مش عايزينك تحفظ.. عايزينك تفهم.
            </p>
            <p className="flex items-center gap-2 text-foreground font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              مش عايزينك تنسخ الكود.. عايزينك تعرف ليه كتبناه.
            </p>
            <p className="flex items-center gap-2 text-foreground font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              بناء طريقة تفكير تساعدك مع أي لغة أو إطار عمل جديد.
            </p>
          </div>
        </Card>

        {/* Mission Card */}
        <Card hoverEffect className="p-8 space-y-4 bg-card border border-border">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
            <Send className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-black text-foreground">رسالتنا</h3>
          <p className="text-sm font-bold text-primary">
            «إننا نخلي البرمجة مفهومة قبل ما نخليها محفوظة.»
          </p>
          <p className="text-xs text-foreground-secondary leading-relaxed font-normal">
            بنقدم محتوى عربي يهتم بالفهم والتطبيق، ونعتمد على أمثلة عملية، وتجارب حقيقية، ومشاريع، وشروحات
            مبسطة تساعدك تنتقل من مجرد مشاهدة المحتوى إلى استخدام اللي اتعلمته فعليًا في كودك.
          </p>
        </Card>
      </section>

      {/* 6. Vision (رؤيتنا) */}
      <section className="space-y-8 rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-card">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-primary font-bold text-xs">
            <Compass className="h-4 w-4" />
            <span>الرؤية المستقبلية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            رؤيتنا
          </h2>
          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed font-normal">
            رؤيتنا إن <strong className="text-foreground font-bold">خمسة برمجة بالبلدي</strong> تصبح واحدة من
            المنصات العربية اللي بيقدر المبرمج يرجعلها في أي مرحلة من رحلته المهنية:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visionStages.map(stage => (
            <div
              key={stage.num}
              className="p-5 rounded-2xl bg-secondary/40 border border-border space-y-2 relative"
            >
              <span className="text-xs font-mono font-bold text-primary">{stage.num}</span>
              <h3 className="text-sm font-bold text-foreground">{stage.title}</h3>
              <p className="text-xs text-foreground-muted leading-relaxed">{stage.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Philosophy (فلسفتنا في التعلم) */}
      <section className="space-y-8 rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-card">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-primary font-bold text-xs">
            <Workflow className="h-4 w-4" />
            <span>منهجية العمل</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            فلسفتنا في البرمجة
          </h2>
          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed font-normal">
            البرمجة مش إنك تشوف Tutorial لمدة 10 ساعات وتقول بقيت Developer.. لكن إنك تقفل الفيديو، وتفتح الـ
            VS Code، وتبدأ تكتب.. تغلط، تدور، تصلح، وتجرّب.. وبعد وقت تقول: <strong className="text-primary font-bold">«أنا عملتها!»</strong>
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          {philosophySteps.map((s, idx) => (
            <div key={s.title} className="p-4 rounded-xl bg-secondary/50 border border-border space-y-1">
              <span className="text-[11px] font-mono text-primary font-bold">0{idx + 1}</span>
              <h4 className="text-sm font-black text-foreground">{s.title}</h4>
              <p className="text-[11px] text-foreground-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Where We Want To Go (إلى أين نريد أن نصل؟) */}
      <section className="space-y-6 rounded-3xl border border-primary/25 bg-surface p-8 sm:p-12 shadow-card">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-primary font-bold text-xs">
            <Rocket className="h-4 w-4" />
            <span>الطموح والمستقبل</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            إلى أين نريد أن نصل؟
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-foreground-secondary leading-relaxed font-normal">
            <p>
              البداية ممكن تكون مقالات وفيديوهات ومحتوى قصير.. لكن الطموح أكبر بكثير.
            </p>
            <p>
              نريد أن تصبح <strong className="text-foreground font-bold">خمسة برمجة بالبلدي</strong> مساحة عربية متكاملة تجمع
              بين المحتوى التقني عالي الجودة، والتعلم العملي، والمجتمع البرمجي التفاعلي؛ مكان يبدأ منه المبتدئ،
              ويستفيد منه المطور المحترف، ويرجع له أي شخص لما يحتاج شرح واضح أو حل لمشكلة تقنية.
            </p>
            <p className="text-foreground font-bold pt-2">
              دي خمسة.. مش مجرد اسم، ومش مجرد محتوى.. دي فكرة بدأت من شغف وهدفها توصل لكل مبرمج عربي عايز يفهم صح.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Social Community & Call To Action */}
      <section className="text-center py-12 rounded-3xl border border-border bg-card p-8 space-y-6 shadow-card">
        <div className="max-w-xl mx-auto space-y-3">
          <div className="inline-flex p-3 rounded-full bg-primary/10 border border-primary/20 text-primary mb-2">
            <Users className="h-6 w-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">
            خليك جزء من مجتمعنا
          </h2>
          <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
            تابعنا على المنصات اللي بتفضلها وشاركنا أسئلتك وتجاربك في البرمجة أولاً بأول.
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <SocialLinks
            links={settings?.socialLinks}
            variant="buttons"
            className="justify-center"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <Link href="/articles">
            <Button size="lg" className="gap-2 px-8 text-sm font-bold shadow-card">
              <BookOpen className="h-4 w-4" />
              <span>استكشف المقالات</span>
            </Button>
          </Link>
          <Link href="/videos">
            <Button variant="outline" size="lg" className="gap-2 px-8 text-sm font-bold bg-card">
              <Video className="h-4 w-4 text-primary" />
              <span>شاهد الفيديوهات</span>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
