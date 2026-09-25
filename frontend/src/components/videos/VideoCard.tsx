'use client';

import React from 'react';
import { Youtube, Facebook, Play, ExternalLink, Calendar } from 'lucide-react';
import { Video, VideoPlatform } from '@/types/api';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';

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

export interface VideoCardProps {
  video: Video;
  className?: string;
  onPlay?: (video: Video) => void;
}

export function VideoCard({ video, className, onPlay }: VideoCardProps) {
  const formattedDate = video.publishedAt
    ? new Date(video.publishedAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : new Date(video.createdAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

  const getPlatformConfig = (platform: VideoPlatform) => {
    switch (platform) {
      case VideoPlatform.YOUTUBE:
        return {
          name: 'YouTube',
          icon: Youtube,
          badgeClass: 'bg-red-500/10 text-red-400 border-red-500/20',
          hoverColor: 'hover:border-red-500/40',
        };
      case VideoPlatform.TIKTOK:
        return {
          name: 'TikTok',
          icon: TikTokIcon,
          badgeClass: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
          hoverColor: 'hover:border-cyan-500/40',
        };
      case VideoPlatform.FACEBOOK:
        return {
          name: 'Facebook',
          icon: Facebook,
          badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          hoverColor: 'hover:border-blue-500/40',
        };
      default:
        return {
          name: platform,
          icon: Play,
          badgeClass: 'bg-primary/10 text-primary border-primary/20',
          hoverColor: 'hover:border-primary/40',
        };
    }
  };

  const platformInfo = getPlatformConfig(video.platform);
  const PlatformIcon = platformInfo.icon;

  const handleMediaClick = (e: React.MouseEvent) => {
    if (onPlay) {
      e.preventDefault();
      onPlay(video);
    }
  };

  return (
    <Card
      hoverEffect
      className={cn(
        'group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300',
        platformInfo.hoverColor,
        className,
      )}
    >
      {/* Thumbnail */}
      <div
        onClick={handleMediaClick}
        className="relative block aspect-video w-full overflow-hidden bg-surface-hover cursor-pointer"
      >
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center bg-surface">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary mb-2 shadow-inner group-hover:scale-110 transition-transform">
              <Play className="h-6 w-6 fill-current mr-0.5" />
            </div>
            <span className="text-xs font-bold text-foreground-muted">خمسة برمجة بالبلدي</span>
          </div>
        )}

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card transform group-hover:scale-110 transition-transform">
            <Play className="h-5 w-5 fill-current mr-0.5" />
          </div>
        </div>

        {/* Platform Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={cn('gap-1.5 backdrop-blur-md', platformInfo.badgeClass)}>
            <PlatformIcon className="h-3.5 w-3.5" />
            <span>{platformInfo.name}</span>
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
            <Calendar className="h-3.5 w-3.5" />
            <time>{formattedDate}</time>
          </div>

          <h3
            onClick={handleMediaClick}
            className="text-base font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug cursor-pointer"
          >
            {video.title}
          </h3>

          <p className="text-xs text-foreground-muted line-clamp-2 leading-relaxed">
            {video.description}
          </p>
        </div>

        {/* Watch Button & Direct Link */}
        <div className="pt-3 border-t border-border flex items-center justify-between">
          <button
            type="button"
            onClick={() => onPlay?.(video)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>مشاهدة الفيديو</span>
          </button>

          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`فتح الرابط على ${platformInfo.name}`}
            className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <span>{platformInfo.name}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </Card>
  );
}
