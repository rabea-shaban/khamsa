import React, { useState } from 'react';
import { Play, Eye, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { VideoPlatform } from '@/types/api';
import { SocialVideoEmbed } from './SocialVideoEmbed';
import { VideoPlatformBadge } from './VideoPlatformBadge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface VideoPreviewProps {
  platform: VideoPlatform;
  url: string;
  title?: string;
  thumbnail?: string | null;
  description?: string;
}

export function VideoPreview({
  platform,
  url,
  title = 'عنوان الفيديو',
  thumbnail,
  description,
}: VideoPreviewProps) {
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <Card className="overflow-hidden border border-border bg-card shadow-card space-y-4 p-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold text-foreground">المعاينة المباشرة</span>
        </div>
        <VideoPlatformBadge platform={platform} size="sm" />
      </div>

      {/* Main Visual Player or Thumbnail */}
      <div className="space-y-3">
        {showEmbed && url ? (
          <div className="space-y-2">
            <SocialVideoEmbed platform={platform} url={url} title={title} />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowEmbed(false)}
              className="w-full text-xs gap-1.5 h-8"
            >
              <ImageIcon className="h-3.5 w-3.5" />
              العودة لعرض الصورة المصغرة
            </Button>
          </div>
        ) : (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-surface border border-border group">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2 bg-surface-hover/50">
                <Play className="h-8 w-8 text-primary/40" />
                <p className="text-[11px] text-muted-foreground font-mono">
                  سيتم عرض الصورة المصغرة أو المشغل هنا
                </p>
              </div>
            )}

            {url && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setShowEmbed(true)}
                  className="gap-1.5 text-xs font-bold shadow-lg"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  تشغيل المشغل
                </Button>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs font-bold bg-card"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    المصدر
                  </Button>
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Metadata Preview */}
      <div className="space-y-1.5 pt-2">
        <h4 className="text-sm font-bold text-foreground line-clamp-2">
          {title || 'عنوان الفيديو'}
        </h4>
        {description && (
          <p className="text-xs text-foreground-secondary line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </Card>
  );
}
