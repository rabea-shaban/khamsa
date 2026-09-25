import * as React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'حدث خطأ غير متوقع',
  message = 'تعذر تحميل البيانات المطلوبة، يرجى التحقق من اتصالك بالإنترنت والمحاولة مجدداً.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-destructive/20 bg-destructive/5 space-y-4',
        className,
      )}
    >
      <div className="h-14 w-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        <p className="text-xs text-foreground-muted leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-3.5 w-3.5" />
          <span>إعادة المحاولة</span>
        </Button>
      )}
    </div>
  );
}
