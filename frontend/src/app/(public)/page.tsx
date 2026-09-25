import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Flame } from 'lucide-react';
import { articlesApi } from '@/lib/api/articles.api';
import { videosApi } from '@/lib/api/videos.api';
import { settingsApi } from '@/lib/api/settings.api';
import { Button } from '@/components/ui/Button';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { VideoCard } from '@/components/videos/VideoCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Article, Video, Settings } from '@/types/api';
import {
  HeroSection,
  WhyKhamsaSection,
  PhilosophySection,
  ServicesSection,
  PlatformLearningSection,
  FounderSection,
  QuoteSection,
  SocialCtaSection,
  FinalCtaSection,
} from '@/components/sections';

export const revalidate = 60; // ISR 60 seconds

export const metadata: Metadata = {
  title: 'خمسة برمجة بالبلدي | افهمها بالبلدي.. اكتبها بالكود',
  description:
    'خمسة برمجة بالبلدي منصة عربية لتبسيط البرمجة والتكنولوجيا من خلال المقالات والفيديوهات والمحتوى العملي.',
};

export default async function HomePage() {
  let articles: Article[] = [];
  let videos: Video[] = [];
  let settings: Settings | null = null;

  try {
    const [articlesRes, videosRes, settingsRes] = await Promise.allSettled([
      articlesApi.getArticles({ limit: 6, sort: 'latest' }),
      videosApi.getVideos({ limit: 3, sort: 'latest' }),
      settingsApi.getPublicSettings(),
    ]);

    if (articlesRes.status === 'fulfilled' && articlesRes.value?.data?.items) {
      articles = articlesRes.value.data.items;
    }
    if (videosRes.status === 'fulfilled' && videosRes.value?.data?.items) {
      videos = videosRes.value.data.items;
    }
    if (settingsRes.status === 'fulfilled' && settingsRes.value?.data) {
      settings = settingsRes.value.data;
    }
  } catch (err) {
    console.error('Error fetching homepage data:', err);
  }

  const homepage = settings?.homepage;

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. Hero Section */}
      {homepage?.showHero !== false && <HeroSection settings={settings} />}

      {/* 2. Why Khamsa Section */}
      {homepage?.showWhyKhamsa !== false && <WhyKhamsaSection />}

      {/* 3. Philosophy & Flow Section */}
      {homepage?.showPhilosophy !== false && <PhilosophySection />}

      {/* 4. What We Offer / Services Section */}
      {homepage?.showServices !== false && <ServicesSection />}

      {/* 5. Platform Learning Ways (YouTube, TikTok, Facebook, Articles) */}
      <PlatformLearningSection />

      {/* 6. Latest Articles Section */}
      {homepage?.showArticles !== false && (
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                  أحدث المقالات البرمجية
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-foreground-muted">
                شروحات ومقالات تقنية عميقة ومبسطة في تطوير الويب والـ Software Engineering
              </p>
            </div>

            <Link href="/articles">
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-primary hover:text-primary-hover font-bold">
                <span>كل المقالات</span>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article: Article, index: number) => (
                <ArticleCard
                  key={article._id}
                  article={article}
                  featured={index === 0 && articles.length >= 3}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="لا توجد مقالات منشورة حالياً"
              description="ترقبوا قريباً مقالات حصرية في JavaScript، TypeScript، وتطوير الأنظمة."
            />
          )}
        </section>
      )}

      {/* 7. Latest Videos Section */}
      {homepage?.showVideos !== false && (
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                  من المحتوى للكود
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-foreground-muted">
                أحدث فيديوهات وكبسولات البرمجة على يوتيوب، تيك توك، وفيسبوك
              </p>
            </div>

            <Link href="/videos">
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-primary hover:text-primary-hover font-bold">
                <span>شاهد كل الفيديوهات</span>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video: Video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="لا توجد فيديوهات منشورة حالياً"
              description="جاري تجهيز فيديوهات تعليمية جديدة على قنواتنا في يوتيوب وتيك توك."
            />
          )}
        </section>
      )}

      {/* 8. Impactful Brand Quote */}
      <QuoteSection />

      {/* 9. Founder Story Section */}
      {homepage?.showFounder !== false && <FounderSection settings={settings} />}

      {/* 10. Social CTA Section */}
      {homepage?.showSocial !== false && <SocialCtaSection settings={settings} />}

      {/* 11. Final Action CTA */}
      {homepage?.showFinalCTA !== false && <FinalCtaSection />}
    </div>
  );
}
