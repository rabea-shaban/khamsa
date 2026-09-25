'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, BookOpen } from 'lucide-react';
import { articlesApi } from '@/lib/api/articles.api';
import { Article } from '@/types/api';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Pagination } from '@/components/ui/Pagination';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';

const CATEGORIES = [
  'الكل',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'React',
  'Architecture',
  'Databases',
  'DevOps',
  'نصائح عامة',
];

export default function ArticlesPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('الكل');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['public-articles', page, category, searchQuery],
    queryFn: () =>
      articlesApi.getArticles({
        page,
        limit: 9,
        category: category === 'الكل' ? undefined : category,
        search: searchQuery || undefined,
        sort: 'latest',
      }),
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
    setPage(1);
  };

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  const articles: Article[] = data?.data?.items || [];
  const pagination = data?.data?.pagination;

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
          <BookOpen className="h-3.5 w-3.5" />
          <span>مكتبة المقالات والشروحات</span>
        </div>
        <h1 className="text-h1 text-foreground font-extrabold tracking-tight">
          المقالات التقنية
        </h1>
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
          شروحات مفصلة، وأدلة تعليمية، ومقالات معمارية الأنظمة لشرح مفاهيم هندسة البرمجيات باللغة
          العربية البسيطة.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 p-5 rounded-2xl border border-border bg-card shadow-card">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="ابحث عن موضوع، مكتبة، أو تقنية..."
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

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <span className="flex items-center gap-1 text-xs font-bold text-foreground-muted pl-2 select-none">
            <Filter className="h-3.5 w-3.5" />
            <span>الأقسام:</span>
          </span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategorySelect(cat)}
              className="focus:outline-none select-none"
            >
              <Badge
                variant={category === cat ? 'primary' : 'secondary'}
                className="cursor-pointer px-3 py-1 text-xs font-semibold hover:border-primary/50 transition-colors whitespace-nowrap"
              >
                {cat}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid / Loading / Error / Empty States */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="rounded-2xl border border-border bg-card p-4 space-y-4">
              <Skeleton className="aspect-video w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : articles.length > 0 ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: Article) => (
              <ArticleCard key={article._id} article={article} />
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
          icon={BookOpen}
          title="لم يتم العثور على مقالات"
          description={
            searchQuery || category !== 'الكل'
              ? 'جرّب البحث بكلمات أخرى أو اختر قسماً مختلفاً.'
              : 'لا توجد مقالات منشورة حالياً.'
          }
          action={
            (searchQuery || category !== 'الكل')
              ? {
                  label: 'إعادة ضبط الفلاتر',
                  onClick: () => {
                    setCategory('الكل');
                    setSearchInput('');
                    setSearchQuery('');
                    setPage(1);
                  },
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
