'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
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
    'معلومة صغيرة... تفرق معاك في البرمجة. منصة لتبسيط علوم الحاسب وهندسة البرمجيات باللغة العربية بأسلوب عملي وسهل.';
  const footerCopyright =
    settings?.footer?.footerCopyright ||
    `© ${currentYear} ${settings?.siteName || 'خمسة برمجة بالبلدي'} (Khamsa Programming). جميع الحقوق محفوظة.`;
  const showQuickLinks = settings?.footer?.footerShowNavigation !== false;
  const showSocialLinks = settings?.footer?.footerShowSocials !== false;

  return (
    <footer className="border-t border-border bg-surface py-12 mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-3 max-w-sm">
            <Logo />
            <p className="text-xs text-foreground-muted leading-relaxed">
              {footerDesc}
            </p>
          </div>

          {showQuickLinks && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-foreground tracking-tight">روابط سريعة</h4>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-foreground-secondary">
                <Link href="/" className="hover:text-primary transition-colors">
                  الرئيسية
                </Link>
                <Link href="/articles" className="hover:text-primary transition-colors">
                  المقالات
                </Link>
                <Link href="/videos" className="hover:text-primary transition-colors">
                  الفيديوهات
                </Link>
                <Link href="/about" className="hover:text-primary transition-colors">
                  عن المنصة
                </Link>
                <Link href="/login" className="hover:text-primary transition-colors">
                  دخول الإدارة
                </Link>
              </div>
            </div>
          )}

          {showSocialLinks && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-foreground tracking-tight">تابعنا على السوشيال ميديا</h4>
              <SocialLinks links={settings?.socialLinks} />
            </div>
          )}
        </div>

        <div className="border-t border-border/70 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-foreground-muted">
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
