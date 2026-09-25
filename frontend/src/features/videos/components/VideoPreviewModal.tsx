import React from 'react';
import { X, ExternalLink, Calendar, UserCheck } from 'lucide-react';
import { Video, VideoPlatform } from '@/types/api';
import { SocialVideoEmbed } from './SocialVideoEmbed';
import { VideoPlatformBadge } from './VideoPlatformBadge';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

interface VideoPreviewModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPreviewModal({ video, isOpen, onClose }: VideoPreviewModalProps) {
  if (!isOpen || !video) return null;

  const isTikTok = video.platform === VideoPlatform.TIKTOK;

  const formattedDate = video.publishedAt
    ? new Date(video.publishedAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date(video.createdAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className={cn(
          'w-full rounded-3xl border border-border bg-card p-5 sm:p-6 md:p-8 shadow-2xl text-right max-h-[92vh] overflow-y-auto transition-all',
          isTikTok ? 'max-w-4xl' : 'max-w-3xl',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <VideoPlatformBadge platform={video.platform} />
            <Badge
              variant={video.status === 'PUBLISHED' ? 'primary' : 'secondary'}
              className="text-[11px] font-bold"
            >
              {video.status === 'PUBLISHED' ? 'منشور' : 'مسودة'}
            </Badge>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق المعاينة"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic Layout based on Platform Format */}
        {isTikTok ? (
          /* Split Layout for Vertical TikTok / Shorts Format */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
            {/* Left/Main Column: Smartphone Frame Player (5 cols) */}
            <div className="md:col-span-5 flex justify-center order-2 md:order-1">
              <SocialVideoEmbed
                platform={video.platform}
                url={video.url}
                title={video.title}
                className="shadow-2xl"
              />
            </div>

            {/* Right Column: Metadata & Details (7 cols) */}
            <div className="md:col-span-7 space-y-6 order-1 md:order-2">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold font-mono">
                  <span>TikTok Shorts / Reels Format</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground leading-tight tracking-tight">
                  {video.title}
                </h2>
              </div>

              {/* Description */}
              <div className="p-4 rounded-2xl bg-secondary/40 border border-border space-y-2">
                <span className="text-[11px] font-bold text-muted-foreground block">
                  وصف ومحتوى الفيديو:
                </span>
                <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed whitespace-pre-line">
                  {video.description}
                </p>
              </div>

              {/* Author & Date Details */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-card border border-border/80 text-xs">
                <div className="space-y-1">
                  <span className="text-muted-foreground block text-[11px]">تاريخ النشر:</span>
                  <div className="flex items-center gap-1.5 font-semibold text-foreground">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
                {video.author?.name && (
                  <div className="space-y-1">
                    <span className="text-muted-foreground block text-[11px]">بواسطة:</span>
                    <div className="flex items-center gap-1.5 font-semibold text-foreground">
                      <UserCheck className="h-3.5 w-3.5 text-primary" />
                      <span>{video.author.name}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full gap-2 text-xs font-bold shadow-card h-11">
                    <ExternalLink className="h-4 w-4" />
                    <span>مشاهدة والتفاعل على TikTok</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Standard Widescreen Landscape (YouTube / Facebook) */
          <div className="space-y-6 pt-2">
            {/* Widescreen Video Embed Player */}
            <div className="rounded-2xl overflow-hidden bg-black border border-border shadow-2xl">
              <SocialVideoEmbed platform={video.platform} url={video.url} title={video.title} />
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-2xl font-black text-foreground leading-snug">
                {video.title}
              </h2>
              <p className="text-sm text-foreground-secondary leading-relaxed whitespace-pre-line bg-secondary/40 p-5 rounded-2xl border border-border">
                {video.description}
              </p>
            </div>

            {/* Footer Meta & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <span>{formattedDate}</span>
                </span>
                {video.author?.name && (
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="h-3.5 w-3.5 text-primary" />
                    <span>{video.author.name}</span>
                  </span>
                )}
              </div>

              <a href={video.url} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline" className="gap-2 text-xs font-bold bg-card shadow-xs">
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>مشاهدة على المنصة الأصلية</span>
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
