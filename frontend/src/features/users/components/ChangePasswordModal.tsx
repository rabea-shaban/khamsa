import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Loader2 } from 'lucide-react';
import {
  changePasswordFormSchema,
  ChangePasswordFormValues,
} from '../schemas/users.schema';
import { User } from '@/types/api';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ChangePasswordModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onSubmit: (id: string, password: string) => Promise<void>;
  isLoading: boolean;
  serverError?: string | null;
}

export function ChangePasswordModal({
  isOpen,
  user,
  onClose,
  onSubmit,
  isLoading,
  serverError,
}: ChangePasswordModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  if (!user) return null;

  const handleFormSubmit = async (data: ChangePasswordFormValues) => {
    await onSubmit(user._id, data.password);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="تغيير كلمة المرور"
      description={`تعيين كلمة مرور جديدة للمستخدم: ${user.name}`}
      size="sm"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-2 text-right">
        {serverError && (
          <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive font-semibold">
            {serverError}
          </div>
        )}

        {/* New Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground block">
            كلمة المرور الجديدة <span className="text-destructive">*</span>
          </label>
          <Input
            type="password"
            {...register('password')}
            placeholder="••••••••"
            className="h-10 text-xs font-mono text-left"
            dir="ltr"
            error={errors.password?.message}
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground block">
            تأكيد كلمة المرور الجديدة <span className="text-destructive">*</span>
          </label>
          <Input
            type="password"
            {...register('confirmPassword')}
            placeholder="••••••••"
            className="h-10 text-xs font-mono text-left"
            dir="ltr"
            error={errors.confirmPassword?.message}
          />
        </div>

        <div className="p-3 rounded-xl bg-secondary/40 border border-border text-[11px] text-muted-foreground space-y-1">
          <p className="font-semibold text-foreground">شروط كلمة المرور:</p>
          <ul className="list-disc list-inside space-y-0.5 pr-1">
            <li>8 أحرف على الأقل</li>
            <li>حرف كبير واحد على الأقل (A-Z)</li>
            <li>حرف صغير واحد على الأقل (a-z)</li>
            <li>رقم واحد على الأقل (0-9)</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClose}
            disabled={isLoading}
            className="text-xs"
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={isLoading}
            className="gap-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-black shadow-card px-5"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>جاري الحفظ...</span>
              </>
            ) : (
              <>
                <KeyRound className="h-3.5 w-3.5" />
                <span>تحديث كلمة المرور</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
