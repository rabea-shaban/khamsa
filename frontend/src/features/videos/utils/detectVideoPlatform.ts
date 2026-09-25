import { VideoPlatform } from '@/types/api';

/**
 * Automatically detects the video platform from a given URL string.
 */
export function detectVideoPlatform(url: string): VideoPlatform | null {
  if (!url || typeof url !== 'string') return null;

  try {
    const trimmed = url.trim();
    if (!trimmed) return null;

    // Handle urls without protocol for parsing
    const urlToParse = trimmed.startsWith('http://') || trimmed.startsWith('https://')
      ? trimmed
      : `https://${trimmed}`;

    const parsed = new URL(urlToParse);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '');

    // YouTube checks
    if (
      host === 'youtube.com' ||
      host === 'm.youtube.com' ||
      host === 'youtu.be' ||
      host === 'music.youtube.com'
    ) {
      return VideoPlatform.YOUTUBE;
    }

    // TikTok checks
    if (
      host === 'tiktok.com' ||
      host === 'vt.tiktok.com' ||
      host === 'vm.tiktok.com' ||
      host === 'm.tiktok.com'
    ) {
      return VideoPlatform.TIKTOK;
    }

    // Facebook checks
    if (
      host === 'facebook.com' ||
      host === 'm.facebook.com' ||
      host === 'fb.watch' ||
      host === 'web.facebook.com'
    ) {
      return VideoPlatform.FACEBOOK;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Validates whether the given URL matches the specified platform.
 */
export function isValidPlatformUrl(platform: VideoPlatform, url: string): boolean {
  const detected = detectVideoPlatform(url);
  return detected === platform;
}
