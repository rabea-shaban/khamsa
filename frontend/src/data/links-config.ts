export interface StaticLinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: 'globe' | 'youtube' | 'tiktok' | 'facebook' | 'portfolio';
  isExternal?: boolean;
}

export interface SocialIconItem {
  name: string;
  url: string;
  icon: 'youtube' | 'tiktok' | 'facebook' | 'globe';
  bg: string;
}

export interface BrandProfileConfig {
  brandName: string;
  tagline: string;
  subTagline: string;
  logoUrl: string;
  homeUrl: string;
}

export interface LinksPageConfig {
  profile: BrandProfileConfig;
  staticLinks: StaticLinkItem[];
  socials: SocialIconItem[];
  footer: {
    brandName: string;
    tagline: string;
    copyrightYear: number;
  };
}

export const linksConfig: LinksPageConfig = {
  profile: {
    brandName: 'خمسة برمجة بالبلدي',
    tagline: 'افهمها بالبلدي .. اكتبها بالكود',
    subTagline: 'كل روابط خمسة برمجة بالبلدي في مكان واحد',
    logoUrl: '/logo.png',
    homeUrl: '/',
  },

  // =========================================================================
  // الروابط الـ Static الـ 5 المحددة فقط (تظل ثابتة داخل الكود)
  // أي كورس أو منحة أو Playlist تُدار كـ Dynamic من الـ Dashboard
  // =========================================================================
  staticLinks: [
    {
      id: 'official-website',
      title: 'موقع خمسة برمجة بالبلدي',
      subtitle: 'الموقع الرسمي',
      url: 'https://khamsa-web.vercel.app/',
      icon: 'globe',
      isExternal: false,
    },
    {
      id: 'youtube-channel',
      title: 'YouTube',
      subtitle: 'شاهد الشروحات والدروس',
      url: 'https://www.youtube.com/@5programming.balady',
      icon: 'youtube',
      isExternal: true,
    },
    {
      id: 'tiktok-account',
      title: 'TikTok',
      subtitle: 'محتوى برمجة سريع ومفيد',
      url: 'https://www.tiktok.com/@5programming.balady',
      icon: 'tiktok',
      isExternal: true,
    },
    {
      id: 'facebook-page',
      title: 'Facebook',
      subtitle: 'تابعنا على فيسبوك',
      url: 'https://www.facebook.com/5programming.balady/',
      icon: 'facebook',
      isExternal: true,
    },
    {
      id: 'rabea-shaban-portfolio',
      title: 'Rabea Shaban',
      subtitle: 'الموقع الشخصي والبورتفوليو',
      url: 'https://www.rabea-shaban.com/',
      icon: 'portfolio',
      isExternal: true,
    },
  ],

  // =========================================================================
  // أيقونات التواصل الاجتماعي الدائرية في الأسفل
  // =========================================================================
  socials: [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@5programming.balady',
      icon: 'youtube',
      bg: 'bg-[#FF0000] text-white hover:bg-red-600',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@5programming.balady',
      icon: 'tiktok',
      bg: 'bg-black border border-zinc-700 text-white hover:border-zinc-500',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/5programming.balady/',
      icon: 'facebook',
      bg: 'bg-[#1877F2] text-white hover:bg-blue-600',
    },
    {
      name: 'Website',
      url: 'https://khamsa-web.vercel.app/',
      icon: 'globe',
      bg: 'bg-zinc-800 border border-zinc-700 text-white hover:border-zinc-500',
    },
  ],

  footer: {
    brandName: 'خمسة برمجة بالبلدي',
    tagline: 'افهمها بالبلدي .. اكتبها بالكود',
    copyrightYear: 2026,
  },
};
