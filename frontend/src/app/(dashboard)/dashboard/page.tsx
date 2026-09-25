'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  FileText,
  Video,
  Image as ImageIcon,
  Users,
  Plus,
  ArrowUpRight,
  LayoutDashboard,
  ExternalLink,
  Sparkles,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { articlesApi } from '@/lib/api/articles.api';
import { videosApi } from '@/lib/api/videos.api';
import { mediaApi } from '@/lib/api/media.api';
import { usersApi } from '@/lib/api/users.api';
import { useAuth } from '@/features/auth';

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();

  // 1. Fetch articles count
  const { data: articlesData, isLoading: isArticlesLoading } = useQuery({
    queryKey: ['dashboard', 'articles-count'],
    queryFn: async () => {
      try {
        const res = await articlesApi.getAdminArticles({ limit: 1 });
        return res.data;
      } catch {
        return null;
      }
    },
    staleTime: 60 * 1000,
  });

  // 2. Fetch videos count
  const { data: videosData, isLoading: isVideosLoading } = useQuery({
    queryKey: ['dashboard', 'videos-count'],
    queryFn: async () => {
      try {
        const res = await videosApi.getAdminVideos({ limit: 1 });
        return res.data;
      } catch {
        return null;
      }
    },
    staleTime: 60 * 1000,
  });

  // 3. Fetch media count
  const { data: mediaData, isLoading: isMediaLoading } = useQuery({
    queryKey: ['dashboard', 'media-count'],
    queryFn: async () => {
      try {
        const res = await mediaApi.getMediaList({ limit: 1 });
        return res.data;
      } catch {
        return null;
      }
    },
    staleTime: 60 * 1000,
  });

  // 4. Fetch users count (admin only)
  const { data: usersData, isLoading: isUsersLoading } = useQuery({
    queryKey: ['dashboard', 'users-count'],
    queryFn: async () => {
      try {
        const res = await usersApi.getUsers({ limit: 1 });
        return res.data;
      } catch {
        return null;
      }
    },
    enabled: !!isAdmin,
    staleTime: 60 * 1000,
  });

  const totalArticles = articlesData?.pagination?.total ?? (isArticlesLoading ? '...' : '0');
  const totalVideos = videosData?.pagination?.total ?? (isVideosLoading ? '...' : '0');
  const totalMedia = mediaData?.pagination?.total ?? (isMediaLoading ? '...' : '0');
  const totalUsers = isAdmin ? (usersData?.pagination?.total ?? (isUsersLoading ? '...' : '1')) : '1';

  const stats = [
    {
      title: 'المقالات والدروس',
      count: String(totalArticles),
      description: 'إجمالي المقالات والمسودات',
      icon: FileText,
      href: '/dashboard/articles',
      color: 'text-primary bg-primary/10 border-primary/20',
    },
    {
      title: 'المحتوى المرئي',
      count: String(totalVideos),
      description: 'فيديوهات المنصات الاجتماعية',
      icon: Video,
      href: '/dashboard/videos',
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
    {
      title: 'مكتبة الوسائط',
      count: String(totalMedia),
      description: 'ملفات مرفوعة على التخزين السحابي',
      icon: ImageIcon,
      href: '/dashboard/media',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'فريق العمل',
      count: String(totalUsers),
      description: 'المشرفون والمحررون النشطون',
      icon: Users,
      href: '/dashboard/users',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-card border border-border shadow-card relative overflow-hidden">
        <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>لوحة التحكم الرئيسية</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-foreground tracking-tight">
              أهلاً بك، {user?.name || 'المدير العام'}
            </h1>
            <p className="text-xs md:text-sm text-foreground-secondary leading-relaxed">
              مركز إدارة منصة <span className="text-primary font-bold">خمسة برمجة بالبلدي</span>. تابع أداء المحتوى، أدر المقالات والمقاطع المرئية، وتحكم في هوية المنصة وإعداداتها بكل دقة واحترافية.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/dashboard/articles/new">
              <Button size="sm" className="gap-1.5 font-bold shadow-card text-xs h-9">
                <Plus className="h-4 w-4" />
                <span>مقال جديد</span>
              </Button>
            </Link>
            <Link href="/dashboard/videos/new">
              <Button variant="secondary" size="sm" className="gap-1.5 font-bold text-xs h-9">
                <Plus className="h-4 w-4" />
                <span>فيديو جديد</span>
              </Button>
            </Link>
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs h-9">
                <span>الموقع العام</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Overview Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">المؤشرات والإحصائيات العامة</h2>
          </div>
          <span className="text-[11px] text-foreground-muted font-mono font-medium">محدّث لحظياً</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <Link key={stat.title} href={stat.href} className="group block">
                <Card hoverEffect className="h-full border-border bg-card">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-xs font-bold text-foreground-secondary group-hover:text-foreground transition-colors">
                      {stat.title}
                    </CardTitle>
                    <div
                      className={`h-9 w-9 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${stat.color}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-black text-foreground font-mono">
                      {stat.count}
                    </div>
                    <p className="text-[11px] text-foreground-muted mt-1 leading-snug">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Management Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: Articles */}
        <Card hoverEffect className="border-border bg-card flex flex-col justify-between">
          <div>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="space-y-1">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span>المقالات والدروس التقنية</span>
                </CardTitle>
                <CardDescription className="text-xs text-foreground-muted">
                  تحرير الشروحات البرمجية وإدارة النشر
                </CardDescription>
              </div>
              <Link href="/dashboard/articles">
                <Button variant="ghost" size="sm" className="h-8 text-xs text-primary gap-1 font-bold">
                  <span>كل المقالات</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-foreground-secondary leading-relaxed">
                إنشاء وتعديل الشروحات باللغة العربية مع دعم تنسيق الأكواد البرمجية، رفع الصور التوضيحية، تهيئة محركات البحث (SEO)، وجدولة النشر.
              </p>
            </CardContent>
          </div>
          <CardContent className="pt-0">
            <Link href="/dashboard/articles/new">
              <Button size="sm" variant="secondary" className="text-xs gap-1.5 font-bold w-full sm:w-auto">
                <Plus className="h-3.5 w-3.5 text-primary" />
                <span>كتابة مقال جديد</span>
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Module 2: Videos */}
        <Card hoverEffect className="border-border bg-card flex flex-col justify-between">
          <div>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="space-y-1">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Video className="h-4 w-4 text-sky-400" />
                  <span>فيديوهات السوشيال ميديا</span>
                </CardTitle>
                <CardDescription className="text-xs text-foreground-muted">
                  المحتوى المرئي القصير والشروحات السريعة
                </CardDescription>
              </div>
              <Link href="/dashboard/videos">
                <Button variant="ghost" size="sm" className="h-8 text-xs text-primary gap-1 font-bold">
                  <span>كل الفيديوهات</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-foreground-secondary leading-relaxed">
                تنظيم ونشر المقاطع البرمجية من YouTube و TikTok و Facebook مع التضمين المباشر وإدارة العناوين والروابط والتصنيفات.
              </p>
            </CardContent>
          </div>
          <CardContent className="pt-0">
            <Link href="/dashboard/videos/new">
              <Button size="sm" variant="secondary" className="text-xs gap-1.5 font-bold w-full sm:w-auto">
                <Plus className="h-3.5 w-3.5 text-primary" />
                <span>إضافة فيديو جديد</span>
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Module 3: Media */}
        <Card hoverEffect className="border-border bg-card flex flex-col justify-between">
          <div>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="space-y-1">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-amber-400" />
                  <span>مكتبة الوسائط السحابية</span>
                </CardTitle>
                <CardDescription className="text-xs text-foreground-muted">
                  إدارة الصور والملفات المرفوعة
                </CardDescription>
              </div>
              <Link href="/dashboard/media">
                <Button variant="ghost" size="sm" className="h-8 text-xs text-primary gap-1 font-bold">
                  <span>استعراض المكتبة</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-foreground-secondary leading-relaxed">
                رفع وإدارة الصور بدقة عالية مع معالجة وتحويل تلقائي للـ WebP والتخزين الفوري على شبكة التوزيع السحابية السريعة.
              </p>
            </CardContent>
          </div>
          <CardContent className="pt-0">
            <Link href="/dashboard/media">
              <Button size="sm" variant="secondary" className="text-xs gap-1.5 font-bold w-full sm:w-auto">
                <Plus className="h-3.5 w-3.5 text-primary" />
                <span>رفع وسائط جديدة</span>
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Module 4: Settings & Branding */}
        <Card hoverEffect className="border-border bg-card flex flex-col justify-between">
          <div>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="space-y-1">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Settings className="h-4 w-4 text-purple-400" />
                  <span>الهوية وإعدادات المنصة</span>
                </CardTitle>
                <CardDescription className="text-xs text-foreground-muted">
                  الشعار، الأيقونات، وروابط التواصل
                </CardDescription>
              </div>
              <Link href="/dashboard/settings">
                <Button variant="ghost" size="sm" className="h-8 text-xs text-primary gap-1 font-bold">
                  <span>فتح الإعدادات</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-foreground-secondary leading-relaxed">
                التحكم بالهوية البصرية للمنصة (اللوجو، Favicon، وصور المشاركة)، نصوص الصفحة الرئيسية، وسائل التواصل، وبيانات المطور.
              </p>
            </CardContent>
          </div>
          <CardContent className="pt-0">
            <Link href="/dashboard/settings">
              <Button size="sm" variant="secondary" className="text-xs gap-1.5 font-bold w-full sm:w-auto">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span>تخصيص الإعدادات</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

