import React from 'react';
import { ContentStatus } from '@/types/api';
import { cn } from '@/lib/utils/cn';

interface ArticleStatusBadgeProps {
  status: ContentStatus;
  className?: string;
}

export function ArticleStatusBadge({ status, className }: ArticleStatusBadgeProps) {
  const isPublished = status === ContentStatus.PUBLISHED;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border select-none',
        isPublished
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
          : 'bg-primary/10 text-primary border-primary/25',
        className,
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          isPublished ? 'bg-emerald-400 animate-pulse' : 'bg-primary',
        )}
      />
      <span>{isPublished ? 'منشور' : 'مسودة'}</span>
    </span>
  );
}
