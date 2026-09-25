import type { Metadata } from 'next';
import Script from 'next/script';
import { Cairo } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers';
import { Settings } from '@/types/api';
import { getSiteUrl } from '@/lib/seo/site-url';
import { CookieConsent } from '@/components/shared/CookieConsent';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

const siteUrl = getSiteUrl();
const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  'nNlwGk53zi-tWlVHmfwrF4yAgkzMN9n_lZji1_cAk9Y';
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const adSenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

async function fetchPublicSettings(): Promise<Settings | null> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      (process.env.NODE_ENV === 'production'
        ? 'https://khamsa-webapi.vercel.app/api/v1'
        : 'http://localhost:5000/api/v1');
    const res = await fetch(`${apiUrl}/public/settings`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // Graceful fallback to default metadata if API is unreachable during SSR/build
  }
  return null;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchPublicSettings();

  const siteName = settings?.siteName || 'خمسة برمجة بالبلدي';
  const tagline = settings?.tagline || 'افهمها بالبلدي.. اكتبها بالكود';
  const siteTitle = `${siteName} | ${tagline}`;
  const siteDescription =
    settings?.siteDescription ||
    settings?.defaultSeo?.description ||
    'معلومة صغيرة... تفرق معاك في البرمجة. منصة عربية لتبسيط علوم الحاسب، البرمجة، وهندسة البرمجيات باللغة العربية بأسلوب عملي وشروحات مفهومة.';
  const ogImage = settings?.defaultSeo?.ogImage || settings?.logo || undefined;
  const favicon = settings?.favicon || '/favicon.ico';
  const keywords = settings?.defaultSeo?.keywords?.length
    ? settings.defaultSeo.keywords
    : [
        'برمجة',
        'خمسة برمجة بالبلدي',
        'تعلم البرمجة',
        'شروحات برمجية',
        'JavaScript',
        'TypeScript',
        'React',
        'Next.js',
        'Node.js',
        'هندسة البرمجيات',
        'تطوير الويب',
        'Clean Code',
        'System Design',
      ];
  const ownerName = settings?.founder?.founderName || 'ربيع شعبان';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteTitle,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    keywords,
    authors: [{ name: ownerName, url: `${siteUrl}/about` }],
    creator: ownerName,
    publisher: siteName,
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: 'ar_EG',
      url: siteUrl,
      siteName,
      title: siteTitle,
      description: siteDescription,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: siteName,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: ogImage ? [ogImage] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: googleVerification,
    },
    other: {
      'google-site-verification': googleVerification,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchPublicSettings();
  const siteName = settings?.siteName || 'خمسة برمجة بالبلدي';
  const logoUrl = settings?.logo || `${siteUrl}/logo.png`;
  const founderName = settings?.founder?.founderName || 'ربيع شعبان';
  const founderRole = settings?.founder?.founderRole || 'Full Stack Software Engineer';

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    alternateName: 'Khamsa Programming',
    url: siteUrl,
    logo: logoUrl,
    description:
      settings?.siteDescription ||
      'منصة عربية لتبسيط علوم الحاسب وهندسة البرمجيات بأسلوب عملي وشروحات مفهومة.',
    founder: {
      '@type': 'Person',
      name: founderName,
      jobTitle: founderRole,
      url: `${siteUrl}/about`,
    },
    sameAs: [
      'https://github.com/rabea-shaban',
      'https://linkedin.com/in/rabea-shaban',
      'https://youtube.com/@5prog_bldy',
      'https://facebook.com/5prog.bldy',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    inLanguage: 'ar',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/articles?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content={googleVerification} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* Conditional AdSense Integration: Loaded ONLY if real client is configured */}
        {adSenseClient && (
          <Script
            id="adsbygoogle-init"
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClient}`}
          />
        )}
        {/* Conditional Google Analytics 4: Loaded ONLY if real ID is configured */}
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-background text-foreground font-sans antialiased min-h-screen" suppressHydrationWarning>
        <Providers>
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
