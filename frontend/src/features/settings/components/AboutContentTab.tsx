'use client';

import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { SettingsFormValues } from '../schemas/settings.schema';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Info, Target, Compass, BookOpen } from 'lucide-react';

interface AboutContentTabProps {
  register: UseFormRegister<SettingsFormValues>;
}

export function AboutContentTab({ register }: AboutContentTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border border-border bg-card shadow-card">
        <CardHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            <CardTitle className="text-base font-bold">محتوى صفحة وقصة المنصة (About Us)</CardTitle>
          </div>
          <CardDescription className="text-xs">
            إدارة نصوص صفحة &quot;من نحن&quot; وقصة التأسيس والرسالة والرؤية والهدف الأساسي
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">عنوان الصفحة الرئيسي</label>
              <Input
                {...register('about.aboutTitle')}
                placeholder="من نحن؟"
                className="h-11 text-xs font-semibold"
              />
            </div>

            {/* Short Subtitle */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">الموجز الترويجي (Short Tagline)</label>
              <Input
                {...register('about.aboutShortDescription')}
                placeholder="بدأت بفكرة بسيطة... إن البرمجة ممكن تتفهم بشكل أبسط."
                className="h-11 text-xs font-semibold text-primary"
              />
            </div>
          </div>

          {/* The Story */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              <span>قصة البداية (The Story)</span>
            </label>
            <Textarea
              {...register('about.aboutStory')}
              rows={4}
              placeholder="ليه ناس كتير عندها الرغبة الحقيقية تتعلم البرمجة، لكن أول ما تبدأ تواجه مصطلحات معقدة..."
              className="text-xs leading-relaxed resize-none"
            />
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-primary" />
                <span>الرسالة (Our Mission)</span>
              </label>
              <Textarea
                {...register('about.aboutMission')}
                rows={3}
                placeholder="تقديم محتوى تقني عربي عالي الجودة يركز على الفهم العميق للأساسيات قبل كتابة الكود."
                className="text-xs leading-relaxed resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5 text-primary" />
                <span>الرؤية (Our Vision)</span>
              </label>
              <Textarea
                {...register('about.aboutVision')}
                rows={3}
                placeholder="بناء جيل من المطورين العرب يمتلكون عقلية التفكير الهندسي السليم والقدرة على حل المشكلات."
                className="text-xs leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* Goal & Philosophy Quote */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">الهدف الأساسي (Our Goal)</label>
              <Textarea
                {...register('about.aboutGoal')}
                rows={3}
                placeholder="مساعدة كل مبرمج عربي على الانتقال من مرحلة الحفظ والتقليد إلى مرحلة الفهم والابتكار."
                className="text-xs leading-relaxed resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">المقولة / الرسالة البارزة (Philosophy Quote)</label>
              <Textarea
                {...register('about.aboutMessage')}
                rows={3}
                placeholder="«مش هنخلي البرمجة سهلة... هنخلي فهمها أسهل.»"
                className="text-xs leading-relaxed resize-none font-semibold text-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
