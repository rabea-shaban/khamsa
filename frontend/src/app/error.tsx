'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log client error safely
    console.error('App runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-card border border-border shadow-card relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-destructive/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="h-16 w-16 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center justify-center mx-auto shadow-subtle">
          <AlertCircle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-black text-foreground">
            حدث خطأ غير متوقع
          </h1>
          <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed max-w-sm mx-auto">
            نعتذر عن هذا الخطأ المؤقت. يمكنك محاولة إعادة تحميل الصفحة أو العودة للصفحة الرئيسية.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            size="sm"
            className="gap-2 text-xs font-bold shadow-card px-5"
          >
            <RefreshCw className="h-4 w-4" />
            <span>إعادة المحاولة</span>
          </Button>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 text-xs font-bold px-5">
              <Home className="h-4 w-4" />
              <span>الرئيسية</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
