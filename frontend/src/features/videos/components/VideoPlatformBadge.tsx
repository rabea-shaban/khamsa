import React from 'react';
import { Youtube, Facebook, Play } from 'lucide-react';
import { VideoPlatform } from '@/types/api';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';

export function TikTokIcon({ className }: { className?: string }) {
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

interface VideoPlatformBadgeProps {
  platform: VideoPlatform;
  className?: string;
  size?: 'sm' | 'default';
}

export function VideoPlatformBadge({ platform, className, size = 'default' }: VideoPlatformBadgeProps) {
  switch (platform) {
    case VideoPlatform.YOUTUBE:
      return (
        <Badge
          variant="secondary"
          className={cn(
            'bg-red-500/10 text-red-400 border-red-500/25 hover:bg-red-500/15 gap-1.5 font-bold',
            size === 'sm' && 'text-[10px] px-2 py-0.5',
            className,
          )}
        >
          <Youtube className={cn('shrink-0', size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')} />
          <span>YouTube</span>
        </Badge>
      );
    case VideoPlatform.TIKTOK:
      return (
        <Badge
          variant="secondary"
          className={cn(
            'bg-cyan-500/10 text-cyan-400 border-cyan-500/25 hover:bg-cyan-500/15 gap-1.5 font-bold',
            size === 'sm' && 'text-[10px] px-2 py-0.5',
            className,
          )}
        >
          <TikTokIcon className={cn('shrink-0', size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')} />
          <span>TikTok</span>
        </Badge>
      );
    case VideoPlatform.FACEBOOK:
      return (
        <Badge
          variant="secondary"
          className={cn(
            'bg-blue-500/10 text-blue-400 border-blue-500/25 hover:bg-blue-500/15 gap-1.5 font-bold',
            size === 'sm' && 'text-[10px] px-2 py-0.5',
            className,
          )}
        >
          <Facebook className={cn('shrink-0', size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')} />
          <span>Facebook</span>
        </Badge>
      );
    default:
      return (
        <Badge
          variant="secondary"
          className={cn('gap-1.5 font-bold', size === 'sm' && 'text-[10px] px-2 py-0.5', className)}
        >
          <Play className={cn('shrink-0', size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')} />
          <span>{platform}</span>
        </Badge>
      );
  }
}
