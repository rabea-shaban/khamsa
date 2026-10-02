'use client';

import React, { useState, useMemo } from 'react';
import { Plus, Search, RotateCcw, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Toast, ToastProps } from '@/components/ui/Toast';
import { Pagination } from '@/components/shared/Pagination';
import { useAuth } from '@/features/auth';
import {
  FeaturedLink,
  FeaturedLinkFormValues,
  useAdminFeaturedLinks,
  useCreateFeaturedLink,
  useUpdateFeaturedLink,
  useToggleFeaturedLinkActive,
  useDeleteFeaturedLink,
  FeaturedLinksTable,
  FeaturedLinkFormModal,
  DeleteFeaturedLinkModal,
} from '@/features/featured-links';

function getErrorMessage(err: unknown, fallback: string): string {
  if (typeof err === 'object' && err !== null) {
    const responseData = (err as { response?: { data?: { message?: string } } }).response?.data;
    if (responseData?.message && typeof responseData.message === 'string') {
      return responseData.message;
    }
    const message = (err as { message?: string }).message;
    if (message && typeof message === 'string') {
      return message;
    }
  }
  return fallback;
}

export default function FeaturedLinksDashboardPage() {
  const { isAdmin, isEditor } = useAuth();

  // Filter & Pagination States
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'true' | 'false'>('all');

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLinkForEdit, setSelectedLinkForEdit] = useState<FeaturedLink | null>(null);
  const [selectedLinkForDelete, setSelectedLinkForDelete] = useState<FeaturedLink | null>(null);
  const [formServerError, setFormServerError] = useState<string | null>(null);

  // Toast Notification State
  const [toasts, setToasts] = useState<Array<Omit<ToastProps, 'onClose'>>>([]);

  const addToast = (type: 'success' | 'error' | 'warning' | 'info', message: string, title?: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message, title }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Query Params
  const queryParams = useMemo(() => {
    return {
      page,
      limit: 20,
      search: search.trim() || undefined,
      isActive: statusFilter === 'all' ? undefined : statusFilter,
      sort: 'order_asc' as const,
    };
  }, [page, search, statusFilter]);

  // React Query Queries & Mutations
  const { data: responseData, isLoading } = useAdminFeaturedLinks(queryParams);
  const createMutation = useCreateFeaturedLink();
  const updateMutation = useUpdateFeaturedLink();
  const toggleMutation = useToggleFeaturedLinkActive();
  const deleteMutation = useDeleteFeaturedLink();

  // Handle both array response and paginated result
  const links: FeaturedLink[] = Array.isArray(responseData?.data)
    ? responseData.data
    : responseData?.data?.items || [];
  const pagination = !Array.isArray(responseData?.data)
    ? responseData?.data?.pagination
    : undefined;

  // Handlers
  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setPage(1);
  };

  const handleOpenCreate = () => {
    setFormServerError(null);
    setSelectedLinkForEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (link: FeaturedLink) => {
    setFormServerError(null);
    setSelectedLinkForEdit(link);
    setIsFormOpen(true);
  };

  // Form Submit (Create or Update)
  const handleFormSubmit = async (formData: FeaturedLinkFormValues) => {
    try {
      setFormServerError(null);
      if (selectedLinkForEdit) {
        await updateMutation.mutateAsync({
          id: selectedLinkForEdit._id,
          data: formData,
        });
        setIsFormOpen(false);
        addToast('success', 'تم تحديث الرابط بنجاح');
      } else {
        await createMutation.mutateAsync(formData);
        setIsFormOpen(false);
        addToast('success', 'تم إضافة الرابط بنجاح');
      }
    } catch (err: unknown) {
      const msg = getErrorMessage(
        err,
        selectedLinkForEdit ? 'حدث خطأ أثناء تحديث الرابط' : 'حدث خطأ أثناء إضافة الرابط',
      );
      setFormServerError(msg);
      addToast('error', msg);
    }
  };

  // Toggle Active Handler
  const handleToggleActive = async (id: string) => {
    try {
      const targetLink = links.find(l => l._id === id);
      const isCurrentlyActive = targetLink?.isActive;
      await toggleMutation.mutateAsync(id);
      if (isCurrentlyActive) {
        addToast('success', 'تم تعطيل الرابط');
      } else {
        addToast('success', 'تم تفعيل الرابط');
      }
    } catch (err: unknown) {
      const msg = getErrorMessage(err, 'حدث خطأ أثناء تغيير حالة الرابط');
      addToast('error', msg);
    }
  };

  // Delete Confirm Handler
  const handleDeleteConfirm = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      setSelectedLinkForDelete(null);
      addToast('success', 'تم حذف الرابط بنجاح');
    } catch (err: unknown) {
      const msg = getErrorMessage(err, 'حدث خطأ أثناء حذف الرابط');
      addToast('error', msg);
    }
  };

  const isFiltered = search.trim() !== '' || statusFilter !== 'all';

  return (
    <div className="space-y-6 animate-fade-in text-right">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground">الروابط المميزة</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            إدارة الروابط المتغيرة والإعلانات والكورسات والمنح التي تظهر في أعلى صفحة <span className="font-mono text-primary">/links</span>
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          size="sm"
          className="gap-2 shadow-card text-xs font-bold px-4 self-start sm:self-auto bg-primary hover:bg-primary-hover text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
          <span>+ إضافة رابط مميز</span>
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Input
            placeholder="البحث باسم الرابط أو الـ URL..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="text-xs pr-9"
          />
          <Search className="h-4 w-4 text-muted-foreground absolute right-3 top-3 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {/* Status Filter Buttons */}
          <div className="flex items-center rounded-xl bg-surface border border-border p-1 text-xs">
            <button
              type="button"
              onClick={() => {
                setStatusFilter('all');
                setPage(1);
              }}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                statusFilter === 'all'
                  ? 'bg-primary text-primary-foreground shadow-subtle'
                  : 'text-foreground-secondary hover:text-foreground'
              }`}
            >
              الكل
            </button>
            <button
              type="button"
              onClick={() => {
                setStatusFilter('true');
                setPage(1);
              }}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                statusFilter === 'true'
                  ? 'bg-emerald-500 text-white shadow-subtle'
                  : 'text-foreground-secondary hover:text-foreground'
              }`}
            >
              المفعّل
            </button>
            <button
              type="button"
              onClick={() => {
                setStatusFilter('false');
                setPage(1);
              }}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                statusFilter === 'false'
                  ? 'bg-zinc-700 text-white shadow-subtle'
                  : 'text-foreground-secondary hover:text-foreground'
              }`}
            >
              المعطّل
            </button>
          </div>

          {isFiltered && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground"
              title="إعادة تعيين الفلاتر"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Main Table / Cards List */}
      <FeaturedLinksTable
        links={links}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={setSelectedLinkForDelete}
        onToggleActive={handleToggleActive}
        onAddNew={handleOpenCreate}
        isFiltered={isFiltered}
      />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="pt-2 flex justify-center">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* Form Modal (Create / Edit) */}
      <FeaturedLinkFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedLinkForEdit}
        isLoading={createMutation.isPending || updateMutation.isPending}
        serverError={formServerError}
      />

      {/* Delete Confirmation Modal */}
      <DeleteFeaturedLinkModal
        isOpen={!!selectedLinkForDelete}
        link={selectedLinkForDelete}
        onClose={() => setSelectedLinkForDelete(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
      />

      {/* Toast Notification Portal */}
      <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onClose={removeToast} />
          </div>
        ))}
      </div>
    </div>
  );
}
