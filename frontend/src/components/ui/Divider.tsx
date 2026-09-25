import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface DividerProps {
  text?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({ text, className, orientation = 'horizontal' }: DividerProps) {
  if (orientation === 'vertical') {
    return <div className={cn('w-px h-full bg-border self-stretch', className)} />;
  }

  if (text) {
    return (
      <div className={cn('relative flex items-center py-2', className)}>
        <div className="flex-grow border-t border-border" />
        <span className="flex-shrink mx-3 text-xs font-semibold text-foreground-muted">{text}</span>
        <div className="flex-grow border-t border-border" />
      </div>
    );
  }

  return <hr className={cn('border-0 h-px bg-border my-4', className)} />;
}
