import * as React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error' | 'gold';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  className,
}: AlertProps) {
  const icons = {
    info: Info,
    success: CheckCircle2,
    warning: AlertTriangle,
    error: AlertCircle,
    gold: Info,
  };

  const variants = {
    info: 'bg-surface-elevated border-border text-foreground',
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    error: 'bg-destructive/10 border-destructive/30 text-destructive',
    gold: 'bg-primary/10 border-primary/30 text-primary',
  };

  const Icon = icons[variant];

  return (
    <div
      role="alert"
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-xl border text-right text-xs leading-relaxed',
        variants[variant],
        className,
      )}
      dir="rtl"
    >
      <Icon className="h-4 w-4 shrink-0 mt-0.5" />
      <div className="flex-1 space-y-0.5">
        {title && <h5 className="font-bold text-sm text-foreground">{title}</h5>}
        <div className="text-foreground-secondary">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-foreground-muted hover:text-foreground transition-colors"
          aria-label="إغلاق التنبيه"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
