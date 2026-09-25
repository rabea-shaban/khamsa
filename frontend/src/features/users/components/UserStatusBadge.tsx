import React from 'react';
import { cn } from '@/lib/utils/cn';

interface UserStatusBadgeProps {
  isActive: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export function UserStatusBadge({ isActive, className, size = 'sm' }: UserStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg font-bold select-none border transition-colors',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        isActive
          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
          : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
        className,
      )}
    >
      <span
        className={cn(
          'rounded-full shrink-0',
          size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2',
          isActive ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400',
        )}
      />
      <span>{isActive ? 'نشط' : 'غير نشط'}</span>
    </span>
  );
}
