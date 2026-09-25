/**
 * Unified Site URL Helper for SEO, Sitemaps, and Metadata
 * Brand: خمسة برمجة بالبلدي
 */

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/+$/, '');
  }

  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    return 'https://khamsa-web.vercel.app';
  }

  return 'http://localhost:3000';
}
