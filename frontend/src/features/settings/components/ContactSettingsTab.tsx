'use client';

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SettingsFormValues } from '../schemas/settings.schema';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ContactSettingsTabProps {
  register: UseFormRegister<SettingsFormValues>;
  errors: FieldErrors<SettingsFormValues>;
}

export function ContactSettingsTab({ register, errors }: ContactSettingsTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border border-border bg-card shadow-card">
        <CardHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            <CardTitle className="text-base font-bold">بيانات وقنوات التواصل الرسمية</CardTitle>
          </div>
          <CardDescription className="text-xs">
            البريد الإلكتروني وأرقام الدعم ورسائل التواصل التي تظهر للزوار والشركاء
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span>البريد الإلكتروني الرسمي</span>
              </label>
              <Input
                {...register('contact.email')}
                placeholder="contact@khamsa.dev"
                dir="ltr"
                className={cn(
                  'h-11 text-xs font-mono text-left',
                  errors.contact?.email && 'border-destructive focus-visible:ring-destructive',
                )}
              />
              {errors.contact?.email && (
                <p className="text-[11px] text-destructive font-medium">
                  {errors.contact.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>رقم الهاتف / الاتصال</span>
              </label>
              <Input
                {...register('contact.phone')}
                placeholder="+20 100 000 0000"
                dir="ltr"
                className="h-11 text-xs font-mono text-left"
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                <span>رقم أو رابط WhatsApp</span>
              </label>
              <Input
                {...register('contact.whatsapp')}
                placeholder="https://wa.me/201000000000"
                dir="ltr"
                className="h-11 text-xs font-mono text-left"
              />
            </div>
          </div>

          {/* Contact Welcome Message */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-foreground">
              رسالة الترحيب بالتواصل والدعم (Contact Message)
            </label>
            <Textarea
              {...register('contact.contactMessage')}
              rows={3}
              placeholder="نرحب بجميع الاستفسارات والتعاون التقني والمقترحات لتطوير محتوى المنصة..."
              className="text-xs leading-relaxed resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
