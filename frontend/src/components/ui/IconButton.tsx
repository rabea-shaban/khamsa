import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = 'secondary',
      size = 'md',
      isLoading = false,
      disabled,
      icon: Icon,
      label,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer rounded-xl';

    const variants = {
      primary:
        'bg-primary hover:bg-primary-hover text-primary-foreground shadow-subtle active:scale-[0.96]',
      secondary:
        'bg-surface-elevated hover:bg-surface-hover text-foreground-secondary hover:text-foreground border border-border hover:border-border-light active:scale-[0.96]',
      outline:
        'border border-border hover:border-primary/50 bg-transparent hover:bg-surface-hover text-foreground-secondary hover:text-foreground active:scale-[0.96]',
      ghost:
        'hover:bg-surface-hover text-foreground-secondary hover:text-foreground active:scale-[0.96]',
      danger:
        'bg-destructive/10 hover:bg-destructive text-destructive hover:text-white border border-destructive/20 active:scale-[0.96]',
    };

    const sizes = {
      sm: 'h-8 w-8 p-1.5',
      md: 'h-9 w-9 p-2',
      lg: 'h-11 w-11 p-2.5',
    };

    const iconSizes = {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-label={label}
        title={label}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className={cn('animate-spin text-current', iconSizes[size])} />
        ) : (
          <Icon className={iconSizes[size]} />
        )}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
