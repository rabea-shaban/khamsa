'use client';

import React from 'react';
import { Save, RotateCcw, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

interface SettingsSaveBarProps {
  isDirty: boolean;
  isSubmitting: boolean;
  onReset: () => void;
  showSuccessToast?: boolean;
}

export function SettingsSaveBar({
  isDirty,
  isSubmitting,
  onReset,
  showSuccessToast,
}: SettingsSaveBarProps) {
  return (
    <div className="sticky bottom-6 z-40 max-w-4xl mx-auto px-4 animate-slide-up">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-card/95 border-2 border-primary/30 shadow-2xl backdrop-blur-xl">
        {/* Status Indicator */}
        <div className="flex items-center gap-3">
          {showSuccessToast ? (
            <div className="flex items-center gap-2 text-xs font-bold text-primary animate-fade-in">
              <CheckCircle2 className="h-4 w-4" />
              <span>تم حفظ إعدادات المنصة بنجاح وتحديث الموقع العام!</span>
            </div>
          ) : isDirty ? (
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 animate-fade-in">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span>لديك تعديلات جديدة غير محفوظة في الإعدادات</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-muted-foreground/60" />
              <span>جميع الإعدادات محفوظة ومزامنة مع قاعدة البيانات</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!isDirty || isSubmitting}
            onClick={onReset}
            className={cn(
              'gap-1.5 text-xs font-bold bg-card h-10 px-4',
              !isDirty && 'opacity-50 cursor-not-allowed',
            )}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>استعادة القيم</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            disabled={isSubmitting}
            className="gap-2 text-xs font-bold shadow-card h-10 px-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>جاري الحفظ...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>حفظ التغييرات</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
