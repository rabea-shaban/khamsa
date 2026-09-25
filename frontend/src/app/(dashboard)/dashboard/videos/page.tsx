'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Youtube,
  Facebook,
  SlidersHorizontal,
} from 'lucide-react';
import { VideoPlatform, ContentStatus } from '@/types/api';
import { useAdminVideos } from '@/features/videos';
import { VideoTable } from '@/features/videos/components/VideoTable';
import { TikTokIcon } from '@/features/videos/components/VideoPlatformBadge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Pagination } from '@/components/ui/Pagination';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';

export default function VideosDashboardPage() {
  const [page, setPage] = useState(1);
  const [platform, setPlatform] = useState<string>('ALL');
  const [status, setStatus] = useState<string>('ALL');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError, refetch } = useAdminVideos({
    page,
    limit: 10,
    platform: platform === 'ALL' ? undefined : (platform as VideoPlatform),
    status: status === 'ALL' ? undefined : (status as ContentStatus),
    search: searchQuery || undefined,
    sort: 'latest',
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
    setPage(1);
  };

  const platforms = [
    { key: 'ALL', label: 'الكل' },
    { key: VideoPlatform.YOUTUBE, label: 'YouTube', icon: Youtube },
    { key: VideoPlatform.TIKTOK, label: 'TikTok', icon: TikTokIcon },
    { key: VideoPlatform.FACEBOOK, label: 'Facebook', icon: Facebook },
  ];

  const statuses = [
    { key: 'ALL', label: 'جميع الحالات' },
    { key: ContentStatus.PUBLISHED, label: 'منشورة' },
    { key: ContentStatus.DRAFT, label: 'مسودات' },
  ];

  const videos = data?.data?.items || [];
  const pagination = data?.data?.pagination;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-foreground">إدارة الفيديوهات</h1>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-mono font-bold">
              {pagination?.total ?? 0} فيديو
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            إدارة وتضمين فيديوهات السوشيال ميديا على يوتيوب وتيك توك وفيسبوك
          </p>
        </div>

        <Link href="/dashboard/videos/new">
          <Button size="sm" className="gap-2 font-bold shadow-card">
            <Plus className="h-4 w-4" />
            <span>إضافة فيديو جديد</span>
          </Button>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4 p-4 rounded-2xl border border-border bg-card shadow-card">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2 flex-1 max-w-md">
            <Input
              placeholder="ابحث بالعنوان أو الوصف..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="h-10 text-xs"
            />
            <Button type="submit" size="sm" className="h-10 px-4 text-xs font-bold gap-1.5 shrink-0">
              <Search className="h-3.5 w-3.5" />
              <span>بحث</span>
            </Button>
          </form>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {statuses.map(s => {
              const isSelected = status === s.key;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => {
                    setStatus(s.key);
                    setPage(1);
                  }}
                  className="focus:outline-none"
                >
                  <Badge
                    variant={isSelected ? 'primary' : 'secondary'}
                    className="cursor-pointer text-xs font-semibold px-3 py-1 hover:border-primary/40 transition-colors"
                  >
                    {s.label}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>

        {/* Platform Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-border overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1 shrink-0 ml-2">
            <SlidersHorizontal className="h-3 w-3" />
            المنصة:
          </span>
          {platforms.map(p => {
            const isSelected = platform === p.key;
            const Icon = p.icon;

            return (
              <button
                key={p.key}
                type="button"
                onClick={() => {
                  setPlatform(p.key);
                  setPage(1);
                }}
                className="focus:outline-none"
              >
                <Badge
                  variant={isSelected ? 'primary' : 'secondary'}
                  className="cursor-pointer gap-1.5 text-xs font-bold px-3 py-1 hover:border-primary/40 transition-colors"
                >
                  {Icon && <Icon className="h-3 w-3" />}
                  <span>{p.label}</span>
                </Badge>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content State */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-4 rounded-xl border border-border bg-card space-y-3">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-20 rounded-lg shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : videos.length === 0 ? (
        <EmptyState
          title="لا توجد فيديوهات مسجلة حتى الآن"
          description="ابدأ بإضافة أول فيديو شاركته على يوتيوب أو تيك توك أو فيسبوك ليظهر مباشرة لزوار المنصة."
          action={{
            label: 'إضافة أول فيديو',
            onClick: () => {
              window.location.assign('/dashboard/videos/new');
            },
          }}
        />
      ) : (
        <div className="space-y-6">
          <VideoTable videos={videos} />

          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center pt-4">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
