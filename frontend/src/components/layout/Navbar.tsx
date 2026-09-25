'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Menu, X, Home, BookOpen, Video, Info, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'الرئيسية', href: '/', icon: Home },
    { label: 'المقالات', href: '/articles', icon: BookOpen },
    { label: 'الفيديوهات', href: '/videos', icon: Video },
    { label: 'من نحن', href: '/about', icon: Info },
    { label: 'تواصل معنا', href: '/contact', icon: Mail },
  ];

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {navLinks.map(link => {
            const isActive =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  isActive ? 'text-primary font-bold' : 'text-foreground-secondary'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pe-2 border-s border-border">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="القائمة الرئيسية"
            aria-expanded={isOpen}
            className="p-2 rounded-xl text-foreground-secondary hover:text-foreground hover:bg-secondary focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-card/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-secondary'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
