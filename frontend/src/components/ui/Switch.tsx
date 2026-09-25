'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function Switch({
  checked,
  onCheckedChange,
  label,
  description,
  disabled = false,
  className,
}: SwitchProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4 select-none', className)}>
      {(label || description) && (
        <div className="space-y-0.5 text-right">
          {label && <span className="text-sm font-bold text-foreground block">{label}</span>}
          {description && <p className="text-xs text-foreground-muted">{description}</p>}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-normal focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50',
          checked ? 'bg-primary' : 'bg-surface-hover border-border',
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-normal',
            checked ? '-translate-x-5' : 'translate-x-0',
          )}
        />
      </button>
    </div>
  );
}
