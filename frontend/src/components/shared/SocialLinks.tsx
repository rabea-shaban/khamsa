import React from 'react';
import Link from 'next/link';
import { Youtube, Facebook, Github } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// Custom TikTok SVG Icon since Lucide doesn't have an official TikTok icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 2.31-4.639c.314 0 .619.05.904.144V9.43a6.33 6.33 0 0 0-.904-.065 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.583a8.19 8.19 0 0 0 4.766 1.517V6.655a4.83 4.83 0 0 1-1-.026z" />
    </svg>
  );
}

export interface SocialLinksProps {
  links?: {
    tiktok?: string;
    youtube?: string;
    facebook?: string;
    github?: string;
  };
  className?: string;
  iconClassName?: string;
  variant?: 'icons' | 'buttons';
}

export function SocialLinks({
  links,
  className,
  iconClassName = 'h-4 w-4',
  variant = 'icons',
}: SocialLinksProps) {
  const socialItems = [
    {
      name: 'YouTube',
      url: links?.youtube || 'https://youtube.com/@5barmaga',
      icon: Youtube,
      color: 'hover:text-red-500 hover:border-red-500/30',
      label: 'يوتيوب',
    },
    {
      name: 'TikTok',
      url: links?.tiktok || 'https://tiktok.com/@5barmaga',
      icon: TikTokIcon,
      color: 'hover:text-cyan-400 hover:border-cyan-400/30',
      label: 'تيك توك',
    },
    {
      name: 'Facebook',
      url: links?.facebook || 'https://facebook.com/5barmaga',
      icon: Facebook,
      color: 'hover:text-blue-500 hover:border-blue-500/30',
      label: 'فيسبوك',
    },
    {
      name: 'GitHub',
      url: links?.github || 'https://github.com/5barmaga',
      icon: Github,
      color: 'hover:text-slate-100 hover:border-slate-400/30',
      label: 'جيت هب',
    },
  ];

  if (variant === 'buttons') {
    return (
      <div className={cn('flex flex-wrap gap-3', className)}>
        {socialItems.map(item => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card/60 text-xs font-bold text-muted-foreground transition-all duration-200 hover:bg-secondary',
                item.color,
              )}
            >
              <Icon className={iconClassName} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {socialItems.map(item => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card/60 text-muted-foreground transition-all duration-200 hover:bg-secondary hover:scale-105',
              item.color,
            )}
            aria-label={item.name}
          >
            <Icon className={iconClassName} />
          </Link>
        );
      })}
    </div>
  );
}
