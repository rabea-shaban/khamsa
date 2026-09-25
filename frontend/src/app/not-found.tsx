import React from 'react';
import Link from 'next/link';
import { Home, ArrowRight, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-card border border-border shadow-card relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center mx-auto shadow-subtle">
          <FileQuestion className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl sm:text-6xl font-black font-mono text-primary block">
            404
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-foreground">
            الصفحة غير موجودة
          </h1>
          <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed max-w-sm mx-auto">
            عذراً، الصفحة التي تبحث عنها قد تكون حُذفت أو تم تغيير رابطها أو غير متاحة حالياً.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/">
            <Button size="sm" className="gap-2 text-xs font-bold shadow-card px-5">
              <Home className="h-4 w-4" />
              <span>الرئيسية</span>
            </Button>
          </Link>
          <Link href="/articles">
            <Button variant="outline" size="sm" className="gap-2 text-xs font-bold px-5">
              <ArrowRight className="h-4 w-4" />
              <span>المقالات</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
