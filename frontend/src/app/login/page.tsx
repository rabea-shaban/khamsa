'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, AlertCircle, CheckCircle2, Lock, Mail, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAuth } from '@/features/auth';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('يرجى إدخال بريد إلكتروني صالح'),
  password: z
    .string()
    .min(6, 'كلمة المرور يجب ألا تقل عن 6 أحرف'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isAuthLoading, router]);

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);
    setIsSuccess(false);

    try {
      await login(data);
      setIsSuccess(true);
      router.push('/dashboard');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setErrorMessage('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
        } else if (err.response?.status === 403) {
          setErrorMessage('هذا الحساب غير مصرح له بالدخول.');
        } else if (err.response?.data?.message) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage('تعذر الاتصال بالخادم. يرجى التأكد من تشغيل الباك إند.');
        }
      } else {
        setErrorMessage('حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background relative overflow-hidden" dir="rtl">
      {/* Top Bar Floating Controls */}
      <div className="absolute top-6 left-6 z-20">
        <ThemeToggle />
      </div>

      {/* Decorative gold glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand Logo Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <Logo />
          <p className="text-xs text-foreground-muted font-mono flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span>Khamsa CMS &bull; لوحة التحكم والإدارة</span>
          </p>
        </div>

        <Card className="border-border shadow-dropdown bg-card/90 backdrop-blur-xl">
          <CardHeader className="space-y-2 text-center pb-4">
            <CardTitle className="text-xl font-extrabold text-foreground">تسجيل الدخول</CardTitle>
            <CardDescription className="text-xs text-foreground-muted">
              أدخل بيانات حساب المشرف للوصول إلى لوحة الإدارة
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Error message alert */}
            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-xl bg-destructive/10 border border-destructive/25 text-destructive text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            {/* Success message alert */}
            {isSuccess && (
              <div className="mb-4 p-3.5 rounded-xl bg-primary/15 border border-primary/30 text-primary text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span className="font-bold">تم تسجيل الدخول بنجاح! جارٍ التحويل...</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <div className="relative">
                  <Input
                    label="البريد الإلكتروني"
                    type="email"
                    placeholder="admin@khamsa.dev"
                    error={errors.email?.message}
                    disabled={isSubmitting || isSuccess}
                    className="pl-10"
                    {...register('email')}
                  />
                  <Mail className="h-4 w-4 absolute left-3.5 top-9 text-foreground-muted pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <Input
                    label="كلمة المرور"
                    type="password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    disabled={isSubmitting || isSuccess}
                    className="pl-10"
                    {...register('password')}
                  />
                  <Lock className="h-4 w-4 absolute left-3.5 top-9 text-foreground-muted pointer-events-none" />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-2 font-bold shadow-card hover:shadow-dropdown text-sm h-11"
                isLoading={isSubmitting || isSuccess}
                disabled={isSubmitting || isSuccess}
              >
                {isSubmitting ? 'جارٍ تسجيل الدخول...' : isSuccess ? 'تم الدخول' : 'تسجيل الدخول'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Back to Public Site */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground-muted hover:text-primary transition-colors"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            <span>العودة للموقع العام</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
