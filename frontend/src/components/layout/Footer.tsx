'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShieldCheck, Mail, BookOpen } from 'lucide-react';
import { Logo } from '../shared/Logo';
import { SocialLinks } from '../shared/SocialLinks';
import { useQuery } from '@tanstack/react-query';
import { settingsApi } from '@/lib/api/settings.api';

export function Footer() {
  const { data: settingsResponse } = useQuery({
    queryKey: ['public-settings'],
    queryFn: () => settingsApi.getPublicSettings(),
    staleTime: 10 * 60 * 1000,
  });

  const settings = settingsResponse?.data;
  const currentYear = new Date().getFullYear();
  const footerDesc =
    settings?.footer?.footerDescription ||
    settings?.siteDescription ||
    'معلومة صغيرة... تفرق معاك في البرمجة. منصة عربية لتبسيط علوم الحاسب، البرمجة، وهندسة البرمجيات باللغة العربية بأسلوب عملي وشروحات مفهومة.';
  const footerCopyright =
    settings?.footer?.footerCopyright ||
    `© ${currentYear} ${settings?.siteName || 'خمسة برمجة بالبلدي'} (Khamsa Programming). جميع الحقوق محفوظة.`;

  return (
    <footer className="border-t border-border bg-surface py-16 mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Logo />
            <p className="text-xs text-foreground-muted leading-relaxed font-normal">
              {footerDesc}
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold text-foreground block mb-2">
                تابعنا على منصات التواصل:
              </span>
              <SocialLinks links={settings?.socialLinks} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-foreground tracking-tight flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>تصفح المنصة</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-foreground-secondary font-medium">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-primary transition-colors">
                  المقالات والشروحات
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-primary transition-colors">
                  الفيديوهات والكبسولات
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  من نحن وقصتنا
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-foreground tracking-tight flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>الشفافية والسياسات</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-foreground-secondary font-medium">
              <li>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-primary transition-colors">
                  سياسة ملفات الارتباط (Cookies)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  شروط الاستخدام
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-primary transition-colors">
                  إخلاء المسؤولية التقنية
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct Box */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-foreground tracking-tight flex items-center gap-1.5">
              <Mail className="h-4 w-4 text-primary" />
              <span>قنوات الدعم</span>
            </h4>
            <p className="text-xs text-foreground-muted leading-relaxed">
              للاستفسارات والتعاون البرمجي:
            </p>
            <a
              href="mailto:contact@khamsa.dev"
              className="inline-block text-xs font-mono font-bold text-primary hover:underline"
            >
              contact@khamsa.dev
            </a>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-border/70 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-foreground-muted">
          <p>{footerCopyright}</p>
          <p className="text-foreground-muted font-mono text-[11px] flex items-center gap-1">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-primary fill-current inline" />
            <span>for Arabic developers</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
