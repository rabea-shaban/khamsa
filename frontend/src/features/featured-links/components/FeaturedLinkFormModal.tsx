'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Upload,
  Loader2,
  Image as ImageIcon,
  ExternalLink,
  X,
  Check,
  Tag,
  FileText,
  MousePointerClick,
} from 'lucide-react';
import {
  featuredLinkFormSchema,
  FeaturedLinkFormValues,
} from '../schemas/featured-link.schema';
import { FeaturedLink } from '@/types/api';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { mediaApi } from '@/lib/api/media.api';

interface FeaturedLinkFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FeaturedLinkFormValues) => Promise<void>;
  initialData?: FeaturedLink | null;
  isLoading: boolean;
  serverError?: string | null;
}

export function FeaturedLinkFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
  serverError,
}: FeaturedLinkFormModalProps) {
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
  const [urlInputVal, setUrlInputVal] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FeaturedLinkFormValues>({
    resolver: zodResolver(featuredLinkFormSchema),
    defaultValues: {
      title: '',
      image: '',
      url: '',
      badge: '',
      description: '',
      ctaText: '',
      order: 0,
      isActive: true,
    },
  });

  const isActiveValue = watch('isActive');
  const watchedImage = watch('image');

  // Sync initialData on open / change
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          title: initialData.title,
          image: initialData.image,
          url: initialData.url,
          badge: initialData.badge || '',
          description: initialData.description || '',
          ctaText: initialData.ctaText || '',
          order: initialData.order ?? 0,
          isActive: initialData.isActive ?? true,
        });
        setImagePreview(initialData.image);
        setUrlInputVal(initialData.image || '');
      } else {
        reset({
          title: '',
          image: '',
          url: '',
          badge: '',
          description: '',
          ctaText: '',
          order: 0,
          isActive: true,
        });
        setImagePreview(null);
        setUrlInputVal('');
      }
      setUploadError(null);
    }
  }, [isOpen, initialData, reset]);

  // Handle Real Image File Upload
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('حجم الصورة يجب ألا يتجاوز 5 ميجابايت');
      return;
    }

    try {
      setIsUploadingImage(true);
      setUploadError(null);

      const localUrl = URL.createObjectURL(file);
      setImagePreview(localUrl);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'featured-links');

      const uploadRes = await mediaApi.uploadFile(formData);
      const publicUrl = uploadRes.data?.url;

      if (publicUrl) {
        setValue('image', publicUrl, { shouldValidate: true });
        setImagePreview(publicUrl);
        setUrlInputVal(publicUrl);
      } else {
        throw new Error('لم يتم استلام رابط الصورة من السيرفر');
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'فشل رفع الصورة، يرجى المحاولة مرة أخرى';
      setUploadError(msg);
      if (initialData?.image) {
        setImagePreview(initialData.image);
        setValue('image', initialData.image);
        setUrlInputVal(initialData.image);
      } else {
        setImagePreview(null);
        setValue('image', '');
        setUrlInputVal('');
      }
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUrlInputChange = (val: string) => {
    setUrlInputVal(val);
    setValue('image', val.trim(), { shouldValidate: true });
    if (val.trim()) {
      setImagePreview(val.trim());
    } else {
      setImagePreview(null);
    }
  };

  const handleFormSubmit = async (data: FeaturedLinkFormValues) => {
    await onSubmit(data);
  };

  const handleModalClose = () => {
    if (!isLoading) {
      reset();
      setImagePreview(null);
      setUrlInputVal('');
      setUploadError(null);
      onClose();
    }
  };

  const isEditing = !!initialData;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title={isEditing ? 'تعديل الرابط المميز' : 'إضافة رابط مميز جديد'}
      description="أدخل تفاصيل الرابط الترويجي أو الإعلان ليظهر في أعلى صفحة /links"
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-2 text-right">
        {serverError && (
          <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/30 text-xs font-semibold text-destructive">
            {serverError}
          </div>
        )}

        {/* 1. Title Input */}
        <div className="space-y-1.5">
          <label htmlFor="title" className="block text-xs font-bold text-foreground">
            اسم الرابط / الإعلان <span className="text-destructive">*</span>
          </label>
          <Input
            id="title"
            placeholder="مثال: منحة تدريبية مجانية في تطوير الويب"
            {...register('title')}
            error={errors.title?.message}
            className="text-xs"
            dir="rtl"
          />
        </div>

        {/* 2. Badge & Description Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="badge" className="block text-xs font-bold text-foreground flex items-center gap-1">
              <Tag className="h-3 w-3 text-amber-500" />
              <span>شارة الرابط (Badge)</span>
            </label>
            <Input
              id="badge"
              placeholder="مثال: منحة / كورس / سلسلة تعليمية"
              {...register('badge')}
              className="text-xs"
              dir="rtl"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="ctaText" className="block text-xs font-bold text-foreground flex items-center gap-1">
              <MousePointerClick className="h-3 w-3 text-amber-500" />
              <span>نص زر الدعوة (CTA)</span>
            </label>
            <Input
              id="ctaText"
              placeholder="مثال: اعرف التفاصيل / شاهد الآن"
              {...register('ctaText')}
              className="text-xs"
              dir="rtl"
            />
          </div>
        </div>

        {/* Short Description */}
        <div className="space-y-1.5">
          <label htmlFor="description" className="block text-xs font-bold text-foreground flex items-center gap-1">
            <FileText className="h-3 w-3 text-muted-foreground" />
            <span>وصف فرعي قصير (اختياري)</span>
          </label>
          <Input
            id="description"
            placeholder="مثال: في تطوير الويب / ابدأ من الصفر خطوة بخطوة"
            {...register('description')}
            className="text-xs"
            dir="rtl"
          />
        </div>

        {/* 3. Image Selection: Upload OR Direct URL */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-foreground">
              صورة الرابط / Thumbnail <span className="text-destructive">*</span>
            </label>

            {/* Mode Switcher Tabs */}
            <div className="inline-flex p-0.5 rounded-lg bg-surface border border-border text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setImageMode('upload')}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                  imageMode === 'upload'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Upload className="h-3 w-3" />
                <span>رفع ملف</span>
              </button>
              <button
                type="button"
                onClick={() => setImageMode('url')}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                  imageMode === 'url'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <ExternalLink className="h-3 w-3" />
                <span>رابط مباشر (URL)</span>
              </button>
            </div>
          </div>

          {/* Upload Mode */}
          {imageMode === 'upload' && (
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageFileChange}
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative group w-full h-36 rounded-2xl overflow-hidden border border-border bg-surface flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => {
                      // fallback if broken
                    }}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingImage || isLoading}
                      className="bg-card text-xs font-bold"
                    >
                      <Upload className="h-3.5 w-3.5 ml-1.5" />
                      <span>تغيير الصورة</span>
                    </Button>
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setUrlInputVal('');
                        setValue('image', '', { shouldValidate: true });
                      }}
                      className="p-1.5 rounded-xl bg-destructive text-white hover:bg-destructive/90 transition-colors"
                      aria-label="حذف الصورة"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {isUploadingImage && (
                    <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-2 text-white">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <span className="text-xs font-bold">جاري رفع الصورة إلى التخزين السحابي...</span>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  onClick={() => !isUploadingImage && !isLoading && fileInputRef.current?.click()}
                  className={`w-full h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors p-4 text-center ${
                    errors.image
                      ? 'border-destructive/60 bg-destructive/5'
                      : 'border-border hover:border-primary/60 hover:bg-surface-hover/60 bg-surface/40'
                  }`}
                >
                  {isUploadingImage ? (
                    <>
                      <Loader2 className="h-7 w-7 animate-spin text-primary" />
                      <span className="text-xs font-bold text-foreground">
                        جاري رفع الصورة...
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                        <ImageIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground block">
                          اضغط لاختيار ورفع صورة من الجهاز
                        </span>
                        <span className="text-[11px] text-muted-foreground block mt-0.5">
                          JPEG, PNG, WebP (بحد أقصى 5 ميجابايت)
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* URL Input Mode */}
          {imageMode === 'url' && (
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="imageUrlInput"
                  value={urlInputVal}
                  onChange={e => handleUrlInputChange(e.target.value)}
                  placeholder="https://example.com/images/banner.jpg"
                  className="text-xs font-mono pl-9"
                  dir="ltr"
                />
                <ImageIcon className="h-4 w-4 text-muted-foreground absolute left-3 top-3 pointer-events-none" />
              </div>

              {imagePreview && (
                <div className="relative group w-full h-36 rounded-2xl overflow-hidden border border-border bg-surface flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={e => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setUrlInputVal('');
                        setValue('image', '', { shouldValidate: true });
                      }}
                      className="p-1.5 rounded-xl bg-destructive text-white hover:bg-destructive/90 transition-colors shadow-md"
                      aria-label="مسح الرابط"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {errors.image && (
            <p className="text-[11px] text-destructive font-medium mt-1">
              {errors.image.message}
            </p>
          )}

          {uploadError && (
            <p className="text-[11px] text-destructive font-medium mt-1">
              {uploadError}
            </p>
          )}
        </div>

        {/* 4. URL Input */}
        <div className="space-y-1.5">
          <label htmlFor="url" className="block text-xs font-bold text-foreground">
            الرابط الموجه إليه <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Input
              id="url"
              placeholder="https://example.com/apply"
              {...register('url')}
              error={errors.url?.message}
              className="text-xs font-mono pl-9"
              dir="ltr"
            />
            <ExternalLink className="h-4 w-4 text-muted-foreground absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* 5. Order and Active Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <label htmlFor="order" className="block text-xs font-bold text-foreground">
              ترتيب الظهور (Order)
            </label>
            <Input
              id="order"
              type="number"
              placeholder="0"
              {...register('order')}
              error={errors.order?.message}
              className="text-xs font-mono"
              dir="ltr"
            />
          </div>

          <div className="space-y-1.5">
            <span className="block text-xs font-bold text-foreground">
              حالة الرابط
            </span>
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-surface">
              <span className="text-xs font-semibold text-foreground">
                {isActiveValue ? 'مفعّل (ظاهر)' : 'معطّل (مخفي)'}
              </span>
              <Switch
                checked={isActiveValue}
                onCheckedChange={checked => setValue('isActive', checked)}
              />
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleModalClose}
            disabled={isLoading || isUploadingImage}
            className="text-xs"
          >
            إلغاء
          </Button>

          <Button
            type="submit"
            size="sm"
            disabled={isLoading || isUploadingImage}
            className="gap-2 text-xs font-bold shadow-card px-5"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>جاري الحفظ...</span>
              </>
            ) : (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>{isEditing ? 'حفظ التعديلات' : 'إضافة الرابط'}</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
