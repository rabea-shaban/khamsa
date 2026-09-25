'use client';

import React from 'react';
import { Search, Folder, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface MediaFiltersProps {
  folder: string;
  onFolderChange: (folder: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenUpload: () => void;
}

const FOLDERS = [
  { key: 'ALL', label: 'كل المجلدات' },
  { key: 'articles', label: 'المقالات (articles)' },
  { key: 'videos', label: 'الفيديوهات (videos)' },
  { key: 'general', label: 'عام (general)' },
  { key: 'settings', label: 'الإعدادات (settings)' },
];

export function MediaFilters({
  folder,
  onFolderChange,
  searchQuery,
  onSearchChange,
  onOpenUpload,
}: MediaFiltersProps) {
  return (
    <div className="space-y-4 p-4 rounded-2xl border border-border bg-card shadow-card">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="ابحث باسم الملف أو المسار..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="h-10 text-xs pl-8"
          />
          <Search className="h-4 w-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Upload Button */}
        <Button
          size="sm"
          onClick={onOpenUpload}
          className="gap-2 font-bold shadow-card shrink-0"
        >
          <Upload className="h-4 w-4" />
          <span>رفع صورة جديدة</span>
        </Button>
      </div>

      {/* Folder Tabs */}
      <div className="flex items-center gap-2 pt-2 border-t border-border overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-foreground-muted flex items-center gap-1 shrink-0 ml-2">
          <Folder className="h-3.5 w-3.5 text-primary" />
          المجلد:
        </span>
        {FOLDERS.map(f => {
          const isSelected = folder === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => onFolderChange(f.key)}
              className="focus:outline-none"
            >
              <Badge
                variant={isSelected ? 'primary' : 'secondary'}
                className="cursor-pointer text-xs font-semibold px-3 py-1 hover:border-primary/40 transition-colors whitespace-nowrap"
              >
                {f.label}
              </Badge>
            </button>
          );
        })}
      </div>
    </div>
  );
}
