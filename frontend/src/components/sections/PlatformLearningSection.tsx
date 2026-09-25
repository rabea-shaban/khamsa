import React from 'react';
import Link from 'next/link';
import { Youtube, Facebook, BookOpen, ExternalLink, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 2.31-4.639c.314 0 .619.05.904.144V9.43a6.33 6.33 0 0 0-.904-.065 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.583a8.19 8.19 0 0 0 4.766 1.517V6.655a4.83 4.83 0 0 1-1-.026z" />
    </svg>
  );
}

export function PlatformLearningSection() {
  const platforms = [
    {
      name: 'المقالات التقنية',
      platform: 'Khamsa Articles',
      desc: 'قراءة معمقة وشروحات كود وتفاصيل معمارية مفصلة خطوة بخطوة باللغة العربية.',
      icon: BookOpen,
      href: '/articles',
      isExternal: false,
      badge: 'المنصة الرسمية',
      cta: 'اقرأ المقالات',
    },
    {
      name: 'قناة يوتيوب',
      platform: 'YouTube Channel',
      desc: 'شروحات مرئية ودورات عملية وفيديوهات تفاعلية تغطي أحدث تقنيات الويب.',
      icon: Youtube,
      href: 'https://youtube.com/@5barmaga',
      isExternal: true,
      badge: 'شروحات طويلة ومفصلة',
      cta: 'شاهد على يوتيوب',
    },
    {
      name: 'حساب تيك توك',
      platform: 'TikTok Shorts',
      desc: 'كبسولات برمجية مركزة، أسرار وحيل في ثواني، ونصائح سريعة ومباشرة للمطورين.',
      icon: TikTokIcon,
      href: 'https://tiktok.com/@5barmaga',
      isExternal: true,
      badge: 'كبسولات سريعة',
      cta: 'تابع على تيك توك',
    },
    {
      name: 'صفحة فيسبوك',
      platform: 'Facebook Community',
      desc: 'مناقشات تفاعلية، بوستات برمجية، وتحديثات يومية وتواصل مباشر مع مجتمع خمسة.',
      icon: Facebook,
      href: 'https://facebook.com/5barmaga',
      isExternal: true,
      badge: 'مجتمع ونقاشات',
      cta: 'انضم لصفحتنا',
    },
  ];

  return (
    <section className="space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-primary font-mono uppercase tracking-wider block">
          LEARN YOUR WAY
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
          اتعلم بالطريقة اللي تناسبك
        </h2>
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
          سواء بتفضل القراءة المتأنية للأكواد أو كبسولات الفيديو السريعة أو الشروحات الطويلة:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {platforms.map(p => {
          const Icon = p.icon;
          return (
            <Card
              key={p.name}
              hoverEffect
              className="p-6 flex flex-col justify-between space-y-4 bg-card border border-border group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-foreground-muted border border-border">
                    {p.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                  <span className="text-[11px] font-mono text-foreground-muted block" dir="ltr">
                    {p.platform}
                  </span>
                </div>

                <p className="text-xs text-foreground-muted leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-border/80">
                {p.isExternal ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    <span>{p.cta}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    <span>{p.cta}</span>
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
