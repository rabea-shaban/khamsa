'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Save,
  Send,
  UploadCloud,
  X,
  ChevronDown,
  ChevronUp,
  Zap,
  PenTool,
  Bookmark,
  Search,
  Plus,
  Loader2,
  Eye,
  Globe,
  Copy,
  Check,
  Tag as TagIcon,
  Key,
  Layers,
  Share2,
  Clock,
  ExternalLink,
  Image as ImageIcon,
  CheckCircle2,
  FileText,
  Hash,
} from 'lucide-react';
import { Article, ContentStatus } from '@/types/api';
import { articleFormSchema, ArticleFormValues } from '../schemas/article.schema';
import { ArticleEditor } from './ArticleEditor';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { mediaApi } from '@/lib/api/media.api';
import { cn } from '@/lib/utils/cn';

interface ArticleFormProps {
  initialData?: Partial<Article>;
  onSubmit: (data: ArticleFormValues) => Promise<void>;
  isSubmitting?: boolean;
  mode?: 'create' | 'edit';
  onPreview?: (data: ArticleFormValues) => void;
}

const DEFAULT_CATEGORIES = [
  'JavaScript',
  'TypeScript',
  'Node.js',
  'React',
  'Architecture',
  'Databases',
  'DevOps',
  'نصائح عامة',
];

const SUGGESTED_TAGS = [
  'javascript',
  'nodejs',
  'react',
  'typescript',
  'backend',
  'frontend',
  'performance',
  'security',
  'mongodb',
  'clean-code',
];

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\-_]+/g, '-')
    .replace(/[^\u0621-\u064A\u0660-\u0669a-z0-9-]/g, '')
    .replace(/^-+|-+$/g, '');
}

