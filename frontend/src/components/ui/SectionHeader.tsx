import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  action,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        centered ? 'items-center text-center' : 'items-start text-right',
        action && 'sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className="space-y-1 max-w-2xl">
        {badge && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/25 mb-1">
            {badge}
          </span>
        )}
        <h2 className="text-h2 text-foreground font-extrabold tracking-tight">{title}</h2>
        {description && (
          <p className="text-body-small text-foreground-muted leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="mt-3 sm:mt-0 shrink-0">{action}</div>}
    </div>
  );
}
