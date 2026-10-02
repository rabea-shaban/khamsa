'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Globe,
  ChevronLeft,
  Flame,
  Link as LinkIcon,
  User,
  ExternalLink,
} from 'lucide-react';
import {
  YouTubeIcon,
  TikTokIcon,
  FacebookIcon,
  WebsiteIcon,
} from '@/components/shared/BrandIcons';
import { linksConfig } from '@/data/links-config';
import { usePublicFeaturedLinks } from '@/features/featured-links';
import { Skeleton } from '@/components/ui/Skeleton';

// 5 Main Essential Static Links as requested
const ESSENTIAL_STATIC_LINKS = [
  {
    id: 'official-website',
    title: 'موقع خمسة برمجة بالبلدي',
    subtitle: 'الموقع الرسمي',
    url: 'https://khamsa-web.vercel.app/',
    isExternal: false,
    iconBg: 'bg-zinc-800/90 text-zinc-300 border border-zinc-700/60',
    icon: <Globe className="h-5 w-5 text-zinc-200" />,
  },
  {
    id: 'youtube-channel',
    title: 'YouTube',
    subtitle: 'شاهد الشروحات والدروس',
    url: 'https://www.youtube.com/@5programming.balady',
    isExternal: true,
    iconBg: 'bg-[#FF0000] text-white shadow-sm',
    icon: <YouTubeIcon size={20} className="text-white" />,
  },
  {
    id: 'tiktok-account',
    title: 'TikTok',
    subtitle: 'محتوى برمجة سريع ومفيد',
    url: 'https://www.tiktok.com/@5programming.balady',
    isExternal: true,
    iconBg: 'bg-black border border-zinc-700 text-white shadow-sm',
    icon: <TikTokIcon size={18} className="text-white" />,
  },
  {
    id: 'facebook-page',
    title: 'Facebook',
    subtitle: 'تابعنا على فيسبوك',
    url: 'https://www.facebook.com/5programming.balady/',
    isExternal: true,
    iconBg: 'bg-[#1877F2] text-white shadow-sm',
    icon: <FacebookIcon size={18} className="text-white" />,
  },
  {
    id: 'rabea-shaban-portfolio',
    title: 'Rabea Shaban',
    subtitle: 'الموقع الشخصي والبورتفوليو',
    url: 'https://www.rabea-shaban.com/',
    isExternal: true,
    iconBg: 'bg-zinc-800/90 text-zinc-300 border border-zinc-700/60',
    icon: <User className="h-5 w-5 text-zinc-200" />,
  },
];

// 4 Bottom Social Round Buttons as shown in the UI screenshots
const SOCIAL_CIRCLES = [
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@5programming.balady',
    bg: 'bg-[#FF0000] text-white hover:bg-red-600',
    icon: <YouTubeIcon size={18} />,
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@5programming.balady',
    bg: 'bg-black border border-zinc-700 text-white hover:border-zinc-500',
    icon: <TikTokIcon size={16} />,
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/5programming.balady/',
    bg: 'bg-[#1877F2] text-white hover:bg-blue-600',
    icon: <FacebookIcon size={16} />,
  },
  {
    name: 'Website',
    url: 'https://khamsa-web.vercel.app/',
    bg: 'bg-zinc-800 border border-zinc-700 text-white hover:border-zinc-500',
    icon: <WebsiteIcon size={16} />,
  },
];

