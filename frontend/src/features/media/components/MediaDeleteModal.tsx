'use client';

import React from 'react';
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Media } from '@/types/api';
import { useDeleteMedia } from '../hooks/useMedia';

interface MediaDeleteModalProps {
  media: Media | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function MediaDeleteModal({ media, isOpen, onClose, onSuccess }: MediaDeleteModalProps) {
  const deleteMutation = useDeleteMedia();

  if (!media) return null;

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(media._id);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Failed to delete media:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="تأكيد حذف الصورة"
      description="هل أنت متأكد من رغبتك في حذف هذا الملف؟ لن تتمكن من استرجاعه مرة أخرى."
      size="sm"
    >
      <div className="space-y-5">
        <div className="h-12 w-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
          <AlertTriangle className="h-6 w-6" />
        </div>

        {/* Selected Media Item Card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-secondary border border-border">
          <img
            src={media.url}
            alt={media.originalName || media.filename}
            className="h-12 w-12 rounded-xl object-cover border border-border shrink-0"
          />
          <div className="space-y-0.5 overflow-hidden">
            <p className="text-xs font-bold text-foreground truncate">
              {media.originalName || media.filename}
            </p>
            <p className="text-[11px] text-foreground-muted font-mono truncate" dir="ltr">
              {media.key}
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="text-xs"
          >
            إلغاء
          </Button>

          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="gap-2 text-xs font-bold shadow-card px-6"
          >
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>جاري الحذف...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                <span>حذف نهائي</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
