import { MetadataRoute } from 'next';
import { buildDynamicSitemap } from '@/lib/seo/sitemap-service';

/**
 * Next.js Dynamic Sitemap Route Handler
 * Automatically revalidates every 1 hour (3600 seconds) via ISR
 * No manual deploy or rebuild needed when new articles or videos are published.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildDynamicSitemap();
}
