'use client';

import React, { useState, useRef } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { SettingsFormValues } from '../schemas/settings.schema';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Image as ImageIcon, UploadCloud, Trash2, Loader2 } from 'lucide-react';
import { mediaApi } from '@/lib/api/media.api';

interface BrandAssetsTabProps {
  watch: UseFormWatch<SettingsFormValues>;
  setValue: UseFormSetValue<SettingsFormValues>;
}

export function BrandAssetsTab({ watch, setValue }: BrandAssetsTabProps) {
  const logoValue = watch('logo') || '';
  const faviconValue = watch('favicon') || '';
  const ogImageValue = watch('defaultSeo.ogImage') || '';

  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  const ogImageInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'logo' | 'favicon' | 'defaultSeo.ogImage',
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('حجم الصورة يجب ألا يتجاوز 5 ميجابايت');
      return;
    }

    try {
      setUploadingField(field);
      setUploadError(null);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'settings');

      const res = await mediaApi.uploadFile(formData);
      if (res.data?.url) {
        setValue(field, res.data.url, { shouldDirty: true, shouldValidate: true });
      }
    } catch {
      setUploadError('حدث خطأ أثناء رفع الصورة');
    } finally {
      setUploadingField(null);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {uploadError && (
        <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive font-semibold">
          {uploadError}
        </div>
      )}

      {/* 1. Official Logo */}
      <Card className="border border-border bg-card shadow-card">
        <CardHeader className="pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-primary" />
              <CardTitle className="text-base font-bold">شعار المنصة الرسمي (Platform Logo)</CardTitle>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-mono font-bold">
              Header & Brand
            </span>
          </div>
          <CardDescription className="text-xs">
            يظهر في الترويسة الرئيسية والفوتر وعلى جميع صفحات المنصة
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Logo Preview */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-secondary/50 border border-border text-center space-y-2 min-h-[140px]">
              {logoValue ? (
                <div className="relative group p-2 rounded-xl bg-background border border-border">
                  <img
                    src={logoValue}
                    alt="Logo Preview"
                    className="max-h-20 max-w-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setValue('logo', '', { shouldDirty: true })}
                    className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    title="حذف الشعار"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] text-muted-foreground font-semibold">
                    لا يوجد شعار مخصص (يستخدم الشعار النصي)
                  </span>
                </div>
              )}
            </div>

            {/* Logo Controls */}
            <div className="md:col-span-8 space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">رابط الشعار المباشر (URL)</label>
                <Input
                  value={logoValue}
                  onChange={e => setValue('logo', e.target.value, { shouldDirty: true })}
                  placeholder="https://... أو اضغط لرفع صورة"
                  dir="ltr"
                  className="font-mono text-xs h-10 text-left"
                />
              </div>

              <div>
                <input
                  type="file"
                  ref={logoInputRef}
                  onChange={e => handleUpload(e, 'logo')}
                  accept="image/png,image/svg+xml,image/webp,image/jpeg"
                  className="hidden"
                  id="logo-upload-input"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={uploadingField === 'logo'}
                  onClick={() => logoInputRef.current?.click()}
                  className="gap-2 text-xs font-bold bg-card"
                >
                  {uploadingField === 'logo' ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>جارٍ الرفع...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-3.5 w-3.5 text-primary" />
                      <span>رفع شعار جديد (PNG, SVG, WEBP)</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Favicon & OG Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Favicon */}
        <Card className="border border-border bg-card shadow-card">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-sm font-bold">أيقونة الموقع (Favicon)</CardTitle>
            <CardDescription className="text-xs">تظهر في تبويب المتصفح والمفضلة (32x32 أو 64x64)</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center border border-border shrink-0">
                {faviconValue ? (
                  <img src={faviconValue} alt="Favicon" className="h-6 w-6 object-contain" />
                ) : (
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <Input
                value={faviconValue}
                onChange={e => setValue('favicon', e.target.value, { shouldDirty: true })}
                placeholder="رابط الأيقونة (Favicon URL)"
                dir="ltr"
                className="font-mono text-xs h-9 text-left flex-1"
              />
            </div>
            <input
              type="file"
              ref={faviconInputRef}
              onChange={e => handleUpload(e, 'favicon')}
              accept="image/png,image/x-icon,image/svg+xml"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploadingField === 'favicon'}
              onClick={() => faviconInputRef.current?.click()}
              className="w-full text-xs gap-1.5 h-8 font-bold bg-card"
            >
              <UploadCloud className="h-3.5 w-3.5" />
              <span>رفع Favicon</span>
            </Button>
          </CardContent>
        </Card>

        {/* Default OG Image */}
        <Card className="border border-border bg-card shadow-card">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-sm font-bold">صورة المشاركة الافتراضية (OG Image)</CardTitle>
            <CardDescription className="text-xs">تظهر عند مشاركة روابط الموقع على السوشيال ميديا (1200x630)</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-16 rounded-lg bg-secondary flex items-center justify-center border border-border shrink-0 overflow-hidden">
                {ogImageValue ? (
                  <img src={ogImageValue} alt="OG Preview" className="h-full w-full object-cover" />
                ) : (
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <Input
                value={ogImageValue}
                onChange={e => setValue('defaultSeo.ogImage', e.target.value, { shouldDirty: true })}
                placeholder="رابط صورة المشاركة (OG Image URL)"
                dir="ltr"
                className="font-mono text-xs h-9 text-left flex-1"
              />
            </div>
            <input
              type="file"
              ref={ogImageInputRef}
              onChange={e => handleUpload(e, 'defaultSeo.ogImage')}
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploadingField === 'defaultSeo.ogImage'}
              onClick={() => ogImageInputRef.current?.click()}
              className="w-full text-xs gap-1.5 h-8 font-bold bg-card"
            >
              <UploadCloud className="h-3.5 w-3.5" />
              <span>رفع OG Image</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
