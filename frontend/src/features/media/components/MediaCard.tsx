'use client';

import React, { useState } from 'react';
import { Copy, Check, Eye, Trash2, Folder } from 'lucide-react';
import { Media } from '@/types/api';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface MediaCardProps {
  media: Media;
  onPreview: (media: Media) => void;
  onDelete: (media: Media) => void;
}

export function MediaCard({ media, onPreview, onDelete }: MediaCardProps) {
  const [copied, setCopied] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(media.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const folderName = media.key.includes('/') ? media.key.split('/')[0] : 'general';

  const formattedDate = new Date(media.createdAt).toLocaleDateString('ar-EG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div
      onClick={() => onPreview(media)}
      className="group cursor-pointer rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all hover:shadow-card flex flex-col justify-between"
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-[4/3] w-full bg-secondary/60 overflow-hidden">
        <img
          src={media.url}
          alt={media.originalName || media.filename}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Folder Badge */}
        <div className="absolute top-2.5 right-2.5">
          <Badge variant="secondary" className="gap-1 bg-black/60 backdrop-blur-md text-white border-white/10 text-[10px] px-2 py-0.5">
            <Folder className="h-3 w-3 text-primary" />
            <span>{folderName}</span>
          </Badge>
        </div>

        {/* Hover Quick Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={e => {
              e.stopPropagation();
              onPreview(media);
            }}
            className="h-8 w-8 p-0 rounded-full bg-card/90 hover:bg-card text-foreground"
            title="معاينة"
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={handleCopy}
            className="h-8 w-8 p-0 rounded-full bg-card/90 hover:bg-card text-foreground"
            title="نسخ الرابط"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-primary" />}
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={e => {
              e.stopPropagation();
              onDelete(media);
            }}
            className="h-8 w-8 p-0 rounded-full"
            title="حذف الصورة"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Info Details */}
      <div className="p-3.5 space-y-2 border-t border-border/80">
        <h4 className="text-xs font-bold text-foreground truncate" title={media.originalName || media.filename}>
          {media.originalName || media.filename}
        </h4>

        <div className="flex items-center justify-between text-[11px] text-foreground-muted font-mono">
          <span>{formatFileSize(media.size)}</span>
          <span className="font-sans">{formattedDate}</span>
        </div>

        {/* Footer Quick Action */}
        <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2 text-[11px] font-bold text-primary gap-1 w-full hover:bg-primary/10"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-emerald-500">تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>نسخ الرابط المباشر</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
