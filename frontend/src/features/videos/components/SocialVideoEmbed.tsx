import React, { useState } from 'react';
import { ExternalLink, Play, RefreshCw } from 'lucide-react';
import { VideoPlatform } from '@/types/api';
import { extractYouTubeId, getYouTubeEmbedUrl } from '../utils/youtube';
import { getTikTokEmbedUrl } from '../utils/tiktok';
import { getFacebookEmbedUrl } from '../utils/facebook';
import { Button } from '@/components/ui/Button';
import { VideoPlatformBadge } from './VideoPlatformBadge';
import { cn } from '@/lib/utils/cn';

interface SocialVideoEmbedProps {
  platform: VideoPlatform;
  url: string;
  title?: string;
  className?: string;
  aspectRatio?: '16/9' | '9/16' | 'square' | 'auto';
}

export function SocialVideoEmbed({
  platform,
  url,
  title = 'فيديو خمسة برمجة بالبلدي',
  className,
  aspectRatio = '16/9',
}: SocialVideoEmbedProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-secondary/40 border border-border text-center space-y-2">
        <Play className="h-8 w-8 text-muted-foreground opacity-40" />
        <p className="text-xs text-muted-foreground">لا يوجد رابط فيديو لعرضه</p>
      </div>
    );
  }

  // Fallback View
  const renderFallback = (reason?: string) => (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-secondary/60 border border-border text-center space-y-4">
      <div className="flex items-center gap-2">
        <VideoPlatformBadge platform={platform} />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-bold text-foreground">
          {reason || 'مشاهدة الفيديو مباشرة على المنصة'}
        </p>
        <p className="text-xs text-muted-foreground max-w-sm">
          يمكنك متابعة الشرح الكامل بدقة عالية والتفاعل مع التعليقات على المنصة الأصلية.
        </p>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Button size="sm" className="gap-2 font-bold text-xs shadow-card">
          <ExternalLink className="h-4 w-4" />
          <span>فتح الرابط على {platform}</span>
        </Button>
      </a>
    </div>
  );

  if (hasError) {
    return renderFallback('تعذر تضمين المشغل داخل الموقع');
  }

  // 1. YouTube Embed (16:9 Widescreen)
  if (platform === VideoPlatform.YOUTUBE) {
    const videoId = extractYouTubeId(url);
    if (!videoId) {
      return renderFallback('تعذر استخراج معرّف فيديو YouTube');
    }

    const embedUrl = getYouTubeEmbedUrl(videoId);

    return (
      <div
        className={cn(
          'relative w-full rounded-2xl overflow-hidden bg-black border border-border shadow-xl',
          aspectRatio === '16/9' ? 'aspect-video' : 'aspect-video',
          className,
        )}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-card animate-pulse">
            <RefreshCw className="h-6 w-6 text-primary animate-spin" />
          </div>
        )}
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  // 2. TikTok Embed (Smartphone Frame Mockup - Pixel-Perfect Height & No Scrollbars)
  if (platform === VideoPlatform.TIKTOK) {
    const embedUrl = getTikTokEmbedUrl(url);

    if (embedUrl) {
      return (
        <div className="flex justify-center w-full py-2">
          {/* Smartphone Mockup Frame */}
          <div
            className={cn(
              'relative rounded-[32px] p-2.5 bg-slate-950 border-4 border-slate-800/90 shadow-2xl ring-1 ring-border/50 overflow-hidden flex flex-col items-center justify-center',
              className,
            )}
            style={{ width: '100%', maxWidth: '340px', height: '640px' }}
          >
            {/* Phone Top Notch / Speaker */}
            <div className="absolute top-3 z-20 flex items-center justify-center w-full pointer-events-none">
              <div className="h-4 w-20 rounded-full bg-slate-900 border border-slate-800/80 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-slate-800 mr-2" />
                <div className="h-1 w-8 rounded-full bg-slate-800" />
              </div>
            </div>

            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-card animate-pulse rounded-[26px]">
                <RefreshCw className="h-7 w-7 text-primary animate-spin" />
                <span className="text-[11px] font-bold text-muted-foreground font-mono">
                  جاري تحميل فيديو TikTok...
                </span>
              </div>
            )}

            {/* TikTok iframe */}
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              scrolling="no"
              onLoad={() => setIsLoading(false)}
              onError={() => setHasError(true)}
              className="w-full h-full border-0 rounded-[24px] bg-black"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                overflow: 'hidden',
              }}
            />
          </div>
        </div>
      );
    }

    // TikTok fallback when URL is a short link or redirect
    return renderFallback();
  }

  // 3. Facebook Embed
  if (platform === VideoPlatform.FACEBOOK) {
    const embedUrl = getFacebookEmbedUrl(url);

    if (!embedUrl) {
      return renderFallback();
    }

    return (
      <div
        className={cn(
          'relative w-full rounded-2xl overflow-hidden bg-black border border-border shadow-xl aspect-video min-h-[280px]',
          className,
        )}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-card animate-pulse">
            <RefreshCw className="h-6 w-6 text-primary animate-spin" />
          </div>
        )}
        <iframe
          src={embedUrl}
          title={title}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          scrolling="no"
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  return renderFallback();
}
