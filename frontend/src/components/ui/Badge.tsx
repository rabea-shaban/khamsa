import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'gold' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger' | 'destructive';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'primary', size = 'md', ...props }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/10 text-primary border border-primary/25 font-bold',
    gold: 'bg-primary/15 text-primary border border-primary/30 font-bold',
    secondary: 'bg-surface-elevated text-foreground-secondary border border-border',
    outline: 'border border-border text-foreground-secondary bg-transparent',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/25',
    danger: 'bg-destructive/10 text-destructive border border-destructive/25',
    destructive: 'bg-destructive/10 text-destructive border border-destructive/25',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-0.5 text-xs',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-semibold transition-colors duration-normal tracking-wide',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
