import React from 'react';
import { Metadata } from 'next';
import { AlertCircle, Code, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';

export const metadata: Metadata = {
  title: 'إخلاء المسؤولية التقنية (Disclaimer) | خمسة برمجة بالبلدي',
  description:
    'إخلاء المسؤولية القانونية والتقنية لمنصة خمسة برمجة بالبلدي حول الأمثلة البرمجية، الشروحات، والأكواد التعليمية.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6 sm:py-10">
      <ArticleBreadcrumb items={[{ label: 'إخلاء المسؤولية' }]} />

      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>تنويه وإخلاء مسؤولية</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          إخلاء المسؤولية التقنية
        </h1>
        <p className="text-xs text-foreground-muted font-mono">
          آخر تحديث: 20 سبتمبر 2026
        </p>
      </header>

      <div className="space-y-8 text-sm sm:text-base text-foreground-secondary leading-relaxed font-normal bg-card p-6 sm:p-10 rounded-3xl border border-border shadow-card">
        <section className="space-y-3">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            <span>1. الطبيعة التعليمية للمحتوى</span>
          </h2>
          <p>
            جميع المقالات، والأكواد المصدرية، والشروحات المعمارية، والنماذج المنشورة على موقع <strong>«خمسة برمجة بالبلدي»</strong> مقدمة لأغراض <strong>تعليمية وتثقيفية فقط</strong> لمساعدة المطورين على فهم واستيعاب مفاهيم هندسة البرمجيات باللغة العربية.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary" />
            <span>2. بيئات الإنتاج (Production Environments)</span>
          </h2>
          <div className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-3">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                الأمثلة البرمجية مكتوبة ومجربة لتبسيط المفاهيم، ولكن نشرها في بيئات الإنتاج الحقيقية يتطلب من المطور مراجعتها، واختبارها، وتكييفها مع متطلبات الأمان والأداء الخاصة بشركته أو مشروعه.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                لا تقدم المنصة أي ضمانات صريحة أو ضمنية بأن كل كود منشور سيكون خالياً من الأخطاء أو مناسباً لجميع السيناريوهات التقنية، ويتحمل المطور كامل المسؤولية عن تنفيذ الكود واختباره في بيئته.
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
