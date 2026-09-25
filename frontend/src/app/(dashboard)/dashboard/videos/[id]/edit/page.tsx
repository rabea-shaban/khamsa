'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { VideoForm, VideoFormValues } from '@/features/videos';
import { useVideo, useUpdateVideo } from '@/features/videos';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';

export default function EditVideoPage() {
  const router = useRouter();
  const params = useParams();
  const videoId = params?.id as string;

  const { data: video, isLoading, isError, error, refetch } = useVideo(videoId);
  const updateMutation = useUpdateVideo();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (values: VideoFormValues) => {
    if (!videoId) return;

    try {
      setErrorMessage(null);
      await updateMutation.mutateAsync({
        id: videoId,
        data: {
          title: values.title,
          description: values.description,
          platform: values.platform,
          url: values.url,
          thumbnail: values.thumbnail || null,
          status: values.status,
        },
      });

      router.push('/dashboard/videos');
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setErrorMessage(
        e.response?.data?.message || 'حدث خطأ أثناء تعديل الفيديو. يرجى مراجعة البيانات والمحاولة مجدداً.',
      );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6" dir="rtl">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-9 w-28" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-72 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !video) {
    return (
      <div className="space-y-6" dir="rtl">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h1 className="text-xl font-bold text-foreground">تعديل الفيديو</h1>
          <Link href="/dashboard/videos">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold">
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              العودة للفيديوهات
            </Button>
          </Link>
        </div>
        <ErrorState
          title="تعذر العثور على الفيديو"
          message={
            error instanceof Error
              ? error.message
              : 'الفيديو المطلوب غير موجود في قاعدة البيانات أو تم حذفه.'
          }
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Link href="/dashboard/videos" className="hover:text-primary transition-colors">
              الفيديوهات
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">تعديل الفيديو</span>
          </div>
          <h1 className="text-2xl font-black text-foreground">تعديل الفيديو</h1>
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
        initialData={video}
        onSubmit={handleSubmit}
        isSubmitting={updateMutation.isPending}
        mode="edit"
      />
    </div>
  );
}
