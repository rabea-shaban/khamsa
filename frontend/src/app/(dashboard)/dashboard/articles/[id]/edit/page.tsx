'use client';

import React, { useState } from 'react';
import { isAxiosError } from 'axios';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  ArticleForm,
  ArticlePreviewModal,
  useArticle,
  useUpdateArticle,
} from '@/features/articles';
import { ArticleFormValues } from '@/features/articles/schemas/article.schema';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params?.id as string;

  const { data: article, isLoading, isError, error, refetch } = useArticle(articleId);
  const updateMutation = useUpdateArticle();
  const [previewData, setPreviewData] = useState<ArticleFormValues | null>(null);

  const handleSubmit = async (data: ArticleFormValues) => {
    if (!articleId) return;

    try {
      await updateMutation.mutateAsync({
        id: articleId,
        data,
      });
      router.push('/dashboard/articles');
    } catch (err: unknown) {
      console.error('Failed to update article:', err);
      if (isAxiosError(err) && err.response?.data) {
        const errorData = err.response.data;
        if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
          const details = errorData.errors.map((e: { field: string; message: string }) => `${e.field}: ${e.message}`).join('\n');
          alert(`خطأ في البيانات المُدخلة:\n${details}`);
          return;
        }
        if (errorData.message) {
          alert(`حدث خطأ: ${errorData.message}`);
          return;
        }
      }
      alert('حدث خطأ أثناء تحديث المقال. يرجى مراجعة البيانات والمحاولة مجدداً.');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6" dir="rtl">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-16 w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-44 w-full rounded-2xl" />
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-60 w-full rounded-2xl" />
            <Skeleton className="h-60 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="py-12" dir="rtl">
        <ErrorState
          title="تعذر العثور على المقال"
          message={error instanceof Error ? error.message : 'المقال المطلوب غير موجود أو تم حذفه.'}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Breadcrumb Back Link */}
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/articles"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowRight className="h-3.5 w-3.5" />
          <span>العودة لقائمة المقالات</span>
        </Link>
      </div>

      {/* Main Article Form */}
      <ArticleForm
        mode="edit"
        initialData={article}
        onSubmit={handleSubmit}
        isSubmitting={updateMutation.isPending}
        onPreview={data => setPreviewData(data)}
      />

      {/* Live Preview Modal */}
      <ArticlePreviewModal
        data={previewData}
        isOpen={Boolean(previewData)}
        onClose={() => setPreviewData(null)}
      />
    </div>
  );
}