export function ArticleForm({
  initialData,
  onSubmit,
  isSubmitting = false,
  mode = 'create',
  onPreview,
}: ArticleFormProps) {
  const [isSeoOpen, setIsSeoOpen] = useState(true);
  const [seoPreviewTab, setSeoPreviewTab] = useState<'fields' | 'google' | 'social'>('fields');
  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isAutoSlug, setIsAutoSlug] = useState(mode === 'create' && !initialData?.slug);
  const [isCopiedSlug, setIsCopiedSlug] = useState(false);
  const [isDirectUrlOpen, setIsDirectUrlOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      excerpt: initialData?.excerpt || '',
      content: initialData?.content || { type: 'doc', content: [] },
      coverImage: initialData?.coverImage || '',
      category: initialData?.category || DEFAULT_CATEGORIES[0],
      tags: initialData?.tags || [],
      status: initialData?.status || ContentStatus.DRAFT,
      isFeatured: initialData?.isFeatured || false,
      seo: {
        title: initialData?.seo?.title || '',
        description: initialData?.seo?.description || '',
        keywords: initialData?.seo?.keywords || [],
        canonicalUrl: initialData?.seo?.canonicalUrl || '',
        ogTitle: initialData?.seo?.ogTitle || '',
        ogDescription: initialData?.seo?.ogDescription || '',
        ogImage: initialData?.seo?.ogImage || '',
      },
    },
  });

  const titleValue = watch('title') || '';
  const slugValue = watch('slug') || '';
  const excerptValue = watch('excerpt') || '';
  const coverImageValue = watch('coverImage') || '';
  const tagsValue = watch('tags') || [];
  const categoryValue = watch('category') || DEFAULT_CATEGORIES[0];
  const statusValue = watch('status') || ContentStatus.DRAFT;
  const contentValue = watch('content');
  const seoKeywords = watch('seo.keywords') || [];
  const seoTitleValue = watch('seo.title') || '';
  const seoDescValue = watch('seo.description') || '';
  const ogTitleValue = watch('seo.ogTitle') || '';
  const ogDescValue = watch('seo.ogDescription') || '';
  const ogImageValue = watch('seo.ogImage') || '';

  // Calculate estimated reading time
  const readingTime = useMemo(() => {
    let wordCount = 0;
    if (typeof contentValue === 'string') {
      wordCount = contentValue.trim().split(/\s+/).length;
    } else if (typeof contentValue === 'object' && contentValue !== null) {
      const jsonStr = JSON.stringify(contentValue);
      wordCount = jsonStr.split(/\s+/).length / 3;
    }
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return minutes;
  }, [contentValue]);

  // Auto-generate slug when title changes if auto-slug is enabled
  useEffect(() => {
    if (isAutoSlug && titleValue) {
      setValue('slug', generateSlug(titleValue), { shouldValidate: true });
    }
  }, [titleValue, isAutoSlug, setValue]);

  // Handle Cover Image Upload to Cloudflare R2
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingCover(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'articles');

      const res = await mediaApi.uploadFile(formData);
      if (res.data?.url) {
        setValue('coverImage', res.data.url, { shouldValidate: true });
      }
    } catch (err) {
      console.error('Failed to upload cover image:', err);
      alert('حدث خطأ أثناء رفع صورة الغلاف.');
    } finally {
      setIsUploadingCover(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Add Tag
  const handleAddTag = (text?: string) => {
    const target = text || tagInput;
    const trimmed = target.trim().replace(/^[#,#\s]+|[#,#\s]+$/g, '');
    if (trimmed && !tagsValue.includes(trimmed)) {
      setValue('tags', [...tagsValue, trimmed], { shouldValidate: true });
      if (!text) setTagInput('');
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      'tags',
      tagsValue.filter(t => t !== tagToRemove),
      { shouldValidate: true },
    );
  };

  // Add SEO Keyword
  const handleAddKeyword = (text?: string) => {
    const target = text || keywordInput;
    const trimmed = target.trim().replace(/^[,،\s]+|[,،\s]+$/g, '');
    if (trimmed && !seoKeywords.includes(trimmed)) {
      setValue('seo.keywords', [...seoKeywords, trimmed], { shouldValidate: true });
      if (!text) setKeywordInput('');
    }
  };

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === '،') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setValue(
      'seo.keywords',
      seoKeywords.filter(k => k !== keywordToRemove),
      { shouldValidate: true },
    );
  };

  // Copy all tags to SEO keywords
  const handleSyncTagsToKeywords = () => {
    const newKeywords = Array.from(new Set([...seoKeywords, ...tagsValue]));
    setValue('seo.keywords', newKeywords, { shouldValidate: true });
  };

  const copySlugToClipboard = () => {
    const fullUrl = `https://khamsa.dev/articles/${slugValue || generateSlug(titleValue)}`;
    navigator.clipboard.writeText(fullUrl);
    setIsCopiedSlug(true);
    setTimeout(() => setIsCopiedSlug(false), 2000);
  };

  const handleFormSubmit = (targetStatus: ContentStatus) => {
    setValue('status', targetStatus);
    handleSubmit(async data => {
      data.status = targetStatus;
      await onSubmit(data);
    })();
  };

  return (
    <form className="space-y-8" dir="rtl">
      {/* Top Glassmorphism Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:px-6 rounded-2xl bg-card/90 border border-border sticky top-20 z-20 backdrop-blur-xl shadow-2xl transition-all">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-foreground tracking-tight">
                {mode === 'create' ? 'إنشاء مقال جديد' : 'تعديل المقال'}
              </h1>
              <span
                className={cn(
                  'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border',
                  statusValue === ContentStatus.PUBLISHED
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                )}
              >
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    statusValue === ContentStatus.PUBLISHED ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400',
                  )}
                />
                {statusValue === ContentStatus.PUBLISHED ? 'منشور' : 'مسودة'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {titleValue || 'مقال بدون عنوان بعد'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {onPreview && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onPreview(watch())}
              className="gap-2 text-xs font-semibold"
            >
              <Eye className="h-3.5 w-3.5 text-primary" />
              معاينة حية
            </Button>
          )}

          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={isSubmitting}
            onClick={() => handleFormSubmit(ContentStatus.DRAFT)}
            className="gap-2 text-xs font-semibold"
          >
            <Save className="h-3.5 w-3.5 text-muted-foreground" />
            حفظ كمسودة
          </Button>

          <Button
            type="button"
            size="sm"
            disabled={isSubmitting}
            onClick={() => handleFormSubmit(ContentStatus.PUBLISHED)}
            className="gap-2 text-xs font-bold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                جارٍ الحفظ...
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                {mode === 'create' ? 'نشر المقال الآن' : 'تحديث ونشر المقال'}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Article Title & Metadata Card */}
          <Card>
            <CardContent className="pt-6 space-y-5">
              {/* Title */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <span>عنوان المقال الرئيسي</span>
                    <span className="text-destructive">*</span>
                  </label>
                  <span
                    className={cn(
                      'text-[11px] font-mono',
                      titleValue.length > 200 ? 'text-destructive font-bold' : 'text-muted-foreground',
                    )}
                  >
                    {titleValue.length} / 200
                  </span>
                </div>
                <Input
                  placeholder="مثال: كيف يعمل الـ Event Loop في Node.js بالبلدي؟"
                  className="text-base sm:text-lg font-bold h-12"
                  error={errors.title?.message}
                  {...register('title')}
                />
              </div>

              {/* Slug Preview & Management */}
              <div className="p-3.5 rounded-xl bg-secondary/60 border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <Globe className="h-3.5 w-3.5 text-primary" />
                    <span>رابط المقال المباشر (URL Slug):</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAutoSlug(!isAutoSlug)}
                      className={cn(
                        'text-[11px] px-2 py-0.5 rounded-md font-mono transition-colors border inline-flex items-center gap-1',
                        isAutoSlug
                          ? 'bg-primary/10 text-primary border-primary/30'
                          : 'bg-card text-muted-foreground border-border hover:text-foreground',
                      )}
                    >
                      {isAutoSlug ? (
                        <>
                          <Zap className="h-3 w-3" />
                          <span>توليد تلقائي فعال</span>
                        </>
                      ) : (
                        <>
                          <PenTool className="h-3 w-3" />
                          <span>تعديل يدوي</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={copySlugToClipboard}
                      className="text-[11px] inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                      title="نسخ الرابط"
                    >
                      {isCopiedSlug ? (
                        <>
                          <Check className="h-3 w-3 text-primary" />
                          <span className="text-primary">تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>نسخ</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center rounded-lg bg-background border border-input px-3 py-1.5 text-xs font-mono" dir="ltr">
                  <span className="text-muted-foreground select-none">https://khamsa.dev/articles/</span>
                  <input
                    type="text"
                    disabled={isAutoSlug}
                    placeholder="how-event-loop-works"
                    className="flex-1 bg-transparent border-none text-primary focus:outline-none px-1 text-xs disabled:opacity-80"
                    {...register('slug')}
                  />
                </div>
                {errors.slug?.message && (
                  <p className="text-xs text-destructive">{errors.slug.message}</p>
                )}
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <span>موجز المقال (Excerpt)</span>
                    <span className="text-destructive">*</span>
                  </label>
                  <span
                    className={cn(
                      'text-[11px] font-mono',
                      excerptValue.length > 500
                        ? 'text-destructive font-bold'
                        : excerptValue.length >= 10
                          ? 'text-primary'
                          : 'text-amber-500',
                    )}
                  >
                    {excerptValue.length} / 500 حرف (الحد الأدنى 10)
                  </span>
                </div>
                <Textarea
                  placeholder="موجز شيق يلخص الفكرة الأساسية للمقال ويظهر في كارت المقال ومحركات البحث..."
                  rows={3}
                  error={errors.excerpt?.message}
                  {...register('excerpt')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tiptap Rich Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <label className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-primary" />
                  محتوى المقال والدروس
                </label>
                <span className="text-destructive text-xs">*</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 font-mono">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  {readingTime} دقيقة قراءة تقريباً
                </span>
                <span className="text-muted-foreground/60">•</span>
                <span className="text-[11px] text-primary/80 font-mono bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                  Tiptap JSON
                </span>
              </div>
            </div>

            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <ArticleEditor
                  content={field.value}
                  onChange={field.onChange}
                  error={errors.content?.message as string}
                />
              )}
            />
          </div>

          {/* SEO & Search Engine / Social Sharing Center */}
          <Card className="border-slate-800 bg-[#0d1424]/80 backdrop-blur-md shadow-xl overflow-hidden">
            <CardHeader
              className="cursor-pointer select-none pb-4 border-b border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/60 transition-colors"
              onClick={() => setIsSeoOpen(!isSeoOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                    <Search className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                      <span>إعدادات السيو والكلمات المفتاحية والمشاركة الاجتماعية</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        SEO Studio
                      </span>
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-400 mt-0.5">
                      تخصيص الكلمات المفتاحية وعنوان ووصف المقال للظهور في جوجل ومواقع التواصل الاجتماعي
                    </CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button type="button" className="p-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white">
                    {isSeoOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </CardHeader>

            {isSeoOpen && (
              <CardContent className="p-5 space-y-6">
                {/* SEO Sub-Tabs */}
                <div className="flex items-center gap-2 p-1 bg-secondary rounded-xl border border-border w-fit">
                  <button
                    type="button"
                    onClick={() => setSeoPreviewTab('fields')}
                    className={cn(
                      'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all',
                      seoPreviewTab === 'fields'
                        ? 'bg-primary text-primary-foreground shadow-md font-bold'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    تخصيص البيانات
                  </button>
                  <button
                    type="button"
                    onClick={() => setSeoPreviewTab('google')}
                    className={cn(
                      'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
                      seoPreviewTab === 'google'
                        ? 'bg-primary text-primary-foreground shadow-md font-bold'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <Globe className="h-3 w-3" />
                    معاينة جوجل (SERP)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSeoPreviewTab('social')}
                    className={cn(
                      'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
                      seoPreviewTab === 'social'
                        ? 'bg-primary text-primary-foreground shadow-md font-bold'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <Share2 className="h-3 w-3" />
                    معاينة السوشيال
                  </button>
                </div>

                {seoPreviewTab === 'fields' && (
                  <div className="space-y-5">
                    {/* SEO Title */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-foreground">
                          عنوان الـ SEO (Meta Title)
                        </label>
                        <span
                          className={cn(
                            'text-[11px] font-mono',
                            seoTitleValue.length > 100
                              ? 'text-destructive font-bold'
                              : seoTitleValue.length >= 40 && seoTitleValue.length <= 65
                                ? 'text-primary'
                                : 'text-muted-foreground',
                          )}
                        >
                          {seoTitleValue.length} / 100 (المثالي 50-60)
                        </span>
                      </div>
                      <Input
                        placeholder={titleValue || 'عنوان مخصص للظهور في محركات البحث...'}
                        error={errors.seo?.title?.message}
                        {...register('seo.title')}
                      />
                    </div>

                    {/* SEO Description */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-foreground">
                          وصف الـ SEO (Meta Description)
                        </label>
                        <span
                          className={cn(
                            'text-[11px] font-mono',
                            seoDescValue.length > 250
                              ? 'text-destructive font-bold'
                              : seoDescValue.length >= 120 && seoDescValue.length <= 160
                                ? 'text-primary'
                                : 'text-muted-foreground',
                          )}
                        >
                          {seoDescValue.length} / 250 (المثالي 140-160)
                        </span>
                      </div>
                      <Textarea
                        placeholder={excerptValue || 'وصف جذاب ومختصر يظهر تحت عنوان المقال في نتائج البحث...'}
                        rows={2}
                        error={errors.seo?.description?.message}
                        {...register('seo.description')}
                      />
                    </div>

                    {/* SEO Keywords Chip Manager */}
                    <div className="space-y-2.5 p-4 rounded-xl bg-secondary/50 border border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4 text-primary" />
                          <label className="text-xs font-bold text-foreground">
                            الكلمات المفتاحية لمحركات البحث (SEO Keywords & Keyphrases)
                          </label>
                        </div>
                        {tagsValue.length > 0 && (
                          <button
                            type="button"
                            onClick={handleSyncTagsToKeywords}
                            className="text-[11px] text-primary hover:underline flex items-center gap-1 font-semibold"
                          >
                            <Copy className="h-3 w-3" />
                            نسخ وسوم المقال ككلمات مفتاحية
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        أضف الكلمات والعبارات المفتاحية التي يبحث بها المطورون في جوجل (اكتب واضغط Enter أو فاصلة):
                      </p>

                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            placeholder="مثال: event loop nodejs, asynchronous javascript, شرح جافاسكريبت..."
                            value={keywordInput}
                            onChange={e => setKeywordInput(e.target.value)}
                            onKeyDown={handleKeywordKeyDown}
                            className="w-full px-3.5 py-2 text-xs rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 text-right"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => handleAddKeyword()}
                          className="px-4 text-xs font-bold"
                        >
                          <Plus className="h-3.5 w-3.5 ml-1 text-primary" />
                          إضافة
                        </Button>
                      </div>

                      {/* Keywords Chips */}
                      {seoKeywords.length > 0 ? (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {seoKeywords.map((kw, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary/10 border border-primary/25 text-primary text-xs font-medium group hover:border-primary/40 transition-colors"
                            >
                              <Key className="h-3 w-3 text-primary/70" />
                              <span>{kw}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveKeyword(kw)}
                                className="p-0.5 rounded text-primary/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
                                title="حذف الكلمة المفتاحية"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="text-[11px] text-muted-foreground italic pt-1">
                          لم يتم إضافة أي كلمات مفتاحية بعد. يُنصح بإضافة 3-6 كلمات مستهدفة.
                        </div>
                      )}
                    </div>

                    {/* Canonical URL & OG Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-300">
                          عنوان OpenGraph مخصص (og:title)
                        </label>
                        <Input
                          placeholder="عنوان جذاب لمواقع التواصل الاجتماعي..."
                          className="bg-slate-900/80 border-slate-700/80 text-xs"
                          error={errors.seo?.ogTitle?.message}
                          {...register('seo.ogTitle')}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-300">
                          رابط صورة المشاركة الاجتماعية (og:image)
                        </label>
                        <Input
                          placeholder={coverImageValue || 'https://...'}
                          dir="ltr"
                          className="bg-slate-900/80 border-slate-700/80 text-xs font-mono"
                          error={errors.seo?.ogImage?.message}
                          {...register('seo.ogImage')}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Google SERP Live Simulation */}
                {seoPreviewTab === 'google' && (
                  <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-2">
                    <div className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5 pb-2 border-b border-border">
                      <Globe className="h-3.5 w-3.5 text-primary" />
                      <span>كيف سيظهر المقال في نتائج بحث Google:</span>
                    </div>

                    <div className="space-y-1 pt-1 font-sans text-right" dir="rtl">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="h-4 w-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">
                          ٥
                        </div>
                        <span className="text-foreground font-semibold">خمسة برمجة بالبلدي</span>
                        <span className="text-muted-foreground font-mono text-[11px]" dir="ltr">
                          https://khamsa.dev &rsaquo; articles &rsaquo; {slugValue || 'how-event-loop-works'}
                        </span>
                      </div>

                      <h3 className="text-base font-medium text-primary hover:underline cursor-pointer leading-snug">
                        {seoTitleValue || titleValue || 'عنوان المقال كما يظهر في محركات البحث'}
                      </h3>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {seoDescValue || excerptValue || 'وصف المقال التوضيحي الذي سيظهر للمستخدمين عند البحث في جوجل ومحركات البحث المختلفة.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Social Card Live Simulation */}
                {seoPreviewTab === 'social' && (
                  <div className="max-w-md mx-auto rounded-2xl overflow-hidden bg-card border border-border shadow-xl">
                    <div className="relative aspect-video bg-secondary flex items-center justify-center overflow-hidden">
                      {ogImageValue || coverImageValue ? (
                        <img
                          src={ogImageValue || coverImageValue}
                          alt="Social preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-6 text-muted-foreground">
                          <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <span className="text-xs">لا توجد صورة غلاف للمشاركة</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-1 bg-card/90 text-right">
                      <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block" dir="ltr">
                        KHAMSA.DEV
                      </span>
                      <h4 className="text-sm font-bold text-foreground line-clamp-1">
                        {ogTitleValue || seoTitleValue || titleValue || 'عنوان المقال على فيسبوك وتويتر'}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {ogDescValue || seoDescValue || excerptValue || 'وصف شيق لمشاركة المقال وجذب القراء.'}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </div>

        {/* Sidebar Settings Column (1 col) */}
        <div className="space-y-6">
          {/* Cover Image Upload Card */}
          <Card>
            <CardHeader className="pb-3 border-b border-border">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-primary" />
                  صورة الغلاف (Cover Image)
                </CardTitle>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  سحابي
                </span>
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                تُرفع الصور تلقائياً وبسرعة إلى مساحة التخزين السحابية
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 space-y-4">
              {coverImageValue ? (
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden border border-border group bg-background aspect-video shadow-inner">
                    <img
                      src={coverImageValue}
                      alt="غلاف المقال"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs">
                      <label
                        htmlFor="article-cover-file-change"
                        className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold cursor-pointer transition-colors"
                      >
                        تغيير الصورة
                      </label>
                      <button
                        type="button"
                        onClick={() => setValue('coverImage', '', { shouldValidate: true })}
                        className="p-1.5 rounded-lg bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-semibold transition-colors"
                        title="حذف الصورة"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={handleCoverUpload}
                    className="hidden"
                    id="article-cover-file-change"
                    disabled={isUploadingCover}
                  />

                  {/* Public URL view */}
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-secondary border border-border text-[11px] font-mono text-muted-foreground" dir="ltr">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="truncate flex-1">{coverImageValue}</span>
                    <a
                      href={coverImageValue}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:text-foreground"
                      title="فتح الصورة"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={handleCoverUpload}
                    className="hidden"
                    id="article-cover-file"
                    disabled={isUploadingCover}
                  />
                  <label
                    htmlFor="article-cover-file"
                    className={cn(
                      'flex flex-col items-center justify-center gap-2.5 p-7 rounded-2xl border-2 border-dashed border-border bg-card/50 text-center cursor-pointer hover:border-primary/60 hover:bg-card transition-all group',
                      isUploadingCover && 'pointer-events-none opacity-60',
                    )}
                  >
                    {isUploadingCover ? (
                      <>
                        <Loader2 className="h-7 w-7 animate-spin text-primary" />
                        <span className="text-xs font-bold text-primary">جارٍ رفع الصورة...</span>
                      </>
                    ) : (
                      <>
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform border border-primary/20">
                          <UploadCloud className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-foreground block group-hover:text-primary transition-colors">
                            اسحب الصورة هنا أو اضغط للاختيار
                          </span>
                          <span className="text-[11px] text-muted-foreground block">
                            PNG, JPG, WEBP, AVIF (حتى 10MB)
                          </span>
                        </div>
                      </>
                    )}
                  </label>
                </div>
              )}

              {/* Toggle Direct Image URL input */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsDirectUrlOpen(!isDirectUrlOpen)}
                  className="text-[11px] text-muted-foreground hover:text-primary flex items-center gap-1 font-mono transition-colors"
                >
                  <span>{isDirectUrlOpen ? '▲ إخفاء رابط الصورة' : '▼ أو أدخل رابط الصورة يدوياً'}</span>
                </button>

                {isDirectUrlOpen && (
                  <div className="pt-2">
                    <Input
                      placeholder="https://example.com/image.jpg"
                      dir="ltr"
                      error={errors.coverImage?.message}
                      className="text-xs font-mono"
                      {...register('coverImage')}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Category & Tags Card */}
          <Card>
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                التصنيف والوسوم (Taxonomy)
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-5">
              {/* Category */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground">
                    تصنيف المقال *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomCategory(!isCustomCategory)}
                    className="text-[11px] text-primary hover:underline font-semibold transition-colors"
                  >
                    {isCustomCategory ? 'اختر من القائمة' : '+ تصنيف مخصص'}
                  </button>
                </div>

                {isCustomCategory ? (
                  <Input
                    placeholder="اكتب اسم التصنيف الجديد..."
                    error={errors.category?.message}
                    {...register('category')}
                  />
                ) : (
                  <div className="space-y-2">
                    <select
                      value={categoryValue}
                      onChange={e => setValue('category', e.target.value, { shouldValidate: true })}
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs font-semibold text-foreground shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 text-right cursor-pointer"
                    >
                      {DEFAULT_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>

                    {/* Quick Category Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {DEFAULT_CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setValue('category', cat, { shouldValidate: true })}
                          className={cn(
                            'px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all',
                            categoryValue === cat
                              ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                              : 'bg-secondary text-muted-foreground hover:text-foreground',
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {errors.category?.message && (
                  <p className="text-xs text-destructive">{errors.category.message}</p>
                )}
              </div>

              {/* Tags Section */}
              <div className="space-y-2.5 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <TagIcon className="h-3.5 w-3.5 text-primary" />
                    <span>الوسوم البرمجية (Tags)</span>
                  </label>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {tagsValue.length} وسم
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="اكتب الوسم واضغط Enter..."
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 text-right"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddTag()}
                    className="px-3"
                  >
                    <Plus className="h-4 w-4 text-primary" />
                  </Button>
                </div>

                {/* Suggested Tags */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] text-muted-foreground">مقترحات:</span>
                  {SUGGESTED_TAGS.filter(st => !tagsValue.includes(st)).slice(0, 5).map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleAddTag(st)}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
                    >
                      +{st}
                    </button>
                  ))}
                </div>

                {/* Tag chips */}
                {tagsValue.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tagsValue.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary border border-border text-xs text-foreground font-medium group hover:border-primary/40"
                      >
                        <Hash className="h-3 w-3 text-primary/70" />
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          title="حذف الوسم"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Featured Switch Card */}
              <div className="pt-3 border-t border-border flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border">
                <div className="space-y-0.5">
                  <label htmlFor="isFeatured" className="text-xs font-bold text-foreground cursor-pointer flex items-center gap-1.5">
                    <Bookmark className="h-3.5 w-3.5 text-primary" />
                    مقال مميز (Featured)
                  </label>
                  <p className="text-[11px] text-muted-foreground">
                    تثبيت المقال في القسم المميز بأعلى الصفحة الرئيسية
                  </p>
                </div>
                <input
                  id="isFeatured"
                  type="checkbox"
                  className="h-5 w-5 rounded-md border-border bg-background text-primary focus:ring-primary cursor-pointer accent-primary"
                  {...register('isFeatured')}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
