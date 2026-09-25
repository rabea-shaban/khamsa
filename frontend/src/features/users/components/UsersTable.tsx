import {
  Eye,
  Edit3,
  KeyRound,
  Power,
  Trash2,
  Calendar,
} from 'lucide-react';
import { User } from '@/types/api';
import { UserAvatar } from './UserAvatar';
import { UserRoleBadge } from './UserRoleBadge';
import { UserStatusBadge } from './UserStatusBadge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

interface UsersTableProps {
  users: User[];
  currentUserId?: string;
  isLoading: boolean;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onChangePassword: (user: User) => void;
  onToggleStatus: (user: User) => void;
  onDelete: (user: User) => void;
  onAddUser: () => void;
  isFiltered: boolean;
}

export function UsersTable({
  users,
  currentUserId,
  isLoading,
  onView,
  onEdit,
  onChangePassword,
  onToggleStatus,
  onDelete,
  onAddUser,
  isFiltered,
}: UsersTableProps) {
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(d);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-44" />
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <Skeleton className="h-6 w-16 rounded-lg" />
              <Skeleton className="h-6 w-16 rounded-lg" />
              <Skeleton className="h-8 w-24 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    if (isFiltered) {
      return (
        <EmptyState
          title="لم يتم العثور على أي مستخدمين"
          description="جرّب تعديل كلمات البحث أو تغيير الفلاتر المحددة لعرض النتائج."
        />
      );
    }

    return (
      <EmptyState
        title="لا يوجد مستخدمون حالياً"
        description="ابدأ بإضافة أول مشرف أو محرر إلى منصة خمسة برمجة بالبلدي."
        action={
          <Button onClick={onAddUser} size="sm" className="gap-2">
            إضافة مستخدم جديد
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden md:block rounded-2xl border border-border bg-card overflow-hidden shadow-card">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/40 text-[11px] font-bold text-muted-foreground">
              <th className="py-3.5 px-4 font-bold">المستخدم</th>
              <th className="py-3.5 px-4 font-bold">البريد الإلكتروني</th>
              <th className="py-3.5 px-4 font-bold">الدور</th>
              <th className="py-3.5 px-4 font-bold">الحالة</th>
              <th className="py-3.5 px-4 font-bold">تاريخ الانضمام</th>
              <th className="py-3.5 px-4 font-bold text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs">
            {users.map(user => {
              const isSelf = currentUserId === user._id;

              return (
                <tr
                  key={user._id}
                  className="hover:bg-secondary/30 transition-colors group"
                >
                  {/* User Name + Avatar */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} avatar={user.avatar} size="sm" />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                            {user.name}
                          </span>
                          {isSelf && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-primary/10 text-primary border border-primary/20 font-bold">
                              أنت
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-muted-foreground text-xs" dir="ltr">
                      {user.email}
                    </span>
                  </td>

                  {/* Role */}
                  <td className="py-3.5 px-4">
                    <UserRoleBadge role={user.role} />
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <UserStatusBadge isActive={user.isActive} />
                  </td>

                  {/* Created At */}
                  <td className="py-3.5 px-4 text-muted-foreground font-medium text-[11px]">
                    {formatDate(user.createdAt)}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(user)}
                        className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
                        title="عرض التفاصيل"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(user)}
                        className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
                        title="تعديل البيانات"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onChangePassword(user)}
                        className="h-8 w-8 p-0 rounded-lg text-amber-500/80 hover:text-amber-500 hover:bg-amber-500/10"
                        title="تغيير كلمة المرور"
                      >
                        <KeyRound className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleStatus(user)}
                        disabled={isSelf && user.isActive}
                        className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30"
                        title={user.isActive ? 'تعطيل الحساب' : 'تفعيل الحساب'}
                      >
                        <Power
                          className={`h-3.5 w-3.5 ${
                            user.isActive ? 'text-emerald-500' : 'text-zinc-400'
                          }`}
                        />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(user)}
                        disabled={isSelf}
                        className="h-8 w-8 p-0 rounded-lg text-destructive/70 hover:text-destructive hover:bg-destructive/10 disabled:opacity-30"
                        title={isSelf ? 'لا يمكنك حذف حسابك الحالي' : 'حذف المستخدم'}
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

      {/* Mobile Cards View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:hidden">
        {users.map(user => {
          const isSelf = currentUserId === user._id;

          return (
            <Card
              key={user._id}
              className="border border-border bg-card shadow-card p-4 space-y-4"
            >
              <CardContent className="p-0 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <UserAvatar name={user.name} avatar={user.avatar} size="sm" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-xs text-foreground">{user.name}</h4>
                        {isSelf && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-primary/10 text-primary font-bold">
                            أنت
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-[11px] text-muted-foreground" dir="ltr">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center justify-between pt-1 border-t border-border/60">
                  <div className="flex items-center gap-1.5">
                    <UserRoleBadge role={user.role} />
                    <UserStatusBadge isActive={user.isActive} />
                  </div>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono">
                    <Calendar className="h-3 w-3" />
                    {formatDate(user.createdAt)}
                  </span>
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-5 gap-1 pt-2 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onView(user)}
                    className="h-8 p-0 text-muted-foreground"
                    title="عرض"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(user)}
                    className="h-8 p-0 text-muted-foreground"
                    title="تعديل"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onChangePassword(user)}
                    className="h-8 p-0 text-amber-500"
                    title="كلمة المرور"
                  >
                    <KeyRound className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onToggleStatus(user)}
                    disabled={isSelf && user.isActive}
                    className="h-8 p-0 text-muted-foreground disabled:opacity-30"
                    title="الحالة"
                  >
                    <Power
                      className={`h-3.5 w-3.5 ${
                        user.isActive ? 'text-emerald-500' : 'text-zinc-400'
                      }`}
                    />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(user)}
                    disabled={isSelf}
                    className="h-8 p-0 text-destructive disabled:opacity-30"
                    title="حذف"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
