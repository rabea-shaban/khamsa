'use client';

import React from 'react';
import { X, Calendar, Tag, User } from 'lucide-react';
import { ArticleFormValues } from '../schemas/article.schema';
import { TiptapRenderer } from '@/components/shared/TiptapRenderer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ArticlePreviewModalProps {
  data: ArticleFormValues | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArticlePreviewModal({ data, isOpen, onClose }: ArticlePreviewModalProps) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-sm overflow-y-auto" dir="rtl">
      <div className="relative w-full max-w-4xl bg-card border border-border rounded-3xl shadow-dropdown overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/25">
              معاينة حية للمقال
            </span>
            <span className="text-xs text-foreground-muted hidden sm:inline">
              هكذا سيظهر المقال للقراء في الموقع العام
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Cover Image */}
          {data.coverImage && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border shadow-card bg-surface">
              <img
                src={data.coverImage}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <div className="space-y-4 text-right">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary" className="text-xs px-3 py-1">
                {data.category}
              </Badge>
              <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
                <User className="h-3.5 w-3.5" />
                <span>خمسة برمجة بالبلدي</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground leading-tight">
              {data.title || 'عنوان المقال التجريبي'}
            </h1>

            {data.excerpt && (
              <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed border-r-2 border-primary/50 pr-3">
                {data.excerpt}
              </p>
            )}
          </div>

          {/* Rendered Content using shared TiptapRenderer */}
          <div className="pt-4 border-t border-border">
            <TiptapRenderer content={data.content as Record<string, unknown>} />
          </div>

          {/* Tags */}
          {data.tags && data.tags.length > 0 && (
            <div className="pt-6 border-t border-border flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-foreground-muted" />
              {data.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-surface-hover border border-border text-xs text-foreground-secondary font-mono font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-border bg-surface flex justify-end shrink-0">
          <Button onClick={onClose} size="sm" variant="outline">
            إغلاق المعاينة
          </Button>
        </div>
      </div>
    </div>
  );
}
