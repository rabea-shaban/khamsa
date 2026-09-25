import React from 'react';
import { Metadata } from 'next';
import { Cookie, Settings2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';

export const metadata: Metadata = {
  title: 'سياسة ملفات تعريف الارتباط (Cookie Policy) | خمسة برمجة بالبلدي',
  description:
    'تعرف على كيفية استخدام منصة خمسة برمجة بالبلدي لملفات تعريف الارتباط (Cookies)، أنواعها، وكيفية التحكم بها في متصفحك.',
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6 sm:py-10">
      <ArticleBreadcrumb items={[{ label: 'سياسة ملفات تعريف الارتباط' }]} />

      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
          <Cookie className="h-3.5 w-3.5" />
          <span>ملفات تعريف الارتباط</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          سياسة ملفات تعريف الارتباط
        </h1>
        <p className="text-xs text-foreground-muted font-mono">
          آخر تحديث: 20 سبتمبر 2026
        </p>
      </header>

      <div className="space-y-8 text-sm sm:text-base text-foreground-secondary leading-relaxed font-normal bg-card p-6 sm:p-10 rounded-3xl border border-border shadow-card">
        <section className="space-y-3">
          <h2 className="text-xl font-black text-foreground">1. ما هي ملفات تعريف الارتباط (Cookies)؟</h2>
          <p>
            ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهاز الكمبيوتر أو هاتفك الذكي بواسطة المتصفح عند زيارتك لموقع ما. تساعد هذه الملفات الموقع على تذكر تفضيلاتك (مثل الوضع الداكن، وحجم الخطوط، وحالة تسجيل الدخول) لتحسين تجربة التصفح.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-black text-foreground">2. أنواع الكوكيز التي نستخدمها</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-2">
              <span className="font-bold text-foreground text-sm flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                ملفات الارتباط الضرورية (Essential)
              </span>
              <p className="text-xs text-foreground-muted leading-relaxed">
                ضرورية لعمل الموقع الأساسي مثل التصفح الآمن، حفظ تفضيلات الوضع الليلي، والحماية من الهجمات.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-2">
              <span className="font-bold text-foreground text-sm flex items-center gap-1.5">
                <Settings2 className="h-4 w-4 text-primary" />
                ملفات التحليلات (Analytics)
              </span>
              <p className="text-xs text-foreground-muted leading-relaxed">
                تساعدنا على فهم كيفية تفاعل الزوار مع المقالات والشروحات التقنية لتحسين سرعة وجودة المحتوى.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-2">
              <span className="font-bold text-foreground text-sm flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                ملفات الإعلانات والتخصيص (Advertising)
              </span>
              <p className="text-xs text-foreground-muted leading-relaxed">
                تستخدم بواسطة شركاء الإعلانات المعتمدين مثل Google AdSense لعرض إعلانات تقنية ذات صلة باهتماماتك.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-foreground">3. كيفية التحكم في ملفات تعريف الارتباط</h2>
          <p>
            يمكنك في أي وقت تعديل إعدادات المتصفح لرفض جميع ملفات تعريف الارتباط أو تنبيهك عند إرسال ملف جديد. يمكنك أيضاً مسح ملفات تعريف الارتباط المخزنة بالفعل عبر إعدادات متصفحك في أي وقت.
          </p>
        </section>
      </div>
    </div>
  );
}
