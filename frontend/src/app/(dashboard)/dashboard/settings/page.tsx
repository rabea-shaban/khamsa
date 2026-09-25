'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Sliders,
  Image as ImageIcon,
  Share2,
  Mail,
  Search,
  Layout,
  Type,
  Info,
  UserCheck,
  PanelBottom,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Database,
} from 'lucide-react';
import { useAuth } from '@/features/auth';
import {
  useSettings,
  useUpdateSettings,
  settingsFormSchema,
  SettingsFormValues,
  GeneralSettingsTab,
  BrandAssetsTab,
  SocialMediaTab,
  ContactSettingsTab,
  SeoSettingsTab,
  HomepageSettingsTab,
  HeroContentTab,
  AboutContentTab,
  FounderSettingsTab,
  FooterSettingsTab,
  SettingsSaveBar,
  ResetConfirmModal,
  BackupsTab,
} from '@/features/settings';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { cn } from '@/lib/utils/cn';

type SettingsTab =
  | 'general'
  | 'brand'
  | 'social'
  | 'contact'
  | 'seo'
  | 'homepage'
  | 'hero'
  | 'about'
  | 'founder'
  | 'footer'
  | 'backups';

export default function SettingsDashboardPage() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const { data: settingsData, isLoading, isError, refetch } = useSettings();
  const updateMutation = useUpdateSettings();

  const settings = settingsData?.data;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      siteName: 'خمسة برمجة بالبلدي',
      tagline: 'افهمها بالبلدي.. اكتبها بالكود.',
      siteDescription: 'منصة عربية لتبسيط علوم البرمجة وهندسة البرمجيات.',
      language: 'ar',
      direction: 'rtl',
      timezone: 'Africa/Cairo',
      logo: '',
      favicon: '',
      socialLinks: {
        youtube: '',
        tiktok: '',
        facebook: '',
        github: '',
        linkedin: '',
        whatsapp: '',
        email: '',
        phone: '',
      },
      contact: {
        email: '',
        phone: '',
        whatsapp: '',
        contactMessage: '',
      },
      defaultSeo: {
        title: '',
        description: '',
        keywords: [],
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        canonicalUrl: '',
      },
      homepage: {
        showHero: true,
        showWhyKhamsa: true,
        showPhilosophy: true,
        showFounder: true,
        showServices: true,
        showArticles: true,
        showVideos: true,
        showSocial: true,
        showFinalCTA: true,
      },
      hero: {
        heroTitle: '',
        heroSubtitle: '',
        heroDescription: '',
        primaryButtonText: '',
        primaryButtonUrl: '',
        secondaryButtonText: '',
        secondaryButtonUrl: '',
      },
      about: {
        aboutTitle: '',
        aboutShortDescription: '',
        aboutStory: '',
        aboutMission: '',
        aboutVision: '',
        aboutGoal: '',
        aboutMessage: '',
      },
      founder: {
        founderName: '',
        founderRole: '',
        founderBio: '',
        founderImage: '',
        founderLinkedIn: '',
        founderGitHub: '',
      },
      footer: {
        footerDescription: '',
        footerCopyright: '',
        footerShowSocials: true,
        footerShowNavigation: true,
      },
    },
  });

  // Populate form with server settings when loaded
  useEffect(() => {
    if (settings) {
      reset({
        siteName: settings.siteName || 'خمسة برمجة بالبلدي',
        tagline: settings.tagline || 'افهمها بالبلدي.. اكتبها بالكود.',
        siteDescription: settings.siteDescription || '',
        language: settings.language || 'ar',
        direction: (settings.direction as 'rtl' | 'ltr') || 'rtl',
        timezone: settings.timezone || 'Africa/Cairo',
        logo: settings.logo || '',
        favicon: settings.favicon || '',
        socialLinks: {
          youtube: settings.socialLinks?.youtube || '',
          tiktok: settings.socialLinks?.tiktok || '',
          facebook: settings.socialLinks?.facebook || '',
          github: settings.socialLinks?.github || '',
          linkedin: settings.socialLinks?.linkedin || '',
          whatsapp: settings.socialLinks?.whatsapp || '',
          email: settings.socialLinks?.email || '',
          phone: settings.socialLinks?.phone || '',
        },
        contact: {
          email: settings.contact?.email || '',
          phone: settings.contact?.phone || '',
          whatsapp: settings.contact?.whatsapp || '',
          contactMessage: settings.contact?.contactMessage || '',
        },
        defaultSeo: {
          title: settings.defaultSeo?.title || '',
          description: settings.defaultSeo?.description || '',
          keywords: settings.defaultSeo?.keywords || [],
          ogTitle: settings.defaultSeo?.ogTitle || '',
          ogDescription: settings.defaultSeo?.ogDescription || '',
          ogImage: settings.defaultSeo?.ogImage || '',
          canonicalUrl: settings.defaultSeo?.canonicalUrl || '',
        },
        homepage: {
          showHero: settings.homepage?.showHero ?? true,
          showWhyKhamsa: settings.homepage?.showWhyKhamsa ?? true,
          showPhilosophy: settings.homepage?.showPhilosophy ?? true,
          showFounder: settings.homepage?.showFounder ?? true,
          showServices: settings.homepage?.showServices ?? true,
          showArticles: settings.homepage?.showArticles ?? true,
          showVideos: settings.homepage?.showVideos ?? true,
          showSocial: settings.homepage?.showSocial ?? true,
          showFinalCTA: settings.homepage?.showFinalCTA ?? true,
        },
        hero: {
          heroTitle: settings.hero?.heroTitle || '',
          heroSubtitle: settings.hero?.heroSubtitle || '',
          heroDescription: settings.hero?.heroDescription || '',
          primaryButtonText: settings.hero?.primaryButtonText || '',
          primaryButtonUrl: settings.hero?.primaryButtonUrl || '',
          secondaryButtonText: settings.hero?.secondaryButtonText || '',
          secondaryButtonUrl: settings.hero?.secondaryButtonUrl || '',
        },
        about: {
          aboutTitle: settings.about?.aboutTitle || '',
          aboutShortDescription: settings.about?.aboutShortDescription || '',
          aboutStory: settings.about?.aboutStory || '',
          aboutMission: settings.about?.aboutMission || '',
          aboutVision: settings.about?.aboutVision || '',
          aboutGoal: settings.about?.aboutGoal || '',
          aboutMessage: settings.about?.aboutMessage || '',
        },
        founder: {
          founderName: settings.founder?.founderName || '',
          founderRole: settings.founder?.founderRole || '',
          founderBio: settings.founder?.founderBio || '',
          founderImage: settings.founder?.founderImage || '',
          founderLinkedIn: settings.founder?.founderLinkedIn || '',
          founderGitHub: settings.founder?.founderGitHub || '',
        },
        footer: {
          footerDescription: settings.footer?.footerDescription || '',
          footerCopyright: settings.footer?.footerCopyright || '',
          footerShowSocials: settings.footer?.footerShowSocials ?? true,
          footerShowNavigation: settings.footer?.footerShowNavigation ?? true,
        },
      });
    }
  }, [settings, reset]);

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      setErrorMessage(null);
      await updateMutation.mutateAsync(values);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setErrorMessage(
        error.response?.data?.message || 'حدث خطأ أثناء حفظ الإعدادات. يرجى المحاولة مجدداً.',
      );
    }
  };

  const handleResetConfirm = () => {
    if (settings) {
      reset({
        siteName: settings.siteName,
        tagline: settings.tagline,
        siteDescription: settings.siteDescription,
        language: settings.language,
        direction: settings.direction as 'rtl' | 'ltr',
        timezone: settings.timezone,
        logo: settings.logo || '',
        favicon: settings.favicon || '',
        socialLinks: settings.socialLinks || {},
        contact: settings.contact || {},
        defaultSeo: settings.defaultSeo || {},
        homepage: settings.homepage || {},
        hero: settings.hero || {},
        about: settings.about || {},
        founder: settings.founder || {},
        footer: settings.footer || {},
      });
    }
  };

  const tabs = [
    { id: 'general', label: 'المنصة', icon: Sliders },
    { id: 'brand', label: 'الهوية البصرية', icon: ImageIcon },
    { id: 'social', label: 'السوشيال ميديا', icon: Share2 },
    { id: 'contact', label: 'التواصل', icon: Mail },
    { id: 'seo', label: 'محركات البحث (SEO)', icon: Search },
    { id: 'homepage', label: 'أقسام الرئيسية', icon: Layout },
    { id: 'hero', label: 'محتوى Hero', icon: Type },
    { id: 'about', label: 'من نحن', icon: Info },
    { id: 'founder', label: 'المؤسس', icon: UserCheck },
    { id: 'footer', label: 'الفوتر', icon: PanelBottom },
    { id: 'backups', label: 'النسخ الاحتياطي', icon: Database },
  ];

  if (!isAdmin) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-destructive">غير مصرح بالدخول</h2>
        <p className="text-xs text-muted-foreground">
          هذا القسم مخصص للمشرفين العامين (ADMIN) فقط لإدارة إعدادات المنصة.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-9 w-32" />
        </div>
        <Skeleton className="h-12 w-full rounded-2xl" />
        <Skeleton className="h-72 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-black text-foreground">إعدادات المنصة</h1>
        <ErrorState
          message="تعذر تحميل إعدادات المنصة من الخادم"
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-foreground">إعدادات المنصة والهوية</h1>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-mono font-bold flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              ADMIN
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            التحكم المركزي في نصوص الموقع، الشعار، روابط السوشيال ميديا، والظهور العام
          </p>
        </div>
      </div>

      {/* Error Message Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive font-semibold flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Success Banner */}
      {showSuccessToast && (
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-xs text-primary font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>تم حفظ وتحديث إعدادات المنصة بنجاح! التغييرات تظهر الآن على الموقع العام.</span>
        </div>
      )}

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl border border-border bg-card shadow-card overflow-x-auto scrollbar-none">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap focus:outline-none',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Backups Tab Component (Independent from form) */}
      {activeTab === 'backups' ? (
        <BackupsTab />
      ) : (
        /* Main Settings Form */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {activeTab === 'general' && <GeneralSettingsTab register={register} errors={errors} />}
          {activeTab === 'brand' && <BrandAssetsTab watch={watch} setValue={setValue} />}
          {activeTab === 'social' && (
            <SocialMediaTab register={register} errors={errors} watch={watch} />
          )}
          {activeTab === 'contact' && <ContactSettingsTab register={register} errors={errors} />}
          {activeTab === 'seo' && (
            <SeoSettingsTab register={register} errors={errors} watch={watch} setValue={setValue} />
          )}
          {activeTab === 'homepage' && <HomepageSettingsTab register={register} />}
          {activeTab === 'hero' && <HeroContentTab register={register} />}
          {activeTab === 'about' && <AboutContentTab register={register} />}
          {activeTab === 'founder' && (
            <FounderSettingsTab register={register} watch={watch} setValue={setValue} />
          )}
          {activeTab === 'footer' && <FooterSettingsTab register={register} />}

          {/* Sticky Save Bar */}
          <SettingsSaveBar
            isDirty={isDirty}
            isSubmitting={updateMutation.isPending}
            onReset={() => setIsResetModalOpen(true)}
            showSuccessToast={showSuccessToast}
          />
        </form>
      )}

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetConfirm}
      />
    </div>
  );
}
