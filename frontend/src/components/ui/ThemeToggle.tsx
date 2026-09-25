'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { Moon, Sun, Monitor, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ThemeToggleProps {
  className?: string;
  variant?: 'button' | 'dropdown' | 'compact';
}

export function ThemeToggle({ className, variant = 'dropdown' }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className={cn('h-9 w-9 rounded-xl bg-surface border border-border animate-pulse', className)} />
    );
  }

  // Simple cycle toggle for compact mode
  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        aria-label="تبديل مظهر الموقع"
        className={cn(
          'p-2 rounded-xl border border-border bg-surface hover:bg-surface-hover text-foreground-secondary hover:text-foreground transition-all duration-normal flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/40',
          className,
        )}
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="h-4 w-4 text-primary" />
        ) : (
          <Sun className="h-4 w-4 text-primary" />
        )}
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="قائمة المظهر (Dark / Light / System)"
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-border bg-surface hover:bg-surface-hover text-xs font-semibold text-foreground-secondary hover:text-foreground transition-all duration-normal focus:outline-none focus:ring-2 focus:ring-primary/40',
          className,
        )}
      >
        {theme === 'system' ? (
          <Monitor className="h-3.5 w-3.5 text-primary" />
        ) : resolvedTheme === 'dark' ? (
          <Moon className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-primary" />
        )}
        <span className="hidden sm:inline">
          {theme === 'system' ? 'تلقائي' : resolvedTheme === 'dark' ? 'داكن' : 'فاتح'}
        </span>
        <ChevronDown className="h-3 w-3 text-foreground-muted" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-36 p-1.5 rounded-xl bg-card border border-border shadow-dropdown z-50 space-y-1 text-right animate-in fade-in zoom-in-95 duration-fast">
          <button
            type="button"
            onClick={() => {
              setTheme('dark');
              setIsOpen(false);
            }}
            className={cn(
              'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors',
              theme === 'dark'
                ? 'bg-primary/10 text-primary font-bold'
                : 'text-foreground-secondary hover:bg-surface-hover hover:text-foreground',
            )}
          >
            <Moon className="h-3.5 w-3.5" />
            <span>الوضع الداكن</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme('light');
              setIsOpen(false);
            }}
            className={cn(
              'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors',
              theme === 'light'
                ? 'bg-primary/10 text-primary font-bold'
                : 'text-foreground-secondary hover:bg-surface-hover hover:text-foreground',
            )}
          >
            <Sun className="h-3.5 w-3.5" />
            <span>الوضع الفاتح</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme('system');
              setIsOpen(false);
            }}
            className={cn(
              'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors',
              theme === 'system'
                ? 'bg-primary/10 text-primary font-bold'
                : 'text-foreground-secondary hover:bg-surface-hover hover:text-foreground',
            )}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>حسب النظام</span>
          </button>
        </div>
      )}
    </div>
  );
}
