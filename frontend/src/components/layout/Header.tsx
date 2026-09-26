'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, BookOpen, Video, Info, Mail, Sparkles, Layers } from 'lucide-react';
import { Logo } from '../shared/Logo';
import { ThemeToggle } from '../ui/ThemeToggle';
import {
  LinkedInIcon,
  FacebookIcon,
  TikTokIcon,
  YouTubeIcon,
  WhatsAppIcon,
  GitHubIcon,
} from '../shared/BrandIcons';
import { cn } from '@/lib/utils/cn';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sidebar automatically on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'الرئيسية', href: '/', icon: Home },
    { label: 'المقالات', href: '/articles', icon: BookOpen },
    { label: 'الفيديوهات', href: '/videos', icon: Video },
    { label: 'عن المنصة', href: '/about', icon: Info },
    { label: 'تواصل معنا', href: '/contact', icon: Mail },
  ];

  const quickCategories = [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Databases',
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl transition-colors duration-normal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-surface border border-border/80">
            {navLinks.map(link => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-normal',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-subtle'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-surface-hover',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle />
          </div>

          {/* Mobile Actions: ThemeToggle + Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle variant="compact" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl border border-border bg-surface text-foreground hover:bg-surface-hover hover:border-primary/40 focus:outline-none transition-colors"
              aria-label="فتح القائمة الجانبية"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Sidebar Drawer mounted on body via Portal */}
      {mounted && mobileMenuOpen && createPortal(
        <div className="fixed inset-0 z-[9999] md:hidden" dir="rtl">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Sidebar Drawer Panel - Full height viewport docking to right side */}
          <aside
            className="fixed top-0 bottom-0 right-0 z-50 w-[310px] max-w-[85vw] h-screen h-[100dvh] bg-card border-s border-border shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
          >
            {/* Top Bar: Brand Logo & Close Button */}
            <div>
              <div className="flex items-center justify-between p-4 border-b border-border/70 bg-surface/60 sticky top-0 z-10 backdrop-blur">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-surface-hover border border-border/60 transition-colors focus:outline-none"
                  aria-label="إغلاق القائمة"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-4 space-y-1.5">
                <div className="px-3 py-1.5 text-[11px] font-black text-foreground-muted uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-primary" />
                  <span>أقسام المنصة</span>
                </div>

                {navLinks.map(link => {
                  const Icon = link.icon;
                  const isActive =
                    link.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all duration-200',
                        isActive
                          ? 'bg-primary/10 text-primary border border-primary/25 shadow-sm font-extrabold'
                          : 'text-foreground-secondary hover:bg-surface-hover hover:text-foreground',
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={cn(
                            'h-4 w-4 shrink-0 transition-colors',
                            isActive ? 'text-primary' : 'text-foreground-muted',
                          )}
                        />
                        <span>{link.label}</span>
                      </div>
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Quick Categories Section */}
              <div className="p-4 pt-2 border-t border-border/60 space-y-2.5">
                <div className="px-1 text-[11px] font-black text-foreground-muted uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span>تصفح حسب التقنية</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {quickCategories.map(cat => (
                    <Link
                      key={cat}
                      href={`/articles?category=${encodeURIComponent(cat)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-surface hover:bg-primary/15 hover:text-primary border border-border transition-colors"
                    >
                      #{cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer Section */}
            <div className="p-4 border-t border-border/70 bg-surface/40 space-y-3">
              {/* Slogan */}
              <div className="text-center">
                <p className="text-xs font-black text-foreground">
                  خمسة برمجة بالبلدي
                </p>
                <p className="text-[11px] text-foreground-muted mt-0.5 font-mono">
                  افهمها بالبلدي .. اكتبها بالكود
                </p>
              </div>

              {/* Social Channels */}
              <div className="flex items-center justify-center gap-2 pt-1 border-t border-border/40">
                <a
                  href="https://wa.me/201554087543"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="p-2 rounded-xl bg-surface border border-border text-emerald-500 hover:scale-110 transition-transform"
                >
                  <WhatsAppIcon size={14} />
                </a>
                <a
                  href="https://www.linkedin.com/in/rabea-sh-elzayat"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-xl bg-surface border border-border text-sky-500 hover:scale-110 transition-transform"
                >
                  <LinkedInIcon size={14} />
                </a>
                <a
                  href="https://www.facebook.com/Rabea.Sh.ELZayat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 rounded-xl bg-surface border border-border text-blue-500 hover:scale-110 transition-transform"
                >
                  <FacebookIcon size={14} />
                </a>
                <a
                  href="https://www.tiktok.com/@rabea.sh.elzayat"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="p-2 rounded-xl bg-surface border border-border text-pink-500 hover:scale-110 transition-transform"
                >
                  <TikTokIcon size={14} />
                </a>
                <a
                  href="https://rabea-shaban.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Portfolio"
                  className="p-2 rounded-xl bg-surface border border-border text-foreground hover:scale-110 transition-transform"
                >
                  <GitHubIcon size={14} />
                </a>
              </div>
            </div>
          </aside>
        </div>,
        document.body
      )}
    </>
  );
}
