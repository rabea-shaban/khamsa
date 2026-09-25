'use client';

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, BookOpen } from 'lucide-react';
import { articlesApi } from '@/lib/api/articles.api';
import { Article, ContentStatus } from '@/types/api';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Pagination } from '@/components/ui/Pagination';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { STATIC_ARTICLES } from '@/data/static-articles';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';

const CATEGORIES = [
  'الكل',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Backend',
  'Databases',
  'Security',
  'Architecture',
  'DevOps',
  'Performance',
  'Testing',
  'Frontend',
];

export default function ArticlesPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('الكل');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 9;

  // Fetch dynamic CMS articles from database API
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['public-articles', category, searchQuery],
    queryFn: () =>
      articlesApi.getArticles({
        limit: 100,
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

  // Convert static articles to standard Article interface
  const staticMapped: Article[] = useMemo(() => {
    return STATIC_ARTICLES.map(s => ({
      _id: s.id,
      title: s.title,
      slug: s.slug,
      excerpt: s.excerpt,
      content: s.content,
      coverImage: s.coverImage,
      category: s.category,
      tags: s.tags,
      isFeatured: s.isFeatured,
      author: {
        _id: 'author-rabie',
        name: s.author.name,
        email: 'contact@khamsa.dev',
        avatar: s.author.avatar,
      },
      status: ContentStatus.PUBLISHED,
      publishedAt: s.publishedAt,
      createdAt: s.publishedAt,
      updatedAt: s.updatedAt,
      seo: s.seo,
    }));
  }, []);

  // Merge static articles and dynamic DB articles with deduplication by slug
  const allArticles = useMemo(() => {
    const dynamicItems: Article[] = data?.data?.items || [];
    const seenSlugs = new Set<string>();
    const merged: Article[] = [];

    // Prioritize static high-quality educational articles first
    for (const art of staticMapped) {
      if (!seenSlugs.has(art.slug.toLowerCase())) {
        seenSlugs.add(art.slug.toLowerCase());
        merged.push(art);
      }
    }

    // Add dynamic DB articles if they are not already in static
    for (const art of dynamicItems) {
      if (art.slug && !seenSlugs.has(art.slug.toLowerCase())) {
        seenSlugs.add(art.slug.toLowerCase());
        merged.push(art);
      }
    }

    // Filter by category
    let filtered = merged;
    if (category !== 'الكل') {
      filtered = filtered.filter(
        a => a.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        a =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt?.toLowerCase().includes(q) ||
          a.tags?.some(t => t.toLowerCase().includes(q))
      );
    }

    return filtered;
  }, [staticMapped, data?.data?.items, category, searchQuery]);

  const totalArticles = allArticles.length;
  const totalPages = Math.ceil(totalArticles / pageSize) || 1;
  const paginatedArticles = allArticles.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-12">
      <ArticleBreadcrumb items={[{ label: 'المقالات والشروحات' }]} />

      {/* Page Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
          <BookOpen className="h-3.5 w-3.5" />
          <span>مكتبة المقالات والشروحات المعمارية</span>
        </div>
        <h1 className="text-h1 text-foreground font-extrabold tracking-tight">
          المقالات الهندسية والتقنية
        </h1>
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
          شروحات مفصلة، وأدلة تعليمية، ومقالات معمارية الأنظمة لشرح مفاهيم هندسة البرمجيات باللغة
          العربية بأسلوب عملي وعميق.
        </p>
      </div>

      {/* Search & Categories Bar */}
      <div className="space-y-4 p-5 rounded-2xl border border-border bg-card shadow-card">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="ابحث عن موضوع، مكتبة، أو تقنية (مثال: React 19, Event Loop, MongoDB)..."
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
          <span className="flex items-center gap-1 text-xs font-bold text-foreground-muted pl-2 select-none shrink-0">
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

      {/* Optional Safe Ad Placement */}
      <AdSlot slot="articles-top-banner" />

      {/* Articles Grid / Loading / Error / Empty States */}
      {isLoading && allArticles.length === 0 ? (
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
      ) : isError && allArticles.length === 0 ? (
        <ErrorState onRetry={() => refetch()} />
      ) : paginatedArticles.length > 0 ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles.map((article: Article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
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
          title="لم يتم العثور على مقالات مطابقة"
          description={
            searchQuery || category !== 'الكل'
              ? 'جرّب البحث بكلمات أخرى أو اختر قسماً تقنياً مختلفاً.'
              : 'لا توجد مقالات منشورة حالياً.'
          }
          action={
            searchQuery || category !== 'الكل'
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
