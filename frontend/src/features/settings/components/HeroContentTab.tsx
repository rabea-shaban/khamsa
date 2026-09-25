'use client';

import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { SettingsFormValues } from '../schemas/settings.schema';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Type, Link2 } from 'lucide-react';

interface HeroContentTabProps {
  register: UseFormRegister<SettingsFormValues>;
}

export function HeroContentTab({ register }: HeroContentTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border border-border bg-card shadow-card">
        <CardHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4 text-primary" />
            <CardTitle className="text-base font-bold">نصوص وأزرار واجهة البداية (Hero Content)</CardTitle>
          </div>
          <CardDescription className="text-xs">
            تعديل العنوان الترحيبي والنصوص والأزرار التفاعلية في أعلى الصفحة الرئيسية
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hero Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">العنوان الرئيسي (Hero Title)</label>
              <Input
                {...register('hero.heroTitle')}
                placeholder="خمسة برمجة بالبلدي"
                className="h-11 text-xs font-semibold"
              />
            </div>

            {/* Hero Subtitle */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">العنوان الفرعي (Hero Subtitle)</label>
              <Input
                {...register('hero.heroSubtitle')}
                placeholder="افهمها بالبلدي.. اكتبها بالكود."
                className="h-11 text-xs font-semibold text-primary"
              />
            </div>
          </div>

          {/* Hero Description */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-foreground">النص التوضيحي (Hero Description)</label>
            <Textarea
              {...register('hero.heroDescription')}
              rows={3}
              placeholder="منصة عربية لتبسيط البرمجة والتكنولوجيا، نشرح فيها الفكرة قبل الكود..."
              className="text-xs leading-relaxed resize-none"
            />
          </div>

          {/* Buttons Configuration */}
          <div className="pt-4 border-t border-border space-y-3">
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-foreground">أزرار الإجراء السريع (Call to Action Buttons)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Button */}
              <div className="p-4 rounded-2xl bg-secondary/40 border border-border space-y-3">
                <span className="text-xs font-bold text-primary block">الزر الأساسي (Primary CTA)</span>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted-foreground">نص الزر</label>
                  <Input
                    {...register('hero.primaryButtonText')}
                    placeholder="اكتشف المقالات"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted-foreground">الرابط الموجه</label>
                  <Input
                    {...register('hero.primaryButtonUrl')}
                    placeholder="/articles"
                    dir="ltr"
                    className="h-9 text-xs font-mono text-left"
                  />
                </div>
              </div>

              {/* Secondary Button */}
              <div className="p-4 rounded-2xl bg-secondary/40 border border-border space-y-3">
                <span className="text-xs font-bold text-foreground block">الزر الثانوي (Secondary CTA)</span>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted-foreground">نص الزر</label>
                  <Input
                    {...register('hero.secondaryButtonText')}
                    placeholder="شاهد المحتوى"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted-foreground">الرابط الموجه</label>
                  <Input
                    {...register('hero.secondaryButtonUrl')}
                    placeholder="/videos"
                    dir="ltr"
                    className="h-9 text-xs font-mono text-left"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
