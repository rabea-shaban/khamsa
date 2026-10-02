import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/seo/site-url';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: {
    absolute: 'خمسة برمجة بالبلدي | جميع الروابط',
  },
  description: 'جميع روابط خمسة برمجة بالبلدي من كورسات وشروحات ومواقع التواصل في مكان واحد.',
  alternates: {
    canonical: `${siteUrl}/links`,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: `${siteUrl}/links`,
    siteName: 'خمسة برمجة بالبلدي',
    title: 'خمسة برمجة بالبلدي | جميع الروابط',
    description: 'جميع روابط خمسة برمجة بالبلدي من كورسات وشروحات ومواقع التواصل في مكان واحد.',
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 800,
        height: 800,
        alt: 'خمسة برمجة بالبلدي - جميع الروابط',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'خمسة برمجة بالبلدي | جميع الروابط',
    description: 'جميع روابط خمسة برمجة بالبلدي من كورسات وشروحات ومواقع التواصل في مكان واحد.',
    images: [`${siteUrl}/logo.png`],
  },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
