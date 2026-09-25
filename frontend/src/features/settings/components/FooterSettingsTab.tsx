'use client';

import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { SettingsFormValues } from '../schemas/settings.schema';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { PanelBottom } from 'lucide-react';

interface FooterSettingsTabProps {
  register: UseFormRegister<SettingsFormValues>;
}

export function FooterSettingsTab({ register }: FooterSettingsTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border border-border bg-card shadow-card">
        <CardHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <PanelBottom className="h-4 w-4 text-primary" />
            <CardTitle className="text-base font-bold">إعدادات تذييل الموقع (Footer Settings)</CardTitle>
          </div>
          <CardDescription className="text-xs">
            النبذة التعريفية وحقوق الملكية وروابط الفوتر المعروضة في أسفل جميع الصفحات
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">وصف الفوتر المختصر</label>
            <Textarea
              {...register('footer.footerDescription')}
              rows={2}
              placeholder="افهمها بالبلدي.. اكتبها بالكود. منصة عربية لتبسيط علوم الحاسب وهندسة البرمجيات."
              className="text-xs leading-relaxed resize-none"
            />
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-foreground">نص حقوق الملكية (Copyright Text)</label>
            <Input
              {...register('footer.footerCopyright')}
              placeholder="© 2026 خمسة برمجة بالبلدي. جميع الحقوق محفوظة."
              className="h-11 text-xs font-semibold"
            />
          </div>

          {/* Visibility Controls */}
          <div className="pt-3 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center justify-between p-4 rounded-xl bg-secondary/40 border border-border cursor-pointer select-none">
              <span className="text-xs font-bold text-foreground">عرض روابط منصات التواصل في الفوتر</span>
              <input
                type="checkbox"
                {...register('footer.footerShowSocials')}
                className="h-5 w-5 rounded-md border-border bg-background text-primary focus:ring-primary cursor-pointer accent-primary"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-xl bg-secondary/40 border border-border cursor-pointer select-none">
              <span className="text-xs font-bold text-foreground">عرض روابط التنقل السريع في الفوتر</span>
              <input
                type="checkbox"
                {...register('footer.footerShowNavigation')}
                className="h-5 w-5 rounded-md border-border bg-background text-primary focus:ring-primary cursor-pointer accent-primary"
              />
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
