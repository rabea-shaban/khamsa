'use client';

import React, { useState } from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { SettingsFormValues } from '../schemas/settings.schema';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Search, Globe, Key, X, Plus, AlertCircle, Eye } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface SeoSettingsTabProps {
  register: UseFormRegister<SettingsFormValues>;
  errors: FieldErrors<SettingsFormValues>;
  watch: UseFormWatch<SettingsFormValues>;
  setValue: UseFormSetValue<SettingsFormValues>;
}

export function SeoSettingsTab({ register, errors, watch, setValue }: SeoSettingsTabProps) {
  const [keywordInput, setKeywordInput] = useState('');

  const seoTitle = watch('defaultSeo.title') || '';
  const seoDesc = watch('defaultSeo.description') || '';
  const canonicalUrl = watch('defaultSeo.canonicalUrl') || '';
  const keywords = watch('defaultSeo.keywords') || [];
  const siteName = watch('siteName') || 'خمسة برمجة بالبلدي';

  const titleLength = seoTitle.length;
  const descLength = seoDesc.length;

  const handleAddKeyword = () => {
    const trimmed = keywordInput.trim().replace(/^[,،\s]+|[,،\s]+$/g, '');
    if (trimmed && !keywords.includes(trimmed)) {
      setValue('defaultSeo.keywords', [...keywords, trimmed], { shouldDirty: true });
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setValue(
      'defaultSeo.keywords',
      keywords.filter(k => k !== keywordToRemove),
      { shouldDirty: true },
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Google Search Live SERP Preview */}
      <Card className="border border-border bg-card shadow-card">
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-bold">معاينة نتيجة محرك البحث (Google SERP Preview)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="p-4 rounded-xl bg-secondary/60 border border-border space-y-1.5 font-sans text-right" dir="rtl">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-bold text-foreground">{siteName}</span>
              <span>•</span>
              <span className="font-mono text-[11px] text-muted-foreground" dir="ltr">
                {canonicalUrl || 'https://khamsa.dev'}
              </span>
            </div>
            <h3 className="text-base font-bold text-blue-400 hover:underline cursor-pointer line-clamp-1">
              {seoTitle || `${siteName} - تعلم البرمجة بالبلدي`}
            </h3>
            <p className="text-xs text-foreground-secondary line-clamp-2 leading-relaxed">
              {seoDesc || 'منصة عربية لتبسيط علوم البرمجة وهندسة البرمجيات من خلال المقالات والفيديوهات والشروحات العملية.'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2. SEO Title & Description */}
      <Card className="border border-border bg-card shadow-card">
        <CardHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-primary" />
            <CardTitle className="text-base font-bold">عناوين وبيانات الميتا (Meta Tags)</CardTitle>
          </div>
          <CardDescription className="text-xs">
            العنوان والوصف الافتراضي الذي تقرأه محركات البحث وعناكب الفهرسة (Googlebot)
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5 space-y-5">
          {/* SEO Title */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground">عنوان الميتا الافتراضي (SEO Title)</label>
              <span
                className={cn(
                  'text-[11px] font-mono',
                  titleLength > 60 ? 'text-amber-400 font-bold' : 'text-muted-foreground',
                )}
              >
                {titleLength} / 60 حرف (المثالي)
              </span>
            </div>
            <Input
              {...register('defaultSeo.title')}
              placeholder="خمسة برمجة بالبلدي - تعلم البرمجة ببساطة"
              className={cn(
                'h-11 text-xs font-semibold',
                errors.defaultSeo?.title && 'border-destructive focus-visible:ring-destructive',
              )}
            />
            {titleLength > 60 && (
              <p className="text-[11px] text-amber-400 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                العنوان أطول من 60 حرفاً وقد يتم اقتصاصه في نتائج بحث جوجل.
              </p>
            )}
          </div>

          {/* SEO Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground">وصف الميتا الافتراضي (Meta Description)</label>
              <span
                className={cn(
                  'text-[11px] font-mono',
                  descLength > 160 ? 'text-amber-400 font-bold' : 'text-muted-foreground',
                )}
              >
                {descLength} / 160 حرف (المثالي)
              </span>
            </div>
            <Textarea
              {...register('defaultSeo.description')}
              rows={3}
              placeholder="مقالات وفيديوهات تعليمية لتبسيط علوم الحاسب والبرمجة باللغة العربية بأسلوب عملي..."
              className={cn(
                'text-xs leading-relaxed resize-none',
                errors.defaultSeo?.description && 'border-destructive focus-visible:ring-destructive',
              )}
            />
            {descLength > 160 && (
              <p className="text-[11px] text-amber-400 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                الوصف أطول من 160 حرفاً وقد يظهر مقطوعاً في محركات البحث.
              </p>
            )}
          </div>

          {/* Canonical URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-primary" />
              <span>الرابط الأساسي المعتمد (Canonical URL)</span>
            </label>
            <Input
              {...register('defaultSeo.canonicalUrl')}
              placeholder="https://khamsa.dev"
              dir="ltr"
              className="h-10 text-xs font-mono text-left"
            />
          </div>

          {/* Keywords Manager */}
          <div className="space-y-2 pt-2 border-t border-border">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Key className="h-3.5 w-3.5 text-primary" />
              <span>الكلمات المفتاحية العامة (General Keywords)</span>
            </label>

            <div className="flex gap-2">
              <Input
                value={keywordInput}
                onChange={e => setKeywordInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    handleAddKeyword();
                  }
                }}
                placeholder="اكتب كلمة مفتاحية واضغط Enter..."
                className="h-10 text-xs flex-1"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleAddKeyword}
                className="gap-1.5 text-xs font-bold px-4 h-10"
              >
                <Plus className="h-3.5 w-3.5" />
                إضافة
              </Button>
            </div>

            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {keywords.map(kw => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary text-foreground text-xs font-medium border border-border"
                  >
                    <span>{kw}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(kw)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
