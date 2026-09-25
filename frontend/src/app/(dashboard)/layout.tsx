'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { useAuth } from '@/features/auth';
import { Spinner } from '@/components/ui/Spinner';
import { ShieldAlert, LogOut, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, isAdmin, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isMounted, isLoading, isAuthenticated, router]);

  // Loading or mounting state
  if (!isMounted || isLoading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground space-y-4"
        dir="rtl"
        suppressHydrationWarning
      >
        <Spinner size="lg" className="text-primary" />
        <p className="text-xs text-muted-foreground font-mono animate-pulse">
          جارٍ التحقق من الجلسة والصلاحيات...
        </p>
      </div>
    );
  }

  // Unauthenticated guard
  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground space-y-4"
        dir="rtl"
        suppressHydrationWarning
      >
        <Spinner size="md" className="text-primary" />
        <p className="text-xs text-muted-foreground">جارٍ التحويل إلى صفحة تسجيل الدخول...</p>
      </div>
    );
  }

  // Non-admin guard (dashboard is strictly for ADMIN role)
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground" dir="rtl">
        <div className="w-full max-w-md p-6 rounded-2xl bg-card border border-destructive/30 text-center space-y-5 shadow-2xl">
          <div className="h-12 w-12 rounded-2xl bg-destructive/15 text-destructive flex items-center justify-center mx-auto">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-black text-foreground">غير مصرح بالدخول</h2>
            <p className="text-xs text-muted-foreground">
              حسابك الحالي ({user?.email}) لا يمتلك صلاحيات مدير النظام (ADMIN) للوصول إلى لوحة التحكم.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
                <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                الموقع العام
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => logout()}
              className="w-full sm:w-auto gap-1.5 text-xs"
            >
              <LogOut className="h-3.5 w-3.5" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground" dir="rtl">
      {/* Sidebar Navigation (Sticky on Desktop, Offcanvas Drawer on Mobile) */}
      <Sidebar
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Topbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
