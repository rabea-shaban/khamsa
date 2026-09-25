'use client';

import React, { useState } from 'react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ArticleForm, ArticlePreviewModal, useCreateArticle } from '@/features/articles';
import { ArticleFormValues } from '@/features/articles/schemas/article.schema';

export default function NewArticlePage() {
  const router = useRouter();
  const createMutation = useCreateArticle();
  const [previewData, setPreviewData] = useState<ArticleFormValues | null>(null);

  const handleSubmit = async (data: ArticleFormValues) => {
    try {
      await createMutation.mutateAsync(data);
      router.push('/dashboard/articles');
    } catch (err: unknown) {
      console.error('Failed to create article:', err);
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
      alert('حدث خطأ أثناء حفظ المقال. يرجى مراجعة الحقول والمحاولة مجدداً.');
    }
  };

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
        mode="create"
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending}
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
