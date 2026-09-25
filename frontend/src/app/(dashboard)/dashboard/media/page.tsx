'use client';

import React, { useState, useMemo } from 'react';
import { Image as ImageIcon, Upload, RefreshCw } from 'lucide-react';
import { Media } from '@/types/api';
import {
  useMediaList,
  MediaCard,
  MediaUploaderModal,
  MediaPreviewModal,
  MediaDeleteModal,
  MediaFilters,
} from '@/features/media';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';

export default function MediaDashboardPage() {
  const [page, setPage] = useState(1);
  const [folder, setFolder] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<Media | null>(null);
  const [deleteMedia, setDeleteMedia] = useState<Media | null>(null);

  const { data, isLoading, isError, refetch, isFetching } = useMediaList({
    page,
    limit: 12,
    folder: folder === 'ALL' ? undefined : folder,
  });

  const mediaItems: Media[] = data?.items || [];
  const pagination = data?.pagination;

  // Filter items in client if search query is provided
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return mediaItems;
    const q = searchQuery.toLowerCase().trim();
    return mediaItems.filter(
      item =>
        item.filename?.toLowerCase().includes(q) ||
        item.originalName?.toLowerCase().includes(q) ||
        item.key?.toLowerCase().includes(q),
    );
  }, [mediaItems, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-foreground">مكتبة الوسائط السحابية</h1>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-primary/20 text-primary font-mono font-bold">
              {pagination?.total ?? 0} ملف
            </span>
          </div>
          <p className="text-sm text-foreground-muted mt-1">
            إدارة ورفع وتصفح الصور والوسائط مع نسخ الروابط المباشرة
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="gap-1.5 text-xs h-9"
            title="تحديث القائمة"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? 'animate-spin text-primary' : ''}`} />
            <span>تحديث</span>
          </Button>

          <Button
            size="sm"
            onClick={() => setIsUploadOpen(true)}
            className="gap-1.5 font-bold shadow-card h-9"
          >
            <Upload className="h-4 w-4" />
            <span>رفع ملف</span>
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <MediaFilters
        folder={folder}
        onFolderChange={f => {
          setFolder(f);
          setPage(1);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenUpload={() => setIsUploadOpen(true)}
      />

      {/* Main Content Area */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
            <div key={i} className="rounded-2xl border border-border bg-card p-3 space-y-3">
              <Skeleton className="aspect-[4/3] w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : filteredItems.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title={searchQuery || folder !== 'ALL' ? 'لم يتم العثور على وسائط مطابقة' : 'لا توجد وسائط مرفوعة حتى الآن'}
          description={
            searchQuery || folder !== 'ALL'
              ? 'جرّب تغيير كلمات البحث أو اختر مجلداً مختلفاً.'
              : 'ابدأ برفع أول صورة واستخدم الرابط المباشر في مقالاتك وصفحات الموقع.'
          }
          action={{
            label: searchQuery || folder !== 'ALL' ? 'إعادة ضبط الفلاتر' : 'رفع صورة الآن',
            onClick: () => {
              if (searchQuery || folder !== 'ALL') {
                setFolder('ALL');
                setSearchQuery('');
                setPage(1);
              } else {
                setIsUploadOpen(true);
              }
            },
          }}
        />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredItems.map((media: Media) => (
              <MediaCard
                key={media._id}
                media={media}
                onPreview={m => setPreviewMedia(m)}
                onDelete={m => setDeleteMedia(m)}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center pt-4">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={newPage => {
                  setPage(newPage);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* Upload Modal */}
      <MediaUploaderModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={() => refetch()}
      />

      {/* Preview Modal */}
      <MediaPreviewModal
        media={previewMedia}
        isOpen={Boolean(previewMedia)}
        onClose={() => setPreviewMedia(null)}
        onDelete={m => {
          setPreviewMedia(null);
          setDeleteMedia(m);
        }}
      />

      {/* Delete Confirmation Modal */}
      <MediaDeleteModal
        media={deleteMedia}
        isOpen={Boolean(deleteMedia)}
        onClose={() => setDeleteMedia(null)}
        onSuccess={() => refetch()}
      />
    </div>
  );
}
