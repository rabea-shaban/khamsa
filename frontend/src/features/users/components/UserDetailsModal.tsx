import React from 'react';
import {
  Calendar,
  Clock,
  Key,
  Edit3,
  UserCheck,
} from 'lucide-react';
import { User } from '@/types/api';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { UserAvatar } from './UserAvatar';
import { UserRoleBadge } from './UserRoleBadge';
import { UserStatusBadge } from './UserStatusBadge';

interface UserDetailsModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onEdit: (user: User) => void;
  onChangePassword: (user: User) => void;
}

export function UserDetailsModal({
  isOpen,
  user,
  onClose,
  onEdit,
  onChangePassword,
}: UserDetailsModalProps) {
  if (!user) return null;

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'لم يسجل دخول بعد';
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(d);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="تفاصيل حساب المستخدم"
      size="md"
    >
      <div className="space-y-6 pt-2 text-right">
        {/* Profile Card Header */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/40 border border-border">
          <UserAvatar name={user.name} avatar={user.avatar} size="lg" />
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-foreground">{user.name}</h3>
              <UserStatusBadge isActive={user.isActive} />
            </div>
            <p className="font-mono text-xs text-muted-foreground" dir="ltr">
              {user.email}
            </p>
            <div className="pt-0.5">
              <UserRoleBadge role={user.role} />
            </div>
          </div>
        </div>

        {/* Detailed Grid Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-border bg-card space-y-1">
            <span className="text-muted-foreground flex items-center gap-1.5 font-semibold text-[11px]">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              تاريخ إنشاء الحساب
            </span>
            <p className="font-semibold text-foreground pt-0.5">
              {formatDate(user.createdAt)}
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-border bg-card space-y-1">
            <span className="text-muted-foreground flex items-center gap-1.5 font-semibold text-[11px]">
              <Clock className="h-3.5 w-3.5 text-sky-400" />
              آخر تحديث للبيانات
            </span>
            <p className="font-semibold text-foreground pt-0.5">
              {formatDate(user.updatedAt)}
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-border bg-card space-y-1">
            <span className="text-muted-foreground flex items-center gap-1.5 font-semibold text-[11px]">
              <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
              آخر تسجيل دخول
            </span>
            <p className="font-semibold text-foreground pt-0.5">
              {formatDate(user.lastLoginAt)}
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-border bg-card space-y-1">
            <span className="text-muted-foreground flex items-center gap-1.5 font-semibold text-[11px]">
              <Key className="h-3.5 w-3.5 text-amber-400" />
              المعرف الفريد (ID)
            </span>
            <p className="font-mono text-[11px] text-foreground pt-0.5 truncate" dir="ltr">
              {user._id}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                onClose();
                onEdit(user);
              }}
              className="gap-1.5 text-xs font-bold"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>تعديل</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                onClose();
                onChangePassword(user);
              }}
              className="gap-1.5 text-xs font-bold text-amber-500"
            >
              <Key className="h-3.5 w-3.5" />
              <span>تغيير كلمة المرور</span>
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-xs"
          >
            إغلاق
          </Button>
        </div>
      </div>
    </Modal>
  );
}
