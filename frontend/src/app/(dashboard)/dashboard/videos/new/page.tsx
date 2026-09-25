'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { VideoForm, VideoFormValues } from '@/features/videos';
import { useCreateVideo } from '@/features/videos';
import { Button } from '@/components/ui/Button';

export default function NewVideoPage() {
  const router = useRouter();
  const createMutation = useCreateVideo();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (values: VideoFormValues) => {
    try {
      setErrorMessage(null);
      await createMutation.mutateAsync({
        title: values.title,
        description: values.description,
        platform: values.platform,
        url: values.url,
        thumbnail: values.thumbnail || null,
        status: values.status,
      });

      router.push('/dashboard/videos');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setErrorMessage(
        error.response?.data?.message || 'حدث خطأ أثناء إضافة الفيديو. يرجى مراجعة البيانات والمحاولة مجدداً.',
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Link href="/dashboard/videos" className="hover:text-primary transition-colors">
              الفيديوهات
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">إضافة فيديو جديد</span>
          </div>
          <h1 className="text-2xl font-black text-foreground">إضافة فيديو جديد</h1>
        </div>

        <Link href="/dashboard/videos">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold bg-card">
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            <span>العودة لقائمة الفيديوهات</span>
          </Button>
        </Link>
      </div>

      {/* Global Error Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive font-semibold flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <VideoForm
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending}
        mode="create"
      />
    </div>
  );
}
