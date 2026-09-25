import * as React from 'react';
import { LucideIcon, FileQuestion } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode | {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon = FileQuestion,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-border bg-surface/50 space-y-4',
        className,
      )}
    >
      <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
        <Icon className="h-7 w-7" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        {description && <p className="text-xs text-foreground-muted leading-relaxed">{description}</p>}
      </div>
      {action && (
        React.isValidElement(action) ? (
          action
        ) : typeof action === 'object' && 'onClick' in action ? (
          <Button onClick={action.onClick} size="sm">
            {action.label}
          </Button>
        ) : null
      )}
    </div>
  );
}
