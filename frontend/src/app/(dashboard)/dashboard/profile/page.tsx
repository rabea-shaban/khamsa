'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  User as UserIcon,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Calendar,
  Clock,
  Github,
  Save,
  KeyRound,
  EyeIcon,
} from 'lucide-react';
import { useAuth } from '@/features/auth';
import { usersApi } from '@/lib/api/users.api';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { AuthorBox } from '@/components/articles/AuthorBox';
import { cn } from '@/lib/utils/cn';

// ============================================
// Form Validation Schemas
// ============================================

const profileInfoSchema = z.object({
  name: z.string().trim().min(2, 'الاسم يجب أن يكون حرفين على الأقل').max(100, 'الاسم لا يجب أن يتجاوز 100 حرف'),
  email: z.string().trim().email('صيغة البريد الإلكتروني غير صحيحة').toLowerCase(),
  avatar: z.string().trim().url('رابط الصورة غير صحيح').or(z.literal('')).optional().nullable(),
  bio: z.string().trim().max(1000, 'الوصف التعريفي يجب ألا يتجاوز 1000 حرف').optional().nullable(),
});

const passwordChangeSchema = z
  .object({
    password: z
      .string()
      .min(8, 'كلمة المرور يجب ألا تقل عن 8 خانات')
      .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير واحد على الأقل (A-Z)')
      .regex(/[a-z]/, 'يجب أن تحتوي على حرف صغير واحد على الأقل (a-z)')
      .regex(/[0-9]/, 'يجب أن تحتوي على رقم واحد على الأقل (0-9)'),
    confirmPassword: z.string().min(1, 'يرجى تأكيد كلمة المرور'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

type ProfileInfoFormValues = z.infer<typeof profileInfoSchema>;
type PasswordChangeFormValues = z.infer<typeof passwordChangeSchema>;

export default function ProfileDashboardPage() {
  const { user, isLoading: isAuthLoading, refetchUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'preview'>('profile');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState<string | null>(null);
  const [profileErrorMsg, setProfileErrorMsg] = useState<string | null>(null);
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState<string | null>(null);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile Info Form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    watch: watchProfile,
    setValue: setProfileValue,
    reset: resetProfile,
    formState: { errors: profileErrors, isDirty: isProfileDirty },
  } = useForm<ProfileInfoFormValues>({
    resolver: zodResolver(profileInfoSchema),
    defaultValues: {
      name: '',
      email: '',
      avatar: '',
      bio: '',
    },
  });

  // Password Change Form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch: watchPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Watch form fields for live preview
  const watchedName = watchProfile('name');
  const watchedBio = watchProfile('bio');
  const watchedAvatar = watchProfile('avatar');
  const watchedEmail = watchProfile('email');
  const newPasswordValue = watchPassword('password') || '';

  // Password requirements checker
  const hasMinLength = newPasswordValue.length >= 8;
  const hasUpper = /[A-Z]/.test(newPasswordValue);
  const hasLower = /[a-z]/.test(newPasswordValue);
  const hasNumber = /[0-9]/.test(newPasswordValue);

  // Populate form with user data
  useEffect(() => {
    if (user) {
      resetProfile({
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || '',
        bio: user.bio || '',
      });
    }
  }, [user, resetProfile]);

  // Submit Profile Info
  const onProfileSubmit = async (data: ProfileInfoFormValues) => {
    if (!user?._id) return;
    try {
      setIsSavingProfile(true);
      setProfileErrorMsg(null);
      setProfileSuccessMsg(null);

      const res = await usersApi.updateUser(user._id, {
        name: data.name,
        email: data.email,
        avatar: data.avatar || null,
        bio: data.bio || null,
      });

      if (res.success) {
        await refetchUser();
        setProfileSuccessMsg('تم حفظ وتحديث بيانات حسابك بنجاح!');
        setTimeout(() => setProfileSuccessMsg(null), 4000);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setProfileErrorMsg(
        error.response?.data?.message || 'تعذر حفظ البيانات. يرجى التحقق من المدخلات والمحاولة مجدداً.',
      );
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Submit Password Change
  const onPasswordSubmit = async (data: PasswordChangeFormValues) => {
    if (!user?._id) return;
    try {
      setIsSavingPassword(true);
      setPasswordErrorMsg(null);
      setPasswordSuccessMsg(null);

      const res = await usersApi.changePassword(user._id, data.password);

      if (res.success) {
        resetPassword({ password: '', confirmPassword: '' });
        setPasswordSuccessMsg('تم تغيير وتحديث كلمة المرور بنجاح!');
        setTimeout(() => setPasswordSuccessMsg(null), 4000);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setPasswordErrorMsg(
        error.response?.data?.message || 'تعذر تغيير كلمة المرور. يرجى المحاولة لاحقاً.',
      );
    } finally {
      setIsSavingPassword(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="space-y-6 pb-20">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96 w-full lg:col-span-2 rounded-3xl" />
          <Skeleton className="h-96 w-full rounded-3xl" />
        </div>
      </div>
    );
  }

  const formattedCreatedAt = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'غير محدد';

  const formattedLastLogin = user?.lastLoginAt
    ? new Date(user.lastLoginAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'الجلسة الحالية';

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-foreground">الملف الشخصي والحساب</h1>
            <Badge variant="primary" className="gap-1 font-mono font-bold text-xs">
              <ShieldCheck className="h-3.5 w-3.5" />
              {user?.role || 'ADMIN'}
            </Badge>
          </div>
          <p className="text-sm text-foreground-muted mt-1">
            إدارة بيانات حسابك، البريد الإلكتروني، النبذة التعريفية، وتحديث كلمة المرور
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl border border-border bg-card shadow-card overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap',
            activeTab === 'profile'
              ? 'bg-primary text-primary-foreground shadow-xs'
              : 'text-foreground-muted hover:text-foreground hover:bg-secondary',
          )}
        >
          <UserIcon className="h-4 w-4 shrink-0" />
          <span>البيانات الأساسية والنبذة</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('password')}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap',
            activeTab === 'password'
              ? 'bg-primary text-primary-foreground shadow-xs'
              : 'text-foreground-muted hover:text-foreground hover:bg-secondary',
          )}
        >
          <KeyRound className="h-4 w-4 shrink-0" />
          <span>الأمان وكلمة المرور</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap',
            activeTab === 'preview'
              ? 'bg-primary text-primary-foreground shadow-xs'
              : 'text-foreground-muted hover:text-foreground hover:bg-secondary',
          )}
        >
          <EyeIcon className="h-4 w-4 shrink-0" />
          <span>معاينة بطاقة الكاتب للقراء</span>
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left/Center Forms Container */}
        <div className="lg:col-span-2 space-y-6">
          {/* TAB 1: Profile Info Form */}
          {activeTab === 'profile' && (
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-card">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-foreground">تعديل البيانات والوصف</h2>
                    <p className="text-xs text-foreground-muted">
                      تنعكس هذه البيانات في لوحة التحكم وتظهر كمعلومات الكاتب في المقالات
                    </p>
                  </div>
                </div>
              </div>

              {/* Success Notification */}
              {profileSuccessMsg && (
                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 text-xs text-primary font-bold flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{profileSuccessMsg}</span>
                </div>
              )}

              {/* Error Notification */}
              {profileErrorMsg && (
                <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-xs text-destructive font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{profileErrorMsg}</span>
                </div>
              )}

              <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-foreground">
                    الاسم الكامل <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...registerProfile('name')}
                      placeholder="مثال: ربيع شعبان"
                      className={cn(
                        'w-full px-4 py-3 rounded-2xl border bg-background text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all',
                        profileErrors.name ? 'border-destructive' : 'border-border',
                      )}
                    />
                    <UserIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-foreground-muted pointer-events-none" />
                  </div>
                  {profileErrors.name && (
                    <p className="text-xs text-destructive font-medium">{profileErrors.name.message}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-foreground">
                    البريد الإلكتروني <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      dir="ltr"
                      {...registerProfile('email')}
                      placeholder="name@example.com"
                      className={cn(
                        'w-full px-4 py-3 rounded-2xl border bg-background text-sm text-foreground text-left placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-mono',
                        profileErrors.email ? 'border-destructive' : 'border-border',
                      )}
                    />
                    <Mail className="absolute right-3.5 top-3.5 h-4 w-4 text-foreground-muted pointer-events-none" />
                  </div>
                  {profileErrors.email && (
                    <p className="text-xs text-destructive font-medium">{profileErrors.email.message}</p>
                  )}
                </div>

                {/* Avatar URL & Quick Presets */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-foreground">
                    رابط الصورة الشخصية (Avatar Image URL)
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      dir="ltr"
                      {...registerProfile('avatar')}
                      placeholder="https://github.com/rabea-shaban.png"
                      className={cn(
                        'w-full px-4 py-3 rounded-2xl border bg-background text-sm text-foreground text-left placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-mono',
                        profileErrors.avatar ? 'border-destructive' : 'border-border',
                      )}
                    />
                    <ImageIcon className="absolute right-3.5 top-3.5 h-4 w-4 text-foreground-muted pointer-events-none" />
                  </div>
                  {profileErrors.avatar && (
                    <p className="text-xs text-destructive font-medium">{profileErrors.avatar.message}</p>
                  )}

                  {/* Quick Helper Buttons */}
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setProfileValue('avatar', 'https://github.com/rabea-shaban.png', { shouldDirty: true })}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary text-xs font-bold text-foreground-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>استخدام صورة GitHub الخاصة بك</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setProfileValue('avatar', '', { shouldDirty: true })}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-secondary text-xs font-medium text-foreground-muted hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <span>مسح الصورة</span>
                    </button>
                  </div>
                </div>

                {/* Bio / Description */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-foreground">
                      الوصف والنبذة التعريفية (Bio)
                    </label>
                    <span className="text-[11px] text-foreground-muted font-mono">
                      {(watchedBio || '').length} / 1000 حرف
                    </span>
                  </div>
                  <div className="relative">
                    <textarea
                      rows={4}
                      {...registerProfile('bio')}
                      placeholder="مهندس برمجيات متخصص في بناء وتطوير الأنظمة السحابية وتطبيقات الويب الحديثة، ومؤسس منصة «خمسة برمجة بالبلدي»..."
                      className={cn(
                        'w-full p-4 rounded-2xl border bg-background text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all leading-relaxed',
                        profileErrors.bio ? 'border-destructive' : 'border-border',
                      )}
                    />
                  </div>
                  {profileErrors.bio && (
                    <p className="text-xs text-destructive font-medium">{profileErrors.bio.message}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSavingProfile || !isProfileDirty}
                    className="gap-2 font-bold px-6 py-2.5 h-11"
                  >
                    <Save className="h-4 w-4" />
                    <span>{isSavingProfile ? 'جاري الحفظ...' : 'حفظ التعديلات'}</span>
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: Password Change Form */}
          {activeTab === 'password' && (
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-card">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-foreground">تغيير كلمة المرور</h2>
                    <p className="text-xs text-foreground-muted">
                      قم بإنشاء كلمة مرور قوية لتأمين وصولك إلى لوحة الإدارة
                    </p>
                  </div>
                </div>
              </div>

              {/* Password Success Banner */}
              {passwordSuccessMsg && (
                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 text-xs text-primary font-bold flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{passwordSuccessMsg}</span>
                </div>
              )}

              {/* Password Error Banner */}
              {passwordErrorMsg && (
                <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-xs text-destructive font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{passwordErrorMsg}</span>
                </div>
              )}

              <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-5">
                {/* New Password */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-foreground">
                    كلمة المرور الجديدة <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      dir="ltr"
                      {...registerPassword('password')}
                      placeholder="••••••••"
                      className={cn(
                        'w-full px-4 py-3 pl-11 rounded-2xl border bg-background text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-mono',
                        passwordErrors.password ? 'border-destructive' : 'border-border',
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3.5 top-3.5 text-foreground-muted hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {passwordErrors.password && (
                    <p className="text-xs text-destructive font-medium">{passwordErrors.password.message}</p>
                  )}
                </div>

                {/* Confirm New Password */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-foreground">
                    تأكيد كلمة المرور الجديدة <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      dir="ltr"
                      {...registerPassword('confirmPassword')}
                      placeholder="••••••••"
                      className={cn(
                        'w-full px-4 py-3 pl-11 rounded-2xl border bg-background text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-mono',
                        passwordErrors.confirmPassword ? 'border-destructive' : 'border-border',
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-3.5 top-3.5 text-foreground-muted hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className="text-xs text-destructive font-medium">{passwordErrors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Password Strength Checklist */}
                <div className="p-4 rounded-2xl border border-border/80 bg-surface space-y-2 text-xs">
                  <p className="font-bold text-foreground flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span>شروط كلمة المرور الآمنة:</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <span className={cn('flex items-center gap-1.5', hasMinLength ? 'text-primary font-bold' : 'text-foreground-muted')}>
                      <span className={cn('h-2 w-2 rounded-full', hasMinLength ? 'bg-primary' : 'bg-border')} />
                      8 خانات على الأقل
                    </span>
                    <span className={cn('flex items-center gap-1.5', hasUpper ? 'text-primary font-bold' : 'text-foreground-muted')}>
                      <span className={cn('h-2 w-2 rounded-full', hasUpper ? 'bg-primary' : 'bg-border')} />
                      حرف كبير بالإنجليزية (A-Z)
                    </span>
                    <span className={cn('flex items-center gap-1.5', hasLower ? 'text-primary font-bold' : 'text-foreground-muted')}>
                      <span className={cn('h-2 w-2 rounded-full', hasLower ? 'bg-primary' : 'bg-border')} />
                      حرف صغير بالإنجليزية (a-z)
                    </span>
                    <span className={cn('flex items-center gap-1.5', hasNumber ? 'text-primary font-bold' : 'text-foreground-muted')}>
                      <span className={cn('h-2 w-2 rounded-full', hasNumber ? 'bg-primary' : 'bg-border')} />
                      رقم واحد على الأقل (0-9)
                    </span>
                  </div>
                </div>

                {/* Submit Password Button */}
                <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSavingPassword || !newPasswordValue}
                    className="gap-2 font-bold px-6 py-2.5 h-11"
                  >
                    <KeyRound className="h-4 w-4" />
                    <span>{isSavingPassword ? 'جاري التحديث...' : 'تحديث كلمة المرور'}</span>
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: Author Box Live Preview */}
          {activeTab === 'preview' && (
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-card">
              <div className="pb-4 border-b border-border space-y-1">
                <h2 className="text-lg font-black text-foreground">معاينة بطاقة الكاتب المعتمد</h2>
                <p className="text-xs text-foreground-muted">
                  هذا هو الشكل النهائي للبطاقة التعريفية الخاصة بك كما تظهر لجمهور الموقع أسفل كل مقال
                </p>
              </div>

              <AuthorBox
                author={{
                  name: watchedName || 'ربيع شعبان',
                  email: watchedEmail || 'r.shaban.2016@gmail.com',
                  role: 'Full-Stack Software Engineer & Tech Educator',
                  bio: watchedBio || 'مهندس برمجيات متخصص في بناء وتطوير الأنظمة السحابية وتطبيقات الويب الحديثة، ومؤسس منصة «خمسة برمجة بالبلدي» لتبسيط علوم الحاسب وهندسة البرمجيات للمطور العربي.',
                  avatar: watchedAvatar || 'https://github.com/rabea-shaban.png',
                  aboutUrl: '/about',
                  socials: {
                    github: 'https://github.com/rabea-shaban',
                    linkedin: 'https://linkedin.com/in/rabea-shaban',
                    youtube: 'https://youtube.com/@5prog_bldy',
                    facebook: 'https://facebook.com/5prog.bldy',
                  },
                }}
              />
            </div>
          )}
        </div>

        {/* Right Column: Profile Overview Card */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 space-y-6 shadow-card text-center">
            {/* Avatar Preview */}
            <div className="relative mx-auto h-28 w-28 rounded-3xl overflow-hidden border-2 border-primary/40 bg-surface shadow-card">
              {watchedAvatar || user?.avatar ? (
                <img
                  src={watchedAvatar || user?.avatar || ''}
                  alt={watchedName || user?.name || 'Avatar'}
                  className="relative z-10 h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center bg-primary/10 text-primary font-black text-3xl">
                {(watchedName || user?.name || 'A').charAt(0)}
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-1">
              <h3 className="text-lg font-black text-foreground">{watchedName || user?.name}</h3>
              <p className="text-xs font-mono text-foreground-muted" dir="ltr">
                {watchedEmail || user?.email}
              </p>
              <div className="pt-2 flex items-center justify-center gap-2">
                <Badge variant="primary" className="text-xs">
                  {user?.role || 'ADMIN'}
                </Badge>
                <Badge variant="secondary" className="text-xs text-primary border-primary/20">
                  حساب نشط
                </Badge>
              </div>
            </div>

            {/* Quick Meta List */}
            <div className="pt-4 border-t border-border space-y-3 text-xs text-right">
              <div className="flex items-center justify-between text-foreground-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <span>تاريخ الانضمام:</span>
                </span>
                <span className="font-semibold text-foreground">{formattedCreatedAt}</span>
              </div>

              <div className="flex items-center justify-between text-foreground-muted">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span>آخر تسجيل دخول:</span>
                </span>
                <span className="font-semibold text-foreground">{formattedLastLogin}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
