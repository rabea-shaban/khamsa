import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Loader2, ShieldCheck, UserCheck } from 'lucide-react';
import {
  editUserFormSchema,
  EditUserFormValues,
} from '../schemas/users.schema';
import { User, UserRole } from '@/types/api';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface EditUserModalProps {
  isOpen: boolean;
  user: User | null;
  currentUserId?: string;
  onClose: () => void;
  onSubmit: (id: string, data: EditUserFormValues) => Promise<void>;
  isLoading: boolean;
  serverError?: string | null;
}

export function EditUserModal({
  isOpen,
  user,
  currentUserId,
  onClose,
  onSubmit,
  isLoading,
  serverError,
}: EditUserModalProps) {
  const isSelf = currentUserId === user?._id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      name: '',
      email: '',
      role: UserRole.EDITOR,
      isActive: true,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      });
    }
  }, [user, reset]);

  if (!user) return null;

  const handleFormSubmit = async (data: EditUserFormValues) => {
    await onSubmit(user._id, data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="تعديل بيانات المستخدم"
      description={`تعديل معلومات الحساب والصلاحيات لـ ${user.name}`}
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-2 text-right">
        {serverError && (
          <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive font-semibold">
            {serverError}
          </div>
        )}

        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground block">
            الاسم الكامل <span className="text-destructive">*</span>
          </label>
          <Input
            type="text"
            {...register('name')}
            placeholder="الاسم"
            className="h-10 text-xs"
            error={errors.name?.message}
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground block">
            البريد الإلكتروني <span className="text-destructive">*</span>
          </label>
          <Input
            type="email"
            {...register('email')}
            placeholder="name@example.com"
            className="h-10 text-xs font-mono text-left"
            dir="ltr"
            error={errors.email?.message}
          />
        </div>

        {/* Role Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground block">
            الدور والصلاحية <span className="text-destructive">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-border bg-secondary/30 hover:border-primary/40 cursor-pointer transition-colors select-none">
              <input
                type="radio"
                value={UserRole.ADMIN}
                disabled={isSelf}
                {...register('role')}
                className="text-primary focus:ring-primary h-4 w-4"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span>ADMIN</span>
                </div>
                <p className="text-[10px] text-muted-foreground">صلاحيات كاملة</p>
              </div>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-border bg-secondary/30 hover:border-primary/40 cursor-pointer transition-colors select-none">
              <input
                type="radio"
                value={UserRole.EDITOR}
                disabled={isSelf}
                {...register('role')}
                className="text-primary focus:ring-primary h-4 w-4"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <UserCheck className="h-3.5 w-3.5 text-sky-400" />
                  <span>EDITOR</span>
                </div>
                <p className="text-[10px] text-muted-foreground">محتوى فقط</p>
              </div>
            </label>
          </div>
          {isSelf && (
            <p className="text-[11px] text-muted-foreground">
              لا يمكنك تغيير دورك بنفسك للحفاظ على استقرار الصلاحيات.
            </p>
          )}
          {errors.role && (
            <p className="text-[11px] text-destructive font-medium">{errors.role.message}</p>
          )}
        </div>

        {/* Active Toggle */}
        <div className="pt-1">
          <label className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              disabled={isSelf}
              {...register('isActive')}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary disabled:opacity-40"
            />
            <span>الحساب نشط ويستطيع تسجيل الدخول</span>
          </label>
          {isSelf && (
            <p className="text-[11px] text-muted-foreground mt-1">
              لا يمكنك تعطيل حسابك الحالي المسجل به الدخول.
            </p>
          )}
        </div>

        {/* Actions */}
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
            type="submit"
            size="sm"
            disabled={isLoading}
            className="gap-2 text-xs font-bold shadow-card px-5"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>جاري الحفظ...</span>
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" />
                <span>حفظ التعديلات</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
