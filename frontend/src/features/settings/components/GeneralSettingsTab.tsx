'use client';

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SettingsFormValues } from '../schemas/settings.schema';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Sliders, Globe, Clock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface GeneralSettingsTabProps {
  register: UseFormRegister<SettingsFormValues>;
  errors: FieldErrors<SettingsFormValues>;
}

export function GeneralSettingsTab({ register, errors }: GeneralSettingsTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Platform Basic Info */}
      <Card className="border border-border bg-card shadow-card">
        <CardHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-primary" />
            <CardTitle className="text-base font-bold">معلومات المنصة الأساسية</CardTitle>
          </div>
          <CardDescription className="text-xs">
            الاسم الرئيسي للمنصة والشعار النصي والوصف الافتراضي الذي يظهر في العناوين والترويسة
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Site Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <span>اسم المنصة (Site Name)</span>
                <span className="text-destructive">*</span>
              </label>
              <Input
                {...register('siteName')}
                placeholder="خمسة برمجة بالبلدي"
                className={cn(
                  'h-11 text-xs font-semibold',
                  errors.siteName && 'border-destructive focus-visible:ring-destructive',
                )}
              />
              {errors.siteName && (
                <p className="text-[11px] text-destructive font-medium">{errors.siteName.message}</p>
              )}
            </div>

            {/* Tagline */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                الشعار اللفظي (Tagline / Slogan)
              </label>
              <Input
                {...register('tagline')}
                placeholder="افهمها بالبلدي.. اكتبها بالكود."
                className="h-11 text-xs font-semibold"
              />
            </div>
          </div>

          {/* Site Description */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <span>وصف المنصة العام (Platform Description)</span>
              <span className="text-destructive">*</span>
            </label>
            <Textarea
              {...register('siteDescription')}
              rows={3}
              placeholder="منصة عربية لتبسيط البرمجة والتكنولوجيا، نشرح فيها الفكرة قبل الكود..."
              className={cn(
                'text-xs leading-relaxed resize-none',
                errors.siteDescription && 'border-destructive focus-visible:ring-destructive',
              )}
            />
            {errors.siteDescription && (
              <p className="text-[11px] text-destructive font-medium">
                {errors.siteDescription.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Localization & Region */}
      <Card className="border border-border bg-card shadow-card">
        <CardHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            <CardTitle className="text-base font-bold">اللغة والمنطقة الزمنية</CardTitle>
          </div>
          <CardDescription className="text-xs">
            إعدادات التوطين وتنسيق التواريخ والاتجاه الافتراضي للواجهات
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Language */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">اللغة الافتراضية</label>
              <select
                {...register('language')}
                className="w-full h-11 px-3 text-xs font-semibold rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="ar">العربية (Arabic - ar)</option>
                <option value="en">English (en)</option>
              </select>
            </div>

            {/* Direction */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">اتجاه النصوص (Direction)</label>
              <select
                {...register('direction')}
                className="w-full h-11 px-3 text-xs font-semibold rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="rtl">من اليمين لليسار (RTL)</option>
                <option value="ltr">من اليسار لليمين (LTR)</option>
              </select>
            </div>

            {/* Timezone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>المنطقة الزمنية</span>
              </label>
              <Input
                {...register('timezone')}
                placeholder="Africa/Cairo"
                dir="ltr"
                className="h-11 text-xs font-mono text-left"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
