'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { settingsApi } from '@/lib/api/settings.api';
import { cn } from '@/lib/utils/cn';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'icon';
  href?: string;
  customLogo?: string | null;
}

export function Logo({ className, variant = 'full', href = '/', customLogo }: LogoProps) {
  const { data: settingsResponse } = useQuery({
    queryKey: ['public-settings'],
    queryFn: () => settingsApi.getPublicSettings(),
    staleTime: 5 * 60 * 1000,
  });

  const settings = settingsResponse?.data;
  const logoUrl = customLogo !== undefined ? customLogo : settings?.logo;
  const siteName = settings?.siteName || 'خمسة برمجة بالبلدي';

  return (
    <Link
      href={href}
      className={cn('inline-flex items-center gap-2.5 select-none group', className)}
      aria-label={`${siteName} - الصفحة الرئيسية`}
    >
      {/* Brand Icon / Custom Logo Image */}
      {logoUrl ? (
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl overflow-hidden border border-border bg-card shadow-subtle group-hover:scale-105 transition-transform duration-normal">
          <img
            src={logoUrl}
            alt={siteName}
            className="w-full h-full object-contain p-0.5"
          />
        </div>
      ) : (
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-xl shadow-subtle group-hover:scale-105 transition-transform duration-normal">
          <span className="font-extrabold leading-none select-none">٥</span>
          <span className="absolute -bottom-1 -left-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-surface-elevated border border-border text-[8px] text-primary font-mono font-bold">
            &lt;&gt;
          </span>
        </div>
      )}

      {/* Brand Typography */}
      {variant !== 'icon' && (
        <div className="flex flex-col text-right leading-tight">
          <div className="flex items-center gap-1">
            <span className="text-base font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
              خمسة
            </span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-primary/10 text-primary border border-primary/20">
              dev
            </span>
          </div>
          {variant === 'full' && (
            <span className="text-[11px] font-semibold text-foreground-muted tracking-normal">
              برمجة بالبلدي
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