export default function LinksPage() {
  const { data: featuredResponse, isLoading: isFeaturedLoading } = usePublicFeaturedLinks();
  const dynamicFeaturedLinks = featuredResponse?.data || [];
  const { profile, footer } = linksConfig;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#07080B] text-white selection:bg-[#FFC107]/25 selection:text-[#FFC107] relative overflow-x-hidden font-sans"
    >
      {/* ========================================================================= */}
      {/* Background Ambience & Decorative Developer Graphics (Matching Screenshot) */}
      {/* ========================================================================= */}

      {/* Top Center Warm Gold Halo Glow behind Logo */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-[radial-gradient(circle_at_50%_25%,rgba(255,193,7,0.22),rgba(255,193,7,0.06)_45%,transparent_70%)] blur-2xl z-0"
        aria-hidden="true"
      />

      {/* Background Watermark Code Brackets & Tech Graphics */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-10 select-none"
        aria-hidden="true"
      >
        {/* Left Side Code Bracket < / > */}
        <div className="absolute top-20 -left-12 text-[#FFC107] font-mono text-8xl font-black rotate-[-12deg]">
          &lt;/&gt;
        </div>

        {/* Right Side Code Bracket < / > */}
        <div className="absolute top-24 -right-8 text-[#FFC107] font-mono text-8xl font-black rotate-[15deg]">
          &lt;/&gt;
        </div>

        {/* Faint Floating Wave Ribbons in Middle */}
        <svg
          className="absolute top-1/3 left-0 w-full h-96 opacity-25"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,160L80,186.7C160,213,320,267,480,261.3C640,256,800,192,960,170.7C1120,149,1280,171,1360,181.3L1440,192"
            stroke="url(#goldGradientMid)"
            strokeWidth="3"
          />
          <defs>
            <linearGradient id="goldGradientMid" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFC107" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFC107" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFC107" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* Main Page Container (Responsive Mobile-first + Desktop 3-Cols Grid)       */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col min-h-screen">
        
        {/* 1. PROFILE HEADER */}
        <header className="flex flex-col items-center text-center space-y-3 mb-8 sm:mb-10">
          {/* Logo with Glowing Halo */}
          <div className="relative group">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-b from-[#FFC107]/60 via-[#FFC107]/20 to-transparent shadow-[0_0_35px_rgba(255,193,7,0.35)] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-[#07080B] overflow-hidden flex items-center justify-center border border-[#FFC107]/40">
                <Image
                  src={profile.logoUrl}
                  alt={profile.brandName}
                  width={128}
                  height={128}
                  priority
                  className="w-full h-full object-contain p-1.5 drop-shadow-md select-none"
                />
              </div>
            </div>
          </div>

          {/* Brand Name */}
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-1">
            {profile.brandName}
          </h1>

          {/* Slogan */}
          <p className="text-sm sm:text-base font-extrabold text-[#FFC107] tracking-wide">
            {profile.tagline}
          </p>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-zinc-400 font-medium">
            {profile.subTagline}
          </p>
        </header>

        {/* 2. DYNAMIC FEATURED LINKS SECTION ("الروابط المميزة") */}
        {isFeaturedLoading && (
          <section className="w-full space-y-3 mb-10" aria-label="جاري تحميل الروابط المميزة">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="h-5 w-5 text-[#FFC107] animate-pulse" />
              <span className="text-base font-black text-white">الروابط المميزة</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-[#FFC107]/40 bg-[#0C0D12] flex items-center gap-3.5"
                >
                  <Skeleton className="w-20 h-20 rounded-xl shrink-0 bg-zinc-800" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-16 bg-[#FFC107]/20 rounded-full" />
                    <Skeleton className="h-4 w-3/4 bg-zinc-800" />
                    <Skeleton className="h-3 w-1/2 bg-zinc-800/60" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Featured Links Cards */}
        {!isFeaturedLoading && dynamicFeaturedLinks.length > 0 && (
          <section className="w-full mb-10 sm:mb-12" aria-labelledby="featured-heading">
            {/* Section Header with "الأحدث" Badge on Mobile */}
            <div className="flex items-center justify-between gap-2 mb-4 px-1">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-[#FFC107]" />
                  <h2 id="featured-heading" className="text-base sm:text-lg font-black text-white">
                    الروابط المميزة
                  </h2>
                </div>
                <p className="hidden sm:block text-[11px] text-zinc-400">
                  أحدث المنح والمسابقات والسلاسل والكورسات والإعلانات
                </p>
              </div>

              {/* "الأحدث" pill badge as shown in mobile screenshot */}
              <span className="px-3 py-0.5 rounded-full border border-[#FFC107]/50 bg-[#0C0D12] text-[#FFC107] text-xs font-bold shadow-sm">
                الأحدث
              </span>
            </div>

            {/* Grid (1 col on mobile, 3 cols on desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4" role="list">
              {dynamicFeaturedLinks.map(link => {
                const badgeText = link.badge || 'منحة';
                const ctaText = link.ctaText || 'اعرف التفاصيل';
                const descriptionText = link.description || '';

                return (
                  <div key={link._id} role="listitem">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block w-full rounded-2xl p-3.5 sm:p-4 bg-[#0C0D12] border border-[#FFC107] shadow-[0_0_15px_rgba(255,193,7,0.18)] hover:shadow-[0_0_25px_rgba(255,193,7,0.32)] hover:-translate-y-1 transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107]"
                      aria-label={`${link.title} - ${descriptionText}`}
                    >
                      <div className="flex items-center justify-between gap-3 text-right h-full">
                        {/* 1. Left (In LTR) / Far Side: Mobile Circular Yellow Arrow Button */}
                        <div className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-[#FFC107] text-black shrink-0 font-bold group-hover:scale-110 transition-transform">
                          <ChevronLeft className="h-5 w-5" />
                        </div>

                        {/* 2. Middle Content: Badge + Title + Subtitle + CTA Button */}
                        <div className="flex-1 min-w-0 pr-1 space-y-1">
                          {/* Yellow Badge */}
                          <div>
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFC107] text-black text-[10px] sm:text-[11px] font-extrabold shadow-sm">
                              {badgeText}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-[#FFC107] transition-colors line-clamp-1">
                            {link.title}
                          </h3>

                          {/* Description */}
                          {descriptionText && (
                            <p className="text-[11px] text-zinc-400 font-medium line-clamp-1">
                              {descriptionText}
                            </p>
                          )}

                          {/* Desktop & Mobile CTA Button */}
                          <div className="pt-1">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFC107] text-black text-xs font-black group-hover:bg-[#FFD54F] transition-colors shadow-sm">
                              <span>{ctaText}</span>
                              <ExternalLink className="h-3 w-3" />
                            </span>
                          </div>
                        </div>

                        {/* 3. Right: Rectangular Image Thumbnail */}
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-zinc-700/60 bg-[#07080B] shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                          <img
                            src={link.image}
                            alt={link.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 3. STATIC ESSENTIAL LINKS SECTION ("روابطنا الأساسية") */}
        <main className="w-full mb-10 sm:mb-12" aria-labelledby="static-heading">
          <div className="mb-4 px-1 space-y-0.5">
            <div className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-[#FFC107]" />
              <h2 id="static-heading" className="text-base sm:text-lg font-black text-white">
                روابطنا الأساسية
              </h2>
            </div>
            <p className="hidden sm:block text-[11px] text-zinc-400">
              تابعنا على جميع المنصات الرسمية
            </p>
          </div>

          {/* Grid (1 col stacked on mobile, 5 cols row on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5 sm:gap-3" role="list">
            {ESSENTIAL_STATIC_LINKS.map(link => {
              const content = (
                <div className="group relative w-full h-full rounded-2xl p-3 bg-[#111217] border border-zinc-800/80 hover:border-zinc-700 hover:bg-[#16171E] transition-all duration-200 flex items-center justify-between gap-3 text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107] select-none shadow-sm">
                  {/* Left Arrow Icon */}
                  <div className="order-1 text-zinc-500 group-hover:text-white transition-colors shrink-0">
                    <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                  </div>

                  {/* Center Content */}
                  <div className="order-2 flex-1 min-w-0 pr-1">
                    <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#FFC107] transition-colors truncate">
                      {link.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-zinc-400 font-medium truncate mt-0.5">
                      {link.subtitle}
                    </p>
                  </div>

                  {/* Right: Icon Box */}
                  <div className={`order-3 flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${link.iconBg}`}>
                    {link.icon}
                  </div>
                </div>
              );

              return (
                <div key={link.id} role="listitem">
                  {link.isExternal ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                      aria-label={`${link.title} - ${link.subtitle}`}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      href={link.url}
                      className="block w-full h-full"
                      aria-label={`${link.title} - ${link.subtitle}`}
                    >
                      {content}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </main>

        {/* 4. SOCIAL CIRCLE ICONS (Bottom Center as in UI Screenshot) */}
        <section className="w-full flex items-center justify-center gap-3 sm:gap-4 mb-8" aria-label="أيقونات التواصل الاجتماعي">
          {SOCIAL_CIRCLES.map(social => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              aria-label={social.name}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg ${social.bg}`}
            >
              {social.icon}
            </a>
          ))}
        </section>

        {/* 5. BOTTOM GLOWING GOLD RIBBON WAVE (Matching UI Screenshot) */}
        <div className="w-full flex justify-center py-1 pointer-events-none select-none" aria-hidden="true">
          <svg
            className="w-full max-w-lg h-10 sm:h-12 opacity-80"
            viewBox="0 0 500 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 35 C 150 10, 350 45, 490 20"
              stroke="url(#bottomGoldWave)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="bottomGoldWave" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFC107" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#FFC107" stopOpacity="1" />
                <stop offset="100%" stopColor="#FFC107" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 6. FOOTER */}
        <footer className="mt-auto pt-2 pb-4 text-center space-y-1.5 text-zinc-400">
          <h4 className="text-xs sm:text-sm font-bold text-white">
            {footer.brandName}
          </h4>

          <p className="text-xs font-bold text-[#FFC107]">
            {footer.tagline}
          </p>

          <p className="text-[10px] text-zinc-500 font-mono">
            جميع الحقوق محفوظة {footer.copyrightYear} &copy;
          </p>
        </footer>
      </div>
    </div>
  );
}
