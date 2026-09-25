import React from 'react';
import { Code2, UserCheck, CheckCircle2 } from 'lucide-react';
import { Settings } from '@/types/api';

interface FounderSectionProps {
  settings?: Settings | null;
}

export function FounderSection({ settings }: FounderSectionProps) {
  const techStack = ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'System Design'];
  const founder = settings?.founder;
  const founderName = founder?.founderName || 'ربيع شعبان';
  const founderRole = founder?.founderRole || 'Full Stack Software Engineer';
  const founderBio =
    founder?.founderBio ||
    'صاحب فكرة ومؤسس «خمسة برمجة بالبلدي»، مهندس برمجيات ومطور متخصص في هندسة وتطوير تطبيقات الويب الحديثة.';

  return (
    <section className="rounded-3xl border border-border bg-card p-8 sm:p-12 space-y-8 shadow-card relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Founder Story (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
            <UserCheck className="h-3.5 w-3.5" />
            <span>صاحب الفكرة والمؤسس</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
            مين صاحب فكرة خمسة؟
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-foreground-secondary leading-relaxed font-normal">
            <p>
              صاحب فكرة ومؤسس <strong className="text-foreground font-bold">«{settings?.siteName || 'خمسة برمجة بالبلدي'}»</strong> هو{' '}
              <strong className="text-primary font-bold">{founderName}</strong>،{' '}
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-secondary text-foreground font-semibold" dir="ltr">
                {founderRole}
              </span>.
            </p>

            <p>{founderBio}</p>

            <blockquote className="p-4 rounded-2xl bg-secondary/50 border-r-4 border-primary text-foreground font-medium text-sm sm:text-base leading-relaxed my-2">
              «المحتوى موجود بكثرة على الإنترنت... لكن طريقة الوصول إليه وفهمه بطريقة منطقية وعملية هي المشكلة الحقيقية.»
            </blockquote>

            <p>
              ومن هنا انطلقت خمسة: <strong className="text-foreground">ليه ما نشرحش البرمجة بطريقة بسيطة، من غير ما نبسطها لدرجة تفقد قيمتها وعمقها التقني؟</strong>
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-foreground-muted block mb-2">
              التقنيات والهندسة البرمجية الأساسية:
            </span>
            <div className="flex flex-wrap gap-2" dir="ltr">
              {techStack.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl bg-secondary border border-border text-xs font-mono font-semibold text-foreground hover:border-primary/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Founder Card (4 cols) */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-secondary/40 p-6 text-center space-y-4 shadow-subtle">
            {/* Avatar Emblem / Image */}
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
                مؤسس منصة {settings?.siteName || 'خمسة برمجة بالبلدي'}
              </p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-center gap-1.5 text-xs text-foreground-muted">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              <span>شغف بتبسيط علوم البرمجة للمطور العربي</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
