import React from 'react';
import Link from 'next/link';
import { BookOpen, Video, Code2, Terminal, CheckCircle2, Quote } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Settings } from '@/types/api';

interface HeroSectionProps {
  settings?: Settings | null;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const hero = settings?.hero;
  const siteName = settings?.siteName || 'خمسة برمجة بالبلدي';
  const tagline = settings?.tagline || 'افهمها بالبلدي.. اكتبها بالكود.';

  const heroTitle = hero?.heroTitle || siteName;
  const heroSubtitle = hero?.heroSubtitle || tagline;
  const heroDescription =
    hero?.heroDescription ||
    settings?.siteDescription ||
    'منصة عربية لتبسيط البرمجة والتكنولوجيا، نشرح فيها الفكرة قبل الكود، ونحوّل المفاهيم المعقدة إلى محتوى واضح وعملي يساعدك تتعلم وتطبّق وتطوّر نفسك.';

  const primaryBtnText = hero?.primaryButtonText || 'اكتشف المقالات';
  const primaryBtnLink = hero?.primaryButtonUrl || '/articles';
  const secondaryBtnText = hero?.secondaryButtonText || 'شاهد المحتوى';
  const secondaryBtnLink = hero?.secondaryButtonUrl || '/videos';

  return (
    <section className="relative py-12 sm:py-20 lg:py-24 overflow-hidden">
      {/* Subtle Background Radial Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Headline & Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/25 text-xs font-bold shadow-xs">
              <Code2 className="h-3.5 w-3.5" />
              <span>منصة {siteName} — Khamsa Programming</span>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.2]">
                {heroTitle}
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
                {heroSubtitle}
              </p>
            </div>

            {/* Lead Description */}
            <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {heroDescription}
            </p>

            {/* Microcopy Quote */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-card/60 border border-border/80 text-xs sm:text-sm text-foreground-muted font-medium w-fit mx-auto lg:mx-0">
              <Quote className="h-3.5 w-3.5 text-primary shrink-0" />
              <strong className="text-foreground">«مش هنخلي البرمجة سهلة... هنخلي فهمها أسهل.»</strong>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href={primaryBtnLink}>
                <Button size="lg" className="gap-2 px-8 text-sm font-bold shadow-card">
                  <BookOpen className="h-4 w-4" />
                  <span>{primaryBtnText}</span>
                </Button>
              </Link>
              <Link href={secondaryBtnLink}>
                <Button variant="outline" size="lg" className="gap-2 px-8 text-sm font-bold bg-card">
                  <Video className="h-4 w-4 text-primary" />
                  <span>{secondaryBtnText}</span>
                </Button>
              </Link>
            </div>

            {/* Micro Points */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-foreground-muted font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                برمجة بالعربي من غير تعقيد
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                نفهم الفكرة الأول.. وبعدها الكود
              </span>
            </div>
          </div>

          {/* Developer Terminal Visual (5 cols) */}
          <div className="lg:col-span-5" dir="ltr">
            <div className="relative rounded-2xl border border-border/80 bg-slate-50 dark:bg-[#0a0d14] text-slate-800 dark:text-slate-200 shadow-xl dark:shadow-2xl overflow-hidden font-mono text-xs transition-colors">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/80 bg-slate-100/90 dark:bg-[#0d121d] transition-colors">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/90 inline-block ring-1 ring-rose-500/30" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/90 inline-block ring-1 ring-amber-500/30" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/90 inline-block ring-1 ring-emerald-500/30" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  <Terminal className="h-3.5 w-3.5 text-primary" />
                  <span>khamsa.dev/philosophy.ts</span>
                </div>
                <div className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-bold">
                  ٥
                </div>
              </div>

              {/* Code Snippet */}
              <div className="p-5 space-y-3 leading-relaxed text-left select-none">
                <div>
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">interface</span>{' '}
                  <span className="text-primary font-bold">KhamsaApproach</span>{' '}
                  <span className="text-slate-500 dark:text-slate-400">{'{'}</span>
                </div>
                <div className="pl-4 space-y-1.5">
                  <div>
                    <span className="text-sky-600 dark:text-sky-300 font-medium">philosophy</span>
                    <span className="text-slate-500 dark:text-slate-400">: </span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      &quot;<bdi dir="rtl">نفهم قبل ما نحفظ</bdi>&quot;
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">;</span>
                  </div>
                  <div>
                    <span className="text-sky-600 dark:text-sky-300 font-medium">explanation</span>
                    <span className="text-slate-500 dark:text-slate-400">: </span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      &quot;<bdi dir="rtl">بالبلدي ومن غير تعقيد</bdi>&quot;
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">;</span>
                  </div>
                  <div>
                    <span className="text-sky-600 dark:text-sky-300 font-medium">target</span>
                    <span className="text-slate-500 dark:text-slate-400">: </span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      &quot;<bdi dir="rtl">نبني عقلية مبرمج مش حافظ</bdi>&quot;
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">;</span>
                  </div>
                </div>
                <div className="text-slate-500 dark:text-slate-400">{'}'}</div>

                <div className="pt-2 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80">
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">const</span>{' '}
                  <span className="text-amber-600 dark:text-amber-300 font-medium">workflow</span>{' '}
                  <span className="text-slate-500 dark:text-slate-400">= [</span>
                  <div className="pl-4 text-emerald-600 dark:text-emerald-400">
                    &quot;<bdi dir="rtl">افهم</bdi>&quot;, &quot;<bdi dir="rtl">جرّب</bdi>&quot;, &quot;<bdi dir="rtl">اخطئ</bdi>&quot;, &quot;<bdi dir="rtl">أصلح</bdi>&quot;, &quot;<bdi dir="rtl">طوّر</bdi>&quot;, &quot;<bdi dir="rtl">كرر</bdi>&quot;
                  </div>
                  <span className="text-slate-500 dark:text-slate-400">];</span>
                </div>

                <div className="pt-1 text-slate-500 dark:text-slate-400 text-[11px]">
                  <span className="text-primary font-bold">&gt;</span>{' '}
                  <span className="text-slate-700 dark:text-slate-300">console</span>.<span className="text-sky-600 dark:text-sky-300">log</span>(
                  <span className="text-emerald-600 dark:text-emerald-400">
                    &quot;<bdi dir="rtl">افهمها بالبلدي .. اكتبها بالكود</bdi>&quot;
                  </span>
                  );
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
