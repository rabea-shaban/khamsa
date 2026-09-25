/**
 * Extracts TikTok video ID if present in the standard web URL pattern.
 * Pattern: tiktok.com/@username/video/1234567890
 */
export function extractTikTokVideoId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;

  try {
    const trimmed = url.trim();
    const urlToParse = trimmed.startsWith('http://') || trimmed.startsWith('https://')
      ? trimmed
      : `https://${trimmed}`;

    const parsed = new URL(urlToParse);
    const pathname = parsed.pathname;

    // Pattern: /@user/video/VIDEO_ID
    const videoMatch = pathname.match(/\/video\/(\d+)/);
    if (videoMatch && videoMatch[1]) {
      return videoMatch[1];
    }

    // Pattern: /v/VIDEO_ID
    const vMatch = pathname.match(/\/v\/(\d+)/);
    if (vMatch && vMatch[1]) {
      return vMatch[1];
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Gets the official TikTok embed iframe URL.
 */
export function getTikTokEmbedUrl(url: string): string | null {
  const videoId = extractTikTokVideoId(url);
  if (videoId) {
    return `https://www.tiktok.com/embed/v2/${videoId}`;
  }
  return null;
}
