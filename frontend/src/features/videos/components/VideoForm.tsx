'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Save,
  UploadCloud,
  Loader2,
  Globe,
  Image as ImageIcon,
  Zap,
  Link2,
  FileText,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { Video, VideoPlatform, ContentStatus } from '@/types/api';
import { videoFormSchema, VideoFormValues } from '../schemas/video.schema';
import { detectVideoPlatform } from '../utils/detectVideoPlatform';
import { extractYouTubeId, getYouTubeThumbnail } from '../utils/youtube';
import { VideoPreview } from './VideoPreview';
import { VideoPlatformBadge } from './VideoPlatformBadge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { mediaApi } from '@/lib/api/media.api';
import { cn } from '@/lib/utils/cn';

interface VideoFormProps {
  initialData?: Partial<Video>;
  onSubmit: (data: VideoFormValues) => Promise<void>;
  isSubmitting?: boolean;
  mode?: 'create' | 'edit';
}

export function VideoForm({
  initialData,
  onSubmit,
  isSubmitting = false,
  mode = 'create',
}: VideoFormProps) {
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      platform: initialData?.platform || VideoPlatform.YOUTUBE,
      url: initialData?.url || '',
      thumbnail: initialData?.thumbnail || '',
      status: initialData?.status || ContentStatus.DRAFT,
    },
  });

  const watchedUrl = watch('url');
  const watchedPlatform = watch('platform');
  const watchedTitle = watch('title');
  const watchedDescription = watch('description');
  const watchedThumbnail = watch('thumbnail');

  // Auto-detect platform when URL changes
  useEffect(() => {
    if (watchedUrl) {
      const detected = detectVideoPlatform(watchedUrl);
      if (detected && detected !== watchedPlatform) {
        setValue('platform', detected, { shouldValidate: true });
      }
    }
  }, [watchedUrl, watchedPlatform, setValue]);

  // Handler for YouTube auto-thumbnail
  const handleFetchYouTubeThumbnail = () => {
    if (watchedUrl) {
      const videoId = extractYouTubeId(watchedUrl);
      if (videoId) {
        const thumbUrl = getYouTubeThumbnail(videoId);
        setValue('thumbnail', thumbUrl, { shouldValidate: true });
      }
    }
  };

  // Handler for direct file upload to Cloudflare R2
  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('حجم الصورة يجب ألا يتجاوز 5 ميجابايت');
      return;
    }

    try {
      setIsUploadingThumbnail(true);
      setUploadError(null);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'videos');
      const res = await mediaApi.uploadFile(formData);
      if (res.data?.url) {
        setValue('thumbnail', res.data.url, { shouldValidate: true });
      }
    } catch {
      setUploadError('حدث خطأ أثناء رفع الصورة');
    } finally {
      setIsUploadingThumbnail(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const platformsList = [
    { key: VideoPlatform.YOUTUBE, label: 'YouTube' },
    { key: VideoPlatform.TIKTOK, label: 'TikTok' },
    { key: VideoPlatform.FACEBOOK, label: 'Facebook' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form Fields (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: URL & Platform Detection */}
          <Card className="border border-border bg-card shadow-card">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base font-bold">رابط الفيديو والمنصة</CardTitle>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  كشف تلقائي للمنصة
                </span>
              </div>
              <CardDescription className="text-xs">
                الصق رابط الفيديو من YouTube أو TikTok أو Facebook وسيقوم النظام بالتعرف عليه
                تلقائياً
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-5 space-y-4">
              {/* URL Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-primary" />
                  <span>رابط المنشور أو الفيديو (Video URL)</span>
                  <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Input
                    {...register('url')}
                    placeholder="https://www.youtube.com/watch?v=... أو https://www.tiktok.com/@.../video/..."
                    dir="ltr"
                    className={cn(
                      'text-left font-mono text-xs h-11',
                      errors.url && 'border-destructive focus-visible:ring-destructive',
                    )}
                  />
                </div>
                {errors.url ? (
                  <p className="text-[11px] text-destructive font-medium">{errors.url.message}</p>
                ) : (
                  <p className="text-[11px] text-muted-foreground">
                    يدعم روابط YouTube القياسية والقصيرة (Shorts)، وفيديوهات TikTok، وفيديوهات Facebook
                  </p>
                )}
              </div>

              {/* Platform Selector */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-primary" />
                  <span>المنصة المحددة (Platform)</span>
                  <span className="text-destructive">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {platformsList.map(p => {
                    const isSelected = watchedPlatform === p.key;
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => setValue('platform', p.key, { shouldValidate: true })}
                        className={cn(
                          'p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all text-xs font-bold',
                          isSelected
                            ? 'border-primary bg-primary/10 text-primary shadow-xs'
                            : 'border-border bg-secondary/40 text-muted-foreground hover:border-border-light hover:text-foreground',
                        )}
                      >
                        <VideoPlatformBadge platform={p.key} size="sm" />
                      </button>
                    );
                  })}
                </div>
                {errors.platform && (
                  <p className="text-[11px] text-destructive font-medium">
                    {errors.platform.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Card: Title & Description */}
          <Card className="border border-border bg-card shadow-card">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <CardTitle className="text-base font-bold">بيانات ومحتوى الفيديو</CardTitle>
              </div>
              <CardDescription className="text-xs">
                أدخل عنواناً جذاباً ووصفاً يوضح أهم النقاط والمفاهيم المشروحة
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-5 space-y-4">
              {/* Title Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <span>عنوان الفيديو (Video Title)</span>
                  <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register('title')}
                  placeholder="مثال: شرح Event Loop في NodeJS بالبلدي وكيف تعمل الـ Microtasks..."
                  className={cn(
                    'text-sm font-semibold h-11',
                    errors.title && 'border-destructive focus-visible:ring-destructive',
                  )}
                />
                {errors.title && (
                  <p className="text-[11px] text-destructive font-medium">{errors.title.message}</p>
                )}
              </div>

              {/* Description Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <span>الوصف والملخص (Description)</span>
                  <span className="text-destructive">*</span>
                </label>
                <Textarea
                  {...register('description')}
                  rows={5}
                  placeholder="اكتب نبذة أو ملخص لما يتم تناوله في هذا الفيديو وأهم الروابط والمراجع المرتبطة به..."
                  className={cn(
                    'text-xs leading-relaxed resize-none',
                    errors.description && 'border-destructive focus-visible:ring-destructive',
                  )}
                />
                {errors.description && (
                  <p className="text-[11px] text-destructive font-medium">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Card: Thumbnail Settings */}
          <Card className="border border-border bg-card shadow-card">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base font-bold">الصورة المصغرة (Thumbnail)</CardTitle>
                </div>
                {watchedPlatform === VideoPlatform.YOUTUBE && extractYouTubeId(watchedUrl) && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleFetchYouTubeThumbnail}
                    className="text-[11px] h-7 gap-1 bg-card hover:bg-secondary font-bold"
                  >
                    <Zap className="h-3 w-3 text-primary" />
                    جلب من YouTube
                  </Button>
                )}
              </div>
              <CardDescription className="text-xs">
                يمكنك رفع صورة مصغرة مخصصة أو لصق رابط مباشر
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-5 space-y-4">
              {/* Direct URL input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">رابط الصورة (URL)</label>
                <Input
                  {...register('thumbnail')}
                  placeholder="https://... أو سيتم رفعها تلقائياً"
                  dir="ltr"
                  className="font-mono text-xs h-10 text-left"
                />
                {errors.thumbnail && (
                  <p className="text-[11px] text-destructive font-medium">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>

              {/* Upload Dropzone */}
              <div className="pt-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleThumbnailUpload}
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  id="thumbnail-upload-input"
                />
                <label
                  htmlFor="thumbnail-upload-input"
                  className={cn(
                    'flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors bg-secondary/30 text-center space-y-2',
                    isUploadingThumbnail && 'opacity-60 pointer-events-none',
                  )}
                >
                  {isUploadingThumbnail ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-6 w-6 text-primary animate-spin" />
                      <span className="text-xs font-semibold text-muted-foreground">
                        جارٍ رفع الصورة...
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <UploadCloud className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-foreground block">
                          اضغط لرفع صورة مصغرة مخصصة
                        </span>
                        <span className="text-[11px] text-muted-foreground block">
                          PNG, JPG, WEBP بحد أقصى 5 ميجابايت
                        </span>
                      </div>
                    </>
                  )}
                </label>
                {uploadError && (
                  <p className="text-[11px] text-destructive font-medium mt-2">{uploadError}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Controls & Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-20">
          {/* Card: Publishing Actions */}
          <Card className="border border-border bg-card shadow-card">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>حالة النشر والحفظ</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">حالة الفيديو</label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value={ContentStatus.DRAFT}>مسودة (Draft) - غير معروض للزوار</option>
                      <option value={ContentStatus.PUBLISHED}>
                        منشور (Published) - متاح للعامة
                      </option>
                    </select>
                  )}
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 text-xs font-bold gap-2 shadow-card"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>جاري الحفظ...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>{mode === 'create' ? 'إضافة الفيديو للمنصة' : 'حفظ التعديلات'}</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Live Preview Card */}
          <VideoPreview
            platform={watchedPlatform}
            url={watchedUrl}
            title={watchedTitle}
            thumbnail={watchedThumbnail}
            description={watchedDescription}
          />
        </div>
      </div>
    </form>
  );
}
