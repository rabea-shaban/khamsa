'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="مسار التنقل" className={cn('flex items-center gap-1.5 text-xs select-none', className)} dir="rtl">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronLeft className="h-3.5 w-3.5 text-foreground-muted shrink-0" />}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="font-medium text-foreground-muted hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn('font-bold', isLast ? 'text-foreground' : 'text-foreground-muted')}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
