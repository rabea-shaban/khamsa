'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldCheck,
  Globe,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import {
  WhatsAppIcon,
  LinkedInIcon,
  FacebookIcon,
  TikTokIcon,
  GitHubIcon,
  MostaqlIcon,
  WebsiteIcon,
} from '@/components/shared/BrandIcons';
import { cn } from '@/lib/utils/cn';

const FAQ_ITEMS = [
  {
    q: 'ما هي مجالات الاستشارات والتعاون البرمجي المتاحة؟',
    a: 'نقدم استشارات معمارية وتطويرية في بناء تطبيقات الويب واسعة النطاق، Next.js، React، Node.js، معمارية Clean Architecture، تحسين قواعد البيانات (MongoDB / PostgreSQL)، وحلول الكاشينج المتقدمة باستخدام Redis.',
  },
  {
    q: 'كيف يمكنني اقتراح موضوع جديد لشرحه في مقال أو فيديو؟',
    a: 'يمكنك مراسلتنا عبر النموذج أو الواتساب مباشرة بأي فكرة أو تحدي برمجي ترغب في تبسيطه على منصة «خمسة برمجة بالبلدي»، وسنقوم بجدولته ضمن خطتنا التعليمية.',
  },
  {
    q: 'ما هو الوقت المتوقع للرد على الرسائل والاستفسارات؟',
    a: 'يتم الرد على رسائل الواتساب والبريد الإلكتروني في غضون 24 ساعة كحد أقصى خلال أيام العمل الرسمية.',
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'استفسار تقني',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate verified form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: 'استفسار تقني', message: '' });
    }, 900);
  };

  const directWhatsAppUrl = `https://wa.me/201554087543?text=${encodeURIComponent(
    formData.message
      ? `مرحباً مهندس ربيع،\nالاسم: ${formData.name || 'زائر الموقع'}\nالموضوع: ${formData.subject}\nالرسالة: ${formData.message}`
      : 'مرحباً، أود التواصل بخصوص منصة خمسة برمجة بالبلدي واستفسار برمجي.'
  )}`;

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6 sm:py-10">
      <ArticleBreadcrumb items={[{ label: 'تواصل معنا' }]} />

      {/* Page Header */}
      <div className="space-y-4 max-w-2xl text-start">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
          <Sparkles className="h-3.5 w-3.5" />
          <span>قنوات الاتصال المباشرة • دعم وتعاون تقني</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          تواصل معنا
        </h1>
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed font-normal">
          يسعدنا دائماً استقبال استفساراتك التقنية، اقتراحاتك لتطوير المحتوى، وفرص التعاون والتدريب
          والاستشارات البرمجية مع مهندس <strong>ربيع شعبان</strong> وفريق المنصة.
        </p>
      </div>

      {/* Quick Contact Action Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* WhatsApp Card */}
        <a
          href="https://wa.me/201554087543"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 hover:border-emerald-500 hover:shadow-lg transition-all"
        >
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 group-hover:scale-110 transition-transform">
            <WhatsAppIcon size={24} />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">محادثة واتساب فورية</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-sm font-black text-foreground font-mono" dir="ltr">
              +20 155 408 7543
            </p>
            <span className="text-[11px] text-foreground-muted flex items-center gap-1">
              <span>رد سريع ومباشر</span>
              <ExternalLink className="h-3 w-3" />
            </span>
          </div>
        </a>

        {/* Direct Call Card */}
        <a
          href="tel:+201554087543"
          className="group flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all"
        >
          <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform">
            <Phone className="h-5 w-5" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-foreground-muted">اتصال هاتفي مباشر</span>
            <p className="text-sm font-black text-foreground font-mono" dir="ltr">
              01554087543
            </p>
            <span className="text-[11px] text-primary font-semibold">مكالمات هاتفية في مصر</span>
          </div>
        </a>

        {/* Email Card */}
        <a
          href="mailto:r.shaban.2016@gmail.com"
          className="group flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all sm:col-span-2 lg:col-span-1"
        >
          <div className="p-3 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20 group-hover:scale-110 transition-transform">
            <Mail className="h-5 w-5" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-foreground-muted">البريد الإلكتروني</span>
            <p className="text-xs font-black text-foreground font-mono truncate max-w-[180px]" dir="ltr">
              r.shaban.2016@gmail.com
            </p>
            <span className="text-[11px] text-sky-500 font-semibold">استفسارات وشراكات رسمية</span>
          </div>
        </a>
      </div>

      {/* Main Form & Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 sm:p-7 space-y-6 bg-card border border-border shadow-card">
            <h3 className="text-lg font-black text-foreground flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span>معلومات التواصل الرسمية</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
                  <WhatsAppIcon size={16} />
                </div>
                <div>
                  <span className="block text-foreground-muted text-xs font-semibold">الهاتف والواتساب:</span>
                  <a
                    href="https://wa.me/201554087543"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-foreground hover:text-emerald-500 transition-colors font-mono"
                    dir="ltr"
                  >
                    +20 155 408 7543
                  </a>
                </div>
              </div>

              {/* Emails */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <span className="block text-foreground-muted text-xs font-semibold">البريد الإلكتروني:</span>
                  <a
                    href="mailto:r.shaban.2016@gmail.com"
                    className="block font-bold text-foreground hover:text-primary transition-colors font-mono text-xs"
                  >
                    r.shaban.2016@gmail.com
                  </a>
                  <a
                    href="mailto:rabea.elzayate@gmail.com"
                    className="block text-xs font-medium text-foreground-muted hover:text-primary transition-colors font-mono"
                  >
                    rabea.elzayate@gmail.com
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20 shrink-0">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-foreground-muted text-xs font-semibold">الموقع الشخصي:</span>
                  <a
                    href="https://rabea-shaban.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-foreground hover:text-sky-500 transition-colors font-mono"
                  >
                    rabea-shaban.com
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-foreground-muted text-xs font-semibold">أوقات العمل والتواصل:</span>
                  <span className="font-semibold text-foreground">
                    السبت إلى الخميس (9:00 صباحاً - 7:00 مساءً بتوقيت مصر)
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-foreground-muted text-xs font-semibold">الموقع والمقر:</span>
                  <span className="font-semibold text-foreground">القاهرة، جمهورية مصر العربية</span>
                </div>
              </div>
            </div>

            {/* Official Social Accounts */}
            <div className="pt-5 border-t border-border space-y-3">
              <span className="block text-xs font-bold text-foreground">حسابات التواصل والشبكات المهنية:</span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://wa.me/201554087543"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-surface border border-border text-emerald-500 hover:scale-110 hover:border-emerald-500 transition-all"
                  title="WhatsApp"
                >
                  <WhatsAppIcon size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/rabea-sh-elzayat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-surface border border-border text-sky-500 hover:scale-110 hover:border-sky-500 transition-all"
                  title="LinkedIn"
                >
                  <LinkedInIcon size={16} />
                </a>
                <a
                  href="https://mostaql.com/u/rabea_elzayat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-surface border border-border text-amber-500 hover:scale-110 hover:border-amber-500 transition-all"
                  title="Mostaql"
                >
                  <MostaqlIcon size={16} />
                </a>
                <a
                  href="https://www.facebook.com/Rabea.Sh.ELZayat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-surface border border-border text-blue-500 hover:scale-110 hover:border-blue-500 transition-all"
                  title="Facebook"
                >
                  <FacebookIcon size={16} />
                </a>
                <a
                  href="https://www.tiktok.com/@rabea.sh.elzayat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-surface border border-border text-pink-500 hover:scale-110 hover:border-pink-500 transition-all"
                  title="TikTok"
                >
                  <TikTokIcon size={16} />
                </a>
                <a
                  href="https://github.com/rabea-shaban"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-surface border border-border text-foreground hover:scale-110 hover:border-primary transition-all"
                  title="GitHub"
                >
                  <GitHubIcon size={16} />
                </a>
                <a
                  href="https://rabea-shaban.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-surface border border-border text-primary hover:scale-110 hover:border-primary transition-all"
                  title="Portfolio"
                >
                  <WebsiteIcon size={16} />
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* Interactive Contact Form */}
        <div className="lg:col-span-7">
          <Card className="p-6 sm:p-8 space-y-6 bg-card border border-border shadow-card">
            <div className="flex items-center justify-between border-b border-border/70 pb-4">
              <div>
                <h3 className="text-xl font-black text-foreground">أرسل رسالة مباشرة</h3>
                <p className="text-xs text-foreground-muted mt-0.5">
                  املأ النموذج وسيتم التواصل معك مباشرة
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                خمسة برمجة
              </span>
            </div>

            {isSuccess ? (
              <div className="p-8 rounded-2xl bg-primary/10 border border-primary/30 text-center space-y-4 animate-in zoom-in-95 duration-300">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-foreground">تم استلام رسالتك بنجاح!</h4>
                  <p className="text-xs text-foreground-secondary leading-relaxed max-w-md mx-auto">
                    شكراً لتواصلك معنا. سنقوم بمراجعة رسالتك والرد عليك عبر بريدك الإلكتروني أو الواتساب في أقرب وقت.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSuccess(false)}
                    className="text-xs font-bold"
                  >
                    إرسال رسالة أخرى
                  </Button>
                  <a
                    href="https://wa.me/201554087543"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                  >
                    <WhatsAppIcon size={14} />
                    <span>متابعة على واتساب</span>
                  </a>
                </div>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">رقم الهاتف / واتساب (اختياري)</label>
                    <Input
                      type="tel"
                      placeholder="مثال: 01554087543"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">نوع الاستفسار / الموضوع *</label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-border bg-surface text-foreground text-xs font-semibold focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="استفسار تقني">استفسار تقني أو برمجي</option>
                      <option value="اقتراح محتوى ومقالات">اقتراح محتوى / مقال جديد</option>
                      <option value="استشارة معمارية وتطويرية">استشارة معمارية وتطوير أنظمة</option>
                      <option value="شراكات ورعاية محتوى">شراكات عمل ورعاية محتوى</option>
                      <option value="تدريب وكورسات">تدريب وإرشاد برمجي (Mentorship)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">نص الرسالة أو تفاصيل الطلب *</label>
                  <Textarea
                    placeholder="اكتب تفاصيل استفسارك أو مشروعك هنا وسنكون سعداء بمساعدتك..."
                    rows={5}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-1/2 h-11 text-xs font-bold gap-2 shadow-card"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة عبر النموذج'}</span>
                  </Button>

                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-1/2 h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <WhatsAppIcon size={16} />
                    <span>إرسال عبر واتساب مباشرة</span>
                  </a>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) */}
      <div className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          <h2 className="text-xl sm:text-2xl font-black text-foreground">الأسئلة الشائعة</h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-border bg-card overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-start font-bold text-sm text-foreground hover:text-primary transition-colors focus:outline-none"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-foreground-muted transition-transform duration-200',
                      isOpen && 'rotate-180 text-primary'
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-foreground-secondary leading-relaxed border-t border-border/50 pt-3 animate-in fade-in duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
