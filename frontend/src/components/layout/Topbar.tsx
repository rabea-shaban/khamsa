'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Menu, LogOut, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuth } from '@/features/auth';

interface TopbarProps {
  onOpenMobileMenu?: () => void;
}

const pageTitles: Record<string, string> = {
  '/dashboard': 'لوحة التحكم',
  '/dashboard/articles': 'إدارة المقالات',
  '/dashboard/articles/new': 'مقال جديد',
  '/dashboard/videos': 'إدارة الفيديوهات',
  '/dashboard/media': 'مكتبة الوسائط',
  '/dashboard/settings': 'إعدادات المنصة',
  '/dashboard/users': 'إدارة المستخدمين',
};

export function Topbar({ onOpenMobileMenu }: TopbarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Determine current page title
  let currentTitle = pageTitles[pathname];
  if (!currentTitle) {
    if (pathname.includes('/videos/') && pathname.includes('/edit')) {
      currentTitle = 'تعديل الفيديو';
    } else if (pathname.includes('/videos/new')) {
      currentTitle = 'فيديو جديد';
    } else if (pathname.includes('/articles/') && pathname.includes('/edit')) {
      currentTitle = 'تعديل المقال';
    } else if (pathname.includes('/articles/') && pathname.includes('/preview')) {
      currentTitle = 'معاينة المقال';
    } else {
      currentTitle = 'لوحة الإدارة';
    }
  }

  return (
    <header className="h-16 border-b border-border bg-card/85 backdrop-blur px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-normal">
      {/* Mobile Menu Toggle + Breadcrumb / Title */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl border border-border bg-surface text-foreground-secondary hover:text-foreground hover:bg-surface-hover transition-colors"
            aria-label="فتح القائمة الجانبية"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-xs font-semibold text-foreground-muted">
            لوحة الإدارة
          </span>
          <span className="hidden sm:inline text-foreground-muted font-mono">/</span>
          <h1 className="text-sm font-bold text-foreground">{currentTitle}</h1>
        </div>
      </div>

      {/* User Info & Actions */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        {user && (
          <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-border">
            <div className="h-8 w-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
              {user.name ? user.name.slice(0, 1).toUpperCase() : 'U'}
            </div>
            <div className="hidden sm:flex flex-col text-right leading-tight">
              <span className="text-xs font-bold text-foreground">{user.name}</span>
              <span className="text-[10px] text-primary font-mono flex items-center gap-1">
                <ShieldCheck className="h-2.5 w-2.5" />
                {user.role}
              </span>
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => logout()}
          className="h-8 px-2.5 text-foreground-muted hover:text-destructive hover:bg-destructive/10 transition-colors"
          title="تسجيل الخروج"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden md:inline mr-1 text-xs font-semibold">تسجيل الخروج</span>
        </Button>
      </div>
    </header>
  );
}
