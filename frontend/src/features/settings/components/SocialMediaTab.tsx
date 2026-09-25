'use client';

import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { SettingsFormValues } from '../schemas/settings.schema';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Youtube, Facebook, Github, Linkedin, ExternalLink, Share2 } from 'lucide-react';
import { TikTokIcon } from '@/features/videos/components/VideoPlatformBadge';
import { cn } from '@/lib/utils/cn';

interface SocialMediaTabProps {
  register: UseFormRegister<SettingsFormValues>;
  errors: FieldErrors<SettingsFormValues>;
  watch: UseFormWatch<SettingsFormValues>;
}

export function SocialMediaTab({ register, errors, watch }: SocialMediaTabProps) {
  const socials = [
    {
      id: 'socialLinks.youtube',
      label: 'قناة YouTube الرسمية',
      icon: Youtube,
      color: 'text-red-500 bg-red-500/10 border-red-500/20',
      placeholder: 'https://youtube.com/@5programming.balady',
      fieldError: errors.socialLinks?.youtube,
      currentValue: watch('socialLinks.youtube'),
    },
    {
      id: 'socialLinks.tiktok',
      label: 'حساب TikTok الرسمي',
      icon: TikTokIcon,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      placeholder: 'https://tiktok.com/@5programming.balady',
      fieldError: errors.socialLinks?.tiktok,
      currentValue: watch('socialLinks.tiktok'),
    },
    {
      id: 'socialLinks.facebook',
      label: 'صفحة Facebook الرسمية',
      icon: Facebook,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      placeholder: 'https://facebook.com/5programming.balady',
      fieldError: errors.socialLinks?.facebook,
      currentValue: watch('socialLinks.facebook'),
    },
    {
      id: 'socialLinks.github',
      label: 'حساب GitHub المنظمة / المؤسس',
      icon: Github,
      color: 'text-foreground bg-secondary border-border',
      placeholder: 'https://github.com/rabea-shaaban',
      fieldError: errors.socialLinks?.github,
      currentValue: watch('socialLinks.github'),
    },
    {
      id: 'socialLinks.linkedin',
      label: 'صفحة LinkedIn الرسمية',
      icon: Linkedin,
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
      placeholder: 'https://linkedin.com/in/rabea-shaaban',
      fieldError: errors.socialLinks?.linkedin,
      currentValue: watch('socialLinks.linkedin'),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border border-border bg-card shadow-card">
        <CardHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4 text-primary" />
            <CardTitle className="text-base font-bold">روابط منصات التواصل الاجتماعي</CardTitle>
          </div>
          <CardDescription className="text-xs">
            تظهر هذه الروابط في ترويسة الموقع وفوتر الصفحات وقسم متابعة القنوات في الصفحة الرئيسية
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socials.map(item => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-secondary/40 border border-border space-y-2 hover:border-border-light transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn('p-1.5 rounded-lg border flex items-center justify-center', item.color)}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <label className="text-xs font-bold text-foreground">{item.label}</label>
                    </div>

                    {item.currentValue && (
                      <a
                        href={item.currentValue}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-primary hover:underline inline-flex items-center gap-1 font-semibold"
                      >
                        <span>تجربة الرابط</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>

                  <Input
                    {...register(item.id as keyof SettingsFormValues)}
                    placeholder={item.placeholder}
                    dir="ltr"
                    className={cn(
                      'font-mono text-xs h-10 text-left bg-background',
                      item.fieldError && 'border-destructive focus-visible:ring-destructive',
                    )}
                  />
                  {item.fieldError && (
                    <p className="text-[11px] text-destructive font-medium">
                      {item.fieldError.message as string}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
