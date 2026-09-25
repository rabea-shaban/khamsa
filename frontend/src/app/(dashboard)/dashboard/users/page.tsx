'use client';

import React, { useState, useMemo } from 'react';
import { UserPlus, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Toast, ToastProps } from '@/components/ui/Toast';
import { Pagination } from '@/components/shared/Pagination';
import { useAuth } from '@/features/auth';
import {
  User,
  UserRole,
  CreateUserFormValues,
  EditUserFormValues,
  useUsers,
  useUserStats,
  useCreateUser,
  useUpdateUser,
  useChangeUserPassword,
  useToggleUserStatus,
  useDeleteUser,
  UsersStatsCards,
  UserFilters,
  UsersTable,
  CreateUserModal,
  EditUserModal,
  ChangePasswordModal,
  DeleteUserModal,
  ToggleStatusModal,
  UserDetailsModal,
} from '@/features/users';

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

export default function UsersDashboardPage() {
  const { user: currentUser, isAdmin } = useAuth();

  // Filter & Pagination States
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sort, setSort] = useState<'latest' | 'oldest' | 'name_asc' | 'name_desc'>('latest');

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedUserForView, setSelectedUserForView] = useState<User | null>(null);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<User | null>(null);
  const [selectedUserForPassword, setSelectedUserForPassword] = useState<User | null>(null);
  const [selectedUserForStatus, setSelectedUserForStatus] = useState<User | null>(null);
  const [selectedUserForDelete, setSelectedUserForDelete] = useState<User | null>(null);

  // Server Error state for modal forms
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

  // Build query params
  const queryParams = useMemo(() => {
    return {
      page,
      limit: 10,
      search: search.trim() ? search.trim() : undefined,
      role: roleFilter !== 'ALL' ? (roleFilter as UserRole) : undefined,
      isActive: statusFilter !== 'ALL' ? statusFilter === 'true' : undefined,
      sort,
    };
  }, [page, search, roleFilter, statusFilter, sort]);

  // Queries
  const { data: usersResponse, isLoading: isUsersLoading } = useUsers(queryParams);
  const { data: statsResponse, isLoading: isStatsLoading } = useUserStats();

  // Mutations
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const changePasswordMutation = useChangeUserPassword();
  const toggleStatusMutation = useToggleUserStatus();
  const deleteMutation = useDeleteUser();

  const users = usersResponse?.data?.items || [];
  const pagination = usersResponse?.data?.pagination;
  const stats = statsResponse?.data;

  // Handlers for Resetting Filters
  const handleResetFilters = () => {
    setSearch('');
    setRoleFilter('ALL');
    setStatusFilter('ALL');
    setSort('latest');
    setPage(1);
  };

  // Access Control Guard
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <div className="h-16 w-16 rounded-3xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center justify-center">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-black text-foreground">غير مصرح بالدخول</h2>
        <p className="text-xs text-muted-foreground max-w-sm">
          صفحة إدارة المستخدمين والصلاحيات متاحة للمشرفين العامين (ADMIN) فقط.
        </p>
      </div>
    );
  }

  // Create User Submit
  const handleCreateSubmit = async (formData: CreateUserFormValues) => {
    try {
      setFormServerError(null);
      await createMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        isActive: formData.isActive,
      });
      setIsCreateOpen(false);
      addToast('success', 'تم إنشاء المستخدم بنجاح');
    } catch (err: unknown) {
      const msg = getErrorMessage(err, 'حدث خطأ أثناء إنشاء المستخدم');
      setFormServerError(msg);
      addToast('error', msg);
    }
  };

  // Edit User Submit
  const handleEditSubmit = async (id: string, formData: EditUserFormValues) => {
    try {
      setFormServerError(null);
      await updateMutation.mutateAsync({
        id,
        data: {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          isActive: formData.isActive,
        },
      });
      setSelectedUserForEdit(null);
      addToast('success', 'تم تحديث بيانات المستخدم بنجاح');
    } catch (err: unknown) {
      const msg = getErrorMessage(err, 'حدث خطأ أثناء تحديث البيانات');
      setFormServerError(msg);
      addToast('error', msg);
    }
  };

  // Change Password Submit
  const handleChangePasswordSubmit = async (id: string, newPass: string) => {
    try {
      setFormServerError(null);
      await changePasswordMutation.mutateAsync({ id, password: newPass });
      setSelectedUserForPassword(null);
      addToast('success', 'تم تغيير كلمة المرور بنجاح');
    } catch (err: unknown) {
      const msg = getErrorMessage(err, 'حدث خطأ أثناء تغيير كلمة المرور');
      setFormServerError(msg);
      addToast('error', msg);
    }
  };

  // Toggle Status Confirm
  const handleToggleStatusConfirm = async (id: string) => {
    try {
      const targetUser = selectedUserForStatus;
      await toggleStatusMutation.mutateAsync(id);
      setSelectedUserForStatus(null);
      if (targetUser?.isActive) {
        addToast('success', 'تم تعطيل المستخدم بنجاح');
      } else {
        addToast('success', 'تم تفعيل المستخدم بنجاح');
      }
    } catch (err: unknown) {
      const msg = getErrorMessage(err, 'حدث خطأ أثناء تغيير حالة الحساب');
      addToast('error', msg);
    }
  };

  // Delete User Confirm
  const handleDeleteConfirm = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      setSelectedUserForDelete(null);
      addToast('success', 'تم حذف المستخدم بنجاح');
    } catch (err: unknown) {
      const msg = getErrorMessage(err, 'حدث خطأ أثناء حذف المستخدم');
      addToast('error', msg);
    }
  };

  const isFiltered =
    search.trim() !== '' ||
    roleFilter !== 'ALL' ||
    statusFilter !== 'ALL' ||
    sort !== 'latest';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground">المستخدمون</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            إدارة حسابات المستخدمين والصلاحيات داخل المنصة
          </p>
        </div>

        <Button
          onClick={() => {
            setFormServerError(null);
            setIsCreateOpen(true);
          }}
          size="sm"
          className="gap-2 shadow-card text-xs font-bold px-4 self-start sm:self-auto"
        >
          <UserPlus className="h-4 w-4" />
          <span>إضافة مستخدم جديد</span>
        </Button>
      </div>

      {/* Statistics Cards */}
      <UsersStatsCards stats={stats} isLoading={isStatsLoading} />

      {/* Filters Bar */}
      <UserFilters
        search={search}
        onSearchChange={val => {
          setSearch(val);
          setPage(1);
        }}
        roleFilter={roleFilter}
        onRoleFilterChange={val => {
          setRoleFilter(val);
          setPage(1);
        }}
        statusFilter={statusFilter}
        onStatusFilterChange={val => {
          setStatusFilter(val);
          setPage(1);
        }}
        sort={sort}
        onSortChange={val => {
          setSort(val as 'latest' | 'oldest' | 'name_asc' | 'name_desc');
          setPage(1);
        }}
        onReset={handleResetFilters}
      />

      {/* Table / Cards List */}
      <UsersTable
        users={users}
        currentUserId={currentUser?._id}
        isLoading={isUsersLoading}
        onView={setSelectedUserForView}
        onEdit={u => {
          setFormServerError(null);
          setSelectedUserForEdit(u);
        }}
        onChangePassword={u => {
          setFormServerError(null);
          setSelectedUserForPassword(u);
        }}
        onToggleStatus={setSelectedUserForStatus}
        onDelete={setSelectedUserForDelete}
        onAddUser={() => {
          setFormServerError(null);
          setIsCreateOpen(true);
        }}
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

      {/* Modals */}
      <CreateUserModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateSubmit}
        isLoading={createMutation.isPending}
        serverError={formServerError}
      />

      <EditUserModal
        isOpen={!!selectedUserForEdit}
        user={selectedUserForEdit}
        currentUserId={currentUser?._id}
        onClose={() => setSelectedUserForEdit(null)}
        onSubmit={handleEditSubmit}
        isLoading={updateMutation.isPending}
        serverError={formServerError}
      />

      <ChangePasswordModal
        isOpen={!!selectedUserForPassword}
        user={selectedUserForPassword}
        onClose={() => setSelectedUserForPassword(null)}
        onSubmit={handleChangePasswordSubmit}
        isLoading={changePasswordMutation.isPending}
        serverError={formServerError}
      />

      <ToggleStatusModal
        isOpen={!!selectedUserForStatus}
        user={selectedUserForStatus}
        onClose={() => setSelectedUserForStatus(null)}
        onConfirm={handleToggleStatusConfirm}
        isLoading={toggleStatusMutation.isPending}
      />

      <DeleteUserModal
        isOpen={!!selectedUserForDelete}
        user={selectedUserForDelete}
        onClose={() => setSelectedUserForDelete(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
      />

      <UserDetailsModal
        isOpen={!!selectedUserForView}
        user={selectedUserForView}
        onClose={() => setSelectedUserForView(null)}
        onEdit={u => {
          setFormServerError(null);
          setSelectedUserForEdit(u);
        }}
        onChangePassword={u => {
          setFormServerError(null);
          setSelectedUserForPassword(u);
        }}
      />

      {/* Toast Portal */}
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
