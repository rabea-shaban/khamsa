'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  AlertTriangle,
  Loader2,
  FileText,
} from 'lucide-react';
import {
  useAdminArticles,
  useDeleteArticle,
  usePublishArticle,
  useUnpublishArticle,
  ArticleTable,
} from '@/features/articles';
import { Article, ContentStatus } from '@/types/api';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Pagination } from '@/components/shared/Pagination';

const CATEGORIES = [
  'ALL',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'React',
  'Architecture',
  'Databases',
  'DevOps',
];

export default function ArticlesDashboardPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ContentStatus | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Deletion modal state
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);

  const {
    data: articlesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useAdminArticles({
    page,
    limit: 10,
    search: search || undefined,
    status: statusFilter,
    category: categoryFilter === 'ALL' ? undefined : categoryFilter,
    sort: 'latest',
  });

  const deleteMutation = useDeleteArticle();
  const publishMutation = usePublishArticle();
  const unpublishMutation = useUnpublishArticle();

  const handleTogglePublish = async (article: Article) => {
    if (article.status === ContentStatus.PUBLISHED) {
      await unpublishMutation.mutateAsync(article._id);
    } else {
      await publishMutation.mutateAsync(article._id);
    }
  };

  const confirmDelete = async () => {
    if (!articleToDelete) return;
    await deleteMutation.mutateAsync(articleToDelete._id);
    setArticleToDelete(null);
  };

  const articles = articlesData?.items || [];
  const pagination = articlesData?.pagination;

  return (
    <div className="space-y-6" dir="rtl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground">إدارة المقالات</h1>
          <p className="text-sm text-muted-foreground mt-1">
            إدارة ونشر وتعديل المقالات والدروس التقنية لمنصة خمسة برمجة بالبلدي
          </p>
        </div>

        <Link href="/dashboard/articles/new">
          <Button className="gap-2 font-bold shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4" />
            إضافة مقال جديد
          </Button>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="ابحث في عنوان المقال أو الموجز أو الوسوم..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full h-10 pr-10 pl-4 rounded-xl border border-border bg-secondary/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-right"
            />
            <Search className="h-4 w-4 absolute right-3.5 top-3 text-muted-foreground" />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => {
                setStatusFilter(undefined);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === undefined
                  ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              الكل
            </button>
            <button
              type="button"
              onClick={() => {
                setStatusFilter(ContentStatus.PUBLISHED);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === ContentStatus.PUBLISHED
                  ? 'bg-emerald-500 text-white font-bold shadow-sm'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              المنشورة
            </button>
            <button
              type="button"
              onClick={() => {
                setStatusFilter(ContentStatus.DRAFT);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === ContentStatus.DRAFT
                  ? 'bg-amber-500 text-white font-bold shadow-sm'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              المسودات
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-border/60">
          <span className="text-xs text-muted-foreground flex items-center gap-1 pl-2">
            <Filter className="h-3.5 w-3.5" />
            التصنيف:
          </span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategoryFilter(cat);
                setPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-primary/20 text-primary border border-primary/40 font-bold'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {cat === 'ALL' ? 'جميع التصنيفات' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-16 w-full rounded-2xl" />
          <Skeleton className="h-16 w-full rounded-2xl" />
          <Skeleton className="h-16 w-full rounded-2xl" />
        </div>
      ) : isError ? (
        <ErrorState
          title="تعذر تحميل المقالات"
          message={error instanceof Error ? error.message : 'حدث خطأ أثناء الاتصال بالخادم.'}
          onRetry={() => refetch()}
        />
      ) : articles.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="لا توجد مقالات حتى الآن"
          description={
            search || statusFilter || categoryFilter !== 'ALL'
              ? 'لم يتم العثور على مقالات تطابق خيارات البحث الحالية.'
              : 'ابدأ بكتابة أول مقال أو درس برمجي على منصة خمسة برمجة بالبلدي!'
          }
          action={
            <Link href="/dashboard/articles/new">
              <Button size="sm" className="gap-2 font-bold mt-2">
                <Plus className="h-4 w-4" />
                إضافة أول مقال
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-6">
          <ArticleTable
            articles={articles}
            onDelete={art => setArticleToDelete(art)}
            onTogglePublish={handleTogglePublish}
            publishingId={
              publishMutation.isPending
                ? (publishMutation.variables as string)
                : unpublishMutation.isPending
                  ? (unpublishMutation.variables as string)
                  : null
            }
            deletingId={
              deleteMutation.isPending ? (deleteMutation.variables as string) : null
            }
          />

          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="pt-4 flex justify-center">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={newPage => setPage(newPage)}
              />
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md p-6 rounded-2xl bg-card border border-destructive/30 space-y-4 shadow-2xl text-right">
            <div className="h-12 w-12 rounded-2xl bg-destructive/15 text-destructive flex items-center justify-center mx-auto">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-foreground">تأكيد حذف المقال</h3>
              <p className="text-xs text-muted-foreground">
                هل أنت متأكد من رغبتك في حذف المقال <strong className="text-foreground">"{articleToDelete.title}"</strong>؟ هذا الإجراء نهائي ولا يمكن التراجع عنه.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setArticleToDelete(null)}
                disabled={deleteMutation.isPending}
                className="w-full text-xs"
              >
                إلغاء
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
                className="w-full text-xs font-bold gap-1.5"
              >
                {deleteMutation.isPending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    جارٍ الحذف...
                  </>
                ) : (
                  'نعم، احذف المقال'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
