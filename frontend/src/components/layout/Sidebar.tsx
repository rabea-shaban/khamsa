'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Video,
  Image as ImageIcon,
  Users,
  Settings,
  ExternalLink,
  LogOut,
  X,
  ShieldCheck,
  UserCircle,
} from 'lucide-react';
import { Logo } from '../shared/Logo';
import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/features/auth';

interface SidebarProps {
  className?: string;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const navItems = [
  { label: 'لوحة التحكم', href: '/dashboard', icon: LayoutDashboard, exact: true },
  { label: 'المقالات', href: '/dashboard/articles', icon: FileText },
  { label: 'الفيديوهات', href: '/dashboard/videos', icon: Video },
  { label: 'الوسائط', href: '/dashboard/media', icon: ImageIcon },
  { label: 'المستخدمون', href: '/dashboard/users', icon: Users, adminOnly: true },
  { label: 'الملف الشخصي', href: '/dashboard/profile', icon: UserCircle },
  { label: 'إعدادات المنصة', href: '/dashboard/settings', icon: Settings, adminOnly: true },
];

export function Sidebar({ className, isOpenMobile, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAuth();

  const handleNavClick = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const content = (
    <div className="flex flex-col justify-between h-full p-4 space-y-6">
      <div className="space-y-6">
        {/* Brand & Mobile Close */}
        <div className="flex items-center justify-between px-2 pt-1">
          <Logo />
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-xl text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-colors"
              aria-label="إغلاق القائمة"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map(item => {
            if (item.adminOnly && !isAdmin) {
              return null;
            }

            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={cn(
                  'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-normal',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-subtle'
                    : 'text-foreground-secondary hover:bg-surface-hover hover:text-foreground',
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.adminOnly && (
                  <span
                    className={cn(
                      'text-[10px] px-1.5 py-0.2 rounded-md font-mono font-bold',
                      isActive ? 'bg-black/20 text-current' : 'bg-surface-hover text-foreground-muted',
                    )}
                  >
                    Admin
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info & Footer Actions */}
      <div className="space-y-3 pt-4 border-t border-border">
        {/* User Card */}
        {user && (
          <Link
            href="/dashboard/profile"
            onClick={handleNavClick}
            className="p-3 rounded-2xl bg-surface border border-border/80 hover:border-primary/40 hover:bg-surface-hover flex items-center gap-3 transition-all group"
          >
            <div className="relative h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center font-extrabold text-sm shrink-0 border border-primary/25 overflow-hidden shadow-subtle">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : null}
              <span className="absolute inset-0 flex items-center justify-center font-bold">
                {user.name ? user.name.slice(0, 1).toUpperCase() : 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0 text-right">
              <p className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">
                {user.name}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-primary font-mono font-semibold">
                <ShieldCheck className="h-3 w-3" />
                <span>{user.role}</span>
              </div>
            </div>
          </Link>
        )}

        <div className="flex flex-col gap-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-foreground-secondary hover:bg-surface-hover hover:text-foreground transition-colors"
          >
            <span>زيارة الموقع العام</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => {
              handleNavClick();
              logout();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold text-destructive hover:bg-destructive/10 transition-colors text-right"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className={cn(
          'w-64 border-l border-border bg-card/95 backdrop-blur hidden lg:flex flex-col h-screen sticky top-0 shrink-0 z-20 transition-colors duration-normal',
          className,
        )}
      >
        {content}
      </aside>

      {/* Mobile Offcanvas Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          <aside className="relative w-72 max-w-[80vw] bg-card border-l border-border h-full z-10 shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-fast">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
