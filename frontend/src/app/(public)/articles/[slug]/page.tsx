import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User as UserIcon, Tag, ArrowRight, Share2, Zap } from 'lucide-react';
import { articlesApi } from '@/lib/api/articles.api';
import { Article } from '@/types/api';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TiptapRenderer } from '@/components/shared/TiptapRenderer';
import { ArticleCard } from '@/components/articles/ArticleCard';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await articlesApi.getArticleBySlug(slug);
    const article = res.data;

    if (!article) {
      return {
        title: 'المقال غير موجود | خمسة برمجة بالبلدي',
      };
    }

    const title = article.seo?.title || article.title;
    const description = article.seo?.description || article.excerpt;
    const ogImage = article.seo?.ogImage || article.coverImage || '';

    return {
      title: `${title} | خمسة برمجة بالبلدي`,
      description,
      keywords: article.seo?.keywords || article.tags,
      alternates: {
        canonical: article.seo?.canonicalUrl || undefined,
      },
      openGraph: {
        title: article.seo?.ogTitle || title,
        description: article.seo?.ogDescription || description,
        type: 'article',
        publishedTime: article.publishedAt || article.createdAt,
        authors: [article.author?.name || 'خمسة برمجة بالبلدي'],
        images: ogImage ? [{ url: ogImage }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.seo?.ogTitle || title,
        description: article.seo?.ogDescription || description,
        images: ogImage ? [ogImage] : [],
      },
    };
  } catch {
    return {
      title: 'خمسة برمجة بالبلدي',
    };
  }
}

export default async function ArticleDetailsPage({ params }: ArticlePageProps) {
  const { slug } = await params;

  let article: Article | null = null;
  let relatedArticles: Article[] = [];

  try {
    const res = await articlesApi.getArticleBySlug(slug);
    article = res.data;

    if (!article) {
      notFound();
    }

    // Fetch related articles from same category
    const relatedRes = await articlesApi.getArticles({
      limit: 3,
      category: article.category,
      sort: 'latest',
    });

    if (relatedRes?.data?.items) {
      relatedArticles = relatedRes.data.items.filter((item: Article) => item._id !== article!._id);
    }
  } catch {
    notFound();
  }

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date(article.createdAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://khamsa.dev';
  const articleUrl = `${siteUrl}/articles/${article.slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage ? [article.coverImage] : undefined,
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt || article.createdAt,
    author: {
      '@type': 'Person',
      name: article.author?.name || 'ربيع شعبان',
    },
    publisher: {
      '@type': 'Organization',
      name: 'خمسة برمجة بالبلدي',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'المقالات',
        item: `${siteUrl}/articles`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Back to articles navigation */}
      <div>
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground-muted hover:text-primary transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
          <span>العودة لكل المقالات</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-6 text-right">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary" className="text-xs px-3 py-1">
            {article.category}
          </Badge>
          {article.isFeatured && (
            <Badge variant="gold" className="text-xs px-3 py-1 gap-1">
              <Zap className="h-3 w-3" />
              مقال مميز
            </Badge>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-xl text-foreground-secondary leading-relaxed font-normal">
          {article.excerpt}
        </p>

        {/* Author & Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary font-bold border border-primary/20">
              {article.author?.avatar ? (
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <UserIcon className="h-5 w-5" />
              )}
            </div>
            <div>
              <span className="block text-sm font-bold text-foreground">
                {article.author?.name || 'فريق خمسة برمجة'}
              </span>
              <span className="flex items-center gap-1 text-xs text-foreground-muted">
                <Calendar className="h-3 w-3" />
                <time>{formattedDate}</time>
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 text-xs"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>مشاركة المقال</span>
          </Button>
        </div>
      </header>

      {/* Featured Cover Image */}
      {article.coverImage && (
        <div className="overflow-hidden rounded-3xl border border-border shadow-card aspect-[16/9] w-full bg-surface">
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>
      )}

      {/* Main Structured Content Area */}
      <main className="py-4">
        <TiptapRenderer content={article.content} />
      </main>

      {/* Tags Section */}
      {article.tags && article.tags.length > 0 && (
        <div className="pt-6 border-t border-border flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 text-xs font-bold text-foreground-muted ml-2">
            <Tag className="h-3.5 w-3.5" />
            الوسوم:
          </span>
          {article.tags.map((tag: string, idx: number) => (
            <Link key={idx} href={`/articles?tag=${encodeURIComponent(tag)}`}>
              <Badge variant="secondary" className="hover:border-primary/40 transition-colors cursor-pointer font-mono">
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="pt-16 border-t border-border space-y-6">
          <h3 className="text-xl sm:text-2xl font-black text-foreground">مقالات ذات صلة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.slice(0, 2).map((rel: Article) => (
              <ArticleCard key={rel._id} article={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
