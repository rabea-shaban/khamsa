'use client';

import React, { useState, useRef } from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { SettingsFormValues } from '../schemas/settings.schema';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { UserCheck, UploadCloud, Trash2, Loader2, Linkedin, Github } from 'lucide-react';
import { mediaApi } from '@/lib/api/media.api';

interface FounderSettingsTabProps {
  register: UseFormRegister<SettingsFormValues>;
  watch: UseFormWatch<SettingsFormValues>;
  setValue: UseFormSetValue<SettingsFormValues>;
}

export function FounderSettingsTab({ register, watch, setValue }: FounderSettingsTabProps) {
  const founderImage = watch('founder.founderImage') || '';
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('حجم الصورة يجب ألا يتجاوز 5 ميجابايت');
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'settings');

      const res = await mediaApi.uploadFile(formData);
      if (res.data?.url) {
        setValue('founder.founderImage', res.data.url, { shouldDirty: true, shouldValidate: true });
      }
    } catch {
      setUploadError('حدث خطأ أثناء رفع صورة المؤسس');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border border-border bg-card shadow-card">
        <CardHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-primary" />
            <CardTitle className="text-base font-bold">بيانات صاحب الفكرة والمؤسس (Founder)</CardTitle>
          </div>
          <CardDescription className="text-xs">
            البيانات التعريفية والصورة والروابط المهنية التي تظهر في قسم المؤسس وصفحة من نحن
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5 space-y-5">
          {uploadError && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive font-semibold">
              {uploadError}
            </div>
          )}

          {/* Photo & Name / Role */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Founder Avatar Preview */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-secondary/50 border border-border text-center space-y-2 min-h-[160px]">
              {founderImage ? (
                <div className="relative group">
                  <img
                    src={founderImage}
                    alt="Founder Preview"
                    className="h-24 w-24 rounded-full object-cover border-2 border-primary shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setValue('founder.founderImage', '', { shouldDirty: true })}
                    className="absolute -top-1 -right-1 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    title="حذف الصورة"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="h-24 w-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <UserCheck className="h-10 w-10" />
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="text-xs gap-1.5 h-8 font-bold bg-card"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>جاري الرفع...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-3.5 w-3.5" />
                    <span>رفع صورة المؤسس</span>
                  </>
                )}
              </Button>
            </div>

            {/* Name & Role */}
            <div className="md:col-span-8 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">اسم المؤسس</label>
                <Input
                  {...register('founder.founderName')}
                  placeholder="ربيع شعبان"
                  className="h-11 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">المسمى الوظيفي والمهني</label>
                <Input
                  {...register('founder.founderRole')}
                  placeholder="Full Stack Software Engineer & Content Creator"
                  className="h-11 text-xs font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Founder Bio */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-foreground">النبذة التعريفية (Founder Bio)</label>
            <Textarea
              {...register('founder.founderBio')}
              rows={3}
              placeholder="مهندس برمجيات ومطور شغوف بتبسيط مفاهيم البرمجة وهندسة البرمجيات باللغة العربية..."
              className="text-xs leading-relaxed resize-none"
            />
          </div>

          {/* Social Profiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Linkedin className="h-3.5 w-3.5 text-sky-500" />
                <span>حساب LinkedIn الشخصي</span>
              </label>
              <Input
                {...register('founder.founderLinkedIn')}
                placeholder="https://linkedin.com/in/rabea-shaaban"
                dir="ltr"
                className="h-10 text-xs font-mono text-left"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Github className="h-3.5 w-3.5 text-foreground" />
                <span>حساب GitHub الشخصي</span>
              </label>
              <Input
                {...register('founder.founderGitHub')}
                placeholder="https://github.com/rabea-shaaban"
                dir="ltr"
                className="h-10 text-xs font-mono text-left"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
