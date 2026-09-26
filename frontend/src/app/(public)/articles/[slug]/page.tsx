import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User as UserIcon, Tag, ArrowRight, Share2, Zap, Clock } from 'lucide-react';
import { articlesApi } from '@/lib/api/articles.api';
import { Article, ContentStatus } from '@/types/api';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TiptapRenderer } from '@/components/shared/TiptapRenderer';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { AuthorBox } from '@/components/articles/AuthorBox';
import { ArticleFaq } from '@/components/articles/ArticleFaq';
import { TableOfContents } from '@/components/articles/TableOfContents';
import { AdSlot } from '@/components/ads/AdSlot';
import {
  getStaticArticleBySlug,
  getStaticArticleSlugs,
  getRelatedStaticArticles,
  StaticArticle,
} from '@/data/static-articles';
import { getSiteUrl } from '@/lib/seo/site-url';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getStaticArticleSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const siteUrl = getSiteUrl();

  // 1. Check if it is a high-quality static article
  const staticArt = getStaticArticleBySlug(slug);
  if (staticArt) {
    const canonical = staticArt.seo.canonicalUrl || `${siteUrl}/articles/${staticArt.slug}`;

    return {
      title: `${staticArt.seo.title || staticArt.title} | خمسة برمجة بالبلدي`,
      description: staticArt.seo.description || staticArt.excerpt,
      keywords: staticArt.seo.keywords || staticArt.tags,
      alternates: {
        canonical,
      },
      openGraph: {
        title: staticArt.seo.ogTitle || staticArt.title,
        description: staticArt.seo.ogDescription || staticArt.excerpt,
        type: 'article',
        publishedTime: staticArt.publishedAt,
        modifiedTime: staticArt.updatedAt,
        authors: [staticArt.author.name],
        images: staticArt.coverImage
          ? [
              {
                url: staticArt.coverImage,
                width: 1200,
                height: 630,
                alt: staticArt.coverAlt || staticArt.title,
              },
            ]
          : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: staticArt.seo.ogTitle || staticArt.title,
        description: staticArt.seo.ogDescription || staticArt.excerpt,
        images: staticArt.coverImage ? [staticArt.coverImage] : [],
      },
    };
  }

  // 2. Otherwise check dynamic API
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
    const canonical = article.seo?.canonicalUrl || `${siteUrl}/articles/${article.slug}`;

    return {
      title: `${title} | خمسة برمجة بالبلدي`,
      description,
      keywords: article.seo?.keywords || article.tags,
      alternates: {
        canonical,
      },
      openGraph: {
        title: article.seo?.ogTitle || title,
        description: article.seo?.ogDescription || description,
        type: 'article',
        publishedTime: article.publishedAt || article.createdAt,
        authors: [article.author?.name || 'ربيع شعبان'],
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
  const siteUrl = getSiteUrl();

  const staticArt = getStaticArticleBySlug(slug);
  let article: Article | null = null;
  let staticRelated: StaticArticle[] = [];
  let dynamicRelated: Article[] = [];

  if (staticArt) {
    staticRelated = getRelatedStaticArticles(staticArt, 3);
  } else {
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
        dynamicRelated = relatedRes.data.items.filter(
          (item: Article) => item._id !== article!._id
        );
      }
    } catch {
      notFound();
    }
  }

  const currentTitle = staticArt?.title || article?.title || '';
  const currentExcerpt = staticArt?.excerpt || article?.excerpt || '';
  const currentCategory = staticArt?.category || article?.category || '';
  const currentTags = staticArt?.tags || article?.tags || [];
  const currentCover = staticArt?.coverImage || article?.coverImage;
  const currentCoverAlt = staticArt?.coverAlt || currentTitle;
  const currentContent = staticArt?.content || article?.content || '';
  const currentAuthor = staticArt?.author || {
    id: article?.author?._id || '6ab676b7db2a3194c7928d08',
    name: article?.author?.name || 'ربيع شعبان',
    email: article?.author?.email || 'r.shaban.2016@gmail.com',
    role: 'Full-Stack Software Engineer & Tech Educator',
    bio: 'مهندس برمجيات متخصص في بناء وتطوير الأنظمة السحابية وتطبيقات الويب الحديثة، ومؤسس منصة «خمسة برمجة بالبلدي» لتبسيط علوم الحاسب وهندسة البرمجيات للمطور العربي.',
    avatar: article?.author?.avatar || 'https://github.com/rabea-shaban.png',
    aboutUrl: '/about',
    socials: {
      github: 'https://github.com/rabea-shaban',
      linkedin: 'https://linkedin.com/in/rabea-shaban',
      youtube: 'https://youtube.com/@5prog_bldy',
      facebook: 'https://facebook.com/5prog.bldy',
    },
  };

  const rawPublishedDate = staticArt?.publishedAt || article?.publishedAt || article?.createdAt;
  const formattedDate = rawPublishedDate
    ? new Date(rawPublishedDate).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const contentText = typeof currentContent === 'string' ? currentContent : '';
  const readTime =
    staticArt?.readTimeMinutes ||
    Math.max(1, Math.ceil(contentText.split(/\s+/).filter(Boolean).length / 200)) ||
    15;

  const articleUrl = `${siteUrl}/articles/${staticArt?.slug || article?.slug}`;

  // Structured Article JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    headline: currentTitle,
    description: currentExcerpt,
    image: currentCover ? [currentCover] : undefined,
    datePublished: rawPublishedDate,
    dateModified: staticArt?.updatedAt || article?.updatedAt || rawPublishedDate,
    author: {
      '@type': 'Person',
      name: currentAuthor.name,
      jobTitle: currentAuthor.role,
      url: `${siteUrl}/about`,
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

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4 sm:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <ArticleBreadcrumb
        items={[
          { label: 'المقالات', href: '/articles' },
          { label: currentCategory, href: `/articles?category=${encodeURIComponent(currentCategory)}` },
          { label: currentTitle },
        ]}
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
      <header className="space-y-6 text-start">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary" className="text-xs px-3 py-1">
            {currentCategory}
          </Badge>
          {(staticArt?.isFeatured || article?.isFeatured) && (
            <Badge variant="gold" className="text-xs px-3 py-1 gap-1">
              <Zap className="h-3 w-3" />
              مقال مميز
            </Badge>
          )}
          <span className="inline-flex items-center gap-1 text-xs text-foreground-muted font-medium bg-secondary px-2.5 py-1 rounded-full">
            <Clock className="h-3 w-3 text-primary" />
            <span>وقت القراءة: ~{readTime} دقيقة</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
          {currentTitle}
        </h1>

        <p className="text-base sm:text-xl text-foreground-secondary leading-relaxed font-normal">
          {currentExcerpt}
        </p>

        {/* Author & Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary font-black border border-primary/20 overflow-hidden">
              {currentAuthor.avatar ? (
                <img
                  src={currentAuthor.avatar}
                  alt={currentAuthor.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserIcon className="h-5 w-5" />
              )}
            </div>
            <div>
              <span className="block text-sm font-bold text-foreground">
                {currentAuthor.name}
              </span>
              <span className="flex items-center gap-1 text-xs text-foreground-muted">
                <Calendar className="h-3 w-3" />
                <time>{formattedDate}</time>
              </span>
            </div>
          </div>

          <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
            <Share2 className="h-3.5 w-3.5" />
            <span>مشاركة المقال</span>
          </Button>
        </div>
      </header>

      {/* Featured Cover Image */}
      {currentCover && (
        <div className="overflow-hidden rounded-3xl border border-border shadow-card aspect-[16/9] w-full bg-surface">
          <img
            src={currentCover}
            alt={currentCoverAlt}
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>
      )}

      {/* Table of Contents for Long Form Articles */}
      {staticArt?.tableOfContents && (
        <TableOfContents items={staticArt.tableOfContents} />
      )}

      {/* Safe Ad Placement: After Introduction */}
      <AdSlot slot="article-after-intro" />

      {/* Main Structured Content Area */}
      <main className="py-4">
        <TiptapRenderer content={currentContent} tocItems={staticArt?.tableOfContents} />
      </main>

      {/* Safe Ad Placement: Before FAQ and Related Articles */}
      <AdSlot slot="article-mid-content" />

      {/* Tags Section */}
      {currentTags && currentTags.length > 0 && (
        <div className="pt-6 border-t border-border flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 text-xs font-bold text-foreground-muted ml-2">
            <Tag className="h-3.5 w-3.5" />
            الوسوم:
          </span>
          {currentTags.map((tag: string, idx: number) => (
            <Link key={idx} href={`/articles?search=${encodeURIComponent(tag)}`}>
              <Badge
                variant="secondary"
                className="hover:border-primary/40 transition-colors cursor-pointer font-mono"
              >
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {/* Interactive FAQ Section with Schema */}
      {staticArt?.faq && staticArt.faq.length > 0 && (
        <ArticleFaq faq={staticArt.faq} />
      )}

      {/* Verified Author Box */}
      <AuthorBox author={currentAuthor} />

      {/* Safe Ad Placement: Above Related Content */}
      <AdSlot slot="article-bottom" />

      {/* Related Articles */}
      {(staticRelated.length > 0 || dynamicRelated.length > 0) && (
        <section className="pt-12 border-t border-border space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-foreground">
              مقالات وشروحات ذات صلة
            </h3>
            <p className="text-xs text-foreground-muted">
              استكمل رحلتك البرمجية مع هذه الموضوعات المترابطة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staticRelated.map(s => (
              <ArticleCard
                key={s.id}
                article={{
                  _id: s.id,
                  title: s.title,
                  slug: s.slug,
                  excerpt: s.excerpt,
                  content: s.content,
                  coverImage: s.coverImage,
                  category: s.category,
                  tags: s.tags,
                  author: {
                    _id: 'author-rabie',
                    name: s.author.name,
                    email: 'contact@khamsa.dev',
                    avatar: s.author.avatar,
                  },
                  status: ContentStatus.PUBLISHED,
                  createdAt: s.publishedAt,
                  updatedAt: s.updatedAt,
                }}
              />
            ))}
            {dynamicRelated.map((rel: Article) => (
              <ArticleCard key={rel._id} article={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
