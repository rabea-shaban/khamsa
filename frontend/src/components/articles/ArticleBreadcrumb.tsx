import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';
import { getSiteUrl } from '@/lib/seo/site-url';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ArticleBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function ArticleBreadcrumb({ items }: ArticleBreadcrumbProps) {
  const siteUrl = getSiteUrl();

  const fullItems: BreadcrumbItem[] = [
    { label: 'الرئيسية', href: '/' },
    ...items,
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${siteUrl}${item.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="مسار التنقل (Breadcrumb)" className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-foreground-muted">
        {fullItems.map((item, idx) => {
          const isLast = idx === fullItems.length - 1;

          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && <ChevronLeft className="h-3 w-3 text-border shrink-0" />}
              {idx === 0 && <Home className="h-3 w-3 text-foreground-muted ml-0.5" />}

              {isLast || !item.href ? (
                <span className="font-bold text-foreground truncate max-w-[200px] sm:max-w-[320px]">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors font-medium hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
