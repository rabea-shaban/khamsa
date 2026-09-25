import React from 'react';
import { Lightbulb, Terminal, AlertTriangle, Wrench, TrendingUp, RefreshCw, Zap } from 'lucide-react';

export function PhilosophySection() {
  const steps = [
    {
      label: 'افهم',
      eng: 'Understand',
      desc: 'افهم منطق المشكلة وليه محتاجين الحل ده قبل أي كود.',
      icon: Lightbulb,
    },
    {
      label: 'جرّب',
      eng: 'Experiment',
      desc: 'افتح الـ Editor واكتب أول سطر بيدك وشوف النتيجة.',
      icon: Terminal,
    },
    {
      label: 'اخطئ',
      eng: 'Fail',
      desc: 'الأخطاء والـ Bugs جزء طبيعي من رحلة كل مبرمج حقيقي.',
      icon: AlertTriangle,
    },
    {
      label: 'أصلح',
      eng: 'Debug',
      desc: 'اقرأ رسالة الخطأ والـ Stack trace واكتشف جذر المشكلة.',
      icon: Wrench,
    },
    {
      label: 'طوّر',
      eng: 'Refactor',
      desc: 'حسّن كتابة الكود والـ Architecture وخلي الحل أنظف وأسرع.',
      icon: TrendingUp,
    },
    {
      label: 'كرر',
      eng: 'Iterate',
      desc: 'كل تكرار بيبني خبرتك ويقربك من الاحتراف وثقة السوق.',
      icon: RefreshCw,
    },
  ];

  return (
    <section className="rounded-3xl border border-border bg-card p-8 sm:p-12 lg:p-14 space-y-12 shadow-card relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Philosophy Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
          <Zap className="h-3.5 w-3.5" />
          <span>فلسفة خمسة في التعلم</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
          إحنا مش بنشرح الكود وبس...
        </h2>
        <p className="text-lg sm:text-xl font-bold text-primary">
          إحنا بنحاول نوصلك لطريقة التفكير اللي ورا الكود.
        </p>
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed pt-1">
          المبرمج الشاطر مش هو اللي حافظ أكبر عدد من الأكواد والـ Syntaxes. المبرمج الشاطر هو اللي لما
          يقابله <strong className="text-foreground font-bold">Problem جديدة</strong> يعرف يفكر فيها،
          يحللها، يدور على حلها، ويختار الحل الأنسب.
        </p>
      </div>

      {/* Visual Workflow Steps (6 items flow) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border text-xs font-bold text-foreground-muted font-mono">
          <span>THE DEVELOPER LIFECYCLE</span>
          <span className="text-primary">KHAMSA FLOW</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.label}
                className="relative flex flex-col p-4 rounded-2xl bg-secondary/40 border border-border hover:border-primary/50 transition-all group space-y-3"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] font-mono text-foreground-muted font-bold">
                    0{idx + 1}
                  </span>
                </div>

                {/* Step Titles */}
                <div>
                  <h3 className="text-base font-extrabold text-foreground group-hover:text-primary transition-colors">
                    {step.label}
                  </h3>
                  <span className="text-[10px] font-mono text-foreground-muted uppercase tracking-wider block" dir="ltr">
                    {step.eng}
                  </span>
                </div>

                {/* Step Description */}
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
