import React from 'react';
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { User } from '@/types/api';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface DeleteUserModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  isLoading: boolean;
}

export function DeleteUserModal({
  isOpen,
  user,
  onClose,
  onConfirm,
  isLoading,
}: DeleteUserModalProps) {
  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="حذف حساب المستخدم"
      size="sm"
    >
      <div className="space-y-4 pt-2 text-right">
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive">
          <AlertTriangle className="h-6 w-6 shrink-0" />
          <div className="text-xs space-y-0.5">
            <p className="font-bold">تحذير: هذا الإجراء نهائي ولا يمكن التراجع عنه</p>
            <p className="text-destructive/80">
              سيتم حذف الحساب بشكل دائم من قاعدة البيانات ولن يتمكن المستخدم من الدخول.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-semibold">اسم المستخدم:</span>
            <span className="font-bold text-foreground">{user.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-semibold">البريد الإلكتروني:</span>
            <span className="font-mono text-foreground" dir="ltr">{user.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-semibold">الدور:</span>
            <span className="font-mono font-bold text-primary">{user.role}</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
            className="text-xs"
          >
            إلغاء
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => onConfirm(user._id)}
            disabled={isLoading}
            className="gap-2 text-xs font-bold bg-destructive hover:bg-destructive/90 text-white shadow-card px-5"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>جاري الحذف...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" />
                <span>تأكيد الحذف النهائي</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
