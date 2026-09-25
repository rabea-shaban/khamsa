import React from 'react';
import { Metadata } from 'next';
import { Shield, Lock, Eye, Cookie, FileText, CheckCircle2 } from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية | خمسة برمجة بالبلدي',
  description:
    'سياسة الخصوصية لمنصة خمسة برمجة بالبلدي: كيف نقوم بجمع، واستخدام، وحماية بياناتك الشخصية، وإعلانات Google AdSense وملفات تعريف الارتباط.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6 sm:py-10">
      <ArticleBreadcrumb items={[{ label: 'سياسة الخصوصية' }]} />

      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
          <Shield className="h-3.5 w-3.5" />
          <span>الأمان والخصوصية</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          سياسة الخصوصية
        </h1>
        <p className="text-xs text-foreground-muted font-mono">
          آخر تحديث: 20 سبتمبر 2026
        </p>
      </header>

      <div className="space-y-8 text-sm sm:text-base text-foreground-secondary leading-relaxed font-normal bg-card p-6 sm:p-10 rounded-3xl border border-border shadow-card">
        <section className="space-y-3">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <span>1. مقدمة والتزامنا بالخصوصية</span>
          </h2>
          <p>
            أهلاً بك في منصة <strong>«خمسة برمجة بالبلدي»</strong> (Khamsa Programming). نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية وفقاً لأعلى المعايير القانونية والتقنية. توضح هذه الوثيقة ماهية البيانات التي قد يتم جمعها أثناء تصفحك للموقع، وكيفية استخدامها، والخيارات المتاحة لك للتحكم بها.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <span>2. البيانات التي نقوم بجمعها</span>
          </h2>
          <ul className="space-y-2 list-disc list-inside pe-2">
            <li>
              <strong>بيانات التصفح التقنية:</strong> مثل عنوان الـ IP المجهول، نوع المتصفح، نظام التشغيل، والصفحات التي تمت زيارتها عبر أدوات التحليل لتحسين سرعة وأداء المنصة.
            </li>
            <li>
              <strong>بيانات التواصل الطوعية:</strong> الاسم والبريد الإلكتروني ومحتوى الرسالة عندما تقوم بمراسلتنا عبر نموذج التواصل أو الاشتراك في النشرة البريدية.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <Cookie className="h-5 w-5 text-primary" />
            <span>3. ملفات تعريف الارتباط وإعلانات Google AdSense</span>
          </h2>
          <p>
            قد يستخدم موقعنا وشركاؤنا من الأطراف الثالثة (مثل Google AdSense و Google Analytics) ملفات تعريف الارتباط (Cookies) لتقديم خدمات مخصصة:
          </p>
          <div className="space-y-2 text-xs sm:text-sm bg-secondary/50 p-4 rounded-2xl border border-border">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>تستخدم Google كطرف ثالث ملفات تعريف الارتباط لعرض الإعلانات على موقعنا.</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                يتيح استخدام ملف تعريف الارتباط DART لشركة Google وشركائها عرض الإعلانات للمستخدمين بناءً على زياراتهم لموقعنا ومواقع أخرى على الإنترنت.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                يمكن للمستخدمين إلغاء الاشتراك في استخدام ملف تعريف الارتباط DART بزيارة{' '}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold hover:underline"
                >
                  سياسة خصوصية شبكة الإعلانات والمحتوى من Google
                </a>
                .
              </span>
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>4. حقوق المستخدم والتواصل</span>
          </h2>
          <p>
            يحق لك في أي وقت طلب تعديل أو حذف بياناتك أو الاستفسار عن أي بند في سياسة الخصوصية من خلال التواصل المباشر مع إدارة المنصة عبر البريد الإلكتروني:{' '}
            <a href="mailto:contact@khamsa.dev" className="text-primary font-bold font-mono">
              contact@khamsa.dev
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
