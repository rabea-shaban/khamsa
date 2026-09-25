'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LayoutDashboard, Home, BookOpen, Video, Info } from 'lucide-react';
import { Logo } from '../shared/Logo';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { cn } from '@/lib/utils/cn';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'الرئيسية', href: '/', icon: Home },
    { label: 'المقالات', href: '/articles', icon: BookOpen },
    { label: 'الفيديوهات', href: '/videos', icon: Video },
    { label: 'عن المنصة', href: '/about', icon: Info },
  ];

  return (
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
          <Link href="/dashboard">
            <Button size="sm" variant="outline" className="gap-1.5 h-9 text-xs">
              <LayoutDashboard className="h-3.5 w-3.5 text-primary" />
              <span>لوحة الإدارة</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Actions: ThemeToggle + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle variant="compact" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-border bg-surface text-foreground hover:bg-surface-hover focus:outline-none"
            aria-label="القائمة الرئيسية"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-fast">
          <nav className="flex flex-col space-y-1">
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
                    'flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-subtle'
                      : 'text-foreground-secondary hover:bg-surface-hover hover:text-foreground',
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full gap-2 text-xs" size="sm">
                <LayoutDashboard className="h-4 w-4" />
                <span>دخول لوحة الإدارة</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
