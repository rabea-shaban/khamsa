'use client';

import React from 'react';
import Link from 'next/link';
import {
  Edit3,
  Trash2,
  Eye,
  CheckCircle,
  EyeOff,
  Image as ImageIcon,
  Calendar,
  User,
  Loader2,
} from 'lucide-react';
import { Article, ContentStatus } from '@/types/api';
import { ArticleStatusBadge } from './ArticleStatusBadge';
import { Button } from '@/components/ui/Button';

interface ArticleTableProps {
  articles: Article[];
  onDelete: (article: Article) => void;
  onTogglePublish: (article: Article) => void;
  publishingId?: string | null;
  deletingId?: string | null;
}

export function ArticleTable({
  articles,
  onDelete,
  onTogglePublish,
  publishingId,
  deletingId,
}: ArticleTableProps) {
  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden md:block rounded-2xl border border-border bg-card overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-xs font-bold text-foreground-muted">
                <th className="py-3.5 px-4 w-16">الغلاف</th>
                <th className="py-3.5 px-4">عنوان المقال</th>
                <th className="py-3.5 px-4">التصنيف</th>
                <th className="py-3.5 px-4">الكاتب</th>
                <th className="py-3.5 px-4">الحالة</th>
                <th className="py-3.5 px-4">التاريخ</th>
                <th className="py-3.5 px-4 text-center w-36">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {articles.map(article => {
                const isPublished = article.status === ContentStatus.PUBLISHED;
                const isItemPublishing = publishingId === article._id;
                const isItemDeleting = deletingId === article._id;

                return (
                  <tr
                    key={article._id}
                    className="hover:bg-surface-hover/60 transition-colors group"
                  >
                    {/* Cover Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="h-10 w-14 rounded-lg bg-surface border border-border overflow-hidden flex items-center justify-center shrink-0">
                        {article.coverImage ? (
                          <img
                            src={article.coverImage}
                            alt={article.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-4 w-4 text-foreground-muted/60" />
                        )}
                      </div>
                    </td>

                    {/* Title & Slug */}
                    <td className="py-3 px-4">
                      <div className="space-y-0.5 max-w-md">
                        <Link
                          href={`/dashboard/articles/${article._id}/edit`}
                          className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1"
                        >
                          {article.title}
                        </Link>
                        <p className="text-[11px] font-mono text-foreground-muted truncate">
                          /{article.slug}
                        </p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-surface-hover border border-border text-foreground-secondary">
                        {article.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="py-3 px-4 text-xs text-foreground-muted">
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate max-w-[120px]">{article.author?.name || 'مشرف'}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <ArticleStatusBadge status={article.status} />
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-xs text-foreground-muted whitespace-nowrap">
                      {new Date(article.createdAt).toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        {/* Publish / Unpublish */}
                        <button
                          type="button"
                          onClick={() => onTogglePublish(article)}
                          disabled={isItemPublishing}
                          title={isPublished ? 'إلغاء النشر (تحويل لمسودة)' : 'نشر المقال'}
                          className="p-1.5 rounded-lg text-foreground-muted hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
                        >
                          {isItemPublishing ? (
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          ) : isPublished ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </button>

                        {/* Preview */}
                        <Link
                          href={`/dashboard/articles/${article._id}/preview`}
                          title="معاينة المقال"
                          className="p-1.5 rounded-lg text-foreground-muted hover:text-primary hover:bg-surface-hover transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        {/* Edit */}
                        <Link
                          href={`/dashboard/articles/${article._id}/edit`}
                          title="تعديل المقال"
                          className="p-1.5 rounded-lg text-foreground-muted hover:text-primary hover:bg-surface-hover transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Link>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => onDelete(article)}
                          disabled={isItemDeleting}
                          title="حذف المقال"
                          className="p-1.5 rounded-lg text-foreground-muted hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
                        >
                          {isItemDeleting ? (
                            <Loader2 className="h-4 w-4 animate-spin text-destructive" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card List View */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {articles.map(article => {
          const isPublished = article.status === ContentStatus.PUBLISHED;
          const isItemPublishing = publishingId === article._id;
          const isItemDeleting = deletingId === article._id;

          return (
            <div
              key={article._id}
              className="p-4 rounded-2xl border border-border bg-card space-y-3 shadow-card"
            >
              <div className="flex items-start gap-3">
                <div className="h-14 w-14 rounded-xl bg-surface border border-border overflow-hidden shrink-0 flex items-center justify-center">
                  {article.coverImage ? (
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-5 w-5 text-foreground-muted/60" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-surface-hover border border-border text-foreground-secondary font-semibold">
                      {article.category}
                    </span>
                    <ArticleStatusBadge status={article.status} />
                  </div>

                  <Link
                    href={`/dashboard/articles/${article._id}/edit`}
                    className="font-bold text-sm text-foreground hover:text-primary line-clamp-1"
                  >
                    {article.title}
                  </Link>
                  <p className="text-[10px] font-mono text-foreground-muted truncate mt-0.5">
                    /{article.slug}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-foreground-muted">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {new Date(article.createdAt).toLocaleDateString('ar-EG', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onTogglePublish(article)}
                    disabled={isItemPublishing}
                    className="h-7 px-2 text-xs"
                  >
                    {isItemPublishing ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : isPublished ? (
                      'إلغاء النشر'
                    ) : (
                      'نشر'
                    )}
                  </Button>

                  <Link href={`/dashboard/articles/${article._id}/preview`}>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                      معاينة
                    </Button>
                  </Link>

                  <Link href={`/dashboard/articles/${article._id}/edit`}>
                    <Button variant="outline" size="sm" className="h-7 px-2 text-xs text-primary">
                      تعديل
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(article)}
                    disabled={isItemDeleting}
                    className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10"
                  >
                    {isItemDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'حذف'}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
