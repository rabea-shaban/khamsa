import React from 'react';
import Link from 'next/link';
import { Calendar, User as UserIcon, ArrowLeft, BookOpen } from 'lucide-react';
import { Article } from '@/types/api';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils/cn';

export interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  className?: string;
}

export function ArticleCard({ article, featured = false, className }: ArticleCardProps) {
  // Format Arabic date
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date(article.createdAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  return (
    <Card
      hoverEffect
      className={cn(
        'group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300',
        featured && 'md:col-span-2 md:flex-row',
        className,
      )}
    >
      {/* Cover Image */}
      <Link
        href={`/articles/${article.slug}`}
        className={cn(
          'relative block overflow-hidden bg-surface-hover aspect-[16/9] w-full',
          featured && 'md:w-1/2 md:aspect-auto md:min-h-[280px]',
        )}
      >
        {article.coverImage ? (
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center bg-surface">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-2">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-foreground-muted">خمسة برمجة بالبلدي</span>
          </div>
        )}

        <div className="absolute top-3 right-3">
          <Badge variant="primary" className="bg-card/90 backdrop-blur border-border">
            {article.category}
          </Badge>
        </div>
      </Link>

      {/* Content */}
      <div className={cn('flex flex-1 flex-col justify-between p-6 space-y-4', featured && 'md:w-1/2')}>
        <div className="space-y-3">
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-foreground-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-foreground-muted" />
              <time>{formattedDate}</time>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <UserIcon className="h-3.5 w-3.5 text-foreground-muted" />
              <span>{article.author?.name || 'فريق خمسة'}</span>
            </span>
          </div>

          {/* Title */}
          <Link href={`/articles/${article.slug}`}>
            <h3 className="text-lg sm:text-xl font-extrabold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
              {article.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="text-sm text-foreground-secondary line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Footer info & Read more CTA */}
        <div className="pt-3 flex items-center justify-between border-t border-border">
          <div className="flex flex-wrap gap-1.5">
            {article.tags?.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="text-[11px] font-semibold text-foreground-muted bg-surface-hover px-2 py-0.5 rounded-md font-mono">
                #{tag}
              </span>
            ))}
          </div>

          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover group-hover:-translate-x-1 transition-all"
          >
            <span>اقرأ المزيد</span>
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
