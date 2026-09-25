'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { settingsApi } from '@/lib/api/settings.api';

export function DynamicFavicon() {
  const { data: settingsResponse } = useQuery({
    queryKey: ['public-settings'],
    queryFn: () => settingsApi.getPublicSettings(),
    staleTime: 5 * 60 * 1000,
  });

  const faviconUrl = settingsResponse?.data?.favicon;

  useEffect(() => {
    if (!faviconUrl) return;

    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = faviconUrl;

    let appleLink = document.querySelector<HTMLLinkElement>("link[rel='apple-touch-icon']");
    if (!appleLink) {
      appleLink = document.createElement('link');
      appleLink.rel = 'apple-touch-icon';
      document.head.appendChild(appleLink);
    }
    appleLink.href = faviconUrl;
  }, [faviconUrl]);

  return null;
}
