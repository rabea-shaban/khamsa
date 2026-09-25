import React from 'react';
import { Metadata } from 'next';
import { FileCheck, BookOpen, AlertTriangle } from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';

export const metadata: Metadata = {
  title: 'شروط الاستخدام (Terms of Use) | خمسة برمجة بالبلدي',
  description:
    'شروط وأحكام استخدام منصة خمسة برمجة بالبلدي، حقوق الملكية الفكرية، وسياسة الاستخدام العادل للمحتوى البرمجي والتعليمي.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6 sm:py-10">
      <ArticleBreadcrumb items={[{ label: 'شروط الاستخدام' }]} />

      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
          <FileCheck className="h-3.5 w-3.5" />
          <span>الشروط والأحكام</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          شروط الاستخدام
        </h1>
        <p className="text-xs text-foreground-muted font-mono">
          آخر تحديث: 20 سبتمبر 2026
        </p>
      </header>

      <div className="space-y-8 text-sm sm:text-base text-foreground-secondary leading-relaxed font-normal bg-card p-6 sm:p-10 rounded-3xl border border-border shadow-card">
        <section className="space-y-3">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>1. الموافقة على الشروط</span>
          </h2>
          <p>
            باستخدامك لمنصة <strong>«خمسة برمجة بالبلدي»</strong>، فإنك توافق على الالتزام بجميع شروط الاستخدام الموضحة في هذه الصفحة، وجميع القوانين واللوائح المعمول بها. إذا كنت لا توافق على أي من هذه الشروط، يُرجى التوقف عن استخدام المنصة.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-primary" />
            <span>2. حقوق الملكية الفكرية</span>
          </h2>
          <p>
            جميع المواد والمقالات والشروحات والرسومات والشعارات المنشورة على موقع «خمسة برمجة بالبلدي» هي ملكية فكرية حصرية للمنصة ومؤسسها، ومحمية بموجب قوانين الملكية الفكرية وحقوق النشر.
          </p>
          <p>
            <strong>يُسمح بـ:</strong> مشاركة روابط المقالات، والاقتباس القصير مع ذكر المصدر الواضح ورابط المقال الأصلي.
          </p>
          <p>
            <strong>يُحظر تماماً:</strong> نسخ أو إعادة نشر المقالات بالكامل أو استخدامها في مواقع أخرى أو كتب تجارية بدون إذن كتابي مسبق.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <span>3. الاستخدام المقبول للموقع</span>
          </h2>
          <p>
            يلتزم المستخدم بعدم استخدام الموقع لأي غرض غير قانوني، أو محاولة تعطيل السيرفرات، أو استخراج البيانات عبر الـ Scraping الضار، أو محاولة الوصول غير المصرح به للوحة التحكم أو قواعد البيانات.
          </p>
        </section>
      </div>
    </div>
  );
}
