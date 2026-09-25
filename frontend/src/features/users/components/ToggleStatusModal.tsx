import React from 'react';
import { Power, Loader2, AlertCircle } from 'lucide-react';
import { User } from '@/types/api';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface ToggleStatusModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  isLoading: boolean;
}

export function ToggleStatusModal({
  isOpen,
  user,
  onClose,
  onConfirm,
  isLoading,
}: ToggleStatusModalProps) {
  if (!user) return null;

  const willActivate = !user.isActive;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={willActivate ? 'تفعيل حساب المستخدم' : 'تعطيل حساب المستخدم'}
      size="sm"
    >
      <div className="space-y-4 pt-2 text-right">
        <div
          className={`flex items-center gap-3 p-3.5 rounded-2xl border ${
            willActivate
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
              : 'bg-zinc-500/10 border-zinc-500/20 text-zinc-300'
          }`}
        >
          <AlertCircle className="h-6 w-6 shrink-0" />
          <div className="text-xs space-y-0.5">
            <p className="font-bold">
              {willActivate
                ? `هل أنت متأكد من تفعيل حساب ${user.name}؟`
                : `هل أنت متأكد من تعطيل حساب ${user.name}؟`}
            </p>
            <p className="opacity-80">
              {willActivate
                ? 'سيتمكن المستخدم من تسجيل الدخول والوصول إلى لوحة التحكم بصلاحياته.'
                : 'لن يتمكن المستخدم من تسجيل الدخول حتى يتم إعادة تفعيل الحساب مرة أخرى.'}
            </p>
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
            className={`gap-2 text-xs font-bold shadow-card px-5 ${
              willActivate
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-zinc-700 hover:bg-zinc-800 text-white'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>جاري التنفيذ...</span>
              </>
            ) : (
              <>
                <Power className="h-3.5 w-3.5" />
                <span>{willActivate ? 'تأكيد التفعيل' : 'تأكيد التعطيل'}</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
