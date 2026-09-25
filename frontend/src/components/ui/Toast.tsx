'use client';

import * as React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  id: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose: (id: string) => void;
  duration?: number;
}

export function Toast({
  id,
  type = 'info',
  title,
  message,
  onClose,
  duration = 4000,
}: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="h-4 w-4 text-destructive shrink-0" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />,
    info: <Info className="h-4 w-4 text-primary shrink-0" />,
  };

  return (
    <div
      role="alert"
      className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card text-card-foreground shadow-dropdown z-50 min-w-[280px] max-w-sm animate-in fade-in slide-in-from-top-4 duration-fast"
      dir="rtl"
    >
      {icons[type]}
      <div className="flex-1 space-y-0.5 text-right">
        {title && <h5 className="font-bold text-xs text-foreground">{title}</h5>}
        <p className="text-xs text-foreground-secondary leading-relaxed">{message}</p>
      </div>
      <button
        type="button"
        onClick={() => onClose(id)}
        className="p-1 text-foreground-muted hover:text-foreground transition-colors"
        aria-label="إغلاق الإشعار"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
