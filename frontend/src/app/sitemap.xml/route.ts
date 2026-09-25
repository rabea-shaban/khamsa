import { NextResponse } from 'next/server';
import { buildDynamicSitemap } from '@/lib/seo/sitemap-service';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  const entries = await buildDynamicSitemap();

  const urlElements = entries
    .map(entry => {
      const lastmod = entry.lastModified
        ? new Date(entry.lastModified).toISOString()
        : new Date().toISOString();
      const changefreq = entry.changeFrequency || 'weekly';
      const priority = entry.priority !== undefined ? entry.priority.toFixed(1) : '0.8';

      return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
