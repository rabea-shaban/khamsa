import { MetadataRoute } from 'next';
import { articlesApi } from '@/lib/api/articles.api';
import { ContentStatus } from '@/types/api';
import { getSiteUrl } from './site-url';

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
 * 1. Static Public Routes
 * Only valid, public routes are included. Private, dashboard, admin, and login routes are strictly excluded.
 */
export function getStaticSitemapEntries(siteUrl: string): SitemapEntry[] {
  const staticDefinitions: Array<{
    path: string;
    changeFrequency: SitemapEntry['changeFrequency'];
    priority: number;
  }> = [
    {
      path: '',
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      path: '/articles',
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      path: '/videos',
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      path: '/about',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  return staticDefinitions.map(def => ({
    url: `${siteUrl}${def.path}`,
    lastModified: new Date(),
    changeFrequency: def.changeFrequency,
    priority: def.priority,
  }));
}

/**
 * 2. Dynamic Articles
 * Fetches published articles from the database via the existing public API.
 * Draft and deleted articles are strictly excluded.
 */
export async function getArticleSitemapEntries(siteUrl: string): Promise<SitemapEntry[]> {
  try {
    const response = await articlesApi.getArticles({
      limit: 1000,
      sort: 'latest',
    });

    const articles = response?.data?.items || [];

    return articles
      .filter(article => {
        // Strict guard: Must be published and have a valid slug
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
    console.warn('[sitemap] Failed to fetch dynamic articles for sitemap:', error instanceof Error ? error.message : error);
    return [];
  }
}

/**
 * 3. Dynamic Videos Extension Point
 * If individual video permalinks are introduced, they seamlessly plug in here.
 */
export async function getVideoSitemapEntries(_siteUrl: string): Promise<SitemapEntry[]> {
  // Currently all public videos are rendered inside the filterable /videos archive
  return [];
}

/**
 * 4. Dynamic CMS Pages Extension Point
 * Extension point for future custom CMS pages.
 */
export async function getPageSitemapEntries(_siteUrl: string): Promise<SitemapEntry[]> {
  return [];
}

/**
 * Master Sitemap Builder
 * Combines static and dynamic sources with fault tolerance, URL validation, and deduplication.
 */
export async function buildDynamicSitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  // Execute all sources in parallel with fault isolation
  const [staticEntries, articleResults, videoResults, pageResults] = await Promise.all([
    getStaticSitemapEntries(siteUrl),
    getArticleSitemapEntries(siteUrl).catch(err => {
      console.error('[sitemap] Error in getArticleSitemapEntries:', err);
      return [] as SitemapEntry[];
    }),
    getVideoSitemapEntries(siteUrl).catch(err => {
      console.error('[sitemap] Error in getVideoSitemapEntries:', err);
      return [] as SitemapEntry[];
    }),
    getPageSitemapEntries(siteUrl).catch(err => {
      console.error('[sitemap] Error in getPageSitemapEntries:', err);
      return [] as SitemapEntry[];
    }),
  ]);

  const allEntries: SitemapEntry[] = [
    ...staticEntries,
    ...articleResults,
    ...videoResults,
    ...pageResults,
  ];

  // URL Validation and Deduplication (retains first valid occurrence)
  const uniqueMap = new Map<string, SitemapEntry>();

  for (const entry of allEntries) {
    if (isValidSitemapUrl(entry.url) && !uniqueMap.has(entry.url)) {
      uniqueMap.set(entry.url, entry);
    }
  }

  return Array.from(uniqueMap.values());
}
