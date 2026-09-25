import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlus, Loader2, ShieldCheck, UserCheck } from 'lucide-react';
import {
  createUserFormSchema,
  CreateUserFormValues,
} from '../schemas/users.schema';
import { UserRole } from '@/types/api';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserFormValues) => Promise<void>;
  isLoading: boolean;
  serverError?: string | null;
}

export function CreateUserModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  serverError,
}: CreateUserModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: UserRole.EDITOR,
      isActive: true,
    },
  });

  const handleFormSubmit = async (data: CreateUserFormValues) => {
    await onSubmit(data);
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
      title="إضافة مستخدم جديد"
      description="إنشاء حساب مشرف أو محرر جديد وتعيين الصلاحيات"
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
            placeholder="مثال: أحمد محمد"
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
                {...register('role')}
                className="text-primary focus:ring-primary h-4 w-4"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span>ADMIN (مشرف)</span>
                </div>
                <p className="text-[10px] text-muted-foreground">صلاحيات كاملة على المنصة</p>
              </div>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-border bg-secondary/30 hover:border-primary/40 cursor-pointer transition-colors select-none">
              <input
                type="radio"
                value={UserRole.EDITOR}
                {...register('role')}
                className="text-primary focus:ring-primary h-4 w-4"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <UserCheck className="h-3.5 w-3.5 text-sky-400" />
                  <span>EDITOR (محرر)</span>
                </div>
                <p className="text-[10px] text-muted-foreground">إدارة المقالات والفيديوهات</p>
              </div>
            </label>
          </div>
          {errors.role && (
            <p className="text-[11px] text-destructive font-medium">{errors.role.message}</p>
          )}
        </div>

        {/* Passwords */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground block">
              كلمة المرور <span className="text-destructive">*</span>
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

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground block">
              تأكيد كلمة المرور <span className="text-destructive">*</span>
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
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          يجب ألا تقل كلمة المرور عن 8 أحرف وتحتوي على حرف كبير، حرف صغير، ورقم.
        </p>

        {/* Active Toggle */}
        <div className="pt-1">
          <label className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              {...register('isActive')}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <span>تفعيل الحساب فور الإنشاء</span>
          </label>
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
            className="gap-2 text-xs font-bold shadow-card px-5"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>جاري الإنشاء...</span>
              </>
            ) : (
              <>
                <UserPlus className="h-3.5 w-3.5" />
                <span>إنشاء المستخدم</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
