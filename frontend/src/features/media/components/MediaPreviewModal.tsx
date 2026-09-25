'use client';

import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Trash2, Calendar, HardDrive, FileType, Key } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Media } from '@/types/api';

interface MediaPreviewModalProps {
  media: Media | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (media: Media) => void;
}

export function MediaPreviewModal({ media, isOpen, onClose, onDelete }: MediaPreviewModalProps) {
  const [copied, setCopied] = useState(false);

  if (!media) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(media.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formattedDate = new Date(media.createdAt).toLocaleDateString('ar-EG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={media.originalName || media.filename}
      size="lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Image Display (7 cols) */}
        <div className="md:col-span-7 flex items-center justify-center rounded-2xl bg-black/50 border border-border p-3 overflow-hidden min-h-[250px]">
          <img
            src={media.url}
            alt={media.originalName || media.filename}
            className="max-h-[380px] w-auto max-w-full object-contain rounded-lg"
          />
        </div>

        {/* Metadata & Controls (5 cols) */}
        <div className="md:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-foreground-muted uppercase tracking-wider">
              بيانات الصورة:
            </h4>

            <div className="space-y-2.5 text-xs text-foreground-secondary">
              <div className="flex items-center justify-between p-2 rounded-xl bg-secondary">
                <span className="flex items-center gap-1.5 text-foreground-muted">
                  <HardDrive className="h-3.5 w-3.5 text-primary" />
                  الحجم:
                </span>
                <span className="font-mono font-bold text-foreground">
                  {formatFileSize(media.size)}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-secondary">
                <span className="flex items-center gap-1.5 text-foreground-muted">
                  <FileType className="h-3.5 w-3.5 text-primary" />
                  النوع (MIME):
                </span>
                <span className="font-mono text-foreground font-semibold">
                  {media.mimeType}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-secondary">
                <span className="flex items-center gap-1.5 text-foreground-muted">
                  <Key className="h-3.5 w-3.5 text-primary" />
                  مسار الملف (Key):
                </span>
                <span className="font-mono text-[11px] text-foreground truncate max-w-[140px]" title={media.key}>
                  {media.key}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-secondary">
                <span className="flex items-center gap-1.5 text-foreground-muted">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  تاريخ الرفع:
                </span>
                <span className="text-[11px] text-foreground">
                  {formattedDate}
                </span>
              </div>
            </div>

            {/* Direct URL Display & Copy */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-bold text-foreground-muted block">
                الرابط المباشر (Public URL):
              </label>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-secondary/80 border border-border text-[11px] font-mono">
                <span className="truncate flex-1 text-primary" dir="ltr">
                  {media.url}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1 rounded-lg hover:bg-card text-foreground transition-colors"
                  title="نسخ"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="space-y-2 pt-4 border-t border-border">
            <Button
              size="sm"
              onClick={handleCopy}
              className="w-full gap-2 text-xs font-bold shadow-card"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-950" />
                  <span>تم نسخ الرابط للحافظة!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>نسخ الرابط المباشر</span>
                </>
              )}
            </Button>

            <div className="flex items-center gap-2">
              <a
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
                  <ExternalLink className="h-3.5 w-3.5 text-primary" />
                  <span>فتح في نافذة جديدة</span>
                </Button>
              </a>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  onClose();
                  onDelete(media);
                }}
                className="gap-1.5 text-xs"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>حذف</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
