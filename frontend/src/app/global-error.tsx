'use client';

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="min-h-screen flex items-center justify-center bg-background text-foreground p-4" suppressHydrationWarning>
        <div className="max-w-md w-full text-center space-y-4 p-6 rounded-2xl bg-card border border-border shadow-xl">
          <div className="h-12 w-12 rounded-2xl bg-destructive/15 text-destructive flex items-center justify-center mx-auto">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold">حدث خطأ غير متوقع في النظام</h2>
          <p className="text-xs text-muted-foreground">
            نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى أو تحديث الصفحة.
          </p>
          <Button onClick={() => reset()} className="gap-2 text-xs font-semibold mx-auto">
            <RefreshCw className="h-3.5 w-3.5" />
            إعادة المحاولة
          </Button>
        </div>
      </body>
    </html>
  );
}
