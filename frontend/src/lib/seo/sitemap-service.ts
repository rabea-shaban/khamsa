import { MetadataRoute } from 'next';
import { ContentStatus, Article } from '@/types/api';
import { getSiteUrl } from './site-url';
import { STATIC_ARTICLES } from '@/data/static-articles';

export type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * Validates whether a generated URL is well-formed, absolute, and suitable for search engines.
 */
export function isValidSitemapUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  if (url.includes('undefined') || url.includes('null')) return false;

  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * 1. Static Public Pages
 * Includes all essential educational, trust, and legal pages.
 */
export function getStaticSitemapEntries(siteUrl: string): SitemapEntry[] {
  const staticDefinitions: Array<{
    path: string;
    changeFrequency: SitemapEntry['changeFrequency'];
    priority: number;
  }> = [
    { path: '', changeFrequency: 'daily', priority: 1.0 },
    { path: '/articles', changeFrequency: 'daily', priority: 0.9 },
    { path: '/videos', changeFrequency: 'daily', priority: 0.9 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/privacy-policy', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/cookie-policy', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/terms', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/disclaimer', changeFrequency: 'monthly', priority: 0.6 },
  ];

  return staticDefinitions.map(def => ({
    url: `${siteUrl}${def.path}`,
    lastModified: new Date(),
    changeFrequency: def.changeFrequency,
    priority: def.priority,
  }));
}

/**
 * 2. Static Educational Articles
 * Maps all 20 static SSG articles.
 */
export function getStaticArticleSitemapEntries(siteUrl: string): SitemapEntry[] {
  return STATIC_ARTICLES.map(article => ({
    url: `${siteUrl}/articles/${encodeURIComponent(article.slug)}`,
    lastModified: new Date(article.updatedAt || article.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: article.isFeatured ? 0.9 : 0.8,
  }));
}

/**
 * 3. Dynamic Database Articles
 * Fetches published articles from the database via API.
 */
export async function getDynamicArticleSitemapEntries(siteUrl: string): Promise<SitemapEntry[]> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      (process.env.NODE_ENV === 'production' || process.env.VERCEL
        ? 'https://khamsa-webapi.vercel.app/api/v1'
        : 'http://localhost:5000/api/v1');

    const res = await fetch(`${apiUrl}/public/articles?limit=1000&sort=latest`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      console.warn(`[sitemap] Dynamic articles API returned HTTP ${res.status}`);
      return [];
    }

    const json = (await res.json()) as { data?: { items?: Article[] } };
    const articles: Article[] = json?.data?.items || [];

    return articles
      .filter(article => {
        return (
          article.status === ContentStatus.PUBLISHED &&
          typeof article.slug === 'string' &&
          article.slug.trim().length > 0
        );
      })
      .map(article => {
        const rawDate = article.updatedAt || article.publishedAt || article.createdAt;
        const validDate = rawDate ? new Date(rawDate) : new Date();

        return {
          url: `${siteUrl}/articles/${encodeURIComponent(article.slug.trim())}`,
          lastModified: validDate,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        };
      });
  } catch (error) {
    console.warn('[sitemap] Failed to fetch dynamic articles:', error instanceof Error ? error.message : error);
    return [];
  }
}

/**
 * Master Sitemap Builder
 * Combines all static, educational, and dynamic resources.
 */
export async function buildDynamicSitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const [staticPages, staticArticles, dynamicArticles] = await Promise.all([
    Promise.resolve(getStaticSitemapEntries(siteUrl)),
    Promise.resolve(getStaticArticleSitemapEntries(siteUrl)),
    getDynamicArticleSitemapEntries(siteUrl).catch(() => [] as SitemapEntry[]),
  ]);

  const allEntries: SitemapEntry[] = [
    ...staticPages,
    ...staticArticles,
    ...dynamicArticles,
  ];

  // URL Validation and Deduplication
  const uniqueMap = new Map<string, SitemapEntry>();

  for (const entry of allEntries) {
    if (isValidSitemapUrl(entry.url) && !uniqueMap.has(entry.url)) {
      uniqueMap.set(entry.url, entry);
    }
  }

  return Array.from(uniqueMap.values());
}
