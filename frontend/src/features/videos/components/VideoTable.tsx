'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Eye,
  Edit,
  Trash2,
  Globe,
  Lock,
  ExternalLink,
  Play,
  Calendar,
  Loader2,
} from 'lucide-react';
import { Video, ContentStatus } from '@/types/api';
import { VideoPlatformBadge } from './VideoPlatformBadge';
import { VideoPreviewModal } from './VideoPreviewModal';
import { VideoDeleteDialog } from './VideoDeleteDialog';
import { usePublishVideo, useUnpublishVideo, useDeleteVideo } from '../hooks/useVideos';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface VideoTableProps {
  videos: Video[];
}

export function VideoTable({ videos }: VideoTableProps) {
  const [previewVideo, setPreviewVideo] = useState<Video | null>(null);
  const [deleteVideoTarget, setDeleteVideoTarget] = useState<Video | null>(null);

  const publishMutation = usePublishVideo();
  const unpublishMutation = useUnpublishVideo();
  const deleteMutation = useDeleteVideo();

  const handleTogglePublish = async (video: Video) => {
    if (video.status === ContentStatus.PUBLISHED) {
      await unpublishMutation.mutateAsync(video._id);
    } else {
      await publishMutation.mutateAsync(video._id);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteVideoTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteVideoTarget._id);
      setDeleteVideoTarget(null);
    } catch {
      // Handled by react query
    }
  };

  const isTogglingId = (id: string) =>
    (publishMutation.isPending && publishMutation.variables === id) ||
    (unpublishMutation.isPending && unpublishMutation.variables === id);

  return (
    <>
      {/* Desktop Rich Table (Hidden on small screens) */}
      <div className="hidden md:block rounded-2xl border border-border bg-card overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-secondary/50 text-foreground-muted font-bold">
                <th className="py-3.5 px-4 w-20">الصورة</th>
                <th className="py-3.5 px-4">عنوان الفيديو والمنصة</th>
                <th className="py-3.5 px-4 w-32">الحالة</th>
                <th className="py-3.5 px-4 w-36">تاريخ النشر</th>
                <th className="py-3.5 px-4 w-36 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {videos.map(video => {
                const isPublished = video.status === ContentStatus.PUBLISHED;
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

                return (
                  <tr
                    key={video._id}
                    className="hover:bg-secondary/30 transition-colors group"
                  >
                    {/* Thumbnail */}
                    <td className="py-3 px-4">
                      <div
                        onClick={() => setPreviewVideo(video)}
                        className="relative h-12 w-20 rounded-lg overflow-hidden bg-secondary border border-border shrink-0 cursor-pointer group/thumb"
                      >
                        {video.thumbnail ? (
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="h-full w-full object-cover transition-transform group-hover/thumb:scale-105"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                            <Play className="h-4 w-4" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="h-4 w-4 text-white fill-current" />
                        </div>
                      </div>
                    </td>

                    {/* Title & Platform */}
                    <td className="py-3 px-4 max-w-md">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <VideoPlatformBadge platform={video.platform} size="sm" />
                          <span
                            onClick={() => setPreviewVideo(video)}
                            className="font-bold text-foreground hover:text-primary transition-colors cursor-pointer line-clamp-1 text-xs sm:text-sm"
                          >
                            {video.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-1">
                          {video.description}
                        </p>
                      </div>
                    </td>

                    {/* Status Badge & Quick Toggle */}
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(video)}
                        disabled={isTogglingId(video._id)}
                        className="focus:outline-none"
                        title="اضغط لتغيير حالة النشر"
                      >
                        {isTogglingId(video._id) ? (
                          <Badge variant="secondary" className="gap-1 text-[11px]">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            <span>جاري التحديث...</span>
                          </Badge>
                        ) : isPublished ? (
                          <Badge
                            variant="primary"
                            className="gap-1 text-[11px] cursor-pointer hover:bg-primary/80"
                          >
                            <Globe className="h-3 w-3" />
                            <span>منشور</span>
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="gap-1 text-[11px] cursor-pointer hover:border-primary/50"
                          >
                            <Lock className="h-3 w-3" />
                            <span>مسودة</span>
                          </Badge>
                        )}
                      </button>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-muted-foreground font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-muted-foreground/70" />
                        <span>{formattedDate}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-left">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPreviewVideo(video)}
                          title="معاينة الفيديو"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>

                        <Link href={`/dashboard/videos/${video._id}/edit`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            title="تعديل الفيديو"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                        </Link>

                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="فتح الرابط الأصلي"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </a>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteVideoTarget(video)}
                          title="حذف الفيديو"
                          className="h-8 w-8 p-0 text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards View (Visible on mobile screens) */}
      <div className="md:hidden space-y-4">
        {videos.map(video => {
          const isPublished = video.status === ContentStatus.PUBLISHED;
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

          return (
            <Card
              key={video._id}
              className="p-4 border border-border bg-card shadow-card space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  onClick={() => setPreviewVideo(video)}
                  className="relative h-16 w-24 rounded-lg overflow-hidden bg-secondary border border-border shrink-0 cursor-pointer"
                >
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                      <Play className="h-5 w-5" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="h-4 w-4 text-white fill-current" />
                  </div>
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <VideoPlatformBadge platform={video.platform} size="sm" />
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(video)}
                      disabled={isTogglingId(video._id)}
                    >
                      {isPublished ? (
                        <Badge variant="primary" className="text-[10px]">
                          منشور
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[10px]">
                          مسودة
                        </Badge>
                      )}
                    </button>
                  </div>
                  <h4
                    onClick={() => setPreviewVideo(video)}
                    className="text-xs font-bold text-foreground line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                  >
                    {video.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border text-[11px] text-muted-foreground">
                <div className="flex items-center gap-1.5 font-mono">
                  <Calendar className="h-3 w-3" />
                  <span>{formattedDate}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPreviewVideo(video)}
                    className="h-7 px-2 text-xs"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                  <Link href={`/dashboard/videos/${video._id}/edit`}>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeleteVideoTarget(video)}
                    className="h-7 px-2 text-xs text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Preview Modal */}
      <VideoPreviewModal
        video={previewVideo}
        isOpen={Boolean(previewVideo)}
        onClose={() => setPreviewVideo(null)}
      />

      {/* Delete Confirmation Dialog */}
      <VideoDeleteDialog
        video={deleteVideoTarget}
        isOpen={Boolean(deleteVideoTarget)}
        onClose={() => setDeleteVideoTarget(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteMutation.isPending}
      />
    </>
  );
}
