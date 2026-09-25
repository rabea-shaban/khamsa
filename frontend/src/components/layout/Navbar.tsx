import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            الرئيسية
          </Link>
          <Link href="/articles" className="hover:text-primary transition-colors">
            المقالات
          </Link>
          <Link href="/videos" className="hover:text-primary transition-colors">
            الفيديوهات
          </Link>
          <ThemeToggle />
          <Link href="/login">
            <Button size="sm">
              تسجيل الدخول
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
