import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export function Spinner({ className, size = 'md', label }: SpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-10 w-10',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2" role="status">
      <Loader2 className={cn('animate-spin text-primary', sizes[size], className)} />
      {label && <span className="text-xs text-foreground-muted font-medium">{label}</span>}
      <span className="sr-only">جارٍ التحميل...</span>
    </div>
  );
}
