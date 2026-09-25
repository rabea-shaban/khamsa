import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://khamsa.dev';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/about', '/articles', '/articles/*', '/videos', '/videos/*'],
        disallow: ['/dashboard', '/dashboard/*', '/api/*', '/login'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
