'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Video as VideoIcon, Youtube, Facebook } from 'lucide-react';
import { videosApi } from '@/lib/api/videos.api';
import { Video, VideoPlatform } from '@/types/api';
import { VideoCard } from '@/components/videos/VideoCard';
import { VideoPreviewModal, TikTokIcon } from '@/features/videos';
import { Pagination } from '@/components/ui/Pagination';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';

export default function VideosPage() {
  const [page, setPage] = useState(1);
  const [platform, setPlatform] = useState<string>('ALL');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['public-videos', page, platform, searchQuery],
    queryFn: () =>
      videosApi.getVideos({
        page,
        limit: 9,
        platform: platform === 'ALL' ? undefined : (platform as VideoPlatform),
        search: searchQuery || undefined,
        sort: 'latest',
      }),
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
    setPage(1);
  };

  const platforms = [
    { key: 'ALL', label: 'كل المنصات', icon: VideoIcon },
    { key: VideoPlatform.YOUTUBE, label: 'YouTube', icon: Youtube },
    { key: VideoPlatform.TIKTOK, label: 'TikTok', icon: TikTokIcon },
    { key: VideoPlatform.FACEBOOK, label: 'Facebook', icon: Facebook },
  ];

  const videos: Video[] = data?.data?.items || [];
  const pagination = data?.data?.pagination;

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
          <VideoIcon className="h-3.5 w-3.5" />
          <span>مكتبة الفيديوهات التعليمية</span>
        </div>
        <h1 className="text-h1 text-foreground font-extrabold tracking-tight">
          فيديوهات السوشيال ميديا
        </h1>
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
          كبسولات وشروحات برمجية قصيرة ومباشرة على يوتيوب، تيك توك، وفيسبوك لتبسيط أهم المفاهيم
          البرمجية.
        </p>
      </div>

      {/* Search & Platform Tabs */}
      <div className="space-y-4 p-5 rounded-2xl border border-border bg-card shadow-card">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="ابحث عن فيديو أو شرح محدد..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="h-11"
            />
          </div>
          <Button type="submit" className="h-11 px-6 font-bold text-xs gap-1.5 shadow-subtle">
            <Search className="h-3.5 w-3.5" />
            بحث
          </Button>
        </form>

        {/* Platform Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {platforms.map(p => {
            const Icon = p.icon;
            const isSelected = platform === p.key;

            return (
              <button
                key={p.key}
                type="button"
                onClick={() => {
                  setPlatform(p.key);
                  setPage(1);
                }}
                className="focus:outline-none select-none"
              >
                <Badge
                  variant={isSelected ? 'primary' : 'secondary'}
                  className="cursor-pointer gap-1.5 px-3.5 py-1.5 text-xs font-bold hover:border-primary/50 transition-colors whitespace-nowrap"
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{p.label}</span>
                </Badge>
              </button>
            );
          })}
        </div>
      </div>

      {/* Videos Grid / Loading / Error / Empty States */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="rounded-2xl border border-border bg-card p-4 space-y-4">
              <Skeleton className="aspect-video w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : videos.length > 0 ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video: Video) => (
              <VideoCard
                key={video._id}
                video={video}
                onPlay={v => setActiveVideo(v)}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={newPage => {
                setPage(newPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </div>
      ) : (
        <EmptyState
          icon={VideoIcon}
          title="لم يتم العثور على فيديوهات"
          description={
            searchQuery || platform !== 'ALL'
              ? 'جرّب البحث بكلمات أخرى أو اختر منصة مختلفة.'
              : 'لا توجد فيديوهات منشورة حالياً.'
          }
          action={
            searchQuery || platform !== 'ALL'
              ? {
                  label: 'إعادة ضبط الفلاتر',
                  onClick: () => {
                    setPlatform('ALL');
                    setSearchInput('');
                    setSearchQuery('');
                    setPage(1);
                  },
                }
              : undefined
          }
        />
      )}

      {/* Video Watch & Embed Modal */}
      <VideoPreviewModal
        video={activeVideo}
        isOpen={Boolean(activeVideo)}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
}
