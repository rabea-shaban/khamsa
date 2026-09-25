import { MetadataRoute } from 'next';
import { articlesApi } from '@/lib/api/articles.api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://khamsa.dev';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  let articleRoutes: MetadataRoute.Sitemap = [];

  try {
    const res = await articlesApi.getArticles({ limit: 500 });
    const articles = res?.data?.items || [];

    articleRoutes = articles.map(article => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt || article.createdAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch {
    console.warn('[sitemap] Backend API offline during build. Generating sitemap with core static routes.');
  }

  return [...staticRoutes, ...articleRoutes];
}
