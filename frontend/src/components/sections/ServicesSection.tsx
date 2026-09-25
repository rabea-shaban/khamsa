import React from 'react';
import Link from 'next/link';
import { BookOpen, Video, Code2, Cpu, Compass, FolderGit2, ArrowLeft, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function ServicesSection() {
  const services = [
    {
      title: 'المقالات والشروحات التقنية',
      eng: 'Technical Deep Dives',
      desc: 'شروحات عميقة ومفصلة في JavaScript وTypeScript وNode.js وReact وهندسة الويب، مكتوبة بأسلوب عربي مفهوم ومباشر.',
      icon: BookOpen,
      href: '/articles',
      cta: 'تصفح المقالات',
    },
    {
      title: 'كبسولات وفيديوهات البرمجة',
      eng: 'Visual Learning',
      desc: 'محتوى مرئي عملي وسريع على YouTube وTikTok وفيسبوك؛ كبسولات مركزة تشرح فكرة أو تحل Bug في دقائق معدودة.',
      icon: Video,
      href: '/videos',
      cta: 'شاهد الفيديوهات',
    },
    {
      title: 'مشاريع وتطبيقات واقعية',
      eng: 'Hands-on Projects',
      desc: 'بناء مشاريع متكاملة من الصفر (Full Stack) مع تطبيق الـ Clean Code والـ Design Patterns المعتمدة في سوق العمل.',
      icon: Code2,
      href: '/articles',
      cta: 'شروحات تطبيقية',
    },
    {
      title: 'تبسيط معمارية الأنظمة',
      eng: 'System Design & Simplification',
      desc: 'تفكيك المفاهيم المعمارية الكبيرة (APIs, Microservices, Caching, Database Indexing) لأفكار بسيطة وقابلة للتنفيذ.',
      icon: Cpu,
      href: '/about',
      cta: 'اعرف فلسفتنا',
    },
    {
      title: 'إرشاد مسار المطور',
      eng: 'Career & Engineering Guidance',
      desc: 'نصائح واقعية من قلب سوق العمل، وبناء عقلية هندسية تساعدك تتجاوز الـ Technical Interviews بثقة.',
      icon: Compass,
      href: '/about',
      cta: 'اقرأ عن الرؤية',
    },
    {
      title: 'أدوات ومصادر المطور العربي',
      eng: 'Developer Resources',
      desc: 'مكتبة مراجع، قوالب جاهزة، وأدلة سريعة تساعدك تختصر وقت التطوير وتكتب كود أفضل وأسرع.',
      icon: FolderGit2,
      href: '/articles',
      cta: 'استكشف المصادر',
    },
  ];

  return (
    <section className="space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
          <Sparkles className="h-3.5 w-3.5" />
          <span>مسارات التعلم والتطوير</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
          إيه اللي هتلاقيه في خمسة؟
        </h2>
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
          خمسة مش مجرد مقالات.. المنصة بتجمع مختلف أشكال المحتوى التقني والعملي في مكان واحد لمساعدتك في كل خطوة:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(srv => {
          const Icon = srv.icon;
          return (
            <Card
              key={srv.title}
              hoverEffect
              className="p-6 flex flex-col justify-between space-y-5 bg-card border border-border group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-mono text-foreground-muted font-bold" dir="ltr">
                    {srv.eng}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border/70">
                <Link href={srv.href} className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                  <span>{srv.cta}</span>
                  <ArrowLeft className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
