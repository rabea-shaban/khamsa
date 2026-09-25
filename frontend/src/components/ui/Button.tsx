import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'destructive' | 'link' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer rounded-xl';

    const variants = {
      primary:
        'bg-primary hover:bg-primary-hover active:bg-primary-active text-primary-foreground shadow-subtle hover:shadow-card active:scale-[0.98]',
      secondary:
        'bg-surface-elevated hover:bg-surface-hover text-foreground border border-border hover:border-border-light active:scale-[0.98]',
      outline:
        'border border-border hover:border-primary/50 bg-transparent hover:bg-surface-hover text-foreground active:scale-[0.98]',
      ghost:
        'hover:bg-surface-hover text-foreground-secondary hover:text-foreground active:scale-[0.98]',
      danger:
        'bg-destructive hover:bg-red-600 active:bg-red-700 text-destructive-foreground shadow-subtle active:scale-[0.98]',
      destructive:
        'bg-destructive hover:bg-red-600 active:bg-red-700 text-destructive-foreground shadow-subtle active:scale-[0.98]',
      link:
        'text-primary hover:text-primary-hover underline-offset-4 hover:underline p-0 h-auto font-semibold',
      icon:
        'p-2 rounded-xl border border-border bg-surface hover:bg-surface-hover text-foreground-secondary hover:text-foreground active:scale-[0.98]',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-10 px-4 py-2 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2.5',
      icon: 'h-9 w-9 p-0',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current shrink-0" />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
