import React from 'react';
import { Brain, MessageSquare, Terminal, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function WhyKhamsaSection() {
  const cards = [
    {
      num: '01',
      title: 'نفهم قبل ما نحفظ',
      description: 'البرمجة مش مجرد حفظ دوال ومكتبات. بنعلمك تفهم الفكرة اللي ورا الكود وازاي تفكر بهندسة معمارية سليمة.',
      icon: Brain,
    },
    {
      num: '02',
      title: 'نشرح بالبلدي',
      description: 'بنتكلم بلغتنا البسيطة ومن واقع حياتنا عشان نقرب أعقد مفاهيم علوم الحاسب بدون كلام مجعلص.',
      icon: MessageSquare,
    },
    {
      num: '03',
      title: 'نطبّق عملي بالكود',
      description: 'شروحات مبنية على كود حقيقي، ومشاريع كاملة، وحلول لأخطاء ومواقف واقعية بتواجهك في سوق العمل.',
      icon: Terminal,
    },
    {
      num: '04',
      title: 'عمق تقني بدون تعقيد',
      description: 'بنبسط الشرح، بس بنحافظ على العمق الهندسي والـ Best Practices اللي يحتاجها أي مهندس شاطر.',
      icon: ShieldCheck,
    },
    {
      num: '05',
      title: 'عقلية Problem Solver',
      description: 'بناء مهارة حل المشكلات والتفكير المنطقي عشان تقدر تفكك أي Challenge وتختار المعمارية الأنسب.',
      icon: Layers,
    },
  ];

  const khamsaConcepts = [
    { title: '٥ دقائق', desc: 'كبسولات تركيز' },
    { title: '٥ مفاهيم', desc: 'تأسيس منطقي' },
    { title: '٥ خطوات', desc: 'لتنفيذ الميزة' },
    { title: '٥ أخطاء', desc: 'شائعة لتجنبها' },
    { title: '٥ حلول', desc: 'معمارية نظيفة' },
  ];

  return (
    <section className="space-y-12">
      {/* Header & Story Lead */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
          <Sparkles className="h-3.5 w-3.5" />
          <span>منهجية ومنطق المنصة</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
          ليه خمسة برمجة بالبلدي؟
        </h2>
        <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed">
          لأننا مؤمنين إن المشكلة مش دايمًا في صعوبة البرمجة، لكن في طريقة تقديمها وشرحها.
        </p>

        {/* Highlight Quote Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border text-center shadow-card max-w-2xl mx-auto">
          <p className="text-sm sm:text-base text-foreground leading-relaxed font-medium">
            ممكن تشوف شرح طويل ومعقد وتخرج منه مش فاهم حاجة.. وممكن نفس الفكرة تتشرحلك ببساطة فتقول:{' '}
            <strong className="text-primary font-black text-base sm:text-lg block mt-1">
              «آه.. هي كانت سهلة ومباشرة كده؟!»
            </strong>
          </p>
        </div>
      </div>

      {/* 5 Pillars Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <Card
              key={card.num}
              hoverEffect
              className="p-5 sm:p-6 space-y-4 bg-card border border-border relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Number Watermark */}
              <span className="absolute top-3 left-4 text-3xl font-black font-mono text-muted/30 group-hover:text-primary/20 transition-colors select-none">
                {card.num}
              </span>

              <div className="space-y-3">
                {/* Icon */}
                <div className="h-11 w-11 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Text */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* "سر الرقم ٥" Concept Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-secondary/40 border border-border/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-primary block">THE FORMULA</span>
            <h3 className="text-base sm:text-lg font-black text-foreground">
              سر الرقم «٥» في رحلتنا التعليمية
            </h3>
          </div>
          <p className="text-xs text-foreground-muted max-w-md">
            الرقم ٥ مش مجرد اسم.. ده أسلوبنا في تفكيك أي موضوع برمجي معقد لوحدات مركزة وسهلة التطبيق:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
          {khamsaConcepts.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-card border border-border/70 space-y-1 hover:border-primary/40 transition-colors"
            >
              <span className="text-base font-black text-primary block">{item.title}</span>
              <span className="text-[11px] text-foreground-muted font-medium block">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
