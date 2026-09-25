'use client';

import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { SettingsFormValues } from '../schemas/settings.schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Layout } from 'lucide-react';

interface HomepageSettingsTabProps {
  register: UseFormRegister<SettingsFormValues>;
}

export function HomepageSettingsTab({ register }: HomepageSettingsTabProps) {
  const sections = [
    {
      id: 'homepage.showHero',
      title: 'قسم الترويسة الرئيسية (Hero Section)',
      desc: 'العنوان الرئيسي، زر الاستكشاف، ومحاكي الكود التفاعلي لـ KhamsaApproach',
    },
    {
      id: 'homepage.showWhyKhamsa',
      title: 'قسم لماذا خمسة برمجة (Why Khamsa)',
      desc: 'المزايا الأربعة الأساسية لأسلوب الشرح بالبلدي بدون تعقيد',
    },
    {
      id: 'homepage.showPhilosophy',
      title: 'قسم فلسفة التعلم (Philosophy Section)',
      desc: 'دورة التعلم السداسية (افهم، جرّب، اخطئ، أصلح، طوّر، كرر)',
    },
    {
      id: 'homepage.showFounder',
      title: 'قسم صاحب الفكرة والمؤسس (Founder Section)',
      desc: 'نبذة عن المهندس ربيع شعبان، والهدف من إطلاق المنصة',
    },
    {
      id: 'homepage.showServices',
      title: 'قسم ما نقدمه (Services & Topics)',
      desc: 'المجالات والمسارات البرمجية وموضوعات هندسة البرمجيات',
    },
    {
      id: 'homepage.showArticles',
      title: 'قسم أحدث المقالات (Latest Articles)',
      desc: 'عرض بطاقات أحدث 3 مقالات برمجية منشورة على المنصة',
    },
    {
      id: 'homepage.showVideos',
      title: 'قسم أحدث الفيديوهات (Latest Videos)',
      desc: 'عرض أحدث الفيديوهات المنشورة على يوتيوب وتيك توك وفيسبوك',
    },
    {
      id: 'homepage.showSocial',
      title: 'قسم متابعة المنصات (Social Channels CTA)',
      desc: 'روابط قنوات يوتيوب وتيك توك وفيسبوك مع إحصائيات المتابعة',
    },
    {
      id: 'homepage.showFinalCTA',
      title: 'قسم الدعوة النهائية للتفاعل (Final Call to Action)',
      desc: 'بطاقة ختامية تدعو المطورين للانضمام لمجتمع خمسة برمجة',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border border-border bg-card shadow-card">
        <CardHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Layout className="h-4 w-4 text-primary" />
            <CardTitle className="text-base font-bold">أقسام الصفحة الرئيسية (Homepage Sections)</CardTitle>
          </div>
          <CardDescription className="text-xs">
            تحكّم في إظهار أو إخفاء أي قسم في الصفحة الرئيسية للموقع بضغطة زر
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {sections.map(section => (
              <label
                key={section.id}
                className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-secondary/40 border border-border hover:border-border-light transition-colors cursor-pointer select-none"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-foreground block">{section.title}</span>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{section.desc}</p>
                </div>
                <input
                  type="checkbox"
                  {...register(section.id as keyof SettingsFormValues)}
                  className="h-5 w-5 rounded-md border-border bg-background text-primary focus:ring-primary cursor-pointer accent-primary shrink-0 mt-0.5"
                />
              </label>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
