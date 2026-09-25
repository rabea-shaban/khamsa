'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Edit3, Calendar, User, Tag } from 'lucide-react';
import { useArticle, ArticleStatusBadge } from '@/features/articles';
import { TiptapRenderer } from '@/components/shared/TiptapRenderer';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';

export default function ArticlePreviewPage() {
  const params = useParams();
  const articleId = params?.id as string;

  const { data: article, isLoading, isError, error, refetch } = useArticle(articleId);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto" dir="rtl">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-80 w-full rounded-3xl" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="py-12 max-w-4xl mx-auto" dir="rtl">
        <ErrorState
          title="تعذر تحميل المقال"
          message={error instanceof Error ? error.message : 'المقال غير متوفر أو تم حذفه.'}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8" dir="rtl">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border">
        <Link
          href="/dashboard/articles"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowRight className="h-3.5 w-3.5" />
          <span>العودة للمقالات</span>
        </Link>

        <div className="flex items-center gap-3">
          <ArticleStatusBadge status={article.status} />
          <Link href={`/dashboard/articles/${article._id}/edit`}>
            <Button size="sm" className="gap-1.5 text-xs font-bold">
              <Edit3 className="h-3.5 w-3.5" />
              تعديل المقال
            </Button>
          </Link>
        </div>
      </div>

      {/* Article Preview Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-card border border-border shadow-xl space-y-8">
        {/* Cover Image */}
        {article.coverImage && (
          <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-border shadow-lg">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Meta Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-primary/15 text-primary text-xs font-bold border border-primary/20">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {new Date(article.publishedAt || article.createdAt).toLocaleDateString('ar-EG', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <User className="h-3.5 w-3.5" />
              <span>{article.author?.name || 'خمسة برمجة بالبلدي'}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-foreground leading-tight">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed border-r-4 border-primary/50 pr-4">
              {article.excerpt}
            </p>
          )}
        </div>

        {/* Rendered Content via TiptapRenderer */}
        <div className="pt-6 border-t border-border">
          <TiptapRenderer content={article.content} />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="pt-6 border-t border-border flex flex-wrap items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {article.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-secondary text-xs text-muted-foreground font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
