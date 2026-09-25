/**
 * Extract YouTube Video ID from standard, short, live, or embed URLs.
 */
export function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;

  try {
    const trimmed = url.trim();
    const urlToParse = trimmed.startsWith('http://') || trimmed.startsWith('https://')
      ? trimmed
      : `https://${trimmed}`;

    const parsed = new URL(urlToParse);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '');

    // youtu.be/VIDEO_ID
    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1).split('/')[0];
      return id && id.length > 0 ? id : null;
    }

    // youtube.com variants
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      // /watch?v=VIDEO_ID
      const v = parsed.searchParams.get('v');
      if (v) return v;

      // /shorts/VIDEO_ID
      if (parsed.pathname.startsWith('/shorts/')) {
        const id = parsed.pathname.split('/shorts/')[1]?.split('/')[0]?.split('?')[0];
        if (id) return id;
      }

      // /embed/VIDEO_ID
      if (parsed.pathname.startsWith('/embed/')) {
        const id = parsed.pathname.split('/embed/')[1]?.split('/')[0]?.split('?')[0];
        if (id) return id;
      }

      // /live/VIDEO_ID
      if (parsed.pathname.startsWith('/live/')) {
        const id = parsed.pathname.split('/live/')[1]?.split('/')[0]?.split('?')[0];
        if (id) return id;
      }
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Generates privacy-enhanced YouTube embed URL.
 */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0&modestbranding=1`;
}

/**
 * Generates YouTube thumbnail URL from video ID.
 */
export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;
}
