'use client';

import React, { useState, useEffect } from 'react';
import { ListOrdered } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  items?: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0% -60% 0%' }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-subtle">
      <div className="flex items-center gap-2 text-xs font-bold text-primary">
        <ListOrdered className="h-4 w-4" />
        <span>فهرس المحتويات والمحاور</span>
      </div>

      <nav aria-label="فهرس المقال" className="space-y-1 text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'block py-1 px-2.5 rounded-lg transition-colors leading-normal',
                item.level === 3 && 'ms-3 text-[11px]',
                isActive
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-foreground-secondary hover:text-foreground hover:bg-secondary'
              )}
            >
              {item.title}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
