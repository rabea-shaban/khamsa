import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, startIcon, endIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-right">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-bold text-foreground">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {startIcon && (
            <div className="absolute right-3.5 text-foreground-muted pointer-events-none flex items-center">
              {startIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              'flex h-11 w-full rounded-xl border border-border bg-surface px-3.5 py-2 text-sm text-foreground shadow-subtle transition-all duration-normal placeholder:text-foreground-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 text-right',
              startIcon && 'pr-10',
              endIcon && 'pl-10',
              error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
              className,
            )}
            {...props}
          />
          {endIcon && (
            <div className="absolute left-3.5 text-foreground-muted flex items-center">
              {endIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-destructive font-medium mt-1">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-foreground-muted mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
