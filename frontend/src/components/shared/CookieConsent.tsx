'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, Shield, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('khamsa_cookie_consent');
      if (!consent) {
        // Small delay to prevent initial page layout flash
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore in restricted environments
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('khamsa_cookie_consent', 'accepted');
    } catch {
      // Ignore storage errors in private browsing
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('khamsa_cookie_consent', 'declined');
    } catch {
      // Ignore storage errors in private browsing
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="إشعار ملفات تعريف الارتباط"
      className="fixed bottom-4 start-4 end-4 sm:start-auto sm:end-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="rounded-3xl border border-primary/30 bg-background/95 backdrop-blur-xl p-5 sm:p-6 shadow-2xl space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-black text-foreground flex items-center gap-1.5">
              <span>ملفات تعريف الارتباط والخصوصية</span>
              <Shield className="h-3.5 w-3.5 text-primary" />
            </h4>
            <p className="text-xs text-foreground-secondary leading-relaxed font-normal">
              نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربة التصفح، وتحليل أداء المنصة، وعرض
              إعلانات ملائمة. لمزيد من التفاصيل، راجع{' '}
              <Link
                href="/cookie-policy"
                className="text-primary font-bold hover:underline"
              >
                سياسة ملفات الارتباط
              </Link>{' '}
              و{' '}
              <Link
                href="/privacy-policy"
                className="text-primary font-bold hover:underline"
              >
                سياسة الخصوصية
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Button
            size="sm"
            onClick={handleAccept}
            className="flex-1 h-9 font-bold text-xs gap-1.5 shadow-subtle"
          >
            <Check className="h-3.5 w-3.5" />
            <span>موافق</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDecline}
            className="h-9 px-4 font-bold text-xs text-foreground-muted hover:text-foreground gap-1 bg-transparent"
          >
            <X className="h-3.5 w-3.5" />
            <span>رفض غير الأساسي</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
