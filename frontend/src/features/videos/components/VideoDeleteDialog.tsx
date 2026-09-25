import React from 'react';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';
import { Video } from '@/types/api';
import { Button } from '@/components/ui/Button';
import { VideoPlatformBadge } from './VideoPlatformBadge';

interface VideoDeleteDialogProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export function VideoDeleteDialog({
  video,
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}: VideoDeleteDialogProps) {
  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl border border-destructive/30 bg-card p-6 shadow-2xl space-y-6 text-right">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">حذف الفيديو</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                هل أنت متأكد من رغبتك في حذف هذا الفيديو نهائياً؟
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Video Card Details */}
        <div className="p-4 rounded-xl bg-secondary/60 border border-border space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-muted-foreground">ID: {video._id.slice(-6)}</span>
            <VideoPlatformBadge platform={video.platform} size="sm" />
          </div>
          <p className="text-sm font-bold text-foreground line-clamp-2">{video.title}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 text-xs font-bold"
          >
            إلغاء
          </Button>
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={onConfirm}
            disabled={isDeleting}
            className="gap-2 px-5 text-xs font-bold bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-card"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>جاري الحذف...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" />
                <span>تأكيد الحذف</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
