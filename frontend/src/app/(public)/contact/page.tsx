'use client';

import React, { useState } from 'react';
import { Mail, MessageCircle, Send, CheckCircle2, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { SocialLinks } from '@/components/shared/SocialLinks';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate verified form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6 sm:py-10">
      <ArticleBreadcrumb items={[{ label: 'تواصل معنا' }]} />

      {/* Page Header */}
      <div className="space-y-4 max-w-2xl text-start">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
          <MessageCircle className="h-3.5 w-3.5" />
          <span>قنوات التواصل المباشرة</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          تواصل معنا
        </h1>
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed font-normal">
          يسعدنا دائماً استقبال استفساراتك، ومقترحاتك لتطوير المحتوى التقني، وفرص التعاون والشراكات
          البرمجية.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-6 bg-card border border-border shadow-card">
            <h3 className="text-lg font-black text-foreground flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span>معلومات الاتصال الرسمية</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-foreground-muted text-xs font-semibold">البريد الإلكتروني:</span>
                  <a
                    href="mailto:contact@khamsa.dev"
                    className="font-bold text-foreground hover:text-primary transition-colors font-mono"
                  >
                    contact@khamsa.dev
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-foreground-muted text-xs font-semibold">واتساب ومحادثات سريعة:</span>
                  <a
                    href="https://wa.me/201000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-foreground hover:text-primary transition-colors font-mono"
                  >
                    +20 100 000 0000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-foreground-muted text-xs font-semibold">ساعات العمل والرد:</span>
                  <span className="font-semibold text-foreground">من الأحد إلى الخميس (9 صباحاً - 6 مساءً بتوقيت القاهرة)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-foreground-muted text-xs font-semibold">المقر:</span>
                  <span className="font-semibold text-foreground">القاهرة، جمهورية مصر العربية</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-2">
              <span className="block text-xs font-bold text-foreground-muted">حسابات التواصل الرسمية:</span>
              <SocialLinks />
            </div>
          </Card>
        </div>

        {/* Interactive Contact Form */}
        <div className="lg:col-span-7">
          <Card className="p-6 sm:p-8 space-y-6 bg-card border border-border shadow-card">
            <h3 className="text-xl font-black text-foreground">أرسل لنا رسالة مباشرة</h3>

            {isSuccess ? (
              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/30 text-center space-y-3">
                <CheckCircle2 className="h-10 w-10 text-primary mx-auto" />
                <h4 className="text-base font-bold text-foreground">تم استلام رسالتك بنجاح!</h4>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  شكراً لتواصلك معنا. سيقوم فريق «خمسة برمجة بالبلدي» بالرد على بريدك الإلكتروني في أقرب وقت.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSuccess(false)}
                  className="mt-2 text-xs font-bold"
                >
                  إرسال رسالة أخرى
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">الاسم الكامل *</label>
                    <Input
                      placeholder="مثال: ربيع شعبان"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">البريد الإلكتروني *</label>
                    <Input
                      type="email"
                      placeholder="your.email@domain.com"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">موضوع الرسالة *</label>
                  <Input
                    placeholder="استفسار تقني / اقتراح محتوى / تعاون عمل"
                    required
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">نص الرسالة *</label>
                  <Textarea
                    placeholder="اكتب تفاصيل استفسارك أو رسالتك هنا..."
                    rows={5}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 text-xs font-bold gap-2 shadow-card"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة الآن'}</span>
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
