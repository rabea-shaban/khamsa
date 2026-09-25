'use client';

import * as React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <nav
      role="navigation"
      aria-label="التنقل بين الصفحات"
      className={cn('flex items-center justify-center gap-1.5 py-4 select-none', className)}
      dir="rtl"
    >
      {/* Previous button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center justify-center h-9 px-3 rounded-xl border border-border bg-surface text-xs font-semibold text-foreground-secondary hover:text-foreground hover:bg-surface-hover disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        <ChevronRight className="h-4 w-4 ml-1" />
        <span>السابق</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((p, idx) => {
          if (p === '...') {
            return (
              <span key={idx} className="h-9 w-9 flex items-center justify-center text-foreground-muted text-xs">
                ...
              </span>
            );
          }
          const isCurrent = p === currentPage;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onPageChange(p as number)}
              className={cn(
                'h-9 w-9 flex items-center justify-center rounded-xl text-xs font-bold font-mono transition-all duration-normal',
                isCurrent
                  ? 'bg-primary text-primary-foreground shadow-subtle'
                  : 'border border-border bg-surface text-foreground-secondary hover:text-foreground hover:bg-surface-hover',
              )}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center justify-center h-9 px-3 rounded-xl border border-border bg-surface text-xs font-semibold text-foreground-secondary hover:text-foreground hover:bg-surface-hover disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        <span>التالي</span>
        <ChevronLeft className="h-4 w-4 mr-1" />
      </button>
    </nav>
  );
}
